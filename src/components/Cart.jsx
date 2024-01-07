import { useContext } from "react";
import CartContext from "../store/CartContext";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { currencyFormatter } from "../util/formatting";

export default function Cart() {
  const cartCtx = useContext(CartContext);

  const totalPrice = cartCtx.items.reduce((totalPrice, item) => {
    totalPrice + item.quantity * item.price;
  }, 0);
  return (
    <Modal className="cart">
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.map((item) => {
          <li key={item.id}>
            {item.name} - {item - quantity}
          </li>;
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly>Close</Button>
        <Button>Go to Checkout</Button>
      </p>
    </Modal>
  );
}
