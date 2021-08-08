import React, { useEffect } from "react";
import "./AccountOrders.css";
import Orders from "./Orders";
import axios from "axios";
import { useStateValue } from "./StateProvider";
import LoadingBox from "./LoadingBox";
import ErrorBox from "./ErrorBox";

function AccountOrders() {
  const [{ loading, error, userInfo, userOrderInfo }, dispatch] =
    useStateValue();

  useEffect(() => {
    dispatch({
      type: "REMOVING_ERROR",
      error: false,
    });
  }, []);

  useEffect(() => {
    async function listUserOrders() {
      dispatch({
        type: "REQUEST_SEND",
        loading: true,
        error: false,
      });

      try {
        const { data } = await axios.post(
          "/api/orders/userOrders",
          { userInfo },
          {
            headers: {
              Authorization: `Bearer ${userInfo?.token}`,
            },
          }
        );

        dispatch({
          type: "USER_ORDERS_LIST",
          loading: false,
          userOrderInfo: data,
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

    listUserOrders();
  }, [dispatch]);
  return (
    <main className="accountOrders">
      <div className="accountOrders__box">
        <h1>Your Orders</h1>
      </div>
      {loading ? (
        <LoadingBox loading={loading} />
      ) : error ? (
        <ErrorBox error={error} />
      ) : (
        <>
          {userOrderInfo?.order?.length === 0 && <span>No Orders Yet...</span>}
          {userOrderInfo?.order?.map((order) => (
            <Orders key={order?._id} products={order} />
          ))}
        </>
      )}
    </main>
  );
}

export default AccountOrders;
