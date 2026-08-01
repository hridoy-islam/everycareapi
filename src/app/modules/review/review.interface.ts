/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface TReviewSmartGoal {
  goalArea?: string;
  timeFrame?: string;
}

export interface TReview {
  serviceUserId: Types.ObjectId;

  // Review details
  serviceUserName?: string;
  date?: Date;
  time?: string;
  address?: string;
  careManagerSupervisorName?: string;
  socialWorkerCaseManager?: string;
  careWorker?: string;
  othersPresent?: string;

  // Pre-review notes
  preReviewServiceUserComments?: string;
  preReviewCareManagerComments?: string;
  morningVisitsFocus?: string;
  eveningVisitsFocus?: string;
  followUp?: string;
  preReviewNotes?: string;

  // Review notes
  reviewNotes?: string;

  // Post review notes and S.M.A.R.T goals
  postReviewNotes?: string;
  smartGoals?: TReviewSmartGoal[];

  // Signatures
  serviceUserSignatureUrl?: string;
  careStaffSignatureUrl?: string;
  managerSignatureUrl?: string;
  signatureDate?: Date;
  approximateNextReviewDate?: Date;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export type ReviewModel = Model<TReview>;
