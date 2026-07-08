import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { EmployementContractServices } from "./employementContract.service";

const getAllEmployementContract: RequestHandler = catchAsync(async (req, res) => {
  const result = await EmployementContractServices.getAllEmployementContractFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "EmployementContracts retrived succesfully",
    data: result,
  });
});
const getSingleEmployementContract = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EmployementContractServices.getSingleEmployementContractFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "EmployementContract is retrieved succesfully",
    data: result,
  });
});

const updateEmployementContract = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EmployementContractServices.updateEmployementContractIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "EmployementContract is updated succesfully",
    data: result,
  });
});

const createEmployementContract: RequestHandler = catchAsync(async (req, res) => {
  const result = await EmployementContractServices.createEmployementContractIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "EmployementContract created successfully",
    data: result,
  });
});

export const EmployementContractControllers = {
  getAllEmployementContract,
  getSingleEmployementContract,
  updateEmployementContract,
  createEmployementContract
  
};
