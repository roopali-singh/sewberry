import React from "react";
import "./AdminAccountOptions.css";
import { Link } from "react-router-dom";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import FaceIcon from "@material-ui/icons/Face";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";

function AdminAccountOptions() {
  return (
    <div className="adminOptions">
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
      {/* ///////////////////////// ORDERS ///////////////////////////// */}
      <div className="adminOptions__box">
        <h3 className="adminOptions__heading">
          <ShoppingBasketIcon className="adminOptions__heading-logo" />
          ORDERS
        </h3>
        <Link
          to="/account/admin/show-all-orders"
          className="adminOptions__links"
        >
          1) &nbsp; show all orders
        </Link>
        <Link
          to="/account/admin/show-all-unpaid-orders"
          className="adminOptions__links"
        >
          2) &nbsp; show all unpaid orders
        </Link>
        <Link
          to="/account/admin/show-all-paid-orders"
          className="adminOptions__links"
        >
          3) &nbsp; show all paid orders
        </Link>
        <Link
          to="/account/admin/show-all-paid-not-delivered-orders"
          className="adminOptions__links"
        >
          4) &nbsp; show all paid Not Delivered orders
        </Link>
        <Link
          to="/account/admin/show-all-paid-delivered-orders"
          className="adminOptions__links"
        >
          5) &nbsp; show all paid Delivered orders
        </Link>
      </div>

      {/* ///////////////////////// USERS ///////////////////////////// */}
      <div className="adminOptions__box">
        <h3 className="adminOptions__heading">
          <FaceIcon className="adminOptions__heading-logo" />
          USERS
        </h3>
        <Link
          to="/account/admin/show-all-users"
          className="adminOptions__links"
        >
          1) &nbsp; show all users
        </Link>
      </div>

      {/* ///////////////////////// PRODUCTS ///////////////////////////// */}
      <div className="adminOptions__box">
        <h3 className="adminOptions__heading">
          <ViewColumnIcon className="adminOptions__heading-logo" />
          PRODUCTS
        </h3>
        <Link
          to="/account/admin/show-all-products"
          className="adminOptions__links"
        >
          1) &nbsp; show all products
        </Link>
        <Link
          to="/account/admin/create-new-product"
          className="adminOptions__links"
        >
          2) &nbsp; create new product
        </Link>
        <Link
          to="/account/admin/update-product"
          className="adminOptions__links"
        >
          3) &nbsp; Update product
        </Link>
        <Link
          to="/account/admin/delete-product"
          className="adminOptions__links"
        >
          4) &nbsp; delete a product
        </Link>
      </div>
    </div>
  );
}

export default AdminAccountOptions;
