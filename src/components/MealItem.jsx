import { useContext } from "react";
import CartContext from "../store/CartContext";
import Button from "../UI/Button";
import { currencyFormatter } from "../util/formatting";

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  function handleAddItem() {
    cartCtx.addItem(meal);
  }

  return (
    <li>
      <article className="meal-item">
        <img src={`http://localhost:3000/${meal.image}`} alt="" />
        <div>
          <h3></h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-action">
          <Button onClick={handleAddItem}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
