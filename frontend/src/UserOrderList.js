import React from "react";
import "./UserOrderList.css";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";

function UserOrderList({ order }) {
  const [{ basket }, dispatch] = useStateValue();

  function addToCart() {
    dispatch({
      type: "ADD_TO_BASKET",
      items: {
        _id: order?._id,
        image: order?.image,
        alt: order?.alt,
        name: order?.name,
        price: order?.price,
        countInStock: order?.countInStock - 1,
        qty: order?.qty ? order?.qty : 1,
      },
    });
  }

  return (
    <main className="userOrder">
      {/* /////////////////////// LEFT SIDE //////////////////////// */}
      <div className="userOrder__left">
        <Link to={`/products/${order?._id}`} className="link">
          <img
            className="userOrder__left-img"
            src={order?.image}
            alt={order?.alt}
          />
        </Link>
      </div>

      {/* /////////////////////// RIGHT SIDE //////////////////////// */}
      <div className="userOrder__right">
        <strong>{order?.name}</strong>

        <div className="userOrder__right-price">
          ₹
          {order?.price?.lower?.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
          })}
        </div>

        <div className="userOrder__right-price">
          <strong>Qty: </strong>
          {order?.qty?.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
          })}
        </div>

        <button onClick={addToCart}>Buy Again</button>
      </div>
    </main>
  );
}

export default UserOrderList;
