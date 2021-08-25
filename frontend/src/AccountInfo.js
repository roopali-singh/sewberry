import React, { useEffect } from "react";
import "./AccountInfo.css";
import EditIcon from "@material-ui/icons/Edit";
// import DashboardIcon from "@material-ui/icons/Dashboard";
import { useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import AdminDashboardButton from "./AdminDashboardButton";

function AccountInfo() {
  const [{ userInfo }, dispatch] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    if (Object?.keys(userInfo)?.length === 0) {
      history.replace("/login");
      // window.location.replace("/login");
    }
  }, [userInfo]);

  // CAPITALIZE FIRST LETTER ////////////////////////////////

  function capitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }

  // SIGN OUT FUNCTION ////////////////////////////////

  function submitHandler(e) {
    e.preventDefault();

    localStorage.removeItem("userInfo");
    dispatch({
      type: "USER_SIGNOUT",
      userInfo: {},
    });
  }

  // EDIT ACCOUNT INFO ////////////////////////////////

  function editAccountInfo() {
    history.push("/account/edit");
  }

  // function adminAccountInfo() {
  //   history.push("/account/admin?details=orders");
  // }

  return (
    <main
      className={`accountInfo ${
        !userInfo?.isAdmin && "accountInfo--forMargin"
      }`}
    >
      <div className="accountInfo__box">
        <EditIcon
          className="accountInfo__logo account__edit-logo"
          title="edit"
          onClick={editAccountInfo}
        />
      </div>

      <div className="accountInfo__box">
        <h1>
          {capitalizeFirstLetter(userInfo?.firstName)}{" "}
          {userInfo?.lastName && capitalizeFirstLetter(userInfo?.lastName)}
        </h1>
      </div>

      <div className="accountInfo__box">
        <span>{userInfo?.email}</span>
      </div>

      <div className="accountInfo__box">
        <span>{userInfo?.address}</span>
      </div>

      <div className="accountInfo__box">
        <span>
          {userInfo?.city}: {userInfo?.pin}
        </span>
      </div>

      <div className="accountInfo__box">
        <span>{userInfo?.state}</span>
      </div>

      <div className="accountInfo__box">
        <button onClick={submitHandler}>Sign-out</button>
      </div>
      {userInfo?.isAdmin && (
        <div className="accountInfo__box">
          {/* <AdminDashboardButton /> */}
          <AdminDashboardButton
            // className="accountInfo__logo account__admin-logo"
            title="edit"
            // onClick={adminAccountInfo}
          />
        </div>
      )}
    </main>
  );
}

export default AccountInfo;
