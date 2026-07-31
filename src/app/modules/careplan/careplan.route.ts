/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { CarePlanControllers } from "./careplan.controller";

const router = express.Router();
router.get("/", CarePlanControllers.getAllCarePlans);
router.post("/", CarePlanControllers.createCarePlan);
router.get("/:id", CarePlanControllers.getSingleCarePlan);
router.patch("/:id", CarePlanControllers.updateCarePlan);
router.delete("/:id", CarePlanControllers.deleteCarePlan);

export const CarePlanRoutes = router;
