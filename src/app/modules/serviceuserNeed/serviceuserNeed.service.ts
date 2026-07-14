import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { ServiceuserNeed } from "./serviceuserNeed.model";
import { TServiceuserNeed } from "./serviceuserNeed.interface";
import { ServiceuserNeedSearchableFields } from "./serviceuserNeed.constant";
import { StringExpression } from "mongoose";

const getAllServiceuserNeedFromDB = async (query: Record<string, unknown>) => {
  const ServiceuserNeedQuery = new QueryBuilder(ServiceuserNeed.find().populate("needId"), query)
    .search(ServiceuserNeedSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await ServiceuserNeedQuery.countTotal();
  const result = await ServiceuserNeedQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleServiceuserNeedFromDB = async (id: string) => {
  const result = await ServiceuserNeed.findById(id);
  return result;
};

const updateServiceuserNeedIntoDB = async (id: string, payload: Partial<TServiceuserNeed>) => {
  const serviceuserNeed = await ServiceuserNeed.findById(id);
  if (!serviceuserNeed) {
    throw new AppError(httpStatus.NOT_FOUND, "ServiceuserNeed not found");
  }

  const result = await ServiceuserNeed.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


const createServiceuserNeedIntoDB = async (payload: Partial<TServiceuserNeed>) => {
  const result = await ServiceuserNeed.create(payload);
  return result;
};

const deleteServiceuserNeedIntoDB = async (id: StringExpression) => {
  const serviceuserNeed = await ServiceuserNeed.findById(id);
  if (!serviceuserNeed) {
    throw new AppError(httpStatus.NOT_FOUND, "ServiceuserNeed not found");
  }

  const result = await ServiceuserNeed.findByIdAndDelete(id);

  return result;
};



export const ServiceuserNeedServices = {
  getAllServiceuserNeedFromDB,
  getSingleServiceuserNeedFromDB,
  updateServiceuserNeedIntoDB,
  createServiceuserNeedIntoDB,
  deleteServiceuserNeedIntoDB
  
};
