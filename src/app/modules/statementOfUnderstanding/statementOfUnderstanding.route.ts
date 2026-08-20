/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/multer";
import { StatementOfUnderstandingControllers } from "./statementOfUnderstanding.controller";

const router = express.Router();
router.get(
  "/",
  StatementOfUnderstandingControllers.getAllStatementOfUnderstanding
);
router.post(
  "/",
  StatementOfUnderstandingControllers.createStatementOfUnderstanding
);
router.get(
  "/:id",
  StatementOfUnderstandingControllers.getSingleStatementOfUnderstanding
);

router.patch(
  "/:id",
  StatementOfUnderstandingControllers.updateStatementOfUnderstanding
);


export const StatementOfUnderstandingRoutes = router;