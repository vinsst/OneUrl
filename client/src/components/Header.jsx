import React, { useState, useEffect } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import logo from "../assets/img/logoR.svg";
import SteamAvatar from "./SteamAvatar";

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/user", {
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
          <div className="header_rightSide">
            <Link to="/" className="header__element header__text">
              Home
            </Link>
            <Link to="/whyWe" className="header__element header__text whyWe">
              Other projects
            </Link>
            <Link to="/commission" className="header__element header__text">
              Support
            </Link>
            {loggedIn ? (
              <SteamAvatar ellipseColor="ellipseAvatarBack_blue" />
            ) : (
              <a
                href="http://localhost:3001/auth/google"
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
    </>
  );
}

export default Header;
