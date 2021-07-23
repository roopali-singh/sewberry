import React from "react";
import CartProduct from "./CartProduct";
import "./Shipping.css";
import { useStateValue } from "./StateProvider";

function Shipping() {
  const [{ basket, userInfo }] = useStateValue();

  const amount = basket?.reduce((amount, item) => item?.price + amount, 0);
  const discount = amount > 7000 ? 10 : 0;
  const shipping = basket?.length > 0 ? 150 : 0;
  const discountPrice = shipping + (amount - (discount / 100) * amount);

  return (
    <div className="shipping">
      <h2 className="shipping__title">Checkout ({basket?.length} items)</h2>
      <div className="shipping__outerBox">
        <div className="shipping__box">
          <div className="shipping__subBox">
            <strong>Delivery Address</strong>

            <p className="shipping__subBoxInfo">
              <span>{userInfo?.address}</span>
              <span>
                {userInfo?.city}: {userInfo?.pin}
              </span>
              <span>{userInfo?.state}</span>
            </p>
          </div>

          <div className="shipping__subBox">
            <strong>Review items and delivery</strong>
            <div className="shipping__subBoxInfo">
              {basket?.map((item) => (
                <CartProduct info={item} forShippingPage />
              ))}
            </div>
          </div>

          <div className="shipping__subBox">
            <strong>Payment Method</strong>

            <p className="shipping__subBoxInfo">
              <strong>
                Order Total: ₹
                {discountPrice?.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </strong>
              <button className="shipping__button">
                <strong>Buy Now</strong>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
