import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import { currencyFormatter } from "../util/formatting";
import Button from "../UI/Button";

export default function Checkout() {
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);

  const totalPrice = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * +item.price;
  }, 0);

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    console.log(customerData);
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(totalPrice)}</p>
        <Input id="full-name" label="Full Name"></Input>
        <Input id="email" label="E-Mail"></Input>
        <Input id="street" label="Street"></Input>
        <div className="control-row">
          <Input id="postal-code" label="Postal Code"></Input>
          <Input id="city" label="City"></Input>
        </div>
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
