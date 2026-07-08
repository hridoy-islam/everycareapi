import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ConfidentialityFormServices } from "./confidentialityForm.service";

const getAllConfidentialityForm: RequestHandler = catchAsync(async (req, res) => {
  const result = await ConfidentialityFormServices.getAllConfidentialityFormFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ConfidentialityForms retrived succesfully",
    data: result,
  });
});
const getSingleConfidentialityForm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ConfidentialityFormServices.getSingleConfidentialityFormFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ConfidentialityForm is retrieved succesfully",
    data: result,
  });
});

const updateConfidentialityForm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ConfidentialityFormServices.updateConfidentialityFormIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ConfidentialityForm is updated succesfully",
    data: result,
  });
});

const createConfidentialityForm: RequestHandler = catchAsync(async (req, res) => {
  const result = await ConfidentialityFormServices.createConfidentialityFormIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "ConfidentialityForm created successfully",
    data: result,
  });
});

export const ConfidentialityFormControllers = {
  getAllConfidentialityForm,
  getSingleConfidentialityForm,
  updateConfidentialityForm,
  createConfidentialityForm
  
};
