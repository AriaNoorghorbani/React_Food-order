import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import { currencyFormatter } from "../util/formatting";
import Button from "../UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConf = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);

  const {
    data,
    error,
    isLoading: isSending,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConf);

  const totalPrice = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * +item.price;
  }, 0);

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearItems();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    });
  }

  let action = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    action = <span> Sending order request...</span>;
  }

  console.log(data);

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order submitted successfully.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(totalPrice)}</p>
        <Input id="name" label="Full Name"></Input>
        <Input id="email" label="E-Mail"></Input>
        <Input id="street" label="Street"></Input>
        <div className="control-row">
          <Input id="postal-code" label="Postal Code"></Input>
          <Input id="city" label="City"></Input>
        </div>

        {error && <Error title="Sending failed" message={error} />}

        <p className="modal-actions">{action}</p>
      </form>
    </Modal>
  );
}
