/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface TContact {
  name?: string;
  address?: string;
  telephone?: string;
}

export interface TMaintenanceOutcome {
  name?: string;
  date?: Date;
  desiredOutcome?: string;
  whatICanStillDoForMyself?: string;
  whatIFindDifficult?: string;
  thingsIEnjoy?: string;
  thingsIDoNotLike?: string;
  howAndWhereIPreferToEat?: string;
  thingsIMustHave?: string;
  howYouCanHelpMe?: string;
  identifiedRisks?: string;
}

export interface TChangeOutcome {
  name?: string;
  date?: Date;
  desiredOutcome?: string;
  howYouCanHelpMeImprove?: string;
  howYouCanSupportMeToImprove?: string;
  other?: string;
}

export interface TServiceProcessOutcome {
  name?: string;
  date?: Date;
  desiredOutcome?: string;
  howYouWillSupportMe?: string;
}

export interface TInformationFrom {
  person?: boolean;
  relative?: boolean;
  agencies?: boolean;
  other?: boolean;
  observation?: boolean;
}

export interface TContacts {
  socialWorker?: TContact;
  generalPractitioner?: TContact;
  hospitalConsultants?: TContact;
  pharmacist?: TContact;
  communityNurse?: TContact;
  nextOfKin1?: TContact;
  nextOfKin2?: TContact;
  keyHolder?: TContact;
  otherAgency?: TContact;
}

export interface TServiceuserAssessmentForm {
  // Reference
  serviceUserId?: Types.ObjectId;

  // Core identifiers
  serviceUserIdNumber: string; // Required and unique in schema
  dateOfAssessment?: Date;
  assessorName?: string;
  assessorSignature?: string;

  // Personal details
  myAddress?: string;
  myName?: string;
  preferredName?: string;
  myPhoneNumber?: string;
  myBirthday?: Date;
  importantPeopleToMe?: string;
  areasOfHighRisk?: string;
  backgroundSkillsAndInterests?: string;
  likes?: string;
  dislikes?: string;
  tipsForTalkingToMe?: string;
  criticalCareAndSupportNeeds?: string[];

  // Contacts
  contacts?: TContacts;

  // Background / Needs Assessment
  importantAboutMyPast?: string;
  howMyPastAffectsMeToday?: string;
  howToSupportMeWithMyPast?: string;
  importantAboutMyCulturalBackground?: string;
  howToSupportMyCulturalIdentity?: string;
  myUseOfLanguage?: string;
  peopleAndOrganisationsImportantToMe?: string;

  // Beliefs
  myBeliefs?: string;
  howToHelpSustainMyBeliefs?: string;
  specificSupportInformation?: string;

  // Outcomes
  maintenancePreventionOutcomes?: TMaintenanceOutcome[];
  changeOutcomes?: TChangeOutcome[];
  serviceProcessOutcomes?: TServiceProcessOutcome[];

  // Sign-off
  completedBy?: string;
  completedDate?: Date;
  lastReviewedBy?: string;
  lastReviewedDate?: Date;

  informationFrom?: TInformationFrom;

  signatureOfPerson?: string;
  signatureOfRelative?: string;

  // Completion status
  isCompleted?: boolean; // Added this field

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export type ServiceuserAssessmentFormModel = Model<TServiceuserAssessmentForm>;