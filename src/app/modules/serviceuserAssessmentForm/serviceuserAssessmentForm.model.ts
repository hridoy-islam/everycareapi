/* eslint-disable no-unused-vars */
import { Schema, model, Model } from "mongoose";
import { TServiceuserAssessmentForm } from "./serviceuserAssessmentForm.interface";

const ServiceuserAssessmentFormSchema = new Schema<TServiceuserAssessmentForm>(
  {
    // Core identifiers
    serviceUserIdNumber: { type: String, trim: true },
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

    // Contacts — flat fields, one Name/Address/Telephone per contact
    socialWorkerName: { type: String },
    socialWorkerAddress: { type: String },
    socialWorkerTelephone: { type: String },

    generalPractitionerName: { type: String },
    generalPractitionerAddress: { type: String },
    generalPractitionerTelephone: { type: String },

    hospitalConsultantsName: { type: String },
    hospitalConsultantsAddress: { type: String },
    hospitalConsultantsTelephone: { type: String },

    pharmacistName: { type: String },
    pharmacistAddress: { type: String },
    pharmacistTelephone: { type: String },

    communityNurseName: { type: String },
    communityNurseAddress: { type: String },
    communityNurseTelephone: { type: String },

    nextOfKin1Name: { type: String },
    nextOfKin1Address: { type: String },
    nextOfKin1Telephone: { type: String },

    nextOfKin2Name: { type: String },
    nextOfKin2Address: { type: String },
    nextOfKin2Telephone: { type: String },

    keyHolderName: { type: String },
    keyHolderAddress: { type: String },
    keyHolderTelephone: { type: String },

    otherAgencyName: { type: String },
    otherAgencyAddress: { type: String },
    otherAgencyTelephone: { type: String },

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

    // Maintenance / Prevention Outcomes — 9 desired outcomes, each flattened out
    // Outcome: My basic physical needs are being met
    physicalNeedsCanDo: { type: String },
    physicalNeedsFindDifficult: { type: String },
    physicalNeedsHelp: { type: String },
    physicalNeedsRisks: { type: String },

    // Outcome: Being clean and presentable in appearance
    cleanPresentableCanDo: { type: String },
    cleanPresentableFindDifficult: { type: String },
    cleanPresentableHelp: { type: String },
    cleanPresentableRisks: { type: String },

    // Outcome: Having appropriate food and drink at appropriate times
    foodAndDrinkCanDo: { type: String },
    foodAndDrinkFindDifficult: { type: String },
    foodAndDrinkThingsIEnjoy: { type: String },
    foodAndDrinkThingsIDoNotLike: { type: String },
    foodAndDrinkHowAndWhereIPreferToEat: { type: String },
    foodAndDrinkThingsIMustHave: { type: String },
    foodAndDrinkHelp: { type: String },
    foodAndDrinkRisks: { type: String },

    // Outcome: Being physically comfortable
    physicallyComfortableCanDo: { type: String },
    physicallyComfortableFindDifficult: { type: String },
    physicallyComfortableHelp: { type: String },
    physicallyComfortableRisks: { type: String },

    // Outcome: Ensuring personal safety and security
    personalSafetyCanDo: { type: String },
    personalSafetyFindDifficult: { type: String },
    personalSafetyHelp: { type: String },
    personalSafetyRisks: { type: String },

    // Outcome: Having a clean and tidy home environment
    cleanTidyHomeCanDo: { type: String },
    cleanTidyHomeFindDifficult: { type: String },
    cleanTidyHomeHelp: { type: String },
    cleanTidyHomeRisks: { type: String },

    // Outcome: Keeping alert and active
    alertAndActiveCanDo: { type: String },
    alertAndActiveFindDifficult: { type: String },
    alertAndActiveHelp: { type: String },
    alertAndActiveRisks: { type: String },

    // Outcome: Having social contact & company
    socialContactCanDo: { type: String },
    socialContactFindDifficult: { type: String },
    socialContactHelp: { type: String },
    socialContactRisks: { type: String },

    // Outcome: Having control over daily routines
    dailyRoutinesCanDo: { type: String },
    dailyRoutinesFindDifficult: { type: String },
    dailyRoutinesHelp: { type: String },
    dailyRoutinesRisks: { type: String },

    // Change Outcomes
    // Improvements in physical symptoms and / or behaviour
    physicalSymptomsHelpImprove: { type: String },
    physicalSymptomsSupportImprove: { type: String },
    physicalSymptomsOther: { type: String },
    // Improvements in morale and well-being
    moraleWellbeingSupportImprove: { type: String },

    // Service Process Outcomes
    feelingValuedRespectedSupport: { type: String },
    treatedAsIndividualSupport: { type: String },
    sayAndControlSupport: { type: String },
    culturalReligiousCompatibilitySupport: { type: String },

    // Sign-off
    completedBy: { type: Schema.Types.ObjectId,  ref: "User" },
    completedDate: { type: Date },
    lastReviewedBy: { type: Schema.Types.ObjectId,  ref: "User" },
    lastReviewedDate: { type: Date },
    informationFromPerson: { type: Boolean, default: false },
    informationFromRelative: { type: Boolean, default: false },
    informationFromAgencies: { type: Boolean, default: false },
    informationFromOther: { type: Boolean, default: false },
    informationFromObservation: { type: Boolean, default: false },
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