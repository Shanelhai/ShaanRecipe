import { Router } from "express";
import {
  register,
  login,
  getAllUsersForAdmin,
  getUserById,
  getMe
} from "../controller/authcontroller.js";
import { getLoginHistoryForAdmin } from "../controller/loginhistorycontroller.js";
import { protect, admin } from "../middlewares/authmiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/users", protect, admin, getAllUsersForAdmin);
router.get("/users/:id", protect, admin, getUserById);
router.get("/login-history", protect, admin, getLoginHistoryForAdmin);

export default router;
