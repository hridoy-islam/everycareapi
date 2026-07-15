/* eslint-disable no-unused-vars */
import { Schema, model, Model } from "mongoose";
import { TServiceuserEmergencyContract } from "./serviceuserEmergencyContract.interface";

const ServiceuserEmergencyContractSchema = new Schema<TServiceuserEmergencyContract>(
  {
    // Core identifiers
    serviceUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    contractType: {
      type: String,
      enum: ["Personal", "Professional", "GP"],
      required: true,
    },

    // General Information
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    fullName: {
      type: String,
    },
    relationship: {
      type: String,
    },
    organization: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    speciality: {
      type: String,
    },
    observation: {
      type: String,
    },

    // Legal details (Personal & Professional)
    isProxyForSubjectOfCare: {
      type: Boolean,
      default: false,
    },
    lpaHealthAndWellbeing: {
      type: Boolean,
      default: false,
    },
    lpaFinancial: {
      type: Boolean,
      default: false,
    },
    lpaDateAppointed: {
      type: Date,
    },
    lpaFormLocation: {
      type: String,
    },

    // Contact details
    postcode: {
      type: String,
    },
    address: {
      type: String,
    },
    telephone1: {
      type: String,
    },
    telephone2: {
      type: String,
    },
    email: {
      type: String,
    },
    contactStatus: {
      type: String,
      enum: ["Priority", "Secondary", "Do not contact"],
    },
    contactableTimes: {
      type: String,
    },

    // Family app status (Personal & Professional)
    familyAppAccess: {
      type: Boolean,
      default: false,
    },
    familyAppAccessJustification: {
      type: String,
    },

    // ALL BOOLEAN FIELDS
    isEmergencyContact: {
      type: Boolean,
      default: false,
    },
    isNextOfKin: {
      type: Boolean,
      default: false,
    },
    isPrimaryContact: {
      type: Boolean,
      default: false,
    },
    isAuthorizedToCollect: {
      type: Boolean,
      default: false,
    },
    isKeyHolder: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isConsentGiven: {
      type: Boolean,
      default: false,
    },
    canContactInEmergency: {
      type: Boolean,
      default: true,
    },
    isFamilyMember: {
      type: Boolean,
      default: false,
    },
    canProvideCare: {
      type: Boolean,
      default: false,
    },
    isPowerOfAttorney: {
      type: Boolean,
      default: false,
    },
    isRegisteredWithGp: {
      type: Boolean,
      default: false,
    },
    interpreterRequired: {
      type: Boolean,
      default: false,
    },
    isUnpaidCarer: {
      type: Boolean,
      default: false,
    },
    isDependant: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },

    // Availability
    preferredContactTime: {
      type: String,
    },
    availabilityNotes: {
      type: String,
    },

    // GP specific fields (when contractType is 'GP')
    gpPracticeName: {
      type: String,
    },
    gpPracticeCode: {
      type: String,
    },
    gpBuildingName: {
      type: String,
    },
    gpAddressLine1: {
      type: String,
    },
    gpAddressLine2: {
      type: String,
    },
    gpTownCity: {
      type: String,
    },
    gpCountry: {
      type: String,
    },
    gpPostcode: {
      type: String,
    },
    gpPhoneNumber: {
      type: String,
    },
    gpEmail: {
      type: String,
    },
    nhsNumber: {
      type: String,
    },

    // Professional specific fields (when contractType is 'Professional')
    professionalType: {
      type: String,
    },
    professionalRegistrationNumber: {
      type: String,
    },
    regulatoryBody: {
      type: String,
    },

    // Communication preferences
    preferredCommunicationMethod: {
      type: String,
    },
    languagePreference: {
      type: String,
    },

    // Notes and metadata
    note: {
      type: String,
      trim: true,
      default: "",
    },
    specialInstructions: {
      type: String,
    },
    medicalNotes: {
      type: String,
    },
    accessNotes: {
      type: String,
    },

    lastContactDate: {
      type: Date,
    },
    nextContactDue: {
      type: Date,
    },
  },
  {
    timestamps: true, // This will handle createdAt and updatedAt automatically
  }
);

export const ServiceuserEmergencyContract: Model<TServiceuserEmergencyContract> =
  model<TServiceuserEmergencyContract>(
    "ServiceuserEmergencyContract",
    ServiceuserEmergencyContractSchema
  );