import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./recipes.css";
import Footer from "../footer/footer";

const categories = [
  "All", "Beef", "Chicken", "Dessert", "Lamb", "Miscellaneous",
  "Pasta", "Pork", "Seafood", "Side", "Starter",
  "Vegan", "Vegetarian", "Breakfast", "Goat"
];

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeCategory = searchParams.get("category") || "All";

  const fetchRecipes = async (category = "All") => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5007/api/recipes?category=${category}`
      );
      setRecipes(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(activeCategory);
  }, [activeCategory]);

  const handleCategory = (cat) => {
    setSearch("");
    setSearchParams({ category: cat });
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (!search.trim()) {
        setSearchParams({ category: "All" });
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5007/api/recipes/search?query=${search}`
        );
        setRecipes(res.data);
        setSearchParams({});
      } catch (err) {
        console.error("Search Error:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="recipe-container">

        {/* 🔍 Search */}
        <div className="search-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Find a recipe..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>

        {/* 📑 Categories */}
        <div className="category-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={activeCategory === cat ? "active" : ""}
              onClick={() => handleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 🥘 Recipes */}
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <div className="recipes-grid">
            {recipes.length > 0 ? (
              recipes.map((item) => (
                <div className="recipe-card" key={item.idMeal}>
                  <div className="card-image">
                    <img src={item.strMealThumb} alt={item.strMeal} />
                    <span className="category-tag">
                      {item.strCategory || activeCategory}
                    </span>
                  </div>

                  <div className="card-info">
                    <h3>{item.strMeal}</h3>
                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate(`/recipedetails/${item.idMeal}`)
                      }
                    >
                      View Recipe
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data">
                No recipes found. Try another keyword!
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Recipes;