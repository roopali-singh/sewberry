import React from "react";
import "./Account.css";
import AccountInfo from "./AccountInfo";
import AccountOrders from "./AccountOrders";

function Account() {
  return (
    <div className="account">
      {/* <div> */}
        <main className="account__box account__box-margin1">
          <AccountInfo />
        </main>
        <main className="account__box account__box-margin2">
          <AccountOrders />
        </main>
      {/* </div> */}
      {/* ORDERS

      1) show all orders
      2) show all unpaid orders
      3) show all paid orders
      4) show all paid Not Delivered orders
      4) show all paid Delivered orders
      
      USERS

      1) show all users

      PRODUCS

      1) show all products
      2) create new product
      3) Update product
      4) delete a product *
      
      ***********WHEN DONE ADD FORGOT PASSWORD*************
      
      password forgot => enter email => check email => email verification sent => link to change password => done/

      */}
    </div>
  );
}

export default Account;
