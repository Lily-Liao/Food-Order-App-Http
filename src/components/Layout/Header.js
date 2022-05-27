import React from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <div className={classes.header__nav}>
        <h2 className={classes.header__title}>ReactMeals</h2>
        <HeaderCartButton onClick={props.onShowCart} />
      </div>
      <div className={classes.header__image} />
    </>
  );
};

export default Header;
