import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { ConfidentialityForm } from "./confidentialityForm.model";
import { TConfidentialityForm } from "./confidentialityForm.interface";
import { ConfidentialityFormSearchableFields } from "./confidentialityForm.constant";

const getAllConfidentialityFormFromDB = async (query: Record<string, unknown>) => {
  const ConfidentialityFormQuery = new QueryBuilder(ConfidentialityForm.find(), query)
    .search(ConfidentialityFormSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await ConfidentialityFormQuery.countTotal();
  const result = await ConfidentialityFormQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleConfidentialityFormFromDB = async (id: string) => {
  const result = await ConfidentialityForm.findById(id);
  return result;
};

const updateConfidentialityFormIntoDB = async (id: string, payload: Partial<TConfidentialityForm>) => {
  const confidentialityForm = await ConfidentialityForm.findById(id);
  if (!confidentialityForm) {
    throw new AppError(httpStatus.NOT_FOUND, "ConfidentialityForm not found");
  }

  const result = await ConfidentialityForm.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


const createConfidentialityFormIntoDB = async (payload: Partial<TConfidentialityForm>) => {
  const result = await ConfidentialityForm.create(payload);
  return result;
};




export const ConfidentialityFormServices = {
  getAllConfidentialityFormFromDB,
  getSingleConfidentialityFormFromDB,
  updateConfidentialityFormIntoDB,
  createConfidentialityFormIntoDB
  
};
