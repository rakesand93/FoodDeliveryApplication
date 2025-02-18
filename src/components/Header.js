import React, { useContext } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";


const Header = ({ login, setLogin }) => {

  const onlineStatus = useOnlineStatus();
  const {userName} =  useContext(UserContext);
  console.log(userName);

  return (
    <div className="flex justify-between bg-green-100">
      <div className="logo-container">
        <img className="w-48" src={LOGO_URL} />
      </div>

      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>

          <li className="px-4">
            <Link to="/about">About Us</Link>
          </li>

          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>

          <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li>

          <li className="px-4">
            <Link to="">Cart</Link>
          </li>
          <button
            className="login"
            onClick={() =>
              login === "Login" ? setLogin("Logout") : setLogin("Login")
            }
          >
            {login}
          </button>
          <li className="px-4 font-bold">{userName}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
