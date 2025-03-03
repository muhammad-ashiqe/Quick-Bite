import React, { useContext, useEffect, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Contex/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Sign Up");

  const {url,token,setToken} =useContext(StoreContext);

  const [data,setData] =useState({
    name:"",
    email:"",
    password:""
  })

  const onchangeHandler = (event) =>{
    const name = event.target.name;
    const value=event.target.value;

    setData(data=>({...data,[name]:value}))
  }



  const onLogin= async(event)=>{
    event.preventDefault();

    let newUrl = url;

    if (currentState === "Sign Up") {
      newUrl += "/api/user/register"
    }
    else{
      newUrl += "/api/user/login"
    }

    const response = await axios.post(newUrl,data)

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token)
      setShowLogin(false);
      
    }
    else{
      console.log(response.data.message)
    }

  }

  // useEffect(()=>{
  //   console.log(data)
  // },[data])

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-form-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Sign Up" ? (
            <input type="text" name="name" value={data.name} onChange={onchangeHandler} placeholder="User Name" required/>
          ) : (
            <></>
          )}

          <input type="email" placeholder="E-mail" name="email" value={data.email} onChange={onchangeHandler} required/>
          <input type="password" placeholder="Password" name="password" value={data.password} onChange={onchangeHandler} required/>
        </div>
        <button type="submit" className="Submit-btn">{currentState}</button>
        <div className="login-popup-condition">
          <input type="checkbox" />
          <p>By Continuing i agree to the term of use & privacy policy.</p>
        </div>
        {currentState === "Sign Up" ? (
          <p>
            Already have an Account? <span onClick={()=>setCurrentState("Login")}>Login here</span>
          </p>
        ) : (
          <p>
            Don't have an Account? <span onClick={()=>setCurrentState("Sign Up")}>Create One</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
