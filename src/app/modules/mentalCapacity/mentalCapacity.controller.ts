import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { MentalCapacityServices } from "./mentalCapacity.service";

const getAllMentalCapacities: RequestHandler = catchAsync(async (req, res) => {
  const result = await MentalCapacityServices.getAllMentalCapacitiesFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mental Capacity assessments retrieved successfully",
    data: result,
  });
});

const getSingleMentalCapacity = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MentalCapacityServices.getSingleMentalCapacityFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mental Capacity assessment is retrieved successfully",
    data: result,
  });
});

const updateMentalCapacity = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MentalCapacityServices.updateMentalCapacityIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mental Capacity assessment is updated successfully",
    data: result,
  });
});

const deleteMentalCapacity = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MentalCapacityServices.deleteMentalCapacityFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mental Capacity assessment is deleted successfully",
    data: result,
  });
});

const createMentalCapacity: RequestHandler = catchAsync(async (req, res) => {
  const result = await MentalCapacityServices.createMentalCapacityIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Mental Capacity assessment created successfully",
    data: result,
  });
});

export const MentalCapacityControllers = {
  getAllMentalCapacities,
  getSingleMentalCapacity,
  updateMentalCapacity,
  createMentalCapacity,
  deleteMentalCapacity,
};
