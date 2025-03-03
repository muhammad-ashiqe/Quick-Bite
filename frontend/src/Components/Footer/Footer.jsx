import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
        <h2 className="logo-text" href={"/"}>
          QuickBite
        </h2>
        <p>
          QuickBite delivers fast, fresh, and flavorful meals right to your
          door, 
         ensuring every bite is a delightful experience, no matter how
          busy your day.
        </p>
        <div className="footer-social-icons">
          <img src={assets.facebook_icon} alt="" />
          <img src={assets.twitter_icon} alt="" />
          <img src={assets.linkedin_icon} alt="" />
        </div>
        </div>
        
        <div className="footer-content-center">
          <h3>COMPANY</h3>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h3>GET IN TOUCH</h3>
          <ul>
            <li>+12 1800 8899 452</li>
            <li>contact@quickbite.com</li>
          </ul>
        </div>
      </div>
     <hr />
      <p className="footer-copyright">
        Copyright © 2024 Quickbite.com -All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
