import { useContext } from "react";
import CartContext from "../store/CartContext";
import userProgressContext from "../store/UserProgressContext";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { currencyFormatter } from "../util/formatting";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(userProgressContext);

  const totalPrice = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * +item.price;
  }, 0);

  function handleCloseModal() {
    userProgressCtx.hideCart();
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => {
          return (
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onIncrease={() => cartCtx.addItem(item)}
              onDecrease={() => cartCtx.removeItem(item.id)}
            />
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseModal}>
          Close
        </Button>
        <Button>Go to Checkout</Button>
      </p>
    </Modal>
  );
}
