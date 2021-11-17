import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__outerColumns">
        <div className="footer__text">
          <div className="footer__columns">
            <img
              className="footer__logo"
              src="..\images\logo.webp"
              alt="SEWBERRY"
            />
          </div>

          <div className="footer__columns">
            <div className="footer__columnHeading">Get to Know Us</div>
            <div className="footer__options">About Us</div>
            <div className="footer__options">Careers</div>
            <div className="footer__options">Press Releases</div>
            <div className="footer__options">Sewberry Cares</div>
            <div className="footer__options">Gift a Smile</div>
          </div>

          <div className="footer__columns">
            <div className="footer__columnHeading">Connect with Us</div>
            <div className="footer__options">
              <a
                href="https://www.linkedin.com/in/roopalisingh-rs/"
                target="_blank"
                rel="noreferrer noopener"
              >
                LinkedIn
              </a>
            </div>
            <div className="footer__options">
              <a
                href="https://twitter.com/RoopaliSingh_"
                target="_blank"
                rel="noreferrer noopener"
              >
                Twitter
              </a>
            </div>
            <div className="footer__options">
              <a
                href="https://www.instagram.com/codebird/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Instagram
              </a>
            </div>
          </div>

          <div className="footer__columns">
            <div className="footer__columnHeading">Make Money with Us</div>
            <div className="footer__options">Sell on Sewberry</div>
            <div className="footer__options">
              Sell under Sewberry Accelerator
            </div>
            <div className="footer__options">Become an Affiliate</div>
            <div className="footer__options">Fulfilment by Sewberry</div>
            <div className="footer__options">Advertise Your Products</div>
            <div className="footer__options">Sewberry Pay on Merchants</div>
          </div>

          <div className="footer__columns">
            <div className="footer__columnHeading">Let Us Help You</div>
            <div className="footer__options">Your Account</div>
            <div className="footer__options">Returns Centre</div>
            <div className="footer__options">100% Purchase Protection</div>
            <div className="footer__options">Sewberry App Download</div>
            <div className="footer__options">Sewberry Assistant Download</div>
            <div className="footer__options">Help</div>
          </div>
        </div>
        <hr className="footer__line" />
        <div className="footer__info">
          <div className="footer__infoConditions">Conditions of Use & Sale</div>
          <div className="footer__infoConditions mobile-none-display">
            Privacy Notice
          </div>
          <div className="footer__infoConditions mobile-none-display">
            Interest-Based Ads
          </div>
          <div className="footer__infoYear">
            &copy; 1996-2020, Sewberry.com, Inc. or its affiliates
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
