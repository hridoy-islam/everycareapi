/* eslint-disable no-unused-vars */
import { Schema, model, Model } from "mongoose";
import { TNeeds } from "./needs.interface";

const NeedsSchema = new Schema<TNeeds>(
  {
    NeedTitle: {
      type: String,
      required: true,
      trim: true,
    },
    parentNeedId: {
      type: Schema.Types.ObjectId,
      ref: "Needs",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Needs: Model<TNeeds> = model<TNeeds>("Needs", NeedsSchema);