import React from 'react'
import { IMAGE_URL, } from '../utils/constants';

const RestaurantCard = ({ resObj }) => {
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo } =
    resObj?.info;

  const { deliveryTime } = resObj.info.sla;

  
  return (
    <div className="m-4 p-4 w-[250px] h-auto rounded-lg bg-gray-100 hover:bg-gray-400">
      <img
        className="rounded-lg"
        src={IMAGE_URL + cloudinaryImageId}
        alt="res-logo"
      />
      <h3 className='font-bold py-4 text-lg'>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{deliveryTime} minutes</h4>
      <h4>{costForTwo}</h4>
    </div>
  );
};


//Higher Order Component

//Input - Restaurant Card
//Output- Restaurant Card with Promoted label


export const withPopularLabel = (RestaurantCard) => {

  return(props) => {
    return (
      <div>
        <span className='absolute bg-black text-white rounded-lg p-1 m-3'>Popular</span>
        <RestaurantCard {...props}/>
      </div>
    );
  }

  



}

export default RestaurantCard