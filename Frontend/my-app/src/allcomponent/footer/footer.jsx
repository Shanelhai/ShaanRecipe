import React from "react";
import { FaEnvelope, FaGlobeAmericas, FaUtensils } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* 🥘 Section 1: Brand Info */}
        <div className="footer-section brand-info">
          <h3>Tasty<span>Nest</span></h3>
          <p>
            Explore the world through food. We bring you authentic, 
            easy-to-follow recipes from every corner of the globe. 
            Cook like a pro, eat like a king!
          </p>
        </div>

        {/* 🔗 Section 2: Quick Links */}
        <div className="footer-section links">
          <h3>Company</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* 🍲 Section 3: Recipe Categories */}
        <div className="footer-section categories">
          <h3><FaUtensils style={{fontSize: '1rem', marginRight: '8px'}}/> Recipe Types</h3>
          <ul>
            <li>Meat & Poultry</li>
            <li>Fresh Seafood</li>
            <li>Vegetarian & Vegan</li>
            <li>Sweet Desserts</li>
            <li>Healthy Breakfast</li>
          </ul>
        </div>

        {/* 🌏 Section 4: Global Cuisines */}
        <div className="footer-section cuisines">
          <h3><FaGlobeAmericas style={{fontSize: '1rem', marginRight: '8px'}}/> Global Cuisines</h3>
          <ul className="cuisine-grid">
            <li>Indian</li>
            <li>Italian</li>
            <li>Chinese</li>
            <li>Mexican</li>
            <li>Japanese</li>
            <li>French</li>
            <li>Thai</li>
            <li>British</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <hr />
        <p>© {new Date().getFullYear()} <span>TastyNest</span>. All rights reserved.</p>
        <p className="credit">Made with ❤️ for Food Lovers Worldwide</p>
      </div>
    </footer>
  );
};

export default Footer;