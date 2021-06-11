import React from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import "./LoadingBox.css";

function LoadingBox({ loading }) {
  const color = "#54003D";
  return (
    <div className="loadingBox">
      <ClimbingBoxLoader color={color} loading={loading} size={15} />
    </div>
  );
}

export default LoadingBox;
