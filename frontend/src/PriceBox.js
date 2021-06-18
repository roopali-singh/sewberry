import React, { useEffect } from "react";
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

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

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
        /// FOR THE SUBTOTAL /////////////////////////////////////////////
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
        /// NORMAL PRICE FOR PRODUCT SCREEN //////////////////////////////////////
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
        /// GIFT ////////////////////////////////////////////////////////////////////
        <small className="priceBox__info forCheckbox">
          <input type="checkbox" />
          This order contains a gift
        </small>
      ) : (
        /// IN OR OUT OF STOCK /////////////////////////////////////////////////////
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
        /// ADD TO BASKET BUTTON ////////////////////////////////////////////////////////
        <button
          onClick={addToCart}
          disabled={productDetails?.countInStock <= 0}
        >
          Add To Cart
        </button>
      ) : (
        /// PROCEED TO CHECKOUT BUTTON  ////////////////////////////////////////////////////
        <button onClick={checkoutHandler} disabled={basket?.length === 0}>
          Proceed to Checkout
        </button>
      )}
    </div>
  );
}

export default PriceBox;
