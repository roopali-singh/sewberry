import React from "react";
import "./Navbar.css";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Navbar() {
  const [{ basket }] = useStateValue();

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }))(Badge);

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

        <Link to="/login">
          <span className="navbar__links hvr-buzz">ACCOUNT</span>
        </Link>

        <Link to="/wishlist">
          <span className="navbar__links hvr-buzz">WISHLIST</span>
        </Link>

        <Link to="/orders">
          <StyledBadge
            className="navbar__links nav__mobileSize hvr-buzz"
            badgeContent={basket?.length}
            color="secondary"
          >
            <ShoppingCartIcon />
          </StyledBadge>
          {/* <ShoppingCartIcon className="navbar__links nav__mobileSize hvr-buzz" />
          <strong>{basket?.length}</strong> */}
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
