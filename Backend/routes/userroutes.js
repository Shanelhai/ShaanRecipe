import express from "express";
import { protect } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: "User Dashboard",
    user: req.user,
  });
});

export default router;
