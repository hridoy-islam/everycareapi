/* eslint-disable no-unused-vars */
import { Schema, model, Model } from "mongoose";
import { TServiceuserAssessmentForm } from "./serviceuserAssessmentForm.interface";

const ContactSchema = new Schema(
  {
    name: { type: String },
    address: { type: String },
    telephone: { type: String },
  },
  { _id: false },
);

const MaintenanceOutcomeSchema = new Schema(
  {
    name: { type: String },
    date: { type: Date },
    desiredOutcome: { type: String },
    whatICanStillDoForMyself: { type: String },
    whatIFindDifficult: { type: String },
    thingsIEnjoy: { type: String },
    thingsIDoNotLike: { type: String },
    howAndWhereIPreferToEat: { type: String },
    thingsIMustHave: { type: String },
    howYouCanHelpMe: { type: String },
    identifiedRisks: { type: String },
  },
  { _id: false },
);

const ChangeOutcomeSchema = new Schema(
  {
    name: { type: String },
    date: { type: Date },
    desiredOutcome: { type: String },
    howYouCanHelpMeImprove: { type: String },
    howYouCanSupportMeToImprove: { type: String },
    other: { type: String },
  },
  { _id: false },
);

const ServiceProcessOutcomeSchema = new Schema(
  {
    name: { type: String },
    date: { type: Date },
    desiredOutcome: { type: String },
    howYouWillSupportMe: { type: String },
  },
  { _id: false },
);

const ServiceuserAssessmentFormSchema = new Schema<TServiceuserAssessmentForm>(
  {
    // Core identifiers
    serviceUserIdNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    dateOfAssessment: { type: Date },
    assessorName: { type: String },
    assessorSignature: { type: String },

    // Personal details
    myAddress: { type: String },
    myName: { type: String },
    preferredName: { type: String },
    myPhoneNumber: { type: String },
    myBirthday: { type: Date },
    importantPeopleToMe: { type: String },
    areasOfHighRisk: { type: String },
    backgroundSkillsAndInterests: { type: String },
    likes: { type: String },
    dislikes: { type: String },
    tipsForTalkingToMe: { type: String },
    criticalCareAndSupportNeeds: [{ type: String }],

    // Contacts
    contacts: {
      socialWorker: ContactSchema,
      generalPractitioner: ContactSchema,
      hospitalConsultants: ContactSchema,
      pharmacist: ContactSchema,
      communityNurse: ContactSchema,
      nextOfKin1: ContactSchema,
      nextOfKin2: ContactSchema,
      keyHolder: ContactSchema,
      otherAgency: ContactSchema,
    },

    // Background / needs assessment
    importantAboutMyPast: { type: String },
    howMyPastAffectsMeToday: { type: String },
    howToSupportMeWithMyPast: { type: String },
    importantAboutMyCulturalBackground: { type: String },
    howToSupportMyCulturalIdentity: { type: String },
    myUseOfLanguage: { type: String },
    peopleAndOrganisationsImportantToMe: { type: String },

    // Beliefs
    myBeliefs: { type: String },
    howToHelpSustainMyBeliefs: { type: String },
    specificSupportInformation: { type: String },

    // Outcomes
    maintenancePreventionOutcomes: [MaintenanceOutcomeSchema],
    changeOutcomes: [ChangeOutcomeSchema],
    serviceProcessOutcomes: [ServiceProcessOutcomeSchema],

    // Sign-off
    completedBy: { type: String },
    completedDate: { type: Date },
    lastReviewedBy: { type: String },
    lastReviewedDate: { type: Date },
    informationFrom: {
      person: { type: Boolean, default: false },
      relative: { type: Boolean, default: false },
      agencies: { type: Boolean, default: false },
      other: { type: Boolean, default: false },
      observation: { type: Boolean, default: false },
    },
    signatureOfPerson: { type: String },
    signatureOfRelative: { type: String },
    isCompleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, // This will handle createdAt and updatedAt automatically
  },
);

export const ServiceuserAssessmentForm: Model<TServiceuserAssessmentForm> =
  model<TServiceuserAssessmentForm>(
    "ServiceuserAssessmentForm",
    ServiceuserAssessmentFormSchema,
  );
