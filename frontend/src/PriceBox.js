import React, { useEffect } from "react";
import "./PriceBox.css";
import { useStateValue } from "./StateProvider";

function PriceBox() {
  const [{ productDetails, basket }, dispatch] = useStateValue();

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

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
  };

  return (
    <div className="priceBox">
      {/* /// NORMAL PRICE FOR PRODUCT SCREEN ////////////////////////////////////// */}

      <span className="priceBox__info">
        <span>Price</span>
        <strong>
          ₹
          {productDetails?.price?.lower?.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
          })}
        </strong>
      </span>

      {/* /// IN OR OUT OF STOCK ///////////////////////////////////////////////////// */}

      <span className="priceBox__info">
        <span>Status </span>
        {productDetails?.countInStock > 0 ? (
          <span className="priceBox__info-inOut in-status-color">In Stock</span>
        ) : (
          <span className="priceBox__info-inOut out-status-color">
            Out of Stock
          </span>
        )}
      </span>

      {/* /// ADD TO BASKET BUTTON ////////////////////////////////////////////////// */}
      <button onClick={addToCart} disabled={productDetails?.countInStock <= 0}>
        Add To Cart
      </button>
    </div>
  );
}

export default PriceBox;
