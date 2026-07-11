/* eslint-disable no-unused-vars */
import { Types } from 'mongoose';

export interface TJobContract {
  userId: Types.ObjectId;
  contractTypeId: Types.ObjectId;
  contractContent: string;
  signatureUrl: string;
}