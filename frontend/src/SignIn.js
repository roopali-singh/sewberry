import React from "react";
import "./SignIn.css";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div className="signin">
      <Link to="/">
        <img
          className="navbar__logo signin__logo"
          src="..\images\logo.webp"
          alt="SEWBERRY"
        />
      </Link>
      <div className="signin__box">
        <h1 className="signin__title">Sign-in</h1>

        <h5 className="signin__subTitle">E-mail</h5>
        <input
          className="signin__input"
          type="text"
          // disabled={!input.trim()}
        />

        <h5 className="signin__subTitle">Username</h5>
        <input
          className="signin__input"
          type="text"
          // disabled={!input.trim()}
        />
        <button className="signin__button">Sign-in</button>

        <h5 className="signin__subTitle">New Customer ?</h5>
        <button className="signin__button-gray">Create an account</button>
      </div>
    </div>
  );
}

export default SignIn;
