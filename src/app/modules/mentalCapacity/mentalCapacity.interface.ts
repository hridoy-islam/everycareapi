/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export type YesNo = "yes" | "no";

export interface TMentalCapacityRelevantDomains {
  washingAndShowering?: YesNo;
  dressingAndGrooming?: YesNo;
  supportUsingCommode?: YesNo;
  nutrition?: YesNo;
  mobility?: YesNo;
  pressureCareAndPositionChange?: YesNo;
  otherMedications?: YesNo;
}

export interface TMentalCapacity {
  serviceUserId: Types.ObjectId;

  // Core identifiers
  serviceUserName?: string;
  address?: string;
  dateOfFirstAssessment?: Date;

  // Brain impairment
  hasBrainImpairmentOrDisturbance?: YesNo;

  // Relevant domains (Yes/No per domain)
  relevantDomains?: TMentalCapacityRelevantDomains;

  // Decision assessment detail
  additionalDetail?: string;
  purposeExplained?: string;

  // Can the Service User (Yes/No per item)
  understandInformation?: YesNo;
  retainInformation?: YesNo;
  discussProsCons?: YesNo;
  communicateDecision?: YesNo;

  // Overall outcome
  overallOutcomeHasCapacity?: YesNo;

  // Best interest action
  bestInterestAction?: string;

  // Review & sign-off
  reviewDate?: Date;
  assessorName?: string;
  assessorSignatureUrl?: string;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export type MentalCapacityModel = Model<TMentalCapacity>;
