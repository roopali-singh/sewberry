import React from "react";
import "./Orders.css";
import UserOrderList from "./UserOrderList";
import { useHistory } from "react-router-dom";

function Orders({ products }) {
  const history = useHistory();

  function completePayment() {
    history.push(`/shipping/${products?._id}`);
  }

  return (
    <div className="orders">
      {/* ////////////////// ORDER INFO //////////////////////// */}
      <main className="order__info">
        <div>
          <small className="order__date">{products?.createdAt}</small>
        </div>
        <div>
          <small className="order__id">{products?._id}</small>
        </div>
      </main>

      {/* ////////////////// MAP PRODUCTS OF ORDER //////////////////////// */}
      {products?.orderItems?.map((order) => (
        <div key={order._id} className="order__list">
          <UserOrderList key={order._id} order={order} />
        </div>
      ))}

      {/* ////////////////// TO COMPLETE PAYMENT //////////////////////// */}
      <div className="order__paymentInfo">
        <h3 className="order__total">Order Total: {products?.orderTotal}</h3>

        {products?.isPaid === false && (
          <button
            className="order__pay-Buton"
            onClick={() => completePayment()}
          >
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
}

export default Orders;
