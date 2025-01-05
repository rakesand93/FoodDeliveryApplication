import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import resList from "./utils/mockData";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import useOnlineStatus from "./utils/useOnlineStatus";
import UserContext from "./utils/UserContext";

const Grocery = lazy(() => import("./components/Grocery"));

const App = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [login, setLogin] = useState("Login");
  const [search, setSearch] = useState("");
  const [userName, setUserName] = useState();

  useEffect(() => {
    const apiRequest = async () => {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      const json = await data.json();
      console.log(json);
      setItems(
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );

      setFilteredItems(
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    };

    apiRequest();
  }, []);

  //For Context API
  useEffect(() => {
    const data = {
      name: "Rakesh G",
    };

    setUserName(data.name);
  }, []);

  const handleClick = (e) => {
    console.log("Handle Click fn is called!");
    const lists = items.filter((item) =>
      item.info.avgRating >= 4.5 ? item.info.avgRating : ""
    );
    console.log(lists);
    setFilteredItems(lists);
  };

  const handleSearch = () => {
    console.log("Handle Search is called!");
    const searchLists = items.filter((item) =>
      item.info.name.toLowerCase().includes(search.toLowerCase())
    );
    console.log(searchLists);
    setFilteredItems(searchLists);
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return <h1>Looks like you're Offline! Connect to your Internet!</h1>;

  return (
    <UserContext.Provider value={{userName}}>
      <div className="app">
        <Header login={login} setLogin={setLogin} />
        <Body
          resList={filteredItems}
          handleClick={handleClick}
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />
      </div>
    </UserContext.Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },

  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },

  {
    path: "/grocery",
    element: (
      <Suspense>
        <Grocery />
      </Suspense>
    ),
  },

  {
    path: "/restaurants/:resId",
    element: <RestaurantMenu />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
