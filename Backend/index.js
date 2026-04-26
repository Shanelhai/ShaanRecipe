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
  origin: ["http://localhost:5173"],
  credentials: true                
}));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/recipes", recipeRouter);



mongoose.connect(process.env.DB_URL)
    .then(()=>{
    app.listen(process.env.PORT, ()=>{
    console.log("Server is running on port : ",process.env.PORT);
});
    console.log("Connected to MongoDB");
}).catch((error)=>{
    console.log("Error connecting to MongoDB", error);
})