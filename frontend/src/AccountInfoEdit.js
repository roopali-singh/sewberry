import React, { useState, useEffect } from "react";
import "./AccountInfoEdit.css";
import { useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import axios from "axios";
import LoadingBox from "./LoadingBox";

function AccountInfoEdit() {
  const history = useHistory();
  const [{ loading, error, userInfo }, dispatch] = useStateValue();
  const [success, setSuccess] = useState(false);
  const [firstName, setFirstName] = useState(userInfo?.firstName);
  const [lastName, setLastName] = useState(userInfo?.lastName);
  const [email, setEmail] = useState(userInfo?.email);
  const [address, setAddress] = useState(userInfo?.address);
  const [city, setCity] = useState(userInfo?.city);
  const [state, setState] = useState(userInfo?.state);
  const [pin, setPin] = useState(userInfo?.pin);

  function handleSpacesInBetween(e) {
    if (e.key === " ") {
      e.preventDefault();
    }
  }

  useEffect(() => {
    dispatch({
      type: "REMOVING_ERROR",
      error: false,
    });
  }, []);

  useEffect(() => {
    if (Object?.keys(userInfo)?.length === 0) {
      history.replace("/login");
      // window.location.replace("/login");
    }
  }, [userInfo]);

  useEffect(() => {
    if (success) {
      // window.location.replace("/account");
      history.replace("/account");
    }
  }, [success]);

  // SIGN IN FUNCTION

  async function userRegister(
    firstName,
    lastName,
    email,
    address,
    city,
    state,
    pin
  ) {
    dispatch({
      type: "REQUEST_SEND",
      loading: true,
      error: false,
    });
    try {
      const { data } = await axios.put(
        "/api/users/account/edit",
        {
          firstName,
          lastName,
          email,
          address,
          city,
          state,
          pin,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );

      dispatch({
        type: "USER_SIGNIN_SUCCESS",
        loading: false,
        userInfo: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setSuccess(true);
    } catch (error) {
      dispatch({
        // type: "USER_SIGNIN_FAIL",
        type: "REQUEST_FAIL",
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
    userRegister(firstName, lastName, email, address, city, state, pin);
  }

  function backToHome(e) {
    e.preventDefault();
    // history.push("/");
    window.location.href = "/";
  }

  return (
    <div className="accountInfoEdit">
      {/* <Link to="/"> */}
      <img
        className="navbar__logo accountInfoEdit__logo"
        src="..\images\logo.webp"
        alt="SEWBERRY"
        onClick={backToHome}
      />
      {/* </Link> */}
      {loading ? (
        <LoadingBox loading={loading} />
      ) : (
        <main className="accountInfoEdit__box">
          <h1 className="accountInfoEdit__title">Update the account</h1>

          {error && (
            <section className="accountInfoEdit__error">{error}</section>
          )}

          <section className="accountInfoEdit__box-nameRow">
            <div className="accountInfoEdit__box-name">
              <label className="accountInfoEdit__subTitle" htmlFor="firstName">
                First Name
                <span className="accountInfoEdit__requiredField">*</span>
              </label>
              <input
                value={firstName}
                className="accountInfoEdit__input accountInfoEdit__input-margin-right"
                type="text"
                required
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={(e) => setFirstName(e.target.value.trim())}
              />
            </div>

            <div className="accountInfoEdit__box-name">
              <label className="accountInfoEdit__subTitle" htmlFor="lastName">
                Last Name
              </label>
              <input
                value={lastName}
                className="accountInfoEdit__input accountInfoEdit__input-margin-left"
                type="text"
                // required
                onChange={(e) => setLastName(e.target.value)}
                onBlur={(e) => setLastName(e.target.value.trim())}
              />
            </div>
          </section>

          <label className="accountInfoEdit__subTitle" htmlFor="email">
            E-mail<span className="accountInfoEdit__requiredField">*</span>
          </label>
          <input
            value={email}
            className="accountInfoEdit__input"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => setEmail(e.target.value.trim())}
            onKeyPress={handleSpacesInBetween}
          />

          <label className="accountInfoEdit__subTitle" htmlFor="address">
            Address<span className="accountInfoEdit__requiredField">*</span>
          </label>
          <input
            value={address}
            className="accountInfoEdit__input input__blueBorder"
            type="text"
            required
            onChange={(e) => setAddress(e.target.value)}
            onBlur={(e) => setAddress(e.target.value.trim())}
          />

          <section className="accountInfoEdit__box-nameRow">
            <div className="accountInfoEdit__box-name">
              <label className="accountInfoEdit__subTitle" htmlFor="city">
                City<span className="accountInfoEdit__requiredField">*</span>
              </label>
              <input
                value={city}
                className="accountInfoEdit__input accountInfoEdit__input-margin-right  input__blueBorder"
                type="text"
                required
                onChange={(e) => setCity(e.target.value)}
                onBlur={(e) => setCity(e.target.value.trim())}
              />
            </div>

            <div className="accountInfoEdit__box-name">
              <label className="accountInfoEdit__subTitle" htmlFor="state">
                State<span className="accountInfoEdit__requiredField">*</span>
              </label>
              <input
                value={state}
                className="accountInfoEdit__input accountInfoEdit__input-margin-left  input__blueBorder"
                type="text"
                required
                onChange={(e) => setState(e.target.value)}
                onBlur={(e) => setState(e.target.value.trim())}
              />
            </div>
          </section>

          <label className="accountInfoEdit__subTitle" htmlFor="pin">
            Pin Code<span className="accountInfoEdit__requiredField">*</span>
          </label>
          <input
            value={pin}
            className="accountInfoEdit__input  input__blueBorder"
            type="number"
            required
            onChange={(e) => setPin(e.target.value)}
            onBlur={(e) => setPin(e.target.value.trim())}
          />

          <button
            className="accountInfoEdit__button"
            type="submit"
            onClick={submitHandler}
          >
            Update
          </button>
        </main>
      )}
    </div>
  );
}

export default AccountInfoEdit;
