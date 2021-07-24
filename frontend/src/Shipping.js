import React, { useState } from "react";
import CartProduct from "./CartProduct";
import "./Shipping.css";
import { useStateValue } from "./StateProvider";

function Shipping() {
  const [{ basket, userInfo }] = useStateValue();
  const [paymentMethod, setPaymentMethod] = useState("");

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
            <strong>
              {" "}
              <label htmlFor={paymentMethod}>Payment Method</label>
            </strong>

            <p className="shipping__subBoxInfo">
              {/* ////////////  SELECTING PAYMENT METHOD ///////////////// */}

              <main className="shipping__subBox-checkBox">
                <div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="stripe"
                    value="stripe"
                    required
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Stripe
                </div>
                <div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="paypal"
                    value="paypal"
                    required
                    // checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  PayPal
                </div>
              </main>
              {paymentMethod === "paypal" ? (
                <div>
                  <h3>Paypal Chosen</h3>
                  <hr />
                </div>
              ) : paymentMethod === "stripe" ? (
                <div>
                  <h3>Stripe Chosen</h3>
                  <hr />
                </div>
              ) : (
                <></>
              )}

              {/* ////////////  ORDER TOTAL ///////////////// */}

              <strong>
                Order Total: ₹
                {discountPrice?.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </strong>
              <button className="shipping__button">
                <strong>Place Order</strong>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
