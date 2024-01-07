import { useContext } from "react";
import LogoImg from "../assets/logo.jpg";
import CartContext from "../store/CartContext";
import Button from "../UI/Button";

export default function Header() {
  const cartCtx = useContext(CartContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={LogoImg} />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
