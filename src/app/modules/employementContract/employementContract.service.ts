import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { EmployementContract } from "./employementContract.model";
import { TEmployementContract } from "./employementContract.interface";
import { EmployementContractSearchableFields } from "./employementContract.constant";

const getAllEmployementContractFromDB = async (query: Record<string, unknown>) => {
  const EmployementContractQuery = new QueryBuilder(EmployementContract.find(), query)
    .search(EmployementContractSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await EmployementContractQuery.countTotal();
  const result = await EmployementContractQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleEmployementContractFromDB = async (id: string) => {
  const result = await EmployementContract.findById(id);
  return result;
};

const updateEmployementContractIntoDB = async (id: string, payload: Partial<TEmployementContract>) => {
  const employementContract = await EmployementContract.findById(id);
  if (!employementContract) {
    throw new AppError(httpStatus.NOT_FOUND, "EmployementContract not found");
  }

  const result = await EmployementContract.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


const createEmployementContractIntoDB = async (payload: Partial<TEmployementContract>) => {
  const result = await EmployementContract.create(payload);
  return result;
};




export const EmployementContractServices = {
  getAllEmployementContractFromDB,
  getSingleEmployementContractFromDB,
  updateEmployementContractIntoDB,
  createEmployementContractIntoDB
  
};
