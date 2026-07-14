import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ServiceuserNeedServices } from "./serviceuserNeed.service";

const getAllServiceuserNeed: RequestHandler = catchAsync(async (req, res) => {
  const result = await ServiceuserNeedServices.getAllServiceuserNeedFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Needss retrived succesfully",
    data: result,
  });
});
const getSingleServiceuserNeed = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceuserNeedServices.getSingleServiceuserNeedFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ServiceuserNeed is retrieved succesfully",
    data: result,
  });
});

const updateServiceuserNeed = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceuserNeedServices.updateServiceuserNeedIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ServiceuserNeed is updated succesfully",
    data: result,
  });
});
const deleteServiceuserNeed = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceuserNeedServices.deleteServiceuserNeedIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ServiceuserNeed is deleted succesfully",
    data: result,
  });
});

const createServiceuserNeed: RequestHandler = catchAsync(async (req, res) => {
  const result = await ServiceuserNeedServices.createServiceuserNeedIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "ServiceuserNeed created successfully",
    data: result,
  });
});

export const ServiceuserNeedControllers = {
  getAllServiceuserNeed,
  getSingleServiceuserNeed,
  updateServiceuserNeed,
  createServiceuserNeed,
  deleteServiceuserNeed
  
};
