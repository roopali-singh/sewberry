import React, { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import "./WishlistLinkScreen.css";
import CartProduct from "./CartProduct";
import axios from "axios";
import LoadingBox from "./LoadingBox";
import ErrorBox from "./ErrorBox";

function WishlistLinkScreen() {
  const [{ wishlistBasket, loading, error, userInfo, favourites }, dispatch] =
    useStateValue();

  useEffect(() => {
    dispatch({
      type: "REMOVING_ERROR",
      loading: false,
      error: false,
    });
  }, []);

  useEffect(() => {
    if (userInfo?.token) {
      async function loginUserFavourites() {
        dispatch({
          type: "REQUEST_SEND",
          loading: true,
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
          console.log("data => ", data);
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
      loginUserFavourites();
    }
  }, [userInfo]);
  console.log("favourites => ", favourites);

  return (
    <div className="wishlist">
      <h1 className="wishlist__title">Your Wishlist</h1>
      {loading ? (
        <LoadingBox loading />
      ) : error ? (
        <ErrorBox error />
      ) : (
        <main className="wishlist__products">
          {!userInfo?.token ? (
            <>
              {wishlistBasket?.length === 0 && (
                <span>Whoops! Empty Wishlist</span>
              )}
              {wishlistBasket?.map((wishlist) => (
                <CartProduct
                  key={wishlist?._id}
                  info={wishlist}
                  forWishlistPage
                />
              ))}
            </>
          ) : (
            <>
              {favourites?.length === 0 ? (
                <span>Whoops! No Favourites</span>
              ) : (
                favourites?.map((wishlist) => (
                  <CartProduct
                    key={wishlist?._id}
                    info={wishlist?.product}
                    forWishlistPage
                  />
                ))
              )}
            </>
          )}
        </main>
      )}
    </div>
  );
}

export default WishlistLinkScreen;
