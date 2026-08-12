/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { RiskAssessmentControllers } from "./riskAssessment.controller";

const router = express.Router();
router.get("/", RiskAssessmentControllers.getAllRiskAssessments);
router.post("/", RiskAssessmentControllers.createRiskAssessment);
router.get("/:id", RiskAssessmentControllers.getSingleRiskAssessment);
router.patch("/:id", RiskAssessmentControllers.updateRiskAssessment);
router.delete("/:id", RiskAssessmentControllers.deleteRiskAssessment);

export const RiskAssessmentRoutes = router;
