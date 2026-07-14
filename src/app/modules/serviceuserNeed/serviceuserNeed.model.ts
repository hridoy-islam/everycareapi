/* eslint-disable no-unused-vars */
import { Schema, model, Model } from "mongoose";
import { TServiceuserNeed } from "./serviceuserNeed.interface";

const ServiceuserNeedSchema = new Schema<TServiceuserNeed>(
  {
    serviceUserId:{ type: Schema.Types.ObjectId, ref: "User", required: true },
    note: {
      type: String,
      trim: true,
      default: "",
    },
    needId: {
      type: Schema.Types.ObjectId,
      ref: "Needs",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ServiceuserNeed: Model<TServiceuserNeed> =
  model<TServiceuserNeed>("ServiceuserNeed", ServiceuserNeedSchema);