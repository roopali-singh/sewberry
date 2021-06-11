import React from "react";
import "./Video.css";

function Video() {
  return (
    <div className="video">
      <h1 className="video__para">10% OFF for all orders above Rs7000</h1>
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="../images/video-110.jpg"
        className="video__img"
        loading="lazy"
        // src="../images/video_video.mp4"
        alt="video"
      >
        <source src="../images/video_video.mp4" type="video/mp4" />
        <source src="../images/video_webm.webm" type="video/webm" />
        <source src="../images/video_mpeg.mpeg" type="video/mpeg" />
      </video>
    </div>
  );
}

export default Video;
