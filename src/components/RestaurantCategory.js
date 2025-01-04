import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import ItemList from "./ItemList";
import { useState } from "react";

const RestaurantCategory = ({ data }) => {

  const[showItems,setShowItems] = useState(false);

  const handleDropDown = () => {

    setShowItems(showItems ? false : true);

  };
  return (
    <div>
      <div className="w-6/12 mx-auto my-4 p-4 bg-gray-100 shadow-lg rounded-lg">
        <div className="flex justify-between cursor-pointer" onClick={handleDropDown}>
          <span className="font-bold text-lg">
            {data.title} (
            {data.itemCards.length})
          </span>
          <span className="mt-2">
            {!showItems ? <IoIosArrowDown /> : <IoIosArrowUp /> }
          </span>
        </div>

        {showItems && <ItemList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
