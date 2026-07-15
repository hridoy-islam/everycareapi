import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ServiceuserEmergencyContractServices } from "./serviceuserEmergencyContract.service";

const getAllServiceuserEmergencyContract: RequestHandler = catchAsync(async (req, res) => {
  const result = await ServiceuserEmergencyContractServices.getAllServiceuserEmergencyContractFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Needss retrived succesfully",
    data: result,
  });
});
const getSingleServiceuserEmergencyContract = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceuserEmergencyContractServices.getSingleServiceuserEmergencyContractFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ServiceuserEmergencyContract is retrieved succesfully",
    data: result,
  });
});

const updateServiceuserEmergencyContract = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceuserEmergencyContractServices.updateServiceuserEmergencyContractIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ServiceuserEmergencyContract is updated succesfully",
    data: result,
  });
});
const deleteServiceuserEmergencyContract = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceuserEmergencyContractServices.deleteServiceuserEmergencyContractIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ServiceuserEmergencyContract is deleted succesfully",
    data: result,
  });
});

const createServiceuserEmergencyContract: RequestHandler = catchAsync(async (req, res) => {
  const result = await ServiceuserEmergencyContractServices.createServiceuserEmergencyContractIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "ServiceuserEmergencyContract created successfully",
    data: result,
  });
});

export const ServiceuserEmergencyContractControllers = {
  getAllServiceuserEmergencyContract,
  getSingleServiceuserEmergencyContract,
  updateServiceuserEmergencyContract,
  createServiceuserEmergencyContract,
  deleteServiceuserEmergencyContract
  
};
