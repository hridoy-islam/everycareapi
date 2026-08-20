/* eslint-disable no-unused-vars */
import { Schema, model, Types } from 'mongoose';
import { TStatementOfUnderstanding } from './statementOfUnderstanding.interface';

const StatementOfUnderstandingSchema = new Schema<TStatementOfUnderstanding>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    // Applicant Info
    name: { type: String },
    signatureUrl: { type: String },
    
  },
  { timestamps: true }
);

export const StatementOfUnderstanding = model<TStatementOfUnderstanding>('StatementOfUnderstanding', StatementOfUnderstandingSchema);