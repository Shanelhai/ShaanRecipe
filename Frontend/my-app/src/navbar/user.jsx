import React from "react";
import { NavLink } from "react-router-dom";

const User = () => {
  return (
    <>
      <li><NavLink to="/" className="navitem-link">Home</NavLink></li>
      <li><NavLink to="/about" className="navitem-link">About</NavLink></li>
      <li><NavLink to="/recipes" className="navitem-link">Food Recipes</NavLink></li>
      <li><NavLink to="/contact" className="navitem-link">Contact</NavLink></li>
    </>
  );
};

export default User;
