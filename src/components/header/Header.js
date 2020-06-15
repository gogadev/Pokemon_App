import React from "react";

import headerImg from "../../assets/header.jpg";

import "./header.style.css";

const Header = () => {
  return (
    <header>
      <img className="header-img" src={headerImg} alt="" />
      <h3 className="title">
        {" "}
        "Make your wonderful dream a reality, it will become your truth. If
        anyone can, it’s you."
      </h3>
    </header>
  );
};

export default Header;
