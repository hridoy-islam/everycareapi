import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ServiceuserAssessmentFormServices } from "./serviceuserAssessmentForm.service";

const getAllServiceuserAssessmentForm: RequestHandler = catchAsync(async (req, res) => {
  const result = await ServiceuserAssessmentFormServices.getAllServiceuserAssessmentFormFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Needss retrived succesfully",
    data: result,
  });
});
const getSingleServiceuserAssessmentForm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceuserAssessmentFormServices.getSingleServiceuserAssessmentFormFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ServiceuserAssessmentForm is retrieved succesfully",
    data: result,
  });
});

const updateServiceuserAssessmentForm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceuserAssessmentFormServices.updateServiceuserAssessmentFormIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ServiceuserAssessmentForm is updated succesfully",
    data: result,
  });
});
const deleteServiceuserAssessmentForm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceuserAssessmentFormServices.deleteServiceuserAssessmentFormIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ServiceuserAssessmentForm is deleted succesfully",
    data: result,
  });
});

const createServiceuserAssessmentForm: RequestHandler = catchAsync(async (req, res) => {
  const result = await ServiceuserAssessmentFormServices.createServiceuserAssessmentFormIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "ServiceuserAssessmentForm created successfully",
    data: result,
  });
});

export const ServiceuserAssessmentFormControllers = {
  getAllServiceuserAssessmentForm,
  getSingleServiceuserAssessmentForm,
  updateServiceuserAssessmentForm,
  createServiceuserAssessmentForm,
  deleteServiceuserAssessmentForm
  
};
