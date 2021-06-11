import React from "react";
import CartProduct from "./CartProduct";
import "./CartScreen.css";
import PriceBox from "./PriceBox";
import { useStateValue } from "./StateProvider";

function CartScreen() {
  const [{ basket }] = useStateValue();
  return (
    <>
      <h2 className="cartScreen__title">
        Your Shopping Basket <span>📸</span>
      </h2>
      <div className="cartScreen">
        <div className="cartScreen__left">
          {/* //ADDING THE PRODUCTS FROM BASKET */}

          {basket?.length === 0 && <h2>Cart is empty</h2>}

          {basket?.map((item) => (
            <CartProduct info={item} />
          ))}
        </div>

        <div className="cartScreen__right">
          <PriceBox subTotal gift />
        </div>
      </div>
    </>
  );
}

export default CartScreen;
