import React, { useState, useEffect } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import logo from "../assets/img/logoR.svg";
import support from "../assets/img/support.svg";
import home from "../assets/img/home.svg";
import insurance from "../assets/img/insurance.svg";
import SteamAvatar from "./SteamAvatar";

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    axios
      .get("https://reviewforport.onrender.com/user", {
        withCredentials: true,
      })
      .then((response) => {
        const loggedInValue = response.data.photos[0].value ? true : false;
        setLoggedIn(loggedInValue);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <header className="header">
        <div className="header__content fixedContainer">
          <div className="header_leftSide">
            <Link to="/" href="" className="header__element logo">
              <img
                src={logo}
                alt=""
                height="100px"
                width="100px"
                className="img1"
              />
            </Link>
          </div>
          <div
            className={
              sidebar ? "header_center header_centerClicked" : "header_center"
            }
            onClick={showSidebar}
          >
            <div className="header__center_burger">
              <div className="header__center_burger_line"></div>
              <div className="header__center_burger_line"></div>
              <div className="header__center_burger_line"></div>
            </div>
          </div>
          <div className="header_rightSide">
            <Link to="/" className="header__element header__text">
              Home
            </Link>
            <Link to="/policy" className="header__element header__text whyWe">
              privacy policy
            </Link>
            <a
              href="mailto:forpc822946@gmail.com"
              className="header__element header__text"
            >
              Support
            </a>
            {loggedIn ? (
              <SteamAvatar ellipseColor="ellipseAvatarBack_blue" />
            ) : (
              <a
                href="https://reviewforport.onrender.com/auth/google"
                className="header__element img2"
              >
                <div className="sign">
                  <div className="sign_text">login</div>
                </div>
              </a>
            )}
          </div>
        </div>
      </header>
      <div className={sidebar ? "burger__menu_show" : "burger__menu_hide"}>
        <div className="burger__menu_show_content">
          <div className="burger__menu_element_container">
            <img src={home} alt="" height="20px" width="20px" />
            <Link
              to="/"
              className="burger__menu_element burger__menu_element_1"
              onClick={showSidebar}
            >
              Home
            </Link>
          </div>
          <div className="burger__menu_element_container">
            <img src={insurance} alt="" height="20px" width="20px" />
            <Link
              to="/policy"
              className="burger__menu_element burger__menu_element_2"
              onClick={showSidebar}
            >
              privacy policy
            </Link>
          </div>
          <div className="burger__menu_element_container">
            <img src={support} alt="" height="20px" width="20px" />
            <a
              href="mailto:forpc822946@gmail.com"
              className="burger__menu_element burger__menu_element_3"
              onClick={showSidebar}
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
