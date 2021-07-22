import React, { useEffect } from "react";
import "./AccountInfo.css";
import { useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function AccountInfo() {
  const [{ userInfo }, dispatch] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      history.replace("/login");
      // window.location.replace("/login");
    }
  }, [userInfo]);

  // SIGN OUT FUNCTION

  function submitHandler(e) {
    e.preventDefault();

    localStorage.removeItem("userInfo");
    dispatch({
      type: "USER_SIGNOUT",
      userInfo: {},
    });
  }

  return (
    <main className="accountInfo">
      <div className="accountInfo__box">
        <h1>
          {userInfo?.firstName} {userInfo.lastName}
        </h1>
      </div>

      <div className="accountInfo__box">
        <span>{userInfo?.email}</span>
      </div>

      <div className="accountInfo__box">
        <span>XXXXXX XXXXXX XXXXXX XXXXXX XXXXXX XXXXXX XXXXXX</span>
      </div>

      <div className="accountInfo__box">
        <span>Delhi: XXXXXX</span>
      </div>

      <div className="accountInfo__box">
        <button onClick={submitHandler}>Sign-out</button>
      </div>
    </main>
  );
}

export default AccountInfo;
