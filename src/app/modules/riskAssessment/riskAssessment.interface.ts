/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface TMovingHandlingEntry {
  selectedOption?: string;
  score?: string;
  risk?: string;
  minimiseRisk?: string;
}

export interface TYesNoField {
  applicable?: boolean;
  comments?: string;
  action?: string;
}

export interface TRiskAssessment {
  serviceUserId: Types.ObjectId;

  // Header info
  serviceUserName?: string;
  preferredTermOfAddress?: string;
  dateOfFirstAssessment?: Date;
  address?: string;
  dob?: Date;
  telNumber?: string;
  caseManager?: string;
  assessorsName?: string;
  assessorsSignatureUrl?: string;

  // Section 1: Moving & Handling
  section1Explanation?: string;

  // 1A. Service Users Mobility
  mobilityEntries?: TMovingHandlingEntry[];
  mobilityTotalScore?: string;
  mobilityRiskRating?: string;

  // 1B. Does the service user fall
  fallEntries?: TMovingHandlingEntry[];
  fallTotalScore?: string;

  // 1C. Incontinence
  incontinenceEntries?: TMovingHandlingEntry[];
  incontinenceTotalScore?: string;

  // 1D. Attachments
  attachmentEntries?: TMovingHandlingEntry[];
  attachmentTotalScore?: string;

  // 1E. Mental Health / Challenging Behaviour
  mentalHealthEntries?: TMovingHandlingEntry[];
  mentalHealthTotalScore?: string;

  // 1F. Sight/Hearing Impediment
  sightHearingEntries?: TMovingHandlingEntry[];
  sightHearingTotalScore?: string;

  // 1G. Weight
  weightEntries?: TMovingHandlingEntry[];
  weightTotalScore?: string;

  // 1H. Unpredictable movements
  unpredictableMovementsEntries?: TMovingHandlingEntry[];
  unpredictableMovementsTotalScore?: string;

  // Total Score Moving & Handling
  movingHandlingTotalScore?: string;
  movingHandlingRiskRating?: string;

  // Section 2: Moving & Handling Tasks
  section2Explanation?: string;
  taskEntries?: TMovingHandlingEntry[];
  tasksTotalScore?: string;
  tasksRiskRating?: string;

  // Section 3: Medication
  section3Explanation?: string;

  // 3A. Obtaining Supplies/Storage
  medicationSupplies?: TYesNoField[];

  // Taking Medication
  takingMedication?: TYesNoField[];

  // Applying Topical Applications
  topicalApplications?: TYesNoField[];

  // Medication Details (up to 6)
  medications?: {
    name?: string;
    dose?: string;
    frequency?: string;
    timeTaken?: string;
    numberPerDay?: string;
    sideEffects?: string;
    coshhRisk?: boolean;
  }[];

  // Medical Care Tasks
  medicalCareTasks?: TYesNoField[];

  // Medical History
  hasAllergies?: boolean;
  allergiesComments?: string;
  allergiesAction?: string;

  // Section 4: Risks Associated with Maintaining Independence
  section4Explanation?: string;

  // 4A. Risks to Service User
  riskCooking?: boolean;
  riskBathing?: boolean;
  riskDressing?: boolean;
  riskCleaning?: boolean;
  riskOutings?: boolean;
  riskOther?: boolean;
  riskOtherText?: string;

  // 4B. Agreed Action
  agreedActionServiceUser?: string;
  riskCookingComment?: string;
  riskBathingComment?: string;
  riskDressingComment?: string;
  riskCleaningComment?: string;
  riskOutingsComment?: string;

  // 4C. Risks to Health & Social Care Workers
  workerRiskCooking?: boolean;
  workerRiskBathing?: boolean;
  workerRiskDressing?: boolean;
  workerRiskCleaning?: boolean;
  workerRiskOutings?: boolean;
  workerRiskOther?: boolean;
  workerRiskOtherText?: string;
  workerRiskCookingComment?: string;
  workerRiskBathingComment?: string;
  workerRiskDressingComment?: string;
  workerRiskCleaningComment?: string;
  workerRiskOutingsComment?: string;

  // 4D. Agreed Action Workers
  agreedActionWorkers?: string;

  // Section 4 (Confidential): Behaviour / Criminal History
  aggressiveBehaviourVerbal?: string;
  aggressiveBehaviourVerbalAction?: string;
  aggressiveBehaviourPhysical?: string;
  aggressiveBehaviourPhysicalAction?: string;
  aggressiveBehaviourPhysical2?: string;
  aggressiveBehaviourPhysicalAction2?: string;
  aggressiveBehaviourPhysical3?: string;
  aggressiveBehaviourPhysicalAction3?: string;
  criminalHistory?: boolean;
  criminalHistoryDetails?: string;
  criminalHistoryDetails2?: string;
  criminalHistoryDetails3?: string;
  criminalHistoryCarer?: string;
  criminalHistoryCarer2?: string;
  criminalHistoryCarer3?: string;

  // Risk from Transmittable Diseases
  transmittableDiseases?: string;
  transmittableDiseases2?: string;
  transmittableDiseases3?: string;
  transmittableDiseasesCarer?: string;
  transmittableDiseasesCarer2?: string;
  transmittableDiseasesCarer3?: string;

  // Section 5: Risks Associated with Environment
  section5Explanation?: string;

  // 5A. Type of Accommodation
  accommodationType?: string[];
  accommodationOther?: string;

  // Directions / Travelling
  travellingRisks?: boolean;
  travellingRisksDetails?: string;
  travellingDirectionDetails?: string;

  // Safety Risks
  hasTelephone?: boolean;
  hasTelephoneAction?: string;
  telephoneConcerns?: boolean;
  telephoneConcernsAction?: string;
  highCrimeArea?: boolean;
  highCrimeAreaAction?: string;
  areaIsolated?: boolean;
  areaIsolatedAction?: string;
  safetyRisksComments?: string;

  // Services Location & Fire Hazards
  waterCutOff?: string;
  gasCutOff?: string;
  electricMeter?: string;
  electricalWiringConcerns?: boolean;
  electricMeterType?: string;
  lightingConcerns?: boolean;
  circuitBreaker?: boolean;
  residualCurrentDevice?: boolean;
  heatingSource?: string;
  gasConcerns?: boolean;
  heatingConcerns?: boolean;
  cookingSource?: string;
  hotWaterConcerns?: boolean;
  thermostaticRegulator?: boolean;
  securityLocks?: boolean;
  keyBox?: boolean;
  keyBoxLocation?: string;
  stairGates?: boolean;
  monitoredMedicationBox?: boolean;
  keySafe?: boolean;
  serviceUserSmoker?: boolean;
  fireHazards?: boolean;
  staffRisks?: boolean;
  serviceUserRisks?: boolean;
  fireOfficerAssessment?: boolean;
  fireEscapeRoutes?: string;

  // Premises
  unauthorisedActivitiesClarified?: boolean;
  adequateLighting?: boolean;
  accessWaysHazards?: boolean;
  buildingRepair?: boolean;
  tripsFallsHazards?: boolean;
  stairsRepair?: boolean;
  lowCeilings?: boolean;
  ventilationConcerns?: boolean;
  leadConcerns?: boolean;
  asbestosConcerns?: boolean;
  noiseConcerns?: boolean;
  dirtDustConcerns?: boolean;
  wasteConcerns?: boolean;
  pestInfestation?: boolean;
  unsanitaryConditions?: boolean;
  coldHeatConcerns?: boolean;
  roomSizeConcerns?: boolean;
  liftsHoistsConcerns?: boolean;
  adaptationsConcerns?: boolean;
  brokenGlazing?: boolean;

  // Tasks & Equipment
  coshhSubstances?: boolean;
  coshhRequiredSubstances?: boolean;
  coshhSheetsAvailable?: boolean;
  animalsInHome?: boolean;
  animalSafetyRisk?: boolean;
  animalHygieneRisk?: boolean;
  animalWaste?: boolean;
  environmentalWaste?: boolean;
  bodilyExcrements?: boolean;
  identifiedRisksStaff?: boolean;
  crackedWindows?: boolean;
  crackedWindowsDoNotClean?: boolean;
  identifiedRisksServiceUser?: boolean;
  protectiveClothingNeeded?: boolean;
  risksToStaff?: boolean;
  risksToServiceUser?: boolean;
  risksToOthers?: boolean;

  // Finances
  cashSecure?: boolean;
  financialRisks?: boolean;
  financialRisksMinimise?: string;
  staffHandleMoney?: boolean;

  // Food Hygiene
  foodInDate?: boolean;
  foodPreparation?: boolean;
  foodHygieneStandards?: boolean;
  cookingFacilitiesSafe?: boolean;
  refrigeratorTemp?: boolean;
  freezerTemp?: boolean;
  handWashingFacilities?: boolean;
  kitchenClean?: boolean;
  separateStorage?: boolean;
  hotColdWater?: boolean;

  // Outings
  staffTrainingNeeded?: boolean;
  outingStaffRisks?: boolean;
  outingServiceUserRisks?: boolean;
  staffTakeOut?: boolean;
  staffTransport?: boolean;
  publicTransport?: boolean;
  otherTransport?: boolean;
  carUsed?: boolean;

  // Section 6: Support Staff Input
  section6Explanation?: string;
  careWorkerComments?: string;
  additionalRisksIdentified?: string;

  // Section 7: Action Plan and Agreement
  actionNeededPriorService?: string;
  assessorName?: string;
  assessorSignatureUrl?: string;
  assessorDate?: Date;
  serviceUserNameKin?: string;
  serviceUserSignatureUrl?: string;
  serviceUserDate?: Date;
  nextReviewDate?: Date;
  personResponsible?: string;
  dateCompletionReview?: Date;
  equipmentRequired?: string;
  equipmentSupplierName?: string;
  equipmentSupplierTel?: string;
  equipmentServiceInterval?: string;
  equipmentServiceDate?: Date;
  hoistServiceDate?: Date;
  equipmentName1?: string;
  equipmentName2?: string;

  // Details (free text) for environment / premises / finance / food / outings checks
  electricalWiringConcernsDetails?: string;
  circuitBreakerDetails?: string;
  residualCurrentDeviceDetails?: string;
  lightingConcernsDetails?: string;
  gasConcernsDetails?: string;
  heatingConcernsDetails?: string;
  hotWaterConcernsDetails?: string;
  thermostaticRegulatorDetails?: string;
  securityLocksDetails?: string;
  stairGatesDetails?: string;
  monitoredMedicationBoxDetails?: string;
  keySafeDetails?: string;
  serviceUserSmokerDetails?: string;
  fireHazardsDetails?: string;
  staffRisksDetails?: string;
  serviceUserRisksDetails?: string;
  fireOfficerAssessmentDetails?: string;
  unauthorisedActivitiesClarifiedDetails?: string;
  adequateLightingDetails?: string;
  accessWaysHazardsDetails?: string;
  buildingRepairDetails?: string;
  tripsFallsHazardsDetails?: string;
  stairsRepairDetails?: string;
  lowCeilingsDetails?: string;
  ventilationConcernsDetails?: string;
  leadConcernsDetails?: string;
  asbestosConcernsDetails?: string;
  noiseConcernsDetails?: string;
  dirtDustConcernsDetails?: string;
  wasteConcernsDetails?: string;
  pestInfestationDetails?: string;
  unsanitaryConditionsDetails?: string;
  coldHeatConcernsDetails?: string;
  roomSizeConcernsDetails?: string;
  liftsHoistsConcernsDetails?: string;
  adaptationsConcernsDetails?: string;
  brokenGlazingDetails?: string;
  coshhSubstancesDetails?: string;
  coshhRequiredSubstancesDetails?: string;
  coshhSheetsAvailableDetails?: string;
  animalsInHomeDetails?: string;
  animalSafetyRiskDetails?: string;
  animalHygieneRiskDetails?: string;
  animalWasteDetails?: string;
  environmentalWasteDetails?: string;
  bodilyExcrementsDetails?: string;
  identifiedRisksStaffDetails?: string;
  crackedWindowsDetails?: string;
  crackedWindowsDoNotCleanDetails?: string;
  identifiedRisksServiceUserDetails?: string;
  protectiveClothingNeededDetails?: string;
  risksToStaffDetails?: string;
  risksToServiceUserDetails?: string;
  risksToOthersDetails?: string;
  cashSecureDetails?: string;
  staffHandleMoneyDetails?: string;
  foodInDateDetails?: string;
  foodPreparationDetails?: string;
  foodHygieneStandardsDetails?: string;
  cookingFacilitiesSafeDetails?: string;
  refrigeratorTempDetails?: string;
  freezerTempDetails?: string;
  handWashingFacilitiesDetails?: string;
  kitchenCleanDetails?: string;
  separateStorageDetails?: string;
  hotColdWaterDetails?: string;
  staffTrainingNeededDetails?: string;
  outingStaffRisksDetails?: string;
  outingServiceUserRisksDetails?: string;
  staffTakeOutDetails?: string;
  staffTransportDetails?: string;
  publicTransportDetails?: string;
  otherTransportDetails?: string;
  carUsedDetails?: string;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export type RiskAssessmentModel = Model<TRiskAssessment>;
