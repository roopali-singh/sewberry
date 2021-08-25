import React from "react";
import "./AdminAccount.css";
import AdminAccountFunction from "./AdminAccountFunction";
import ShowAllOrders from "./ShowAllOrders";

function AdminAccount() {
  return (
    <main className="adminAccount">
      {/* ///////////////////////// ORDERS ///////////////////////////// */}

      <AdminAccountFunction />
      <ShowAllOrders />
    </main>
  );
}

export default AdminAccount;
