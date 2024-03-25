import React from "react";
import { ReactComponent as StarGray } from "../assets/img/starGray.svg";

function Star({ yellow }) {
  return (
    <div
      className={yellow ? "block__1_stars_rect_yellow" : "block__1_stars_rect"}
    >
      <StarGray
        className={yellow ? "block__1_stars_star_yellow" : ""}
        width="36px"
        height="36px"
      />
    </div>
  );
}

export default Star;
