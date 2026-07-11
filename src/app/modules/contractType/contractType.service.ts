import httpStatus from "http-status";

import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { ContractType } from "./contractType.model";
import { TContractType } from "./contractType.interface";
import { ContractTypeSearchableFields } from "./contractType.constant";


const getAllContractTypeFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(ContractType.find(), query)
    .search(ContractTypeSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleContractTypeFromDB = async (id: string) => {
  const result = await ContractType.findById(id);
  return result;
};


const createContractTypeIntoDB = async (payload: TContractType) => {
    try {
      
      const result = await ContractType.create(payload);
      return result;
    } catch (error: any) {
      console.error("Error in createContractTypeIntoDB:", error);
  
      // Throw the original error or wrap it with additional context
      if (error instanceof AppError) {
        throw error;
      }
  
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message || "Failed to create ContractType");
    }
  };


const updateContractTypeIntoDB = async (id: string, payload: Partial<TContractType>) => {
  const contractType = await ContractType.findById(id);

  if (!contractType) {
    throw new AppError(httpStatus.NOT_FOUND, "ContractType not found");
  }

  // Update only the selected user
  const result = await ContractType.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};
const deleteContractTypeIntoDB = async (id: string) => {
  const contractType = await ContractType.findById(id);

  if (!contractType) {
    throw new AppError(httpStatus.NOT_FOUND, "ContractType not found");
  }

  // Update only the selected user
  const result = await ContractType.findByIdAndDelete(id);

  return result;
};


export const ContractTypeServices = {
    getAllContractTypeFromDB,
    getSingleContractTypeFromDB,
    updateContractTypeIntoDB,
    createContractTypeIntoDB,
    deleteContractTypeIntoDB
  
};



  