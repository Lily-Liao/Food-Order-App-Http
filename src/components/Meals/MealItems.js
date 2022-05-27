import { useContext } from "react";
import classes from "./MealItems.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../store/cart-context";

const MealItems = (props) => {
  const cartCtx = useContext(CartContext);
  const addToCartHandler = (amountNumber) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amountNumber,
      price: props.price,
    });
    console.log(cartCtx.items, cartCtx.totalAmount);
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>${props.price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItems;
