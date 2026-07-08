/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export interface TEmployementContract {
  userId: Types.ObjectId;
  // Applicant Info
  name: string;
  jobStartDate: Date;
  signatureUrl: string;
  
}