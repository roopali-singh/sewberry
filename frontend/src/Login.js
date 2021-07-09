import React from "react";
import useFormInput from "./formUtils";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  const email = useFormInput("", true);
  const password = useFormInput("", true);

  function submitHandler(e) {
    e.preventDefault();
    // TODO: sign in action
  }

  return (
    <div className="login">
      <Link to="/">
        <img
          className="navbar__logo login__logo"
          src="..\images\logo.webp"
          alt="SEWBERRY"
        />
      </Link>
      <main className="login__box">
        <h1 className="login__title">Login</h1>
        <label className="login__subTitle" htmlFor="email">
          E-mail
        </label>
        <input {...email} className="login__input" type="email" required />

        <label className="login__subTitle" htmlFor="password">
          Password
        </label>
        <input
          {...password}
          className="login__input"
          type="password"
          required
        />
        <button className="login__button" type="submit" onClick={submitHandler}>
          Login
        </button>

        <h5 className="login__subTitle">New Customer ?</h5>
        <Link to="/register">
          <button className="login__button-gray">Create an account</button>
        </Link>
      </main>
    </div>
  );
}

export default Login;
