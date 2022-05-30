import React, { useReducer } from "react";
import CartContext from "./cart-context";

const DEFAULT_CART_STATE = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  let currTotalAmount = state.totalAmount;
  let currentCartItems = state.items;
  let newCartItems = [...state.items];
  let newTotalPrice;
  switch (action.type) {
    case "ADD":
      let isExist = currentCartItems.findIndex(
        (item) => item.id === action.items.id
      );
      if (isExist === -1) {
        newCartItems.push(action.items);
      } else {
        let updateCartItem = {
          ...currentCartItems[isExist],
          amount: currentCartItems[isExist].amount + action.items.amount
        }
        newCartItems[isExist] = updateCartItem;
      }
      currTotalAmount += action.items.amount * action.items.price ;
      newTotalPrice = Math.round(currTotalAmount * 100) / 100
      return { items: newCartItems, totalAmount: newTotalPrice };
    case "REMOVE":
      let itemIndex = currentCartItems.findIndex((item) => item.id === action.id);
      let updateCartItem = {
        ...currentCartItems[itemIndex],
        amount: currentCartItems[itemIndex].amount - 1
      }
      if (updateCartItem.amount === 0) {
        newCartItems.splice(itemIndex, 1);
      }
      newCartItems[itemIndex] = updateCartItem;
      currTotalAmount -= newCartItems[itemIndex].price ;
      newTotalPrice = Math.round(currTotalAmount * 100) / 100
      return { items: newCartItems, totalAmount: newTotalPrice };
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
