/* eslint-disable no-unused-vars */
import { Schema, model, Types } from 'mongoose';
import { TEmployementContract } from './employementContract.interface';

const EmployementContractSchema = new Schema<TEmployementContract>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    // Applicant Info
    name: { type: String },
    jobStartDate: { type: Date },
    signatureUrl: { type: String },
    
  },
  { timestamps: true }
);

export const EmployementContract = model<TEmployementContract>('EmployementContract', EmployementContractSchema);
