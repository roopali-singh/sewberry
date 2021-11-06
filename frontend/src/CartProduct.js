import React, { useState } from "react";
import "./CartProduct.css";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import WishlistIcon from "./WishlistIcon";
import Quantity from "./Quantity";

function CartProduct({ info, forShippingPage, forWishlistPage, forCartPage }) {
  const [{}, dispatch] = useStateValue();
  const [productQty, setProductQty] = useState(info?.qty ? info?.qty : 1);

  // useEffect(() => {
  //   localStorage.setItem("basket", JSON.stringify(basket));
  // }, [basket]);

  function addToCart() {
    dispatch({
      type: "ADD_TO_BASKET",
      items: {
        _id: info?._id,
        image: info?.image,
        alt: info?.alt,
        name: info?.name,
        price: info?.price,
        countInStock: info?.countInStock,
        qty: productQty,
      },
    });
  }

  function removeFromCart() {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      _id: info._id,
      // countInStock: info?.countInStock,
    });
  }

  return (
    <>
      <main
        className={`cartProduct ${forShippingPage && "forShiping"}  ${
          forWishlistPage && "forWishlist"
        } `}
      >
        {/* /////////////////////// LEFT SIDE //////////////////////// */}
        <div className="cartProduct__left">
          <Link to={`/products/${info?._id}`} className="link">
            <img
              className="cartProduct__img"
              src={info?.image}
              alt={info?.alt}
            />
          </Link>

          {forWishlistPage && (
            <span className="forWishlistHeart">
              <WishlistIcon product={info} forWishlistPageHeart />
            </span>
          )}
        </div>
        {/* /////////////////////// RIGHT SIDE //////////////////////// */}
        <div className="cartProduct__right">
          <strong>{info?.name}</strong>
          <div className="cartProduct__right-info">
            ₹
            {info?.price?.lower?.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </div>

          {forShippingPage && (
            <div className="cartProduct__right-info">
              <strong>Qty: </strong>
              {info?.qty?.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </div>
          )}

          {forCartPage && (
            <div className="cartProduct__right-info">
              <Quantity
                initialProductQty={productQty}
                productInfo={info}
                totalProductQty={info?.countInStock}
                passProductQty={setProductQty}
                forCartPage
              />
            </div>
          )}

          {forWishlistPage ? (
            <button
              id="orderBtn1"
              onClick={addToCart}
              disabled={info?.countInStock <= 0}
            >
              {info?.countInStock <= 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          ) : forShippingPage ? (
            <></>
          ) : (
            <button onClick={removeFromCart}>Remove from Cart</button>
          )}
        </div>
      </main>
    </>
  );
}

export default CartProduct;
