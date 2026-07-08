/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export interface TConfidentialityForm {
  userId: Types.ObjectId;
  // Applicant Info
  name: string;
  signatureUrl: string;
  
}