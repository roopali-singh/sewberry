import React, { useEffect } from "react";
import "./Account.css";
import AccountInfo from "./AccountInfo";
import AccountOrders from "./AccountOrders";
import { useStateValue } from "./StateProvider";
import axios from "axios";

function Account() {
  const [{ userInfo, favouriteSuccess }, dispatch] = useStateValue();

  // FOR WISHLIST LIST & ICONS //////////////

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
  }, [userInfo, favouriteSuccess]);

  //////////////////////////////////////////

  return (
    <div className="account">
      {/* <div> */}
      <main className="account__box account__box-margin1">
        <AccountInfo />
      </main>
      <main className="account__box account__box-margin2">
        <AccountOrders />
      </main>
    </div>
  );
}

export default Account;
