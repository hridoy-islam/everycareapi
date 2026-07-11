import mongoose, { model, Schema } from "mongoose";

import { string } from "zod";
import { TDesignation } from "./designation.interface";

const designationSchema = new Schema<TDesignation>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    
      
    
  },
  {
    timestamps: true,
  }
);

export const Designation = model<TDesignation>("Designation", designationSchema);
