import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./recipedetails.css";
import Footer from "../../footer/footer";


const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5007/api/recipes/details/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error("Error fetching details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="loader">Cooking Details...</div>;
  if (!recipe) return <div className="error">Recipe not found!</div>;

  return (
  <>
    <div className="details-container">

      {/* 🥘 RECIPE & RIGHT Ads Section */}
      <div className="main-content-area">

        {/* LEFT SIDE */}
        <div className="recipe-left">

          <div className="top-row">

            {/* Image */}
            <div className="image-box">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            </div>

            {/* Ingredients */}
            <div className="ingredients-box">
              <h2>Ingredients</h2>
              <ul>
                {Object.keys(recipe).map((key) => {
                  if (key.includes("strIngredient") && recipe[key]) {
                    const index = key.replace("strIngredient", "");
                    return (
                      <li key={key}>
                        {recipe[key]} - {recipe[`strMeasure${index}`]}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>

          </div>

          {/* Back Button + Title */}
          <div className="title-row">
            <button
              onClick={() => window.history.back()}
              className="back-btn"
            >
              Back to cart
            </button>

            <div className="title-text">
              <h2>{recipe.strMeal}</h2>
              <p>Origin: {recipe.strArea}</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="instructions-box">
            <h3>Instructions</h3>
            <p style={{ whiteSpace: "pre-line" }}>{recipe.strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </>
  );
};

export default RecipeDetails;