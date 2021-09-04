import React, { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import "./WishlistLinkScreen.css";
import CartProduct from "./CartProduct";
// import axios from "axios";
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
