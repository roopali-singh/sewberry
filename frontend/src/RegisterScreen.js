import React, { useState, useEffect } from "react";
import "./RegisterScreen.css";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import axios from "axios";
import LoadingBox from "./LoadingBox";

function RegisterScreen() {
  const history = useHistory();
  const [{ loading, error, userInfo }, dispatch] = useStateValue();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSpacesInBetween(e) {
    if (e.key === " ") {
      e.preventDefault();
    }
  }

  useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      // window.location.replace("/account");
      history.replace("/account");
    }
  }, [userInfo]);

  // SIGN IN FUNCTION

  async function userRegister(firstName, lastName, email, password) {
    dispatch({
      // type: "USER_SIGNIN_REQUEST",
      type: "PRODUCT_LIST_REQUEST",
      loading: true,
      error: false,
    });
    try {
      const { data } = await axios.post("/api/users/register", {
        firstName,
        lastName,
        email,
        password,
      });
      dispatch({
        type: "USER_SIGNIN_SUCCESS",
        loading: false,
        userInfo: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        // type: "USER_SIGNIN_FAIL",
        type: "PRODUCT_LIST_FAIL",
        loading: false,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }

  // SUBMIT HANDLER

  function submitHandler(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else {
      userRegister(firstName, lastName, email, password);
    }
  }

  function backToHome(e) {
    e.preventDefault();
    // history.push("/");
    window.location.href = "/";
  }

  return (
    <div className="register">
      {/* <Link to="/"> */}
      <img
        className="navbar__logo register__logo"
        src="..\images\logo.webp"
        alt="SEWBERRY"
        onClick={backToHome}
      />
      {/* </Link> */}
      {loading ? (
        <LoadingBox loading={loading} />
      ) : (
        <main className="register__box">
          <h1 className="register__title">Sign-in</h1>

          {error && <section className="register__error">{error}</section>}

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
          <label className="register__subTitle" htmlFor="password">
            Confirm Password
          </label>
          <input
            value={confirmPassword}
            className="register__input"
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={(e) => setConfirmPassword(e.target.value.trim())}
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
      )}
    </div>
  );
}

export default RegisterScreen;
