import React, { useEffect, useState } from 'react'
import Shimmer from "./Shimmer";
import { useParams } from 'react-router';
import { MENU_API_URL } from '../utils/constants';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';



const RestaurantMenu = () => {

  //Controlled state variables. RestaurantMenu is controlling the RestaurantCategory.
  const[showIndex, setShowIndex] = useState(null);

  const {resId} = useParams();

  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null) return <Shimmer />

  const {name,cuisines,costForTwoMessage}= resInfo?.cards[2]?.card?.card?.info;
  const {itemCards} = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

  console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");
  
  

  return (
    <div className="text-center">
      <h1 className='font-extrabold my-6 text-2xl'>{name}</h1>
      <p className='font-bold text-lg'>
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {/* This is a Controlled Component from Chapter - 10 */}
      {categories.map((category,index) => <RestaurantCategory key={category?.card?.card?.title} data={category?.card?.card} showItems = {index === showIndex ? true : false} index={index} setShowIndex={setShowIndex} />)}
    </div>
  );
}

export default RestaurantMenu