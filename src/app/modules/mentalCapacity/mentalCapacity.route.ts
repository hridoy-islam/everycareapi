/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { MentalCapacityControllers } from "./mentalCapacity.controller";

const router = express.Router();
router.get("/", MentalCapacityControllers.getAllMentalCapacities);
router.post("/", MentalCapacityControllers.createMentalCapacity);
router.get("/:id", MentalCapacityControllers.getSingleMentalCapacity);
router.patch("/:id", MentalCapacityControllers.updateMentalCapacity);
router.delete("/:id", MentalCapacityControllers.deleteMentalCapacity);

export const MentalCapacityRoutes = router;
