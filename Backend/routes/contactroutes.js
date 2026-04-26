import express from "express";
import { sendContactMessage } from "../controller/contactcontroller.js";

const router = express.Router();

router.post("/", sendContactMessage);

export default router;
