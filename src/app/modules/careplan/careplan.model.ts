/* eslint-disable no-unused-vars */
import { Schema, model, Model } from "mongoose";
import { TCarePlan } from "./careplan.interface";

const CarePlanSchema = new Schema<TCarePlan>(
  {
    serviceUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Service User is required"],
    },

    // Core identifiers
    serviceUserName: { type: String, trim: true },
    preferredTermOfAddress: { type: String },
    idNumber: { type: String },
    serviceStartDate: { type: Date },
    address: { type: String },
    dob: { type: Date },
    caseManager: { type: String },

    // Service delivery schedule
    schedule: [
      {
        day: { type: String },
        time: { type: String },
        hoursNo: { type: String },
        task: { type: String },
      },
    ],

    // Agreed by
    agreedByServiceUserName: { type: String },
    agreedByCaseManagerName: { type: String },
    serviceUserSignatureUrl: { type: String },
    caseManagerSignatureUrl: { type: String },
    serviceUserAgreedDate: { type: Date },
    caseManagerAgreedDate: { type: Date },
  },
  {
    timestamps: true,
  },
);

export const CarePlan: Model<TCarePlan> = model<TCarePlan>(
  "CarePlan",
  CarePlanSchema,
);
