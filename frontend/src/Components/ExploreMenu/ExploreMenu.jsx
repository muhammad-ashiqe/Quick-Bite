import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setcategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore Our Menu</h1>
        <p className='tag-text'>discover a world of mouth-watering dishes, crafted to satisfy every craving. From quick bites to hearty meals, there's something for everyone!</p>
        <div className="explore-menu-list">
            {menu_list.map((item , index)=>{
                return(
                    <div onClick={()=>setcategory(prev=>prev === item.menu_name ? "All" :item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className={category === item.menu_name ? "active-menu" : ""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>

                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default ExploreMenu
