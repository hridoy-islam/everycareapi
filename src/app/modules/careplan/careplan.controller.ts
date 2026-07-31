import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { CarePlanServices } from "./careplan.service";

const getAllCarePlans: RequestHandler = catchAsync(async (req, res) => {
  const result = await CarePlanServices.getAllCarePlansFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Care Plans retrieved successfully",
    data: result,
  });
});

const getSingleCarePlan = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarePlanServices.getSingleCarePlanFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Care Plan is retrieved successfully",
    data: result,
  });
});

const updateCarePlan = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarePlanServices.updateCarePlanIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Care Plan is updated successfully",
    data: result,
  });
});

const deleteCarePlan = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarePlanServices.deleteCarePlanFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Care Plan is deleted successfully",
    data: result,
  });
});

const createCarePlan: RequestHandler = catchAsync(async (req, res) => {
  const result = await CarePlanServices.createCarePlanIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Care Plan created successfully",
    data: result,
  });
});

export const CarePlanControllers = {
  getAllCarePlans,
  getSingleCarePlan,
  updateCarePlan,
  createCarePlan,
  deleteCarePlan,
};
