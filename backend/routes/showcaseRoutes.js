import express from "express";
const router = express.Router();
import {
  createShowcaseItem,
  getShowcaseItems,
  updateShowcaseItem,
} from "../controllers/showcaseController.js";
import { protect, admin } from "./../middleware/authMiddleware.js";

router.route("/").get(getShowcaseItems).post(protect,admin,createShowcaseItem);

router.route("/:id").put(protect, admin, updateShowcaseItem);

export default router;
