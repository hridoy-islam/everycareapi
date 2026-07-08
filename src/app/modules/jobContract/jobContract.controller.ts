import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { JobContractServices } from "./jobContract.service";

const getAllJobContract: RequestHandler = catchAsync(async (req, res) => {
  const result = await JobContractServices.getAllJobContractFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "JobContracts retrived succesfully",
    data: result,
  });
});
const getSingleJobContract = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await JobContractServices.getSingleJobContractFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "JobContract is retrieved succesfully",
    data: result,
  });
});

const updateJobContract = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await JobContractServices.updateJobContractIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "JobContract is updated succesfully",
    data: result,
  });
});

const createJobContract: RequestHandler = catchAsync(async (req, res) => {
  const result = await JobContractServices.createJobContractIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "JobContract created successfully",
    data: result,
  });
});

export const JobContractControllers = {
  getAllJobContract,
  getSingleJobContract,
  updateJobContract,
  createJobContract
  
};
