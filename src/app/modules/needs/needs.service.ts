import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { Needs } from "./needs.model";
import { TNeeds } from "./needs.interface";
import { NeedsSearchableFields } from "./needs.constant";
import { StringExpression } from "mongoose";

const getAllNeedsFromDB = async (query: Record<string, unknown>) => {
  const NeedsQuery = new QueryBuilder(Needs.find().populate("parentNeedId"), query)
    .search(NeedsSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await NeedsQuery.countTotal();
  const result = await NeedsQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleNeedsFromDB = async (id: string) => {
  const result = await Needs.findById(id);
  return result;
};

const updateNeedsIntoDB = async (id: string, payload: Partial<TNeeds>) => {
  const needs = await Needs.findById(id);
  if (!needs) {
    throw new AppError(httpStatus.NOT_FOUND, "Needs not found");
  }

  const result = await Needs.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


const createNeedsIntoDB = async (payload: Partial<TNeeds>) => {
  const result = await Needs.create(payload);
  return result;
};

const deleteNeedsIntoDB = async (id: StringExpression) => {
  const needs = await Needs.findById(id);
  if (!needs) {
    throw new AppError(httpStatus.NOT_FOUND, "Needs not found");
  }

  const result = await Needs.findByIdAndDelete(id);

  return result;
};



export const NeedsServices = {
  getAllNeedsFromDB,
  getSingleNeedsFromDB,
  updateNeedsIntoDB,
  createNeedsIntoDB,
  deleteNeedsIntoDB
  
};
