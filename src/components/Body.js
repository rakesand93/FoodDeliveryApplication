import React from 'react'
import RestaurantCard from './RestaurantCard';
import Shimmer from './Shimmer';
import { Link } from 'react-router';
import { withPopularLabel } from './RestaurantCard';

const Body = ({resList,handleClick,search,setSearch,handleSearch}) => {

  const RestaurantCardPopular = withPopularLabel(RestaurantCard);

  return resList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            autoFocus
            type="text"
            className="border border-solid border-black px-4 py-2 rounded-lg"
            placeholder="Search Your Restaurant"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg"
            id="searchBtn"
            onClick={() => handleSearch()}
          >
            Search
          </button>
        </div>

        <div className="m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg"
            onClick={handleClick}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {resList.map((item) => (
          <Link key={item.info.id} to={"/restaurants/" + item.info.id}>
            {item.info.avgRating >= 4.5 ? (
              <RestaurantCardPopular resObj = {item} />
            ) : (
              <RestaurantCard resObj={item} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Body