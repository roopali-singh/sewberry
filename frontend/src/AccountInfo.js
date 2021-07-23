import React, { useEffect } from "react";
import "./AccountInfo.css";
import EditIcon from "@material-ui/icons/Edit";
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

  // CAPITALIZE FIRST LETTER

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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
        <EditIcon className="accountInfo__edit" title="edit" />
      </div>

      <div className="accountInfo__box">
        <h1>
          {capitalizeFirstLetter(userInfo?.firstName)}{" "}
          {capitalizeFirstLetter(userInfo?.lastName)}
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
