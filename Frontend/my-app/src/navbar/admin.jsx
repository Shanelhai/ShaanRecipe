import React from "react";
import { NavLink } from "react-router-dom";

const admin = () => {
  return (
    <>
      <li><NavLink to="/userdetails" className="navitem-link">User Details</NavLink></li>
    </>
  );
};

export default admin;
