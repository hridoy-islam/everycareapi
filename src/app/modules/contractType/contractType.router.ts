/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { ContractTypeControllers } from "./contractType.controller";
import auth from "../../middlewares/auth";


const router = express.Router();
router.get(
  "/",
//   auth("admin", "company", "creator", "user", "director"),
  ContractTypeControllers.getAllContractType
);
router.get(
  "/:id",
//   auth("admin", "user", "director", "company", "creator"),
ContractTypeControllers.getSingleContractType
);
router.post(
  "/",
//   auth("admin", "user", "director", "company", "creator"),
ContractTypeControllers.createContractType
);

router.patch(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
ContractTypeControllers.updateContractType
);
router.delete(
  "/:id",
  auth("admin", ),
ContractTypeControllers.deleteContractType
);



export const ContractTypeRoutes = router;
