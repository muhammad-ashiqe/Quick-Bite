import React, { useContext, useState } from 'react'
import {assets} from '../../assets/assets'
import './Navbar.css'
import {Link,  useNavigate} from 'react-router-dom'
import { StoreContext } from '../../Contex/StoreContext'

const Navbar = ({setShowLogin}) => {
    const [menu,setMenu]=useState("home");

    const navigate =useNavigate();
    const {token,setToken} =useContext(StoreContext)

    const logOut = ()=>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/")
    }
  return (
    <div className='navbar'>
     <Link to='/'> <h2 className='logo-text' href={'/'} >QuickBite</h2></Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={()=>setMenu('home')} className={menu === 'home' ?"active" :""}>home</Link>
        <a href='#explore-menu' onClick={()=>setMenu('menu')} className={menu === 'menu' ?"active" :""}>menu</a>
        <a href='#app-download' onClick={()=>setMenu('mobile-app')} className={menu === 'mobile-app' ?"active" :""}>mobile-app</a> 
        <a href='#footer' onClick={()=>setMenu('contact-us')} className={menu === 'contact-us' ?"active" :""}>contact us</a>
      </ul>
      <div className="navbar-right">
        {/* <img src={assets.search_icon} alt=""  className=''/> */}
        <div className="navbar-search-icon">
           <Link to={token?'/cart':""}> <img src={assets.basket_icon} alt="" /></Link>
            <div className="dot"></div>
        </div>
        {!token ?<button onClick={()=>setShowLogin(true)} >Sign in</button> 
        : <div className="nav-profile">
          <img src={assets.profile_icon} alt="" />
          <ul className='nav-profile-dropdown'>
            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" />
            <p>Orders</p>
            </li>
            <hr />
            <li onClick={()=>logOut()}><img src={assets.logout_icon} alt="" /><p>Log Out</p></li>
          </ul>
        </div>
        }
        
      </div>
    </div>
  )
}

export default Navbar
