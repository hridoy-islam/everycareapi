import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ReviewServices } from "./review.service";

const getAllReviews: RequestHandler = catchAsync(async (req, res) => {
  const result = await ReviewServices.getAllReviewsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews retrieved successfully",
    data: result,
  });
});

const getSingleReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewServices.getSingleReviewFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review is retrieved successfully",
    data: result,
  });
});

const updateReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewServices.updateReviewIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review is updated successfully",
    data: result,
  });
});

const deleteReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewServices.deleteReviewFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review is deleted successfully",
    data: result,
  });
});

const createReview: RequestHandler = catchAsync(async (req, res) => {
  const result = await ReviewServices.createReviewIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

export const ReviewControllers = {
  getAllReviews,
  getSingleReview,
  updateReview,
  createReview,
  deleteReview,
};
