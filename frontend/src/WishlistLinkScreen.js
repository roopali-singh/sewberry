import React from "react";
import { useStateValue } from "./StateProvider";
import "./WishlistLinkScreen.css";
import CartProduct from "./CartProduct";

function WishlistLinkScreen() {
  const [{ wishlistBasket }] = useStateValue();

  return (
    <div className="wishlist">
      <h1 className="wishlist__title">Your Wishlist</h1>
      <main className="wishlist__products">
        {wishlistBasket?.length === 0 && <span>Whoops! Empty Wishlist</span>}

        {wishlistBasket?.map((wishlist) => (
          <CartProduct info={wishlist} forWishlistPage />
        ))}
      </main>
    </div>
  );
}

export default WishlistLinkScreen;
