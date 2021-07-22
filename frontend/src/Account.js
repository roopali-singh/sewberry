import React, { useEffect } from "react";
import "./Account.css";
import { useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Account() {
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
    <div className="account">
      <main className="account__box">
        <div className="account__box1">
          <h1>
            {userInfo?.firstName} {userInfo.lastName}
          </h1>
        </div>
        <div className="account__box1">
          <span>{userInfo?.email}</span>
        </div>
        <div className="account__box1">
          <span>XXXXXX XXXXXX XXXXXX XXXXXX XXXXXX XXXXXX XXXXXX</span>
        </div>
        <div className="account__box1">
          <span>Delhi: XXXXXX</span>
        </div>
        <div className="account__box1">
          <button onClick={submitHandler}>Sign-out</button>
        </div>
      </main>
    </div>
  );
}

export default Account;
