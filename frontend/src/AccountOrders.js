import React from "react";
import "./AccountOrders.css";
import Orders from "./Orders";

function AccountOrders() {
  return (
    <main className="accountOrders">
      <div className="accountOrders__box1">
        <h1>Your Orders</h1>
      </div>
      <Orders />
    </main>
  );
}

export default AccountOrders;
