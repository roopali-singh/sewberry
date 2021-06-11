import React from "react";
import bunny_Flatline from "./Easter bunny_Flatline.svg";
import "./ErrorBox.css";

function ErrorBox({ error }) {
  const reloadFunction = () => {
    document.location.reload();
  };

  return (
    <div className="errorBox">
      <img src={bunny_Flatline} alt="<Sorry 🚀 />" />
      <h4>{error}</h4>
      <button className="errorBox__button" onClick={reloadFunction}>
        Retry
      </button>
    </div>
  );
}

export default ErrorBox;
