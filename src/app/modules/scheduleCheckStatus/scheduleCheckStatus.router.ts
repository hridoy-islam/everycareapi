/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { ScheduleCheckStatusControllers } from "./scheduleCheckStatus.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get(
  "/",
  auth("admin"),
  ScheduleCheckStatusControllers.getAllScheduleCheckStatus
);

router.get(
  "/passport",
  auth("admin"),
  ScheduleCheckStatusControllers.getPassportStatusList
);

router.get(
  "/visa",
  auth("admin"),
  ScheduleCheckStatusControllers.getVisaStatusList
);

router.get(
  "/dbs",
  auth("admin"),
  ScheduleCheckStatusControllers.getDbsStatusList
);

router.get(
  "/immigration",
  auth("admin"),
  ScheduleCheckStatusControllers.getImmigrationStatusList
);

router.get(
  "/appraisal",
  auth("admin"),
  ScheduleCheckStatusControllers.getAppraisalStatusList
);

router.get(
  "/rtw",
  auth("admin"),
  ScheduleCheckStatusControllers.getRtwStatusList
);

router.get(
  "/spot-check",
  auth("admin"),
  ScheduleCheckStatusControllers.getSpotCheckStatusList
);

router.get(
  "/supervision",
  auth("admin"),
  ScheduleCheckStatusControllers.getSupervisionStatusList
);

// router.get(
//   "/training",
//   auth("admin"),
//   ScheduleCheckStatusControllers.getTrainingStatusList
// );

router.get(
  "/induction",
  auth("admin"),
  ScheduleCheckStatusControllers.getInductionStatusList
);

router.get(
  "/disciplinary",
  auth("admin"),
  ScheduleCheckStatusControllers.getDisciplinaryStatusList
);

router.get(
  "/qa",
  auth("admin"),
  ScheduleCheckStatusControllers.getQAStatusList
);

router.get(
  "/required-documents",
  auth("admin"),
  ScheduleCheckStatusControllers.getRequiredDocumentStatusList
);

export const ScheduleCheckStatusRoutes = router;