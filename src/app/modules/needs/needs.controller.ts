import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { NeedsServices } from "./needs.service";

const getAllNeeds: RequestHandler = catchAsync(async (req, res) => {
  const result = await NeedsServices.getAllNeedsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Needss retrived succesfully",
    data: result,
  });
});
const getSingleNeeds = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NeedsServices.getSingleNeedsFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Needs is retrieved succesfully",
    data: result,
  });
});

const updateNeeds = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NeedsServices.updateNeedsIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Needs is updated succesfully",
    data: result,
  });
});
const deleteNeeds = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NeedsServices.deleteNeedsIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Needs is deleted succesfully",
    data: result,
  });
});

const createNeeds: RequestHandler = catchAsync(async (req, res) => {
  const result = await NeedsServices.createNeedsIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Needs created successfully",
    data: result,
  });
});

export const NeedsControllers = {
  getAllNeeds,
  getSingleNeeds,
  updateNeeds,
  createNeeds,
  deleteNeeds
  
};
