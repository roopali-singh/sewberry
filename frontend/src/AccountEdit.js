import React from "react";
import "./AccountEdit.css";
import AccountInfo from "./AccountInfo";

function AccountEdit() {
  return (
    <div className="accountEdit">
      <main className="accountEdit__box accountEdit__box-margin1">
        <AccountInfo />
      </main>
      <h1>accountEdit page entered 🚀 </h1>
    </div>
  );
}

export default AccountEdit;
