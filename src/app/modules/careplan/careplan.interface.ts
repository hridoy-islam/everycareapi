/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface TCarePlanScheduleEntry {
  day?: string;
  time?: string;
  hoursNo?: string;
  task?: string;
}

export interface TCarePlan {
  serviceUserId: Types.ObjectId;

  // Core identifiers
  serviceUserName?: string;
  preferredTermOfAddress?: string;
  idNumber?: string;
  serviceStartDate?: Date;
  address?: string;
  dob?: Date;
  caseManager?: string;

  // Service delivery schedule
  schedule?: TCarePlanScheduleEntry[];

  // Agreed by
  agreedByServiceUserName?: string;
  agreedByCaseManagerName?: string;
  serviceUserSignatureUrl?: string;
  caseManagerSignatureUrl?: string;
  serviceUserAgreedDate?: Date;
  caseManagerAgreedDate?: Date;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export type CarePlanModel = Model<TCarePlan>;
