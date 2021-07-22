import React from "react";
import "./Orders.css";
import CartProduct from "./CartProduct";
import { useStateValue } from "./StateProvider";

function Orders() {
  const [{ wishlistBasket }] = useStateValue();

  return (
    <>
      {wishlistBasket.length === 0 && <span>No Orders Yet</span>}
      {wishlistBasket?.map((order) => (
        <div className="orders">
          <CartProduct info={order} forAccountPage />
        </div>
      ))}
    </>
  );
}

export default Orders;
