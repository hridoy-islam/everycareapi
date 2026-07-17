/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface TServiceuserAssessmentForm {

  // Core identifiers
  serviceUserIdNumber?: string;
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

  // Contacts — flat Name / Address / Telephone per contact
  socialWorkerName?: string;
  socialWorkerAddress?: string;
  socialWorkerTelephone?: string;
  generalPractitionerName?: string;
  generalPractitionerAddress?: string;
  generalPractitionerTelephone?: string;
  hospitalConsultantsName?: string;
  hospitalConsultantsAddress?: string;
  hospitalConsultantsTelephone?: string;
  pharmacistName?: string;
  pharmacistAddress?: string;
  pharmacistTelephone?: string;
  communityNurseName?: string;
  communityNurseAddress?: string;
  communityNurseTelephone?: string;
  nextOfKin1Name?: string;
  nextOfKin1Address?: string;
  nextOfKin1Telephone?: string;
  nextOfKin2Name?: string;
  nextOfKin2Address?: string;
  nextOfKin2Telephone?: string;
  keyHolderName?: string;
  keyHolderAddress?: string;
  keyHolderTelephone?: string;
  otherAgencyName?: string;
  otherAgencyAddress?: string;
  otherAgencyTelephone?: string;

  // Background / needs assessment
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

  // Maintenance / Prevention Outcomes — 9 outcomes, each flattened
  physicalNeedsCanDo?: string;
  physicalNeedsFindDifficult?: string;
  physicalNeedsHelp?: string;
  physicalNeedsRisks?: string;
  cleanPresentableCanDo?: string;
  cleanPresentableFindDifficult?: string;
  cleanPresentableHelp?: string;
  cleanPresentableRisks?: string;
  foodAndDrinkCanDo?: string;
  foodAndDrinkFindDifficult?: string;
  foodAndDrinkThingsIEnjoy?: string;
  foodAndDrinkThingsIDoNotLike?: string;
  foodAndDrinkHowAndWhereIPreferToEat?: string;
  foodAndDrinkThingsIMustHave?: string;
  foodAndDrinkHelp?: string;
  foodAndDrinkRisks?: string;
  physicallyComfortableCanDo?: string;
  physicallyComfortableFindDifficult?: string;
  physicallyComfortableHelp?: string;
  physicallyComfortableRisks?: string;
  personalSafetyCanDo?: string;
  personalSafetyFindDifficult?: string;
  personalSafetyHelp?: string;
  personalSafetyRisks?: string;
  cleanTidyHomeCanDo?: string;
  cleanTidyHomeFindDifficult?: string;
  cleanTidyHomeHelp?: string;
  cleanTidyHomeRisks?: string;
  alertAndActiveCanDo?: string;
  alertAndActiveFindDifficult?: string;
  alertAndActiveHelp?: string;
  alertAndActiveRisks?: string;
  socialContactCanDo?: string;
  socialContactFindDifficult?: string;
  socialContactHelp?: string;
  socialContactRisks?: string;
  dailyRoutinesCanDo?: string;
  dailyRoutinesFindDifficult?: string;
  dailyRoutinesHelp?: string;
  dailyRoutinesRisks?: string;

  // Change Outcomes (flat)
  physicalSymptomsHelpImprove?: string;
  physicalSymptomsSupportImprove?: string;
  physicalSymptomsOther?: string;
  moraleWellbeingSupportImprove?: string;

  // Service Process Outcomes (flat)
  feelingValuedRespectedSupport?: string;
  treatedAsIndividualSupport?: string;
  sayAndControlSupport?: string;
  culturalReligiousCompatibilitySupport?: string;

  // Sign-off
  completedBy?: string;
  completedDate?: Date;
  lastReviewedBy?: string;
  lastReviewedDate?: Date;
  informationFromPerson?: boolean;
  informationFromRelative?: boolean;
  informationFromAgencies?: boolean;
  informationFromOther?: boolean;
  informationFromObservation?: boolean;
  signatureOfPerson?: string;
  signatureOfRelative?: string;

  isCompleted?: boolean;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export type ServiceuserAssessmentFormModel = Model<TServiceuserAssessmentForm>;
