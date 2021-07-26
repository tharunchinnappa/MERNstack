import express from "express";
const router = express.Router();

import { addMessage } from "../controllers/messageController.js";

router.route("/").post(addMessage);

export default router;
