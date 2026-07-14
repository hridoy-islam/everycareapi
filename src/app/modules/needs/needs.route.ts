/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/multer";
import { NeedsControllers } from "./needs.controller";

const router = express.Router();
router.get(
  "/",
  NeedsControllers.getAllNeeds
);
router.post(
  "/",
  NeedsControllers.createNeeds
);
router.get(
  "/:id",
  NeedsControllers.getSingleNeeds
);

router.patch(
  "/:id",
  NeedsControllers.updateNeeds
);
router.delete(
  "/:id",
  NeedsControllers.deleteNeeds
);


export const NeedsRoutes = router;
