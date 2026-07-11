import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { JobContract } from "./jobContract.model";
import { TJobContract } from "./jobContract.interface";
import { JobContractSearchableFields } from "./jobContract.constant";

const getAllJobContractFromDB = async (query: Record<string, unknown>) => {
  const JobContractQuery = new QueryBuilder(JobContract.find().populate("userId","name email"), query)
    .search(JobContractSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await JobContractQuery.countTotal();
  const result = await JobContractQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleJobContractFromDB = async (id: string) => {
  const result = await JobContract.findById(id);
  return result;
};

const updateJobContractIntoDB = async (id: string, payload: Partial<TJobContract>) => {
  const jobContract = await JobContract.findById(id);
  if (!jobContract) {
    throw new AppError(httpStatus.NOT_FOUND, "JobContract not found");
  }

  const result = await JobContract.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


const createJobContractIntoDB = async (payload: Partial<TJobContract>) => {
  const result = await JobContract.create(payload);
  return result;
};




export const JobContractServices = {
  getAllJobContractFromDB,
  getSingleJobContractFromDB,
  updateJobContractIntoDB,
  createJobContractIntoDB
  
};
