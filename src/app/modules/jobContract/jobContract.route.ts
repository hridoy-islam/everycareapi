/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/multer";
import { JobContractControllers } from "./jobContract.controller";

const router = express.Router();
router.get(
  "/",
  JobContractControllers.getAllJobContract
);
router.post(
  "/",
  JobContractControllers.createJobContract
);
router.get(
  "/:id",
  JobContractControllers.getSingleJobContract
);

router.patch(
  "/:id",
  JobContractControllers.updateJobContract
);


export const JobContractRoutes = router;
