/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/multer";
import { ConfidentialityFormControllers } from "./confidentialityForm.controller";

const router = express.Router();
router.get(
  "/",
  ConfidentialityFormControllers.getAllConfidentialityForm
);
router.post(
  "/",
  ConfidentialityFormControllers.createConfidentialityForm
);
router.get(
  "/:id",
  ConfidentialityFormControllers.getSingleConfidentialityForm
);

router.patch(
  "/:id",
  ConfidentialityFormControllers.updateConfidentialityForm
);


export const ConfidentialityFormRoutes = router;
