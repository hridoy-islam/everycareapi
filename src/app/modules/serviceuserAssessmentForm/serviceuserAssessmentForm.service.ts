import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { ServiceuserAssessmentForm } from "./serviceuserAssessmentForm.model";
import { TServiceuserAssessmentForm } from "./serviceuserAssessmentForm.interface";
import { ServiceuserAssessmentFormSearchableFields } from "./serviceuserAssessmentForm.constant";
import { StringExpression } from "mongoose";

const getAllServiceuserAssessmentFormFromDB = async (query: Record<string, unknown>) => {
  const ServiceuserAssessmentFormQuery = new QueryBuilder(ServiceuserAssessmentForm.find(), query)
    .search(ServiceuserAssessmentFormSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await ServiceuserAssessmentFormQuery.countTotal();
  const result = await ServiceuserAssessmentFormQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleServiceuserAssessmentFormFromDB = async (id: string) => {
  const result = await ServiceuserAssessmentForm.findById(id);
  return result;
};

const updateServiceuserAssessmentFormIntoDB = async (id: string, payload: Partial<TServiceuserAssessmentForm>) => {
  const serviceuserAssessmentForm = await ServiceuserAssessmentForm.findById(id);
  if (!serviceuserAssessmentForm) {
    throw new AppError(httpStatus.NOT_FOUND, "ServiceuserAssessmentForm not found");
  }

  const result = await ServiceuserAssessmentForm.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


const createServiceuserAssessmentFormIntoDB = async (payload: Partial<TServiceuserAssessmentForm>) => {
  // Check if serviceUserIdNumber already exists
  if (payload.serviceUserIdNumber) {
    const existingAssessment = await ServiceuserAssessmentForm.findOne({
      serviceUserIdNumber: payload.serviceUserIdNumber
    });
    
    if (existingAssessment) {
      throw new AppError(
        httpStatus.CONFLICT, 
        "An assessment with this Service User ID Number already exists"
      );
    }
  }

  const result = await ServiceuserAssessmentForm.create(payload);
  return result;
};
const deleteServiceuserAssessmentFormIntoDB = async (id: StringExpression) => {
  const serviceuserAssessmentForm = await ServiceuserAssessmentForm.findById(id);
  if (!serviceuserAssessmentForm) {
    throw new AppError(httpStatus.NOT_FOUND, "ServiceuserAssessmentForm not found");
  }

  const result = await ServiceuserAssessmentForm.findByIdAndDelete(id);

  return result;
};



export const ServiceuserAssessmentFormServices = {
  getAllServiceuserAssessmentFormFromDB,
  getSingleServiceuserAssessmentFormFromDB,
  updateServiceuserAssessmentFormIntoDB,
  createServiceuserAssessmentFormIntoDB,
  deleteServiceuserAssessmentFormIntoDB
  
};
