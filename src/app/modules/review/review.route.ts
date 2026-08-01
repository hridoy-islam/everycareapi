/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { ReviewControllers } from "./review.controller";

const router = express.Router();
router.get("/", ReviewControllers.getAllReviews);
router.post("/", ReviewControllers.createReview);
router.get("/:id", ReviewControllers.getSingleReview);
router.patch("/:id", ReviewControllers.updateReview);
router.delete("/:id", ReviewControllers.deleteReview);

export const ReviewRoutes = router;
