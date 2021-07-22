import React, { useEffect } from "react";
import "./WishlistIcon.css";
import { useStateValue } from "./StateProvider";
import FavoriteIcon from "@material-ui/icons/Favorite";

function WishlistIcon({ product }) {
  const [{ wishlistBasket }, dispatch] = useStateValue();
  const wishlistBasketCheck = wishlistBasket?.find(
    (wishlist) => wishlist?._id === product?._id
  );

  useEffect(() => {
    localStorage.setItem("wishlistBasket", JSON.stringify(wishlistBasket));
  }, [wishlistBasket]);

  function addToWishlist() {
    dispatch({
      type: "ADD_TO_WISHLIST",
      items: {
        _id: product?._id,
        image: product?.image,
        alt: product?.alt,
        name: product?.name,
        price: product?.price?.lower,
        countInStock: product?.countInStock,
      },
    });
  }

  return (
    <div className="wishlistIcon">
      <FavoriteIcon
        className={wishlistBasketCheck ? "wishlistHeart" : "non-wishlistHeart"}
        onClick={addToWishlist}
      />
    </div>
  );
}

export default WishlistIcon;
