/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
export enum ContractType {
  PERSONAL = 'Personal',
  PROFESSIONAL = 'Professional',
  GP = 'GP'
}

export enum ContactStatus {
  PRIORITY = 'Priority',
  SECONDARY = 'Secondary',
  DO_NOT_CONTACT = 'Do not contact'
}

export interface TServiceuserEmergencyContract {
  // Core identifiers
  serviceUserId: Types.ObjectId;
  
  // Contact type as enum
  contractType: ContractType;
  
  // General Information
  firstName?: string;
  lastName?: string;
  fullName?: string;
  relationship?: string;
  organization?: string;
  jobTitle?: string;
  speciality?: string;
  observation?: string;

  // Legal details (Personal & Professional)
  isProxyForSubjectOfCare?: boolean;
  lpaHealthAndWellbeing?: boolean;
  lpaFinancial?: boolean;
  lpaDateAppointed?: Date;
  lpaFormLocation?: string;

  // Contact details
  postcode?: string;
  address?: string;
  telephone1?: string;
  telephone2?: string;
  email?: string;
  contactStatus?: ContactStatus;
  contactableTimes?: string;

  // Family app status (Personal & Professional)
  familyAppAccess?: boolean;
  familyAppAccessJustification?: string;

  // ALL BOOLEAN FIELDS
  isEmergencyContact?: boolean;
  isNextOfKin?: boolean;
  isPrimaryContact?: boolean;
  isAuthorizedToCollect?: boolean;
  isKeyHolder?: boolean;
  isActive?: boolean;
  isVerified?: boolean;
  isConsentGiven?: boolean;
  canContactInEmergency?: boolean;
  isFamilyMember?: boolean;
  canProvideCare?: boolean;
  isPowerOfAttorney?: boolean;
  isRegisteredWithGp?: boolean;
  interpreterRequired?: boolean;
  isUnpaidCarer?: boolean;
  isDependant?: boolean;
  isDeleted?: boolean;

  // Availability
  preferredContactTime?: string;
  availabilityNotes?: string;

  // GP specific fields (when contractType is 'GP')
  gpPracticeName?: string;
  gpPracticeCode?: string;
  gpBuildingName?: string;
  gpAddressLine1?: string;
  gpAddressLine2?: string;
  gpTownCity?: string;
  gpCountry?: string;
  gpPostcode?: string;
  gpPhoneNumber?: string;
  gpEmail?: string;
  nhsNumber?: string;

  // Professional specific fields (when contractType is 'Professional')
  professionalType?: string;
  professionalRegistrationNumber?: string;
  regulatoryBody?: string;

  // Communication preferences
  preferredCommunicationMethod?: string;
  languagePreference?: string;

  // Notes and metadata
  note?: string;
  specialInstructions?: string;
  medicalNotes?: string;
  accessNotes?: string;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
  lastContactDate?: Date;
  nextContactDue?: Date;
}