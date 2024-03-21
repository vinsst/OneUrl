import React, { useEffect, useState } from "react";
import axios from "axios";

function SteamAvatar({ ellipseColor }) {
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/user", {
        withCredentials: true,
      })
      .then((response) => {
        const avatar = response.data.photos[0].value;
        setAvatarUrl(avatar);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="header__element steamAvatar_container">
      <div className={ellipseColor}>
        {avatarUrl && (
          <img className="steamAvatar" src={avatarUrl} alt="Avatar" />
        )}
      </div>
    </div>
  );
}

export default SteamAvatar;
