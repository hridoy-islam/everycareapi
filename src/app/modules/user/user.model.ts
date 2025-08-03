/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { UserStatus } from "./user.constant";
import { TUser, UserModel } from "./user.interface";

const userSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin", "student", "applicant"],
      default: "applicant",
    },
    status: {
      type: String,
      enum: UserStatus,
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    authorized: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
    },
    googleUid: {
      type: String,
    },
    otp: {
      type: String,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    otpExpiry: {
      type: Date,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    isValided: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    userAgentInfo: {
      type: [
        {
          browser: {
            name: { type: String },
            version: { type: String },
          },
          os: {
            name: { type: String },
            version: { type: String },
          },
          device: {
            model: { type: String },
            type: { type: String },
            vendor: { type: String },
          },
          cpu: {
            architecture: { type: String },
          },
          ipAddress: {
            type: String,
            required: true,
          },
          macAddress: {
            type: String,
            required: true,
          },
          timestamp: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
      select: false,
    },

    // Personal Details
    title: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    otherName: { type: String },
    initial: { type: String },
    // gender: { type: String },
    dateOfBirth: { type: Date },
    nationality: { type: String },
    countryOfResidence: { type: String },
    countryOfBirth: { type: String },
    shareCode: { type: String },
    nationalInsuranceNumber: { type: String },

    postalAddressLine1: { type: String },
    postalAddressLine2: { type: String },
    postalCity: { type: String },
    postalPostCode: { type: String },
    postalCountry: { type: String },

    //career previous address
    prevPostalAddressLine1: { type: String },
    prevPostalAddressLine2: { type: String },
    prevPostalCity: { type: String },
    prevPostalPostCode: { type: String },
    prevPostalCountry: { type: String },

    // Emergency Contact
    emergencyContactNumber: { type: String },
    emergencyEmail: { type: String },
    emergencyFullName: { type: String },
    emergencyRelationship: { type: String },
    emergencyAddress: { type: String },

    //career applicants

    source: { type: String },
    referralEmployee: { type: String },
    availableFromDate: { type: Date },
    isOver18: { type: Boolean },
    isSubjectToImmigrationControl: { type: Boolean },
    canWorkInUK: { type: Boolean },
    // Weekly Availability
    availability: {
      type: Map,
      of: Boolean,
    },
    isStudent: { type: Boolean },
    isUnderStatePensionAge: { type: Boolean },
    
   

    // Employment
    isEmployed: { type: String },
    currentEmployment: {
      employer: { type: String },
      jobTitle: { type: String },
      startDate: { type: String },
      employmentType: { type: String },
      responsibilities: { type: String },
      supervisor: { type: String },
      contactPermission: { type: String },
    },
    hasPreviousEmployment: { type: String },

    previousEmployments: [
      {
        employer: { type: String },
        jobTitle: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        reasonForLeaving: { type: String },
        responsibilities: { type: String },
        contactPermission: { type: String },
      },
    ],
    hasEmploymentGaps: { type: String },
    employmentGapsExplanation: { type: String },

    // Education
    educationData: {
      type: [
        {
          institution: { type: String },
          qualification: { type: String },
          awardDate: { type: Date },
          grade: { type: String },
          certificate: { type: String },
        },
      ],
      default: [],
    },

    englishQualification: {
      type: {
        englishTestType: { type: String },
        englishTestScore: { type: String },
        englishTestDate: { type: Date },
        englishCertificate: { type: String },
      },
    },

    disabilityDetails: { type: String },
    hasDisability: { type: Boolean },

    needsReasonableAdjustment: { type: Boolean },
    reasonableAdjustmentDetails: { type: String },

    // References
    referee1: {
      name: { type: String },
      organisation: { type: String },
      address: { type: String },
      relationship: { type: String },
      otherRelationship: { type: String },
      email: { type: String },
      phone: { type: String },
    },
    referee2: {
      name: { type: String },
      organisation: { type: String },
      address: { type: String },
      relationship: { type: String },
      otherRelationship: { type: String },
      email: { type: String },
      phone: { type: String },
    },

    //documents
    proofOfAddress: { type: [String], default: [] },
    passport: { type: [String], default: [] },
    immigrationDocument: { type: [String], default: [] },
    workExperience: { type: [String], default: [] },
    bankStatement: { type: [String], default: [] },
    personalStatement: { type: [String], default: [] },

    //terms and conditions
    declarationCorrectUpload: { type: Boolean },
    declarationContactReferee: { type: Boolean },
    criminalConviction: { type: Boolean },
    criminalConvictionDetails: { type: String },
    appliedBefore: { type: Boolean },
    dataProcessingAccepted: { type: Boolean },
    termsAccepted: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.hashPassword = async function (
  plainTextPassword: string
): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(
      plainTextPassword,
      Number(config.bcrypt_salt_rounds)
    );
    return hashedPassword;
  } catch (error) {
    throw new Error("Error while hashing the password");
  }
};

userSchema.pre("save", async function (next) {
  const user = this as any; // doc
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );
  }
  next();
});

// set '' after saving password
userSchema.post("save", function (doc:any, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExists = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>("User", userSchema);
