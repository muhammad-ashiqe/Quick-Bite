import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import './foodItem.css'
import { StoreContext } from '../../Contex/StoreContext';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const FoodItem = ({id,name,description,price,image}) => {
    const {cartItems,addToCart,removeFromCart,url,token}=useContext(StoreContext);
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img src={url+"/images/"+image} alt="" className="food-item-img" />
            {
                !cartItems[id]
                ?<img src={assets.add_icon_white} className='add' onClick={token?()=>{addToCart(id)}:""}/>
                : <div className="food-item-counter">
                    <img src={assets.remove_icon_red} onClick={()=>{removeFromCart(id)}} alt="" />
                    <p>{cartItems[id]}</p>
                    <img src={assets.add_icon_green} onClick={()=>{addToCart(id)}} alt="" />
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
      
    </div>
  )
}

export default FoodItem
