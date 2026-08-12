import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { RiskAssessment } from "./riskAssessment.model";
import { TRiskAssessment } from "./riskAssessment.interface";
import { RiskAssessmentSearchableFields } from "./riskAssessment.constant";

const getAllRiskAssessmentsFromDB = async (query: Record<string, unknown>) => {
  const riskAssessmentQuery = new QueryBuilder(
    RiskAssessment.find(),
    query
  )
    .search(RiskAssessmentSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await riskAssessmentQuery.countTotal();
  const result = await riskAssessmentQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleRiskAssessmentFromDB = async (id: string) => {
  const result = await RiskAssessment.findById(id).populate(
    "serviceUserId",
    "firstName lastName"
  );
  return result;
};

const updateRiskAssessmentIntoDB = async (
  id: string,
  payload: Partial<TRiskAssessment>
) => {
  const riskAssessment = await RiskAssessment.findById(id);
  if (!riskAssessment) {
    throw new AppError(httpStatus.NOT_FOUND, "Risk Assessment not found");
  }

  const result = await RiskAssessment.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const createRiskAssessmentIntoDB = async (
  payload: Partial<TRiskAssessment>
) => {
  const result = await RiskAssessment.create(payload);
  return result;
};

const deleteRiskAssessmentFromDB = async (id: string) => {
  const riskAssessment = await RiskAssessment.findById(id);
  if (!riskAssessment) {
    throw new AppError(httpStatus.NOT_FOUND, "Risk Assessment not found");
  }

  const result = await RiskAssessment.findByIdAndDelete(id);
  return result;
};

export const RiskAssessmentServices = {
  getAllRiskAssessmentsFromDB,
  getSingleRiskAssessmentFromDB,
  updateRiskAssessmentIntoDB,
  createRiskAssessmentIntoDB,
  deleteRiskAssessmentFromDB,
};
