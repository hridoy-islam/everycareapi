import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { RiskAssessmentServices } from "./riskAssessment.service";

const getAllRiskAssessments: RequestHandler = catchAsync(async (req, res) => {
  const result = await RiskAssessmentServices.getAllRiskAssessmentsFromDB(
    req.query
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Risk Assessments retrieved successfully",
    data: result,
  });
});

const getSingleRiskAssessment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RiskAssessmentServices.getSingleRiskAssessmentFromDB(
    id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Risk Assessment is retrieved successfully",
    data: result,
  });
});

const updateRiskAssessment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RiskAssessmentServices.updateRiskAssessmentIntoDB(
    id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Risk Assessment is updated successfully",
    data: result,
  });
});

const deleteRiskAssessment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RiskAssessmentServices.deleteRiskAssessmentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Risk Assessment is deleted successfully",
    data: result,
  });
});

const createRiskAssessment: RequestHandler = catchAsync(async (req, res) => {
  const result = await RiskAssessmentServices.createRiskAssessmentIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Risk Assessment created successfully",
    data: result,
  });
});

export const RiskAssessmentControllers = {
  getAllRiskAssessments,
  getSingleRiskAssessment,
  updateRiskAssessment,
  createRiskAssessment,
  deleteRiskAssessment,
};
