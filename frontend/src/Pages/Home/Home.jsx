import React, { useState } from 'react'
import './Home.css'
import Hero from '../../Components/Hero/Hero'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import FoodDisplayMenu from '../../Components/FoodDisplayMenu/FoodDisplayMenu'
import AppDownload from '../../Components/AppDownload/AppDownload'


const Home = () => {
    const [category ,setCategory]=useState('All')
  return (
    <div>
      <Hero />
      <ExploreMenu category={category} setcategory={setCategory} />
      <FoodDisplayMenu category={category}/>
      <AppDownload />
    </div>
  )
}

export default Home
