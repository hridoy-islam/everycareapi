/* eslint-disable no-unused-vars */
import { Schema, model, Types } from 'mongoose';
import { TConfidentialityForm } from './confidentialityForm.interface';

const ConfidentialityFormSchema = new Schema<TConfidentialityForm>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    // Applicant Info
    name: { type: String },
    signatureUrl: { type: String },
    
  },
  { timestamps: true }
);

export const ConfidentialityForm = model<TConfidentialityForm>('ConfidentialityForm', ConfidentialityFormSchema);
