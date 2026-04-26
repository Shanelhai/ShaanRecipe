import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import User from "./user";
import Admin from "./admin";
import account from "../allcomponent/assets/home/account.jpg";
import "./navbar.css";

const navbar = () => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [id, setId] = useState(localStorage.getItem("userId"));
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateUser = () => {
      setRole(localStorage.getItem("role"));
      setId(localStorage.getItem("userId"));
    };

    window.addEventListener("storageChange", updateUser);

    updateUser();

    return () => {
      window.removeEventListener("storageChange", updateUser);
    };
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    setId(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <NavLink to="/" className="nav-logo">
         RecipeShaan
        </NavLink>
      </div>

      <div className="nav-right">
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {role === "admin" ? <Admin handleLogout={handleLogout} /> : <User />}
        </div>
        
        <NavLink to="/dashboard" className="profile-link">
          <img src={account} alt="Account" className="profile-img" />
        </NavLink>

        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default navbar;
