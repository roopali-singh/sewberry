import React, { useState, useEffect } from "react";
import "./Login.css";
import LoadingBox from "./LoadingBox";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import axios from "axios";

function Login() {
  const history = useHistory();
  const [{ loading, error, userInfo }, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSpacesInBetween(e) {
    if (e.key === " ") {
      e.preventDefault();
    }
  }

  useEffect(() => {
    dispatch({
      type: "REMOVING_ERROR",
      loading: false,
      error: false,
    });
  }, []);

  // const redirect = props.location.search
  //   ? props.location.search.split("=")[1]
  //   : "/";

  // useEffect(() => {
  //   if (Object?.keys(userInfo)?.length > 0) {
  //     // window.location.replace("/account");
  //     history.replace("/account");
  //   }
  // }, [userInfo]);

  // LOGIN FUNCTION

  async function userSignin(email, password) {
    dispatch({
      type: "REQUEST_SEND",
      loading: true,
      error: false,
    });
    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });
      dispatch({
        type: "USER_SIGNIN_SUCCESS",
        loading: false,
        userInfo: data,
      });
      history.replace("/account");

      // localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: "REQUEST_FAIL",
        loading: false,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }

  // SUBMIT HANDLE

  function submitHandler(e) {
    e.preventDefault();
    userSignin(email, password);
  }

  function backToHome(e) {
    e.preventDefault();
    history.push("/");
    // window.location.href = "/";
  }

  return (
    <div className="login">
      {/* <Link to="/"> */}
      <img
        className="navbar__logo login__logo"
        src="..\images\logo.webp"
        alt="SEWBERRY"
        onClick={backToHome}
      />
      {/* </Link> */}
      {loading ? (
        <LoadingBox loading={loading} />
      ) : (
        <main className="login__box">
          <h1 className="login__title">Login</h1>

          {error && <section className="login__error">{error}</section>}

          <label className="login__subTitle" htmlFor="email">
            E-mail
          </label>
          <input
            value={email}
            className="login__input"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => setEmail(e.target.value.trim())}
            onKeyPress={handleSpacesInBetween}
          />

          <label className="login__subTitle" htmlFor="password">
            Password
          </label>
          <input
            value={password}
            className="login__input"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => setPassword(e.target.value.trim())}
            onKeyPress={handleSpacesInBetween}
          />
          <button
            className="login__button"
            type="submit"
            onClick={submitHandler}
          >
            Login
          </button>

          <h5 className="login__subTitle">New Customer ?</h5>
          <Link to="/register">
            <button className="login__button-gray">Create an account</button>
          </Link>
        </main>
      )}
    </div>
  );
}

export default Login;
