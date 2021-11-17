import React, { useEffect, useState } from "react";
import "./WishlistIcon.css";
import { useStateValue } from "./StateProvider";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "axios";

function WishlistIcon({ product }) {
  const [{ wishlistBasket, userInfo, favourites }, dispatch] = useStateValue();

  const [wishlistBasketCheck, setWishlistBasketCheck] = useState({});
  // const [favouriteSuccessToggle, setFavouriteSuccessToggle] = useState(true);

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
  }, [userInfo, wishlistBasket, favourites]);

  //////////// CHOOSING REMOVE OR ADD IN FAOVRITES /////////////////////

  function loginUserHeart(e) {
    e.preventDefault();
    if (
      favourites?.find((wishlist) => wishlist?.product?._id === product?._id)
    ) {
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
      loginUserFavourites();
      // setFavouriteSuccessToggle((change) => !change);
    } catch (error) {
      dispatch({
        type: "REQUEST_FAIL",
        loading: false,
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
        `/api/wishlist/deleteFavourite/${productId}`,
        // { productId },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      loginUserFavourites();

      dispatch({
        type: "FAVOURITE_SUCCESS_ACHEIVED",
        loading: false,
        favouriteSuccess: true,
      });
      // setFavouriteSuccessToggle((change) => !change);
    } catch (error) {
      dispatch({
        type: "REQUEST_FAIL",
        loading: false,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }

  ///////////////// RELOADING WISHLIST ICON (after changing favourites) ///////////////////

  // useEffect(() => {
  //   if (userInfo?.token) {
  async function loginUserFavourites() {
    dispatch({
      type: "FAVORITE_REQUEST_SEND",
      favoriteLoading: true,
      erorr: false,
    });

    try {
      const { data } = await axios.get("/api/wishlist/list", {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      });

      dispatch({
        type: "SHOW_ALL_FAVOURITES",
        loading: false,
        favourites: data,
      });
    } catch (error) {
      dispatch({
        type: "REQUEST_FAIL",
        loading: false,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
  // loginUserFavourites();
  //   }
  // }, [userInfo, favouriteSuccessToggle]);

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
