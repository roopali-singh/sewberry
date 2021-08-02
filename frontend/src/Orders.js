import React from "react";
import "./Orders.css";
import UserOrderList from "./UserOrderList";

function Orders({ products }) {
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
        <div className="order__list">
          <UserOrderList order={order} />
        </div>
      ))}

      {/* ////////////////// ORDER TOTAL //////////////////////// */}
      <h3 className="order__total">Order Total: {products?.orderTotal}</h3>
    </div>
  );
}

export default Orders;
