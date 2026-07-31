import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { MentalCapacity } from "./mentalCapacity.model";
import { TMentalCapacity } from "./mentalCapacity.interface";
import { MentalCapacitySearchableFields } from "./mentalCapacity.constant";

const getAllMentalCapacitiesFromDB = async (query: Record<string, unknown>) => {
  const mentalCapacityQuery = new QueryBuilder(MentalCapacity.find(), query)
    .search(MentalCapacitySearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await mentalCapacityQuery.countTotal();
  const result = await mentalCapacityQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleMentalCapacityFromDB = async (id: string) => {
  const result = await MentalCapacity.findById(id).populate("serviceUserId", "firstName lastName");
  return result;
};

const updateMentalCapacityIntoDB = async (id: string, payload: Partial<TMentalCapacity>) => {
  const mentalCapacity = await MentalCapacity.findById(id);
  if (!mentalCapacity) {
    throw new AppError(httpStatus.NOT_FOUND, "Mental Capacity assessment not found");
  }

  const result = await MentalCapacity.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const createMentalCapacityIntoDB = async (payload: Partial<TMentalCapacity>) => {
  const result = await MentalCapacity.create(payload);
  return result;
};

const deleteMentalCapacityFromDB = async (id: string) => {
  const mentalCapacity = await MentalCapacity.findById(id);
  if (!mentalCapacity) {
    throw new AppError(httpStatus.NOT_FOUND, "Mental Capacity assessment not found");
  }

  const result = await MentalCapacity.findByIdAndDelete(id);
  return result;
};

export const MentalCapacityServices = {
  getAllMentalCapacitiesFromDB,
  getSingleMentalCapacityFromDB,
  updateMentalCapacityIntoDB,
  createMentalCapacityIntoDB,
  deleteMentalCapacityFromDB,
};
