import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";

import AppError from "../../errors/AppError";

import { LogsSearchableFields } from "./logs.constant";
import { TLogs } from "./logs.interface";
import Logs from "./logs.model";
import { User } from "../user/user.model";

import moment from "moment";

const getAllLogsFromDB = async (
  query: Record<string, unknown>,
  currentUser?: any
) => {



 

  const LogsQuery = new QueryBuilder(
    Logs.find().populate("userId", "name"),
    query
  )
    .search(LogsSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await LogsQuery.countTotal();
  const result = await LogsQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleLogsFromDB = async (id: string) => {
  const result = await Logs.findById(id);
  return result;
};


const updateLogsByIdIntoDB = async (id: string, payload: Partial<TLogs>) => {
  const logs = await Logs.findById(id);
  if (!Logs) {
    throw new AppError(httpStatus.NOT_FOUND, "Logs not found");
  }

  const result = await Logs.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const createLogsIntoDB = async (payload: Partial<TLogs>) => {
  const result = await Logs.create(payload);
  return result;
};

export const LogsServices = {
  getAllLogsFromDB,
  getSingleLogsFromDB,

  createLogsIntoDB,
  updateLogsByIdIntoDB,
};
