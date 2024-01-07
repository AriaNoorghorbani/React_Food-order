export default function MealItem({ meal }) {
  return (
    <li>
      <article className="meal-item">
        <img src={`http://localhost:3000/${meal.image}`} alt="" />
        <div>
          <h3></h3>
          <p className="meal-item-price">{meal.price}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-action">
          <button>Add to Cart</button>
        </p>
      </article>
    </li>
  );
}
