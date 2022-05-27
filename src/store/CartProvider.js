import React, { useReducer } from "react";
import CartContext from "./cart-context";

const DEFAULT_CART_STATE = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  let currTotalAmount = 0;
  switch (action.type) {
    case "ADD":
      let isExist = state.items.findIndex(
        (item) => item.id === action.items.id
      );
      if (isExist === -1) {
        state.items.push(action.items);
      } else {
        state.items[isExist].amount += action.items.amount;
        state.items[isExist].amount =
          state.items[isExist].amount > 5 ? 5 : state.items[isExist].amount;
      }
      currTotalAmount = state.items.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.amount * currentValue.price;
      }, 0);
      state.totalAmount = Math.round(currTotalAmount * 100) / 100;
      return { items: state.items, totalAmount: state.totalAmount };
    case "REMOVE":
      let itemIndex = state.items.findIndex((item) => item.id === action.id);
      state.items[itemIndex].amount -= 1;
      if (state.items[itemIndex].amount === 0) {
        state.items.splice(itemIndex, 1);
      }
      currTotalAmount = state.items.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.amount * currentValue.price;
      }, 0);
      state.totalAmount = Math.round(currTotalAmount * 100) / 100;
      return { items: state.items, totalAmount: state.totalAmount };
    case "CLEAR":
      return { items: [], totalAmount: 0 };
    default:
      throw new Error();
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, DEFAULT_CART_STATE);
  const addItemHandler = (item) => {
    dispatchCart({ type: "ADD", items: item });
  };
  const removeItemHandler = (id) => {
    dispatchCart({ type: "REMOVE", id: id });
  };
  const clearCartHandler = () => {
    dispatchCart({ type: "CLEAR" });
  };
  const CART_ITEMS = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={CART_ITEMS}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
