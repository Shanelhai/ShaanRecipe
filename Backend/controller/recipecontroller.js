import axios from "axios";
import NodeCache from "node-cache";

const myCache = new NodeCache({ stdTTL: 3600 });
const API_URL = "https://www.themealdb.com/api/json/v1/1";

// HOME DATA (Split Carousel ke liye)
export const getHomeData = async (req, res) => {
    try {
        const cacheKey = "tastynest_split_home_v1";
        if (myCache.has(cacheKey)) return res.json(myCache.get(cacheKey));

        // Note: Hum search empty rakhte hain taaki mixed recipes milen
        const response = await axios.get(`${API_URL}/search.php?s=`);
        const meals = response.data.meals || [];

        // Carousel ke liye pehli 5 recipes
        const carouselItems = meals.slice(0, 5).map(meal => ({
            id: meal.idMeal,
            name: meal.strMeal,
            image: meal.strMealThumb,
            category: meal.strCategory,
            // Full description for details box
            description: meal.strInstructions ? meal.strInstructions.slice(0, 300) + "..." : "Learn to cook this amazing dish.",
        }));

        // Baki recipes grid ke liye
        const gridItems = meals.slice(5).map(meal => ({
            id: meal.idMeal,
            name: meal.strMeal,
            image: meal.strMealThumb,
            category: meal.strCategory,
        }));

        const finalData = { carousel: carouselItems, grid: gridItems };
        myCache.set(cacheKey, finalData);
        res.json(finalData);

    } catch (error) {
        res.status(500).json({ error: "Fetch Failed" });
    }
};

// 2. SEARCH RECIPES: Search bar ke liye
// 2. SEARCH RECIPES
export const searchRecipes = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.json([]);

        const response = await axios.get(`${API_URL}/search.php?s=${query}`);
        const meals = response.data.meals || [];
        
        // Data format consistent rakhne ke liye mapping
        const formatted = meals.map(meal => ({
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb,
            strCategory: meal.strCategory // Search API category deta hai
        }));
        
        res.json(formatted);
    } catch (error) {
        res.status(500).json({ error: "Search failed" });
    }
};

// 3. GET RECIPES: Category & All Filter
export const getRecipes = async (req, res) => {
    try {
        const { category } = req.query;
        let url;
        
        if (category && category !== "All") {
            url = `${API_URL}/filter.php?c=${category}`;
        } else {
            url = `${API_URL}/search.php?s=`; 
        }

        const response = await axios.get(url);
        const meals = response.data.meals || [];

        // 🛠️ Yahan fix hai: 
        // Filter API category field nahi deti, isliye hum manually add kar rahe hain
        const formattedRecipes = meals.map(meal => ({
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb,
            strCategory: meal.strCategory || category || "Recipe" 
        }));

        res.json(formattedRecipes);
    } catch (error) {
        res.status(500).json({ error: "Recipes fetch failed" });
    }
};

// controller file
export const getRecipeDetails = async (req, res) => {
    try {
        const { id } = req.params; // Yahan params se id uthani hai
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        
        if (response.data.meals) {
            res.json(response.data.meals[0]);
        } else {
            res.status(404).json({ error: "Recipe not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};