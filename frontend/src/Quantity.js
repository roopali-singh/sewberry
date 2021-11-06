import React, { useEffect, useState } from "react";
import "./Quantity.css";
import { useStateValue } from "./StateProvider";

function Quantity({
  initialProductQty,
  productInfo,
  totalProductQty,
  passProductQty,
  forCartPage,
}) {
  const [{}, dispatch] = useStateValue();
  const [qty, setQty] = useState(initialProductQty ? initialProductQty : 1);

  useEffect(() => {
    passProductQty(qty);
  }, [qty]);

  function addToCart() {
    dispatch({
      type: "ADD_TO_BASKET",
      items: {
        _id: productInfo?._id,
        image: productInfo?.image,
        alt: productInfo?.alt,
        name: productInfo?.name,
        price: productInfo?.price,
        countInStock: productInfo?.countInStock,
        qty: qty,
      },
    });
  }

  useEffect(() => {
    if (initialProductQty) {
      addToCart();
    }
  }, [qty]);

  function addQtyHandler() {
    if (qty < totalProductQty) {
      setQty((qty) => qty + 1);
    }
  }

  function removeQtyHandler() {
    if (!(qty < 2)) {
      setQty((qty) => qty - 1);
    }
  }

  return (
    <div className="quantity">
      <button onClick={removeQtyHandler}>-</button>
      <span
        className={`${
          forCartPage ? "quantity__value--forCart" : "quantity__value"
        } `}
      >
        {qty}
      </span>
      <button onClick={addQtyHandler}>+</button>
    </div>
  );
}
export default Quantity;
