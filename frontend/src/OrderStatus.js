import React from "react";
import "./OrderStatus.css";

function OrderStatus({ active1, active2, active3, active4 }) {
  return (
    <main className="status">
      <section className="status__div">
        <div
          className={`status__bar ${
            active1 ? "activeBgColor" : "non-activeBgColor"
          }`}
        ></div>
        <div
          className={`status__barTitle ${
            active1 ? "activeColor" : "non-activeColor"
          }`}
        >
          Basket Ready
        </div>
      </section>
      <section className="status__div">
        <div
          className={`status__bar ${
            active2 ? "activeBgColor" : "non-activeBgColor"
          }`}
        ></div>
        <div
          className={`status__barTitle ${
            active2 ? "activeColor" : "non-activeColor"
          }`}
        >
          Checkout
        </div>
      </section>
      <section className="status__div">
        <div
          className={`status__bar ${
            active3 ? "activeBgColor" : "non-activeBgColor"
          }`}
        ></div>
        <div
          className={`status__barTitle ${
            active3 ? "activeColor" : "non-activeColor"
          }`}
        >
          Payment
        </div>
      </section>
      <section className="status__div">
        <div
          className={`status__bar ${
            active4 ? "activeBgColor" : "non-activeBgColor"
          }`}
        ></div>
        <div
          className={`status__barTitle ${
            active4 ? "activeColor" : "non-activeColor"
          }`}
        >
          Order Placed
        </div>
      </section>
    </main>
  );
}

export default OrderStatus;
