import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { StatementOfUnderstandingServices } from "./statementOfUnderstanding.service";

const getAllStatementOfUnderstanding: RequestHandler = catchAsync(async (req, res) => {
  const result = await StatementOfUnderstandingServices.getAllStatementOfUnderstandingFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "StatementOfUnderstandings retrived succesfully",
    data: result,
  });
});
const getSingleStatementOfUnderstanding = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StatementOfUnderstandingServices.getSingleStatementOfUnderstandingFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "StatementOfUnderstanding is retrieved succesfully",
    data: result,
  });
});

const updateStatementOfUnderstanding = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StatementOfUnderstandingServices.updateStatementOfUnderstandingIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "StatementOfUnderstanding is updated succesfully",
    data: result,
  });
});

const createStatementOfUnderstanding: RequestHandler = catchAsync(async (req, res) => {
  const result = await StatementOfUnderstandingServices.createStatementOfUnderstandingIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "StatementOfUnderstanding created successfully",
    data: result,
  });
});

export const StatementOfUnderstandingControllers = {
  getAllStatementOfUnderstanding,
  getSingleStatementOfUnderstanding,
  updateStatementOfUnderstanding,
  createStatementOfUnderstanding
  
};