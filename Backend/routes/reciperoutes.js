import express from "express";
import { getHomeData, searchRecipes, getRecipes, getRecipeDetails } from "../controller/recipecontroller.js";

const router = express.Router();

router.get("/home", getHomeData);       // Carousel ke liye
router.get("/search", searchRecipes);   // Search bar ke liye
router.get("/", getRecipes);            // Category buttons aur "All" ke liye
router.get("/details/:id", getRecipeDetails);

export default router;