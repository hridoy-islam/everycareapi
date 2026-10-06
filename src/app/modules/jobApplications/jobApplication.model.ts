import { Schema, model, Types } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import { TJobApplication } from "./jobApplication.interface";

const JobApplicationSchema = new Schema<TJobApplication>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    applicantId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    seen: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["recruit", "rejected", "applied"],
      default: "applied",
    },
    // The applicant and admin "application received" mails. false while they
    // are held back for an unfinished profile, true once sent. Applications
    // from before this flag existed have no value and are never re-sent.
    notified: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

export const JobApplication = model<TJobApplication>(
  "JobApplication",
  JobApplicationSchema
);
