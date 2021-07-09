import React from "react";
import { Link } from "react-router-dom";
import useFormInput from "./formUtils";
import "./RegisterScreen.css";

function RegisterScreen() {
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const email = useFormInput("", true);
  const password = useFormInput("", true);

  function submitHandler(e) {
    e.preventDefault();
    // TODO: sign in action
  }

  return (
    <div className="register">
      <Link to="/">
        <img
          className="navbar__logo register__logo"
          src="..\images\logo.webp"
          alt="SEWBERRY"
        />
      </Link>
      <main className="register__box">
        <h1 className="register__title">Sign-in</h1>

        <section className="regiser__box-nameRow">
          <div className="regiser__box-name">
            <label className="register__subTitle" htmlFor="firstName">
              First Name
            </label>
            <input
              {...firstName}
              className="register__input register__input-margin-right"
              type="text"
              required
              // disabled={!input.trim()}
            />
          </div>

          <div className="regiser__box-name">
            <label className="register__subTitle" htmlFor="lastName">
              Last Name
            </label>
            <input
              {...lastName}
              className="register__input register__input-margin-left"
              type="text"
              // required
            />
          </div>
        </section>

        <label className="register__subTitle" htmlFor="email">
          E-mail
        </label>
        <input {...email} className="register__input" type="email" required />

        <label className="register__subTitle" htmlFor="password">
          Password
        </label>
        <input
          {...password}
          className="register__input"
          type="password"
          required
        />
        <button
          className="register__button"
          type="submit"
          onClick={submitHandler}
        >
          Sign-in
        </button>
      </main>
    </div>
  );
}

export default RegisterScreen;
