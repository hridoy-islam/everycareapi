/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { DesignationControllers } from "./designation.controller";
import auth from "../../middlewares/auth";


const router = express.Router();
router.get(
  "/",
//   auth("admin", "company", "creator", "user", "director"),
  DesignationControllers.getAllDesignation
);
router.get(
  "/:id",
//   auth("admin", "user", "director", "company", "creator"),
DesignationControllers.getSingleDesignation
);
router.post(
  "/",
//   auth("admin", "user", "director", "company", "creator"),
DesignationControllers.createDesignation
);

router.patch(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
DesignationControllers.updateDesignation
);
router.delete(
  "/:id",
  auth("admin", ),
DesignationControllers.deleteDesignation
);



export const DesignationRoutes = router;
