import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { ServiceuserEmergencyContract } from "./serviceuserEmergencyContract.model";
import { TServiceuserEmergencyContract } from "./serviceuserEmergencyContract.interface";
import { ServiceuserEmergencyContractSearchableFields } from "./serviceuserEmergencyContract.constant";
import { StringExpression } from "mongoose";

const getAllServiceuserEmergencyContractFromDB = async (query: Record<string, unknown>) => {
  const ServiceuserEmergencyContractQuery = new QueryBuilder(ServiceuserEmergencyContract.find().populate("serviceUserId"), query)
    .search(ServiceuserEmergencyContractSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await ServiceuserEmergencyContractQuery.countTotal();
  const result = await ServiceuserEmergencyContractQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleServiceuserEmergencyContractFromDB = async (id: string) => {
  const result = await ServiceuserEmergencyContract.findById(id);
  return result;
};

const updateServiceuserEmergencyContractIntoDB = async (id: string, payload: Partial<TServiceuserEmergencyContract>) => {
  const serviceuserEmergencyContract = await ServiceuserEmergencyContract.findById(id);
  if (!serviceuserEmergencyContract) {
    throw new AppError(httpStatus.NOT_FOUND, "ServiceuserEmergencyContract not found");
  }

  const result = await ServiceuserEmergencyContract.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


const createServiceuserEmergencyContractIntoDB = async (payload: Partial<TServiceuserEmergencyContract>) => {
  const result = await ServiceuserEmergencyContract.create(payload);
  return result;
};

const deleteServiceuserEmergencyContractIntoDB = async (id: StringExpression) => {
  const serviceuserEmergencyContract = await ServiceuserEmergencyContract.findById(id);
  if (!serviceuserEmergencyContract) {
    throw new AppError(httpStatus.NOT_FOUND, "ServiceuserEmergencyContract not found");
  }

  const result = await ServiceuserEmergencyContract.findByIdAndDelete(id);

  return result;
};



export const ServiceuserEmergencyContractServices = {
  getAllServiceuserEmergencyContractFromDB,
  getSingleServiceuserEmergencyContractFromDB,
  updateServiceuserEmergencyContractIntoDB,
  createServiceuserEmergencyContractIntoDB,
  deleteServiceuserEmergencyContractIntoDB
  
};
