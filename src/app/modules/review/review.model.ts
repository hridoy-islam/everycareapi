/* eslint-disable no-unused-vars */
import { Schema, model, Model } from "mongoose";
import { TReview } from "./review.interface";

const ReviewSchema = new Schema<TReview>(
  {
    serviceUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Review details
    serviceUserName: { type: String, trim: true },
    date: { type: Date },
    time: { type: String },
    address: { type: String },
    careManagerSupervisorName: { type: String },
    socialWorkerCaseManager: { type: String },
    careWorker: { type: String },
    othersPresent: { type: String },

    // Pre-review notes
    preReviewServiceUserComments: { type: String },
    preReviewCareManagerComments: { type: String },
    // morningVisitsFocus: { type: String },
    // eveningVisitsFocus: { type: String },
    followUp: { type: String },
    preReviewNotes: { type: String },

    // Review notes
    reviewNotes: { type: String },

    // Post review notes and S.M.A.R.T goals
    postReviewNotes: { type: String },
    smartGoals: [
      {
        goalArea: { type: String },
        timeFrame: { type: Date },
      },
    ],

    // Signatures
    serviceUserSignatureUrl: { type: String },
    careStaffSignatureUrl: { type: String },
    managerSignatureUrl: { type: String },
    signatureDate: { type: Date },
    approximateNextReviewDate: { type: Date },
  },
  {
    timestamps: true,
  },
);

export const Review: Model<TReview> = model<TReview>("Review", ReviewSchema);
