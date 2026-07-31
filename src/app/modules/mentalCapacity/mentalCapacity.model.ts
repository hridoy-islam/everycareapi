/* eslint-disable no-unused-vars */
import { Schema, model, Model } from "mongoose";
import { TMentalCapacity } from "./mentalCapacity.interface";

const YesNoSchema = {
  type: String,
  enum: ["yes", "no"],
};

const MentalCapacitySchema = new Schema<TMentalCapacity>(
  {
    serviceUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Service User is required"],
    },

    // Core identifiers
    serviceUserName: { type: String, trim: true },
    address: { type: String },
    dateOfFirstAssessment: { type: Date },

    // Brain impairment
    hasBrainImpairmentOrDisturbance: YesNoSchema,

    // Relevant domains (Yes/No per domain)
    relevantDomains: {
      washingAndShowering: YesNoSchema,
      dressingAndGrooming: YesNoSchema,
      supportUsingCommode: YesNoSchema,
      nutrition: YesNoSchema,
      mobility: YesNoSchema,
      pressureCareAndPositionChange: YesNoSchema,
      otherMedications: YesNoSchema,
    },

    // Decision assessment detail
    additionalDetail: { type: String },
    // purposeExplained: { type: String },

    // Can the Service User (Yes/No per item)
    understandInformation: YesNoSchema,
    retainInformation: YesNoSchema,
    discussProsCons: YesNoSchema,
    communicateDecision: YesNoSchema,

    // Overall outcome
    overallOutcomeHasCapacity: YesNoSchema,

    // Best interest action
    bestInterestAction: { type: String },

    // Review & sign-off
    reviewDate: { type: Date },
    assessorName: { type: String },
    assessorSignatureUrl: { type: String },
  },
  {
    timestamps: true,
  },
);

export const MentalCapacity: Model<TMentalCapacity> =
  model<TMentalCapacity>("MentalCapacity", MentalCapacitySchema);
