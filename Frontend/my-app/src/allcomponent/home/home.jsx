import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./home.css";
import Footer from "../footer/footer";

const Home = () => {
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await axios.get("https://shaanrecipe-1.onrender.com/api/recipes/home");
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHome();
  }, []);

  // 🔄 Auto-Slide Timer (Har 7 seconds mein)
  useEffect(() => {
    if (!data?.carousel?.length) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.carousel.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [data]);

  if (loading) return <div className="loader">🥣 TastyNest Cooking...</div>;
  if (!data) return <div className="error">Data error. Check backend.</div>;

  // Current Slide Data
  const mainRecipe = data.carousel[index];

  return (
   <>
    <div className="home-container">
      {/* 🎢 SPLIT HERO SECTION (Jaisa wireframe mein hai) */}
      {mainRecipe && (
        <div className="split-hero">
          {/* LEFT: Badi Image */}
          <div className="hero-image-box">
            <img 
              src={mainRecipe.image} 
              alt={mainRecipe.name} 
              className="hero-main-img" 
            />
            {/* Dots navigation TMDB style */}
            <div className="carousel-dots">
                {data.carousel.map((_, i) => (
                    <span key={i} className={`dot ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)}></span>
                ))}
            </div>
          </div>

          {/* RIGHT: Details Box */}
          <div className="hero-details-box">
            <span className="cat-tag">{mainRecipe.category}</span>
            <h1 className="hero-heading">{mainRecipe.name}</h1>
            <p className="hero-description">{mainRecipe.description}</p>
            
            <div className="hero-btns">
              <button 
                className="btn-play" 
                onClick={() => navigate(`/details/${mainRecipe.id}`)}
              >
                Cook This Now
              </button>
              <button className="btn-play secondary" onClick={() => navigate("/recipes")}>
                Explore All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/>
   </>
  );
};

export default Home;