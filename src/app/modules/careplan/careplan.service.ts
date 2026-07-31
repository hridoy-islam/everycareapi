import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { CarePlan } from "./careplan.model";
import { TCarePlan } from "./careplan.interface";
import { CarePlanSearchableFields } from "./careplan.constant";

const getAllCarePlansFromDB = async (query: Record<string, unknown>) => {
  const carePlanQuery = new QueryBuilder(CarePlan.find(), query)
    .search(CarePlanSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await carePlanQuery.countTotal();
  const result = await carePlanQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleCarePlanFromDB = async (id: string) => {
  const result = await CarePlan.findById(id).populate("serviceUserId", "firstName lastName");
  return result;
};

const updateCarePlanIntoDB = async (id: string, payload: Partial<TCarePlan>) => {
  const carePlan = await CarePlan.findById(id);
  if (!carePlan) {
    throw new AppError(httpStatus.NOT_FOUND, "Care Plan not found");
  }

  const result = await CarePlan.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const createCarePlanIntoDB = async (payload: Partial<TCarePlan>) => {
  const result = await CarePlan.create(payload);
  return result;
};

const deleteCarePlanFromDB = async (id: string) => {
  const carePlan = await CarePlan.findById(id);
  if (!carePlan) {
    throw new AppError(httpStatus.NOT_FOUND, "Care Plan not found");
  }

  const result = await CarePlan.findByIdAndDelete(id);
  return result;
};

export const CarePlanServices = {
  getAllCarePlansFromDB,
  getSingleCarePlanFromDB,
  updateCarePlanIntoDB,
  createCarePlanIntoDB,
  deleteCarePlanFromDB,
};
