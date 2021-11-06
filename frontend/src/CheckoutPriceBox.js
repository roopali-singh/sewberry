import React, { useEffect } from "react";
import "./CheckoutPriceBox.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useStateValue } from "./StateProvider";

function CheckoutPriceBox() {
  const history = useHistory();

  const [{ basket, userInfo, success, order, products }, dispatch] =
    useStateValue();

  const amount = basket?.reduce(
    (amount, item) => item?.price?.lower * item?.qty + amount,
    0
  );
  const discount = amount > 7000 ? 10 : 0;
  const shipping = basket?.length > 0 ? 150 : 0;
  const orderTotal = shipping + (amount - (discount / 100) * amount);

  useEffect(() => {
    dispatch({
      type: "REMOVING_ERROR",
      loading: false,
      error: false,
    });
  }, []);

  useEffect(() => {
    if (order?._id) {
      history.push(`/shipping/${order?._id}`);
    }
  }, [order]);

  async function createOrder(event, orders, orderTotal) {
    event.preventDefault();
    dispatch({
      type: "REQUEST_SEND",
      loading: true,
      error: false,
    });

    try {
      const { data } = await axios.post(
        "/api/orders/create",
        {
          orders,
          // user,
          orderTotal,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );

      dispatch({
        type: "ORDER_CREATE_SUCCESS",
        loading: false,
        order: data,
      });

      // dispatch({
      //   type: "SUCCESS_ACHEIVED",
      //   success: true,
      // });

      // localStorage.removeItem("basket");
    } catch (error) {
      dispatch({
        type: "REQUEST_FAIL",
        loading: false,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }

  // CHECKOUT HANDLER /////////////////////////////////////////////////
  function checkoutHandler(e) {
    e.preventDefault();

    if (userInfo?.token) {
      createOrder(e, basket, orderTotal); // Deconstruct basket => then. set orderItems to basket
    } else {
      history.push("/login");
    }
  }

  return (
    <div className="checkout-priceBox">
      {/* /// FOR THE SUBTOTAL ///////////////////////////////////////////// */}

      <>
        <span className="checkout-priceBox__info">
          <span>Subtotal ({basket?.length} items)</span>
          <strong>
            ₹
            {amount?.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </strong>
        </span>

        {/* // DISCOUNT ///////////////////////// */}
        {amount >= 7000 && (
          <span className="checkout-priceBox__info">
            <span>
              Discount <small>(applied)</small>
            </span>
            <p className="red-color">{discount}%</p>
          </span>
        )}

        {/* // SHIPPING ///////////////////////// */}
        <span className="checkout-priceBox__info">
          <span>Shipping</span>
          <p>₹{shipping}</p>
        </span>

        {/* // ORDER TOTAL ///////////////////////// */}
        <span className="checkout-priceBox__info">
          <span>Total</span>
          <strong>
            ₹
            {orderTotal?.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </strong>
        </span>
      </>

      {/* /// GIFT ///////////////////////////////////////////////dfszaDFSAewq ///////////////////// */}

      <small className="checkout-priceBox__info forCheckbox">
        <input type="checkbox" />
        This order contains a gift
      </small>

      {/* /// PROCEED TO CHECKOUT BUTTON  /////////////////////////////////////////////// */}

      <button
        onClick={checkoutHandler}
        disabled={basket?.length === 0 || success === true}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default CheckoutPriceBox;
