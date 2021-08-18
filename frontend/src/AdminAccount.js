import React from "react";
import "./AdminAccount.css";
// import { useParams } from "react-router";
// import AdminAccountOptions from "./AdminAccountOptions";
import ShowAllOrders from "./ShowAllOrders";

function AdminAccount() {
  // var { infoType } = useParams();
  return (
    <main className="adminAccount">
      {/* <div className="adminAccount__left"> */}
      {/* ///////////////////////// ORDERS ///////////////////////////// */}

      <ShowAllOrders />
      {/* {infoType === "show-all-orders" && <ShowAllOrders />} */}
      {/* {infoType === "show-all-unpaid-orders" && <ShowAllUnpaidOrders />} */}
      {/* {infoType === "show-all-paid-orders" && <ShowAllPaidOrders />}
        {infoType === "show-all-paid-not-delivered-orders" && (
          <ShowAllPaidNotDeliveredOrders />
        )}
        {infoType === "show-all-paid-delivered-orders" && (
          <ShowAllPaidDeliveredOrders />
        )} */}

      {/* ///////////////////////// USERS ///////////////////////////// */}

      {/* {infoType === "show-all-users" && <ShowAllUsers />} */}

      {/* ///////////////////////// PRODUCTS ///////////////////////////// */}

      {/* {infoType === "show-all-products" && <ShowAllProducts />}
        {infoType === "create-new-product" && <CreateNewProducts />}
        {infoType === "update-product" && <UpdateProducts />}
        {infoType === "delete-product" && <DeleteProducts />} */}
      {/* </div>
      <div className="adminAccount__right">
        <AdminAccountOptions />
      </div> */}
    </main>
  );
}

export default AdminAccount;
