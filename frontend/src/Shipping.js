import React, { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import "./Shipping.css";
import { useStateValue } from "./StateProvider";
import { useParams } from "react-router-dom";
import axios from "axios";

function Shipping() {
  const [{ orderDetails, userInfo }, dispatch] = useStateValue();

  var { id } = useParams();

  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    dispatch({
      type: "REMOVING_ERROR",
      loading: false,
      error: false,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "SUCCESS_ACHEIVED",
      success: false,
    });
  }, []);

  useEffect(() => {
    async function detailsOrder() {
      dispatch({
        type: "REQUEST_SEND",
        loading: true,
        error: false,
      });
      try {
        const { data } = await axios.get(`/api/orders/${id}`);
        dispatch({
          type: "ORDER_DETAILS_SUCCESS",
          loading: false,
          orderDetails: data,
        });
      } catch (error) {
        dispatch({
          type: "REQUEST_FAIL",
          loading: false,
          error:
            error.response && error.response.data.message
              ? `Error ${error.response.status} : ${error.response.data.message}`
              : error.message,
        });
      }
    }
    detailsOrder();
  }, [id, dispatch]);

  // THE PLACE ORDER HANDLER ///////////////

  function placeOrderHandler(e) {
    e.preventDefault();

    dispatch({
      type: "ORDER_CREATE_RESET",
      order: {},
      // success: false,
    });

    dispatch({
      type: "BASKET__EMPTY",
      basket: [],
    });
  }

  return (
    <div className="shipping">
      <h2 className="shipping__title">
        Checkout ({orderDetails?.orderItems?.length} items)
      </h2>
      <div className="shipping__outerBox">
        <div className="shipping__box">
          <div className="shipping__subBox">
            <strong>Delivery Address</strong>

            <p className="shipping__subBoxInfo">
              <span>{orderDetails?.shippingAddress?.address}</span>
              <span>
                {orderDetails?.shippingAddress?.city}:{" "}
                {orderDetails?.shippingAddress?.pin}
              </span>
              <span>{orderDetails?.shippingAddress?.state}</span>
            </p>
          </div>

          <div className="shipping__subBox">
            <strong>Review items and delivery</strong>
            <div className="shipping__subBoxInfo">
              {orderDetails?.orderItems?.map((item) => (
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
                {orderDetails?.orderTotal?.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </strong>
              {orderDetails?.isPaid === true ? (
                <button className="shipping__button" disabled>
                  Already Paid
                </button>
              ) : (
                <button
                  className="shipping__button"
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
