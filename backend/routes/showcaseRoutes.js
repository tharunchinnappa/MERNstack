import express from "express";
const router = express.Router();
import {
  createShowcaseItem,
  getShowcaseItems,
  updateShowcaseItem,
  deleteShowcaseItem,
  getShowcaseItem,
} from "../controllers/showcaseController.js";
import { protect, admin } from "./../middleware/authMiddleware.js";

router
  .route("/")
  .get(getShowcaseItems)
  .post(protect, admin, createShowcaseItem);

router
  .route("/:id")
  .put(protect, admin, updateShowcaseItem)
  .get(getShowcaseItem)
  .delete(protect, admin, deleteShowcaseItem);

export default router;
