import React, { useState } from "react";
import "./PriceBox.css";
import Quantity from "./Quantity";
import { useStateValue } from "./StateProvider";

function PriceBox() {
  const [{ productDetails }, dispatch] = useStateValue();
  const [productQty, setProductQty] = useState(1);

  // useEffect(() => {
  //   localStorage.setItem("basket", JSON.stringify(basket));
  // }, [basket]);

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      items: {
        _id: productDetails?._id,
        image: productDetails?.image,
        alt: productDetails?.alt,
        name: productDetails?.name,
        price: productDetails?.price,
        countInStock: productDetails?.countInStock,
        qty: productQty,
      },
    });
  };

  return (
    <div className="priceBox">
      {/* /// NORMAL PRICE FOR PRODUCT SCREEN ////////////////////////////////////// */}

      <div className="priceBox__info">
        <span>Price</span>
        <strong>
          ₹
          {productDetails?.price?.lower?.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
          })}
        </strong>
      </div>

      {/* /// IN OR OUT OF STOCK ///////////////////////////////////////////////////// */}

      <div className="priceBox__info">
        <span>Status </span>
        {productDetails?.countInStock > 0 ? (
          <span className="priceBox__info-inOut in-status-color">In Stock</span>
        ) : (
          <span className="priceBox__info-inOut out-status-color">
            Out of Stock
          </span>
        )}
      </div>

      {/* /// Quantity to ADD/ REMOVE ///////////////////////////////////////////////////// */}
      {productDetails?.countInStock > 0 && (
        <div className="priceBox__info">
          <span>Quantity </span>
          <Quantity
            // initialProductQty={1}
            totalProductQty={productDetails?.countInStock}
            passProductQty={setProductQty}
          />
        </div>
      )}

      {/* /// ADD TO BASKET BUTTON ////////////////////////////////////////////////// */}
      <button onClick={addToCart} disabled={productDetails?.countInStock <= 0}>
        Add To Cart
      </button>
    </div>
  );
}

export default PriceBox;
