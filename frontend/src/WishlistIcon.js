import React, { useEffect } from "react";
import "./WishlistIcon.css";
import { useStateValue } from "./StateProvider";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "axios";

function WishlistIcon({ product }) {
  const [{ wishlistBasket, userInfo, heart, favouritesId }, dispatch] =
    useStateValue();
  const wishlistBasketCheck = userInfo?.token
    ? favouritesId?.find((favourite) => favourite?.product === product?._id)
    : wishlistBasket?.find((wishlist) => wishlist?._id === product?._id);

  // useEffect(() => {
  //   localStorage.setItem("wishlistBasket", JSON.stringify(wishlistBasket));
  // }, [wishlistBasket]);

  useEffect(() => {
    dispatch({
      type: "REMOVING_ERROR",
      loading: false,
      error: false,
    });
  }, []);

  async function loginUserHeart(productId) {
    dispatch({
      type: "REQUEST_SEND",
      loading: true,
      error: false,
    });

    try {
      const { data } = await axios.post(
        "/api/wishlist",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      console.log(data);

      dispatch({
        type: "CHANGE_WISHLIST_ICON",
        loading: false,
        heart: data?.heart,
      });

      heart &&
        dispatch({
          type: "SHOW_ALL_FAVOURITES",
          loading: false,
          favourites: data?.favourite,
        });
    } catch (error) {
      console.log("error");
      dispatch({
        type: "REQUEST_FAIL",
        loading: true,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }

  function addToWishlist() {
    dispatch({
      type: "ADD_TO_WISHLIST",
      items: {
        _id: product?._id,
        image: product?.image,
        alt: product?.alt,
        name: product?.name,
        price: product?.price,
        countInStock: product?.countInStock,
      },
    });
  }

  return (
    <div className="wishlistIcon">
      {!userInfo?.token ? (
        <FavoriteIcon
          className={
            wishlistBasketCheck ? "wishlistHeart" : "non-wishlistHeart"
          }
          onClick={addToWishlist}
        />
      ) : (
        <FavoriteIcon
          className={heart ? "wishlistHeart" : "non-wishlistHeart"}
          onClick={() => loginUserHeart(product?._id)}
        />
      )}
    </div>
  );
}

export default WishlistIcon;
