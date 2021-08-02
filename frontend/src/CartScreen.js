import React, { useEffect } from "react";
import CartProduct from "./CartProduct";
import "./CartScreen.css";
import CheckoutPriceBox from "./CheckoutPriceBox";
import LoadingBox from "./LoadingBox";
import ErrorBox from "./ErrorBox";
import { useStateValue } from "./StateProvider";

function CartScreen() {
  const [{ basket, loading, error }, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({
      type: "REMOVING_ERROR",
      error: false,
    });
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingBox loading={loading} />
      ) : error ? (
        <ErrorBox error={error} />
      ) : (
        <>
          <h2 className="cartScreen__title">
            Your Shopping Basket <span>📸</span>
          </h2>
          <main className="cartScreen">
            <div className="cartScreen__left">
              {/* //ADDING THE PRODUCTS FROM BASKET */}

              {basket?.length === 0 && <h2>Cart is empty</h2>}

              {basket?.map((item) => (
                <CartProduct info={item} />
              ))}
            </div>

            <div className="cartScreen__right">
              <CheckoutPriceBox />
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default CartScreen;
