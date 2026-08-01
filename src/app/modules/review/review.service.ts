import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { Review } from "./review.model";
import { TReview } from "./review.interface";
import { ReviewSearchableFields } from "./review.constant";

const getAllReviewsFromDB = async (query: Record<string, unknown>) => {
  const reviewQuery = new QueryBuilder(Review.find(), query)
    .search(ReviewSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await reviewQuery.countTotal();
  const result = await reviewQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleReviewFromDB = async (id: string) => {
  const result = await Review.findById(id).populate(
    "serviceUserId",
    "firstName lastName",
  );
  return result;
};

const updateReviewIntoDB = async (id: string, payload: Partial<TReview>) => {
  const review = await Review.findById(id);
  if (!review) {
    throw new AppError(httpStatus.NOT_FOUND, "Review not found");
  }

  const result = await Review.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const createReviewIntoDB = async (payload: Partial<TReview>) => {
  const result = await Review.create(payload);
  return result;
};

const deleteReviewFromDB = async (id: string) => {
  const review = await Review.findById(id);
  if (!review) {
    throw new AppError(httpStatus.NOT_FOUND, "Review not found");
  }

  const result = await Review.findByIdAndDelete(id);
  return result;
};

export const ReviewServices = {
  getAllReviewsFromDB,
  getSingleReviewFromDB,
  updateReviewIntoDB,
  createReviewIntoDB,
  deleteReviewFromDB,
};
