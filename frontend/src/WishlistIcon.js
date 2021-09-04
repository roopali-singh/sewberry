import React, { useEffect, useState } from "react";
import "./WishlistIcon.css";
import { useStateValue } from "./StateProvider";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "axios";

function WishlistIcon({ product, forWishlistPageHeart }) {
  const [{ wishlistBasket, userInfo, favourites, favouriteSuccess }, dispatch] =
    useStateValue();

  const [wishlistBasketCheck, setWishlistBasketCheck] = useState({});

  // const wishlistBasketCheck = wishlistBasket?.find(
  //   (wishlist) => wishlist?._id === product?._id
  // );

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

  useEffect(() => {
    if (userInfo?.token) {
      setWishlistBasketCheck(
        favourites?.find((wishlist) => wishlist?.product?._id === product?._id)
      );
    } else {
      setWishlistBasketCheck(
        wishlistBasket?.find((wishlist) => wishlist?._id === product?._id)
      );
    }

    dispatch({
      type: "FAVOURITE_SUCCESS_ACHEIVED",
      loading: false,
      favouriteSuccess: false,
    });
  }, [userInfo, favourites, wishlistBasket, favouriteSuccess]);

  function loginUserHeart(e) {
    e.preventDefault();
    if (forWishlistPageHeart) {
      removeFromFavourites(product?._id);
    } else {
      addToFavourites(product?._id);
    }
  }
  //////////////////////////////// ADD TO FAVOURITES ///////////////////
  async function addToFavourites(productId) {
    // dispatch({
    //   type: "REQUEST_SEND",
    //   loading: true,
    //   error: false,
    // });

    try {
      const { data } = await axios.post(
        "/api/wishlist/add",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );

      dispatch({
        type: "FAVOURITE_SUCCESS_ACHEIVED",
        loading: false,
        favouriteSuccess: true,
      });
    } catch (error) {
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

  ////////////////////////// REMOVE FROM FAVOURITES /////////////////////

  async function removeFromFavourites(productId) {
    try {
      const { data } = await axios.delete(
        "/api/wishlist/deleteFavourite",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );


      dispatch({
        type: "FAVOURITE_SUCCESS_ACHEIVED",
        loading: false,
        favouriteSuccess: true,
      });
    } catch (error) {
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

  ///////////////////////// ADD WISHLIST TO CONTEXT API ///////////////////////////

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
          className={
            wishlistBasketCheck ? "wishlistHeart" : "non-wishlistHeart"
          }
          disabled={wishlistBasketCheck}
          onClick={loginUserHeart}
        />
      )}
    </div>
  );
}

export default WishlistIcon;
