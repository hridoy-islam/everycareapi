/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/multer";
import { ServiceuserEmergencyContractControllers } from "./serviceuserEmergencyContract.controller";

const router = express.Router();
router.get(
  "/",
  ServiceuserEmergencyContractControllers.getAllServiceuserEmergencyContract
);
router.post(
  "/",
  ServiceuserEmergencyContractControllers.createServiceuserEmergencyContract
);
router.get(
  "/:id",
  ServiceuserEmergencyContractControllers.getSingleServiceuserEmergencyContract
);

router.patch(
  "/:id",
  ServiceuserEmergencyContractControllers.updateServiceuserEmergencyContract
);
router.delete(
  "/:id",
  ServiceuserEmergencyContractControllers.deleteServiceuserEmergencyContract
);


export const ServiceuserEmergencyContractRoutes = router;
