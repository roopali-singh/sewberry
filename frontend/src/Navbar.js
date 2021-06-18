import React from "react";
import "./Navbar.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Navbar() {
  const [{ basket }] = useStateValue();
  return (
    <div className="navbar">
      <Link to="/">
        <img
          className="navbar__logo"
          src="..\images\logo.webp"
          alt="SEWBERRY"
        />
      </Link>
      <div className="navbar__options">
        <Link to="/products">
          <span className="navbar__links hvr-buzz">SHOP</span>
        </Link>

        <Link to="/signin">
          <span className="navbar__links hvr-buzz">ACCOUNT</span>
        </Link>

        <Link to="/wishlist">
          <span className="navbar__links hvr-buzz">WISHLIST</span>
        </Link>
        <Link to="/orders">
          <ShoppingCartIcon className="navbar__links nav__mobileSize hvr-buzz" />
          <strong>{basket?.length}</strong>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
