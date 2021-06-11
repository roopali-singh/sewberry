import React from "react";
import "./PriceBox.css";
import { useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function PriceBox({ subTotal, gift, addToBasket }) {
  const history = useHistory();

  const [{ productDetails, basket }, dispatch] = useStateValue();

  const amount = basket?.reduce((amount, item) => item?.price + amount, 0);
  const discount = amount > 7000 ? 10 : 0;
  const shipping = basket?.length > 0 ? 150 : 0;
  const discountPrice = shipping + (amount - (discount / 100) * amount);

  function checkoutHandler() {
    // history.push("/signin?redirect=shipping");
    history.push("/shipping");
  }

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      items: {
        _id: productDetails?._id,
        image: productDetails?.image,
        alt: productDetails?.alt,
        name: productDetails?.name,
        price: productDetails?.price?.lower,
        countInStock: productDetails?.countInStock - 1,
      },
    });

    // dispatch({
    //   type: "SET_TOTAL_PRICE",
    //   amount: amount,
    //   discountPrice: discountPrice,
    // });
  };

  return (
    <div className="priceBox">
      {subTotal ? (
        <>
          <span className="priceBox__info">
            <span>Subtotal ({basket?.length} items)</span>
            <strong>
              ₹
              {amount?.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </strong>
          </span>
          {amount >= 7000 && (
            <span className="priceBox__info">
              <span>
                Discount <small>(applied)</small>
              </span>
              <p className="red-color">{discount}%</p>
            </span>
          )}
          <span className="priceBox__info">
            <span>Shipping</span>
            <p>₹{shipping}</p>
          </span>
          <span className="priceBox__info">
            <span>Total</span>
            <strong>
              ₹
              {discountPrice?.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </strong>
          </span>
        </>
      ) : (
        <span className="priceBox__info">
          <span>Price</span>
          <strong>
            ₹
            {productDetails?.price?.lower?.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </strong>
        </span>
      )}

      {gift ? (
        <small className="priceBox__info forCheckbox">
          <input type="checkbox" />
          This order contains a gift
        </small>
      ) : (
        <span className="priceBox__info">
          <span>Status </span>
          {productDetails?.countInStock > 0 ? (
            <span className="priceBox__info-inOut in-status-color">
              In Stock
            </span>
          ) : (
            <span className="priceBox__info-inOut out-status-color">
              Out of Stock
            </span>
          )}
        </span>
      )}

      {addToBasket ? (
        <button
          onClick={addToCart}
          disabled={productDetails?.countInStock <= 0}
        >
          Add To Cart
        </button>
      ) : (
        <button onClick={checkoutHandler} disabled={basket?.length === 0}>
          Proceed to Checkout
        </button>
      )}
    </div>
  );
}

export default PriceBox;
