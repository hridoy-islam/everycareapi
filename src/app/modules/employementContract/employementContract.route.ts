/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/multer";
import { EmployementContractControllers } from "./employementContract.controller";

const router = express.Router();
router.get(
  "/",
  EmployementContractControllers.getAllEmployementContract
);
router.post(
  "/",
  EmployementContractControllers.createEmployementContract
);
router.get(
  "/:id",
  EmployementContractControllers.getSingleEmployementContract
);

router.patch(
  "/:id",
  EmployementContractControllers.updateEmployementContract
);


export const EmployementContractRoutes = router;
