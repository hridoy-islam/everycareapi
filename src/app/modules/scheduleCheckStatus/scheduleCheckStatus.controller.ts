import { RequestHandler } from "express";
import httpStatus from "http-status";
import { ScheduleCheckStatuServices } from "./scheduleCheckStatus.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// --- 1. Get Overall Stats (Counts only) ---
const getAllScheduleCheckStatus: RequestHandler = catchAsync(async (req, res) => {
  const result = await ScheduleCheckStatuServices.getCompanyComplianceStats();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule Check status retrieved successfully",
    data: result,
  });
});

// --- 2. Get Passport Non-Compliant List ---
const getPassportStatusList: RequestHandler = catchAsync(async (req, res) => {
  const result = await ScheduleCheckStatuServices.getPassportComplianceList();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Passport compliance list retrieved successfully",
    data: result,
  });
});

// --- 3. Get Visa Non-Compliant List ---
const getVisaStatusList: RequestHandler = catchAsync(async (req, res) => {
  const result = await ScheduleCheckStatuServices.getVisaComplianceList();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Visa compliance list retrieved successfully",
    data: result,
  });
});

// --- 4. Get DBS Non-Compliant List ---
const getDbsStatusList: RequestHandler = catchAsync(async (req, res) => {
  const result = await ScheduleCheckStatuServices.getDbsComplianceList();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "DBS compliance list retrieved successfully",
    data: result,
  });
});

// --- 5. Get Immigration Non-Compliant List ---
const getImmigrationStatusList: RequestHandler = catchAsync(async (req, res) => {
  const result = await ScheduleCheckStatuServices.getImmigrationComplianceList();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Immigration compliance list retrieved successfully",
    data: result,
  });
});

// --- 6. Get Appraisal Non-Compliant List ---
const getAppraisalStatusList: RequestHandler = catchAsync(async (req, res) => {
  const result = await ScheduleCheckStatuServices.getAppraisalComplianceList();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Appraisal compliance list retrieved successfully",
    data: result,
  });
});

// --- 7. Get RTW (Right To Work) Non-Compliant List ---
const getRtwStatusList: RequestHandler = catchAsync(async (req, res) => {
  const result = await ScheduleCheckStatuServices.getRtwComplianceList();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Right to Work compliance list retrieved successfully",
    data: result,
  });
});

const getSpotCheckStatusList: RequestHandler = catchAsync(async (req, res) => {
  const result = await ScheduleCheckStatuServices.getSpotCheckComplianceList();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Spot Check compliance list retrieved successfully",
    data: result,
  });
});

const getSupervisionStatusList: RequestHandler = catchAsync(async (req, res) => {
  const result = await ScheduleCheckStatuServices.getSupervisionComplianceList();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Supervision compliance list retrieved successfully",
    data: result,
  });
});

// const getTrainingStatusList: RequestHandler = catchAsync(async (req, res) => {
//   const result = await ScheduleCheckStatuServices.getTrainingComplianceList();

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Training compliance list retrieved successfully",
//     data: result,
//   });
// });

const getInductionStatusList: RequestHandler = catchAsync(async (req, res) => {
  const result = await ScheduleCheckStatuServices.getInductionComplianceList();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Induction compliance list retrieved successfully",
    data: result,
  });
});

const getDisciplinaryStatusList: RequestHandler = catchAsync(async (req, res) => {
  const result = await ScheduleCheckStatuServices.getDisciplinaryComplianceList();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Disciplinary compliance list retrieved successfully",
    data: result,
  });
});

const getQAStatusList: RequestHandler = catchAsync(async (req, res) => {
  const result = await ScheduleCheckStatuServices.getQaComplianceList();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Quality Assurance compliance list retrieved successfully",
    data: result,
  });
});

const getRequiredDocumentStatusList: RequestHandler = catchAsync(async (req, res) => {
  const result = await ScheduleCheckStatuServices.getEmployeeDocumentComplianceList();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Required documents list retrieved successfully",
    data: result,
  });
});


export const ScheduleCheckStatusControllers = {
  getAllScheduleCheckStatus,
  getPassportStatusList,
  getVisaStatusList,
  getDbsStatusList,
  getImmigrationStatusList,
  getAppraisalStatusList,
  getRtwStatusList,
  getSpotCheckStatusList,
  getSupervisionStatusList,
  // getTrainingStatusList,
  getInductionStatusList,
  getDisciplinaryStatusList,
  getQAStatusList,
  getRequiredDocumentStatusList
};