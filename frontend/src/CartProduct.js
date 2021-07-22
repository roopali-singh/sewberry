import React, { useEffect } from "react";
import "./CartProduct.css";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import WishlistIcon from "./WishlistIcon";

function CartProduct({
  info,
  forShippingPage,
  forWishlistPage,
  forAccountPage,
}) {
  const [{ basket }, dispatch] = useStateValue();

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

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
      {forAccountPage && (
        <div className="order__info">
          <div>
            <small className="order__date">December 18th 2020, 2:10pm.</small>
          </div>
          <div>
            <small className="order__id">{info?._id}</small>
          </div>
        </div>
      )}
      <main
        className={`cartProduct ${forShippingPage && "forShiping"}  ${
          forWishlistPage && "forWishlist"
        } ${forAccountPage && "forAccount"}`}
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
              <WishlistIcon product={info} />
            </span>
          )}
        </div>
        {/* /////////////////////// RIGHT SIDE //////////////////////// */}
        <div className="cartProduct__right">
          <strong>{info?.name}</strong>
          <div className="cartProduct__right-info">
            ₹
            {info?.price?.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </div>

          {forWishlistPage ? (
            <button onClick={addToCart}>Add to Cart</button>
          ) : forShippingPage ? (
            <button onClick={removeFromCart}>Remove from Cart</button>
          ) : (
            <button onClick={addToCart}>Buy Again</button>
          )}
        </div>
      </main>
      {/* ////////////////// ORDER TOTAL //////////////////////// */}
      {forAccountPage && (
        <h3 className="order__total">Order Total: {info?.price}</h3>
      )}
    </>
  );
}

export default CartProduct;
