import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount}`;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orderClickHandler = () => {
    setIsCheckout(true);
  };
  const orderSubmitHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch("https://food-98796-default-rtdb.firebaseio.com/order.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderItems: cartCtx.items,
      }),
    });
    setIsSubmitting(false);
    setIsSubmited(true);
    cartCtx.clearCart();
  };

  const cartItemList = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />
  ));

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes.buttonAlt} onClick={props.onClose}>
        Close
      </button>
      {cartCtx.items.length > 0 && (
        <button className={classes.button} onClick={orderClickHandler}>
          Order
        </button>
      )}
    </div>
  );

  let cartContent;
  if (!isSubmitting && !isSubmited) {
    cartContent = (
      <>
        <ul className={classes.cartItems}>{cartItemList}</ul>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {isCheckout && (
          <Checkout
            onCancel={props.onClose}
            onOrderSubmit={orderSubmitHandler}
          />
        )}
        {!isCheckout && modalAction}
      </>
    );
  }
  if (isSubmitting) {
    cartContent = <p className={classes.sending}>Sending data...</p>;
  }
  if (!isSubmitting && isSubmited) {
    cartContent = (
      <>
        <p className={classes.orderSuccess}>Order Successfully!!</p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.onClose}>
            Close
          </button>
        </div>
      </>
    );
  }

  return <Modal onClose={props.onClose}>{cartContent}</Modal>;
};

export default Cart;
