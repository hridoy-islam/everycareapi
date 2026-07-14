/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/multer";
import { ServiceuserNeedControllers } from "./serviceuserNeed.controller";

const router = express.Router();
router.get(
  "/",
  ServiceuserNeedControllers.getAllServiceuserNeed
);
router.post(
  "/",
  ServiceuserNeedControllers.createServiceuserNeed
);
router.get(
  "/:id",
  ServiceuserNeedControllers.getSingleServiceuserNeed
);

router.patch(
  "/:id",
  ServiceuserNeedControllers.updateServiceuserNeed
);
router.delete(
  "/:id",
  ServiceuserNeedControllers.deleteServiceuserNeed
);


export const ServiceuserNeedRoutes = router;
