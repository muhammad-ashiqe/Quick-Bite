import React from "react";
import './Hero.css'

const Hero = () => {
  return (
    <div className="hero">
     <div className="hero-contents">
     <div className="left">
       <div className="text">
       <h2>Quick Bites, 
            <br />Big Delights!</h2>
        <p>
        QuickBite delivers fast, fresh, and flavorful meals right to your door, ensuring every bite is a delightful experience, no matter how busy your day.
        </p>
       </div>
       <a href="#explore-menu"><button>Order Now</button></a>
        
      </div>
      <div className="right">
        <img src="/delivery.png" alt="" />
      </div>
     </div>
    </div>
  );
};
export default Hero;
