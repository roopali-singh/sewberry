import React, { useEffect, useState } from "react";
import "./CartProduct.css";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import WishlistIcon from "./WishlistIcon";

function CartProduct({ info, forShippingPage, forWishlistPage }) {
  const [{}, dispatch] = useStateValue();
  const [add, setAdd] = useState(0);

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
        countInStock: info?.countInStock - 1,
      },
    });
  }

  function removeFromCart() {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      _id: info._id,
      countInStock: info?.countInStock + 1,
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

          {forWishlistPage ? (
            <button onClick={addToCart}>Add to Cart</button>
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
