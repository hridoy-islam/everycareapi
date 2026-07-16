/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/multer";
import { ServiceuserAssessmentFormControllers } from "./serviceuserAssessmentForm.controller";

const router = express.Router();
router.get(
  "/",
  ServiceuserAssessmentFormControllers.getAllServiceuserAssessmentForm
);
router.post(
  "/",
  ServiceuserAssessmentFormControllers.createServiceuserAssessmentForm
);
router.get(
  "/:id",
  ServiceuserAssessmentFormControllers.getSingleServiceuserAssessmentForm
);

router.patch(
  "/:id",
  ServiceuserAssessmentFormControllers.updateServiceuserAssessmentForm
);
router.delete(
  "/:id",
  ServiceuserAssessmentFormControllers.deleteServiceuserAssessmentForm
);


export const ServiceuserAssessmentFormRoutes = router;
