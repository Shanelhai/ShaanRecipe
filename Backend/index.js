import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authroutes.js";
import userRoutes from "./routes/userroutes.js";
import adminRoutes from "./routes/adminroutes.js";
import contactRoutes from "./routes/contactroutes.js";
import recipeRouter from "./routes/reciperoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", "https://shaan-recipe.vercel.app/recipes"],
  credentials: true
}));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/recipes", recipeRouter);

// ✅ DB connect (separate)
mongoose.connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("DB Error:", err));

// ✅ ALWAYS start server
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend is live 🚀");
});

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});