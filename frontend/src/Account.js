import React from "react";
import "./Account.css";
import AccountInfo from "./AccountInfo";
import AccountOrders from "./AccountOrders";

function Account() {
  return (
    <div className="account">
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
