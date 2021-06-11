import React from "react";
import "./CartProduct.css";
import { useStateValue } from "./StateProvider";

function CartProduct({ info, forShippingPage }) {
  const [{ basket }, dispatch] = useStateValue();

  function removeFromCart() {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      _id: info._id,
      countInStock: info?.countInStock + 1,
    });
    localStorage.setItem("basket", JSON.stringify(basket));
  }

  return (
    <div className={`cartProduct ${forShippingPage && "forShiping"}`}>
      <div className="cartProduct__left">
        <img className="cartProduct__img" src={info?.image} alt={info?.alt} />
      </div>
      <div className="cartProduct__right">
        <strong>{info?.name}</strong>
        <div className="cartProduct__right-info">₹{info?.price}</div>
        <button onClick={removeFromCart}>Remove from Cart</button>
      </div>
    </div>
  );
}

export default CartProduct;
