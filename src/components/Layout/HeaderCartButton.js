import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import { ReactComponent as CartIcon } from "./images/cart.svg";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [isBtnBump, setIsBtnBump] = useState(false);
  const cartCtx = useContext(CartContext);
  const {items} = cartCtx;
  const num =
    items.length === 0
      ? 0
      : items.reduce((acc, curr) => {
          return acc + curr.amount;
        }, 0);
  const btnClasses = `${classes.button} ${isBtnBump ? classes.bump : ''}`
  useEffect(()=>{
    console.log('here');
    if (num === 0){
      return;
    }
    setIsBtnBump(true);

    const timer = setTimeout(()=>{
      setIsBtnBump(false)
    },300);

    return ()=>{
      clearTimeout(timer)
    }
  },[num]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{num}</span>
    </button>
  );
};

export default HeaderCartButton;
