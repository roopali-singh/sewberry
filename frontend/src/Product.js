import React, { useState, useEffect } from "react";
import "./Product.css";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import WishlistIcon from "./WishlistIcon";

function Product({ product, forSlider, forShopScreen, forSale }) {
  const [{ basket }, dispatch] = useStateValue();
  const [inHover, setHover] = useState(false);

  // useEffect(() => {
  //   localStorage.setItem("basket", JSON.stringify(basket));
  // }, [basket]);

  useEffect(() => {
    console.log("basket useEffect 🍕 🍕 🍕 🍕 🍕 => ", basket);
  });

  function addToCart() {
    console.log("basket 🍕 🍕 🍕 🍕 🍕 => ", basket);
    dispatch({
      type: "ADD_TO_BASKET",
      items: {
        _id: product?._id,
        image: product?.image,
        alt: product?.alt,
        name: product?.name,
        price: product?.price?.lower,
        countInStock: product?.countInStock - 1,
      },
    });
  }

  return (
    <div
      className={`forSaleSection ${
        forSlider
          ? "productSlider"
          : forShopScreen
          ? "productShopScreen"
          : "product"
      }`}
    >
      {/* PRODUCT IMAGE */}
      <Link to={`/products/${product?._id}`} className="link">
        <img
          className="product__image"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          src={product?.image}
          alt={product?.alt}
          loading="lazy"
        />
        {forSale && <LoyaltyIcon className="product__saleTag saleTagColor" />}
      </Link>

      {/* FOR DIRECT ADD TO BASKET OPTION */}
      {inHover && (
        <div
          className="product__directOrder"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <button
            className="product__directOrder-button"
            onClick={addToCart}
            disabled={product?.countInStock <= 0}
          >
            {product?.countInStock <= 0 ? "Out of Stock" : "Order Now"}
          </button>
        </div>
      )}

      {/* FOR PRICE AND HEART */}

      <div className="product__priceHeart">
        {/* FOR PRODUCT SALE SECTION */}
        <Link to={`/products/${product?._id}`} className="link">
          {!forSale ? (
            <span className="product__price">
              ₹
              {product?.price?.lower?.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </span>
          ) : (
            <span className="product__price">
              <span>₹2900</span>
              <span>
                ₹
                {product?.price?.lower?.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </span>
            </span>
          )}
        </Link>
        <span className="product__heart">
          <WishlistIcon product={product} />
        </span>
      </div>

      {/* PRODUCT TITLE */}
      <Link to={`/products/${product?._id}`} className="link">
        <p className="product__title">{product?.name}</p>
      </Link>
    </div>
  );
}

export default Product;
