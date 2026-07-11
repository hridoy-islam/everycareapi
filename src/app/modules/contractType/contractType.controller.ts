import { RequestHandler } from "express";
;
import httpStatus from "http-status";


import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ContractTypeServices } from "./contractType.service";


const getAllContractType: RequestHandler = catchAsync(async (req, res) => {
  const result = await ContractTypeServices.getAllContractTypeFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ContractTypes retrived succesfully",
    data: result,
  });
});
const getSingleContractType = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ContractTypeServices.getSingleContractTypeFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ContractType is retrieved succesfully",
    data: result,
  });
});

const updateContractType = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ContractTypeServices.updateContractTypeIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ContractType is updated succesfully",
    data: result,
  });
});

const createContractType = catchAsync(async (req, res) => {
  
  const result = await ContractTypeServices.createContractTypeIntoDB( req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ContractType Created succesfully",
    data: result,
  });
});

const deleteContractType = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ContractTypeServices.deleteContractTypeIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ContractType is deleted succesfully",
    data: result,
  });
});

export const ContractTypeControllers = {
    getAllContractType,
    getSingleContractType,
    updateContractType,
    createContractType,
    deleteContractType
};

