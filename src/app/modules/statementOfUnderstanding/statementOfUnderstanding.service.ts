import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { StatementOfUnderstanding } from "./statementOfUnderstanding.model";
import { TStatementOfUnderstanding } from "./statementOfUnderstanding.interface";
import { StatementOfUnderstandingSearchableFields } from "./statementOfUnderstanding.constant";

const getAllStatementOfUnderstandingFromDB = async (query: Record<string, unknown>) => {
  const StatementOfUnderstandingQuery = new QueryBuilder(StatementOfUnderstanding.find(), query)
    .search(StatementOfUnderstandingSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await StatementOfUnderstandingQuery.countTotal();
  const result = await StatementOfUnderstandingQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleStatementOfUnderstandingFromDB = async (id: string) => {
  const result = await StatementOfUnderstanding.findById(id);
  return result;
};

const updateStatementOfUnderstandingIntoDB = async (id: string, payload: Partial<TStatementOfUnderstanding>) => {
  const statementOfUnderstanding = await StatementOfUnderstanding.findById(id);
  if (!statementOfUnderstanding) {
    throw new AppError(httpStatus.NOT_FOUND, "StatementOfUnderstanding not found");
  }

  const result = await StatementOfUnderstanding.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


const createStatementOfUnderstandingIntoDB = async (payload: Partial<TStatementOfUnderstanding>) => {
  const result = await StatementOfUnderstanding.create(payload);
  return result;
};




export const StatementOfUnderstandingServices = {
  getAllStatementOfUnderstandingFromDB,
  getSingleStatementOfUnderstandingFromDB,
  updateStatementOfUnderstandingIntoDB,
  createStatementOfUnderstandingIntoDB
  
};