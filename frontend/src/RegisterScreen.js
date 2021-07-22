import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterScreen.css";

function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSpacesInBetween(e) {
    if (e.key === " ") {
      e.preventDefault();
    }
  }

  // SIGN IN FUNCTION

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
              value={firstName}
              className="register__input register__input-margin-right"
              type="text"
              required
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={(e) => setFirstName(e.target.value.trim())}
            />
          </div>

          <div className="regiser__box-name">
            <label className="register__subTitle" htmlFor="lastName">
              Last Name
            </label>
            <input
              value={lastName}
              className="register__input register__input-margin-left"
              type="text"
              // required
              onChange={(e) => setLastName(e.target.value)}
              onBlur={(e) => setLastName(e.target.value.trim())}
            />
          </div>
        </section>

        <label className="register__subTitle" htmlFor="email">
          E-mail
        </label>
        <input
          value={email}
          className="register__input"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => setEmail(e.target.value.trim())}
          onKeyPress={handleSpacesInBetween}
        />

        <label className="register__subTitle" htmlFor="password">
          Password
        </label>
        <input
          value={password}
          className="register__input"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          onBlur={(e) => setPassword(e.target.value.trim())}
          onKeyPress={handleSpacesInBetween}
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
