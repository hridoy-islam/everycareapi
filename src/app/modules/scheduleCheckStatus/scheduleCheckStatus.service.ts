import httpStatus from "http-status";
import moment from '../../utils/moment-setup';
import { User } from "../user/user.model";
import { ScheduleCheck } from "../scheduleCheck/scheduleCheck.model";
import { Passport } from "../passport/passport.model";
import { VisaCheck } from "../visaCheck/visaCheck.model";
import { DbsForm } from "../dbsForm/dbsForm.model";
import { ImmigrationStatus } from "../immigrationStatus/immigrationStatus.model";
import { Appraisal } from "../appraisal/appraisal.model";
import { RightToWork } from "../rightToWork/rightToWork.model";
import { SpotCheck } from "../spotCheck/spotCheck.model";
import { Supervision } from "../supervision/supervision.model";
// import { Training } from "../training/training.model";
import { EmployeeTraining } from "../employeeTraining/employeeTraining.model";
import { Induction } from "../induction/induction.model";
import { Disciplinary } from "../disciplinary/disciplinary.model";
import { QACheck } from "../qaCheck/QACheck.model";
import { EmployeeDocument } from "../employeeDocument/employeeDocument.model";
import { MIN_REFERENCE_COUNT, REQUIRED_DOCUMENTS_LIST } from "../employeeDocument/employeeDocument.constant";

// import { HealthAndSafety } from "../healthAndSafety/healthAndSafety.model";
import { Leaver } from "../leaver/leaver.model";

// --- Helper: Get leaver userIds for a company ---
const getLeaverIds = async () => {
  return Leaver.distinct("userId");
};

const getSettingsAndThreshold = async (
  type:
    | "passport"
    | "visa"
    | "dbs"
    | "immigration"
    | "appraisal"
    | "rtw"
    | "spot"
    | "supervision"
    | "disciplinary"
    | "qa",
) => {
  const settings = await ScheduleCheck.findOne();

  const defaults = {
    passport: 30,
    visa: 30,
    dbs: 30,
    immigration: 30,
    appraisal: 30,
    rtw: 30,
    spot: 30,
    supervision: 30,
    disciplinary: 30,
    qa: 30,
  };

  const fieldMap: Record<string, keyof any> = {
    passport: "passportCheckDate",
    visa: "visaCheckDate",
    dbs: "dbsCheckDate",
    immigration: "immigrationCheckDate",
    appraisal: "appraisalCheckDate",
    rtw: "rtwCheckDate",
    spot: "spotCheckDate",
    supervision: "supervisionCheckDate",
    disciplinary: "disciplinaryCheckDate",
    qa: "qaCheckDate",
  };

  const fieldName = fieldMap[type];
  const checkDays = settings
    ? settings[fieldName as keyof typeof settings] || defaults[type]
    : defaults[type];

  return moment().add(checkDays, "days").toDate();
};

// --- 1. Passport Compliance Service ---
const getPassportComplianceList = async () => {
  const thresholdDate = await getSettingsAndThreshold("passport");
  const leaverIds = await getLeaverIds();

  const compliantIds = await Passport.distinct("userId", {
    passportExpiryDate: { $gt: thresholdDate },
  });

  const nonCompliantUsers = await User.find({
    role: "employee",
    noRtwCheck: { $ne: true },
    _id: { $nin: [...compliantIds, ...leaverIds] },
  })
    .select("firstName lastName email designationId departmentId avatar")
    .populate("departmentId designationId");

  const expiringDocs = await Passport.find({
    userId: { $in: nonCompliantUsers.map((u) => u._id) },
  });

  return nonCompliantUsers.map((user) => {
    const doc = expiringDocs.find(
      (d) => d.userId.toString() === user._id.toString(),
    );
    if (doc) {
      return { ...doc.toObject(), userId: user };
    }
    return {
      userId: user,
      passportExpiryDate: null,
      status: "missing",
    };
  });
};

// --- 2. Visa Compliance Service ---
const getVisaComplianceList = async () => {
  const thresholdDate = await getSettingsAndThreshold("visa");
  const leaverIds = await getLeaverIds();

  const compliantIds = await VisaCheck.distinct("employeeId", {
    expiryDate: { $gt: thresholdDate },
  });

  const nonCompliantUsers = await User.find({
    role: "employee",
    noRtwCheck: { $ne: true },
    _id: { $nin: [...compliantIds, ...leaverIds] },
  })
    .select("firstName lastName email designationId departmentId avatar")
    .populate("departmentId designationId");

  const expiringDocs = await VisaCheck.find({
    employeeId: { $in: nonCompliantUsers.map((u) => u._id) },
  });

  return nonCompliantUsers.map((user) => {
    const doc = expiringDocs.find(
      (d) => d.employeeId.toString() === user._id.toString(),
    );
    if (doc) {
      return { ...doc.toObject(), employeeId: user };
    }
    return {
      employeeId: user,
      expiryDate: null,
      status: "missing",
    };
  });
};

// --- 3. DBS Compliance Service ---
const getDbsComplianceList = async () => {
  const thresholdDate = await getSettingsAndThreshold("dbs");
  const leaverIds = await getLeaverIds();

  const compliantIds = await DbsForm.distinct("userId", {
    expiryDate: { $gt: thresholdDate },
  });

  const nonCompliantUsers = await User.find({
    role: "employee",
    _id: { $nin: [...compliantIds, ...leaverIds] },
  })
    .select("firstName lastName email designationId departmentId avatar")
    .populate("departmentId designationId");

  const expiringDocs = await DbsForm.find({
    userId: { $in: nonCompliantUsers.map((u) => u._id) },
  });

  return nonCompliantUsers.map((user) => {
    const doc = expiringDocs.find(
      (d) => d.userId.toString() === user._id.toString(),
    );
    if (doc) {
      return { ...doc.toObject(), userId: user };
    }
    return {
      userId: user,
      expiryDate: null,
      status: "missing",
    };
  });
};

// --- 4. Immigration Compliance Service ---
const getImmigrationComplianceList = async () => {
  const thresholdDate = await getSettingsAndThreshold("immigration");
  const leaverIds = await getLeaverIds();

  const compliantIds = await ImmigrationStatus.distinct("employeeId", {
    nextCheckDate: { $gt: thresholdDate },
  });

  const nonCompliantUsers = await User.find({
    noRtwCheck: { $ne: true },
    role: "employee",
    _id: { $nin: [...compliantIds, ...leaverIds] },
  })
    .select("firstName lastName email designationId departmentId avatar")
    .populate("departmentId designationId");

  const expiringDocs = await ImmigrationStatus.find({
    employeeId: { $in: nonCompliantUsers.map((u) => u._id) },
  });

  return nonCompliantUsers.map((user) => {
    const doc = expiringDocs.find(
      (d) => d.employeeId.toString() === user._id.toString(),
    );
    if (doc) {
      return { ...doc.toObject(), employeeId: user };
    }
    return {
      employeeId: user,
      nextCheckDate: null,
      status: "missing",
    };
  });
};

// --- 5. Appraisal Compliance Service ---
const getAppraisalComplianceList = async () => {
  const thresholdDate = await getSettingsAndThreshold("appraisal");
  const leaverIds = await getLeaverIds();

  const compliantIds = await Appraisal.distinct("employeeId", {
    nextCheckDate: { $gt: thresholdDate },
  });

  const nonCompliantUsers = await User.find({
    role: "employee",
    _id: { $nin: [...compliantIds, ...leaverIds] },
  })
    .select("firstName lastName email designationId departmentId avatar")
    .populate("departmentId designationId");

  const expiringDocs = await Appraisal.find({
    employeeId: { $in: nonCompliantUsers.map((u) => u._id) },
  });

  return nonCompliantUsers.map((user) => {
    const doc = expiringDocs.find(
      (d) => d.employeeId.toString() === user._id.toString(),
    );
    if (doc) {
      return { ...doc.toObject(), employeeId: user };
    }
    return {
      employeeId: user,
      nextCheckDate: null,
      status: "missing",
    };
  });
};

// --- 6. Right To Work (RTW) Compliance Service ---
const getRtwComplianceList = async () => {
  const thresholdDate = await getSettingsAndThreshold("rtw");
  const leaverIds = await getLeaverIds();

  const compliantIds = await RightToWork.distinct("employeeId", {
    nextCheckDate: { $gt: thresholdDate },
  });

  const nonCompliantUsers = await User.find({
    role: "employee",
    noRtwCheck: { $ne: true },
    _id: { $nin: [...compliantIds, ...leaverIds] },
  })
    .select("firstName lastName email designationId departmentId avatar")
    .populate("departmentId designationId");

  const expiringDocs = await RightToWork.find({
    employeeId: { $in: nonCompliantUsers.map((u) => u._id) },
  });

  return nonCompliantUsers.map((user) => {
    const doc = expiringDocs.find(
      (d) => d.employeeId.toString() === user._id.toString(),
    );
    if (doc) {
      return { ...doc.toObject(), employeeId: user };
    }
    return {
      employeeId: user,
      nextCheckDate: null,
      status: "missing",
    };
  });
};

const getSpotCheckComplianceList = async () => {
  const thresholdDate = await getSettingsAndThreshold("spot");
  const leaverIds = await getLeaverIds();

  const compliantIds = await SpotCheck.distinct("employeeId", {
    scheduledDate: { $gt: thresholdDate },
  });

  const nonCompliantUsers = await User.find({
    role: "employee",
    _id: { $nin: [...compliantIds, ...leaverIds] },
  })
    .select("firstName lastName email designationId departmentId avatar")
    .populate("departmentId designationId");

  const expiringDocs = await SpotCheck.find({
    employeeId: { $in: nonCompliantUsers.map((u) => u._id) },
  });

  return nonCompliantUsers.map((user) => {
    const doc = expiringDocs.find(
      (d) => d.employeeId.toString() === user._id.toString(),
    );
    if (doc) {
      return { ...doc.toObject(), employeeId: user, status: "due-soon" };
    }
    return {
      employeeId: user,
      scheduledDate: null,
      status: "missing",
    };
  });
};

const getSupervisionComplianceList = async () => {
  const thresholdDate = await getSettingsAndThreshold("supervision");
  const leaverIds = await getLeaverIds();

  const compliantIds = await Supervision.distinct("employeeId", {
    scheduledDate: { $gt: thresholdDate },
  });

  const nonCompliantUsers = await User.find({
    role: "employee",
    _id: { $nin: [...compliantIds, ...leaverIds] },
  })
    .select("firstName lastName email designationId departmentId avatar")
    .populate("departmentId designationId");

  const expiringDocs = await Supervision.find({
    employeeId: { $in: nonCompliantUsers.map((u) => u._id) },
  });

  return nonCompliantUsers.map((user) => {
    const doc = expiringDocs.find(
      (d) => d.employeeId.toString() === user._id.toString(),
    );
    if (doc) {
      return { ...doc.toObject(), employeeId: user, status: "due-soon" };
    }
    return {
      employeeId: user,
      scheduledDate: null,
      status: "missing",
    };
  });
};

const getInductionComplianceList = async () => {
  const leaverIds = await getLeaverIds();

  const compliantIds = await Induction.distinct("employeeId", {
    inductionDate: { $exists: true },
  });

  const missingInductionUsers = await User.find({
    role: "employee",
    _id: { $nin: [...compliantIds, ...leaverIds] },
  })
    .select("firstName lastName email designationId departmentId avatar")
    .populate("departmentId designationId");

  return missingInductionUsers.map((user) => ({
    employeeId: user,
    inductionDate: null,
    status: "missing",
  }));
};

const getDisciplinaryComplianceList = async () => {
  const thresholdDate = await getSettingsAndThreshold("disciplinary");
  const leaverIds = await getLeaverIds();

  const activeIssues = await Disciplinary.find({
    issueDeadline: { $exists: true, $lte: thresholdDate },
    employeeId: { $nin: leaverIds },
  }).populate({
    path: "employeeId",
    match: { role: "employee" },
    select: "firstName lastName email designationId departmentId avatar",
    populate: { path: "departmentId designationId" },
  });

  const validDocs = activeIssues.filter((doc) => doc.employeeId);

  return validDocs.map((doc) => {
    const isOverdue = moment(doc.issueDeadline).isBefore(new Date());
    return {
      ...doc.toObject(),
      status: isOverdue ? "overdue" : "due-soon",
    };
  });
};

const getQaComplianceList = async () => {
  const thresholdDate = await getSettingsAndThreshold("qa");
  const leaverIds = await getLeaverIds();

  const compliantIds = await QACheck.distinct("employeeId", {
    scheduledDate: { $gt: thresholdDate },
  });

  const nonCompliantUsers = await User.find({
    role: "employee",
    _id: { $nin: [...compliantIds, ...leaverIds] },
  })
    .select("firstName lastName email designationId departmentId avatar")
    .populate("departmentId designationId");

  const qaDocs = await QACheck.find({
    employeeId: { $in: nonCompliantUsers.map((u) => u._id) },
  });

  return nonCompliantUsers.map((user) => {
    const doc = qaDocs.find(
      (d) => d.employeeId.toString() === user._id.toString(),
    );
    if (doc) {
      return { ...doc.toObject(), employeeId: user, status: "due-soon" };
    }
    return {
      employeeId: user,
      scheduledDate: null,
      status: "missing",
    };
  });
};

const getEmployeeDocumentComplianceList = async () => {
  const leaverIds = await getLeaverIds();

  const employees = await User.find({
    role: "employee",
    _id: { $nin: leaverIds },
  })
    .select("firstName lastName email designationId departmentId avatar isBritish")
    .populate("departmentId designationId");

  if (employees.length === 0) return [];

  const employeeIds = employees.map((e) => e._id);

  const allDocs = await EmployeeDocument.find({
    employeeId: { $in: employeeIds },
  }).select("employeeId documentTitle");

  const nonCompliantList = employees
    .map((user) => {
      const userDocs = allDocs.filter(
        (d) => d.employeeId.toString() === user._id.toString(),
      );

      const uploadedTitles = userDocs.map((d) =>
        d.documentTitle.trim().toLowerCase(),
      );

      let requiredForThisUser = [...REQUIRED_DOCUMENTS_LIST];
      
      // if (user.noRtwCheck) {
      //   requiredForThisUser = requiredForThisUser.filter(
      //     (req) => !["Immigration Status", "Right to Work", "Passport"].includes(req)
      //   );
      // } 

      const missing = requiredForThisUser.filter(
        (req) => !uploadedTitles.includes(req.toLowerCase()),
      );

      const refCount = uploadedTitles.filter(
        (t) => t.includes("reference") && !t.includes("dbs"),
      ).length;

      if (refCount < MIN_REFERENCE_COUNT) {
        missing.push(
          `Reference (Uploaded: ${refCount}, Required: ${MIN_REFERENCE_COUNT})`,
        );
      }

      if (missing.length > 0) {
        return {
          employeeId: user,
          missingDocuments: missing,
          status: "missing",
        };
      }
      return null; 
    })
    .filter((item) => item !== null); 

  return nonCompliantList;
};

const getCompanyComplianceStats = async () => {
  const leaverIds = await getLeaverIds();

  const employees = await User.find({
    role: "employee",
    _id: { $nin: leaverIds },
  }).select("_id noRtwCheck isBritish");

  const employeeIds = employees.map((user) => user._id);
  const totalEmployees = employeeIds.length;

  const rtwRequiredEmployeeIds = employees.filter((user) => !user.noRtwCheck).map((u) => u._id);

  if (totalEmployees === 0) {
    return {
      passport: 0, rtw: 0, visa: 0, dbs: 0, immigration: 0, appraisal: 0,
      spot: 0, supervision: 0, training: 0, induction: 0, disciplinary: 0, employeeDocument: 0, meeting: 0,
      policy: 0, healthAndSafety: 0,
    };
  }

  const settings = await ScheduleCheck.findOne();
  const defaults = {
    passport: 30, visa: 30, dbs: 30, immigration: 30, appraisal: 30,
    rtw: 30, spot: 30, supervision: 30, disciplinary: 30, qa: 30, meeting: 3,
    policy: 30, healthAndSafety: 30,
  };

  const intervals = {
    passport: settings?.passportCheckDate || defaults.passport,
    visa: settings?.visaCheckDate || defaults.visa,
    dbs: settings?.dbsCheckDate || defaults.dbs,
    immigration: settings?.immigrationCheckDate || defaults.immigration,
    appraisal: settings?.appraisalCheckDate || defaults.appraisal,
    rtw: settings?.rtwCheckDate || defaults.rtw,
    spot: settings?.spotCheckDate || defaults.spot,
    supervision: settings?.supervisionCheckDate || defaults.supervision,
    disciplinary: settings?.disciplinaryCheckDate || defaults.disciplinary,
    qa: settings?.qaCheckDate || defaults.qa,
    meeting: settings?.meetingCheckDate || defaults.meeting,
    policy: settings?.policyCheckDate || defaults.policy,
    healthAndSafety: settings?.healthAndSafetyCheckDate || defaults.healthAndSafety,
  };

  const getSafeThreshold = (days: number) => moment().add(days, "days").toDate();

  const [
    compliantPassportIds,
    compliantVisaIds,
    compliantImmigrationIds,
    compliantRTWIds,
    compliantDbsIds,
    compliantAppraisalIds,
    compliantSpotCheckIds,
    compliantSupervisionIds,
    compliantQaIds,
    compliantInductionIds,
    activeDisciplinaryIssues,
    allEmployeeDocs,
  ] = await Promise.all([
    Passport.distinct("userId", {
      userId: { $in: rtwRequiredEmployeeIds },
      passportExpiryDate: { $gt: getSafeThreshold(intervals.passport) },
    }),
    VisaCheck.distinct("employeeId", {
      employeeId: { $in: rtwRequiredEmployeeIds },
      expiryDate: { $gt: getSafeThreshold(intervals.visa) },
    }),
    ImmigrationStatus.distinct("employeeId", {
      employeeId: { $in: rtwRequiredEmployeeIds },
      nextCheckDate: { $gt: getSafeThreshold(intervals.immigration) },
    }),
    RightToWork.distinct("employeeId", {
      employeeId: { $in: rtwRequiredEmployeeIds },
      nextCheckDate: { $gt: getSafeThreshold(intervals.rtw) },
    }),
    DbsForm.distinct("userId", {
      userId: { $in: employeeIds },
      expiryDate: { $gt: getSafeThreshold(intervals.dbs) },
    }),
    Appraisal.distinct("employeeId", {
      employeeId: { $in: employeeIds },
      nextCheckDate: { $gt: getSafeThreshold(intervals.appraisal) },
    }),
    SpotCheck.distinct("employeeId", {
      employeeId: { $in: employeeIds },
      scheduledDate: { $gt: getSafeThreshold(intervals.spot) },
    }),
    Supervision.distinct("employeeId", {
      employeeId: { $in: employeeIds },
      scheduledDate: { $gt: getSafeThreshold(intervals.supervision) },
    }),
    QACheck.distinct("employeeId", {
      employeeId: { $in: employeeIds },
      scheduledDate: { $gt: getSafeThreshold(intervals.qa) },
    }),
    Induction.distinct("employeeId", {
      employeeId: { $in: employeeIds },
      inductionDate: { $exists: true },
    }),
    Disciplinary.find({
      employeeId: { $in: employeeIds },
      issueDeadline: { $exists: true, $lte: getSafeThreshold(intervals.disciplinary) },
    }).countDocuments(),
    EmployeeDocument.find({
      employeeId: { $in: employeeIds },
    }).select("employeeId documentTitle"),
  ]);

  let employeeDocumentNonCompliantCount = 0;

  employees.forEach((user) => {
    const userDocs = allEmployeeDocs.filter(
      (d) => d.employeeId.toString() === user._id.toString(),
    );
    const uploadedTitles = userDocs.map((d) =>
      d.documentTitle.trim().toLowerCase(),
    );

    let requiredForThisUser = [...REQUIRED_DOCUMENTS_LIST];
    if (user.noRtwCheck) {
      requiredForThisUser = requiredForThisUser.filter(
        (req) => !["Immigration Status", "Passport","Right to Work"].includes(req)
      );
    } else {
      requiredForThisUser = requiredForThisUser.filter(
        (req) => req !== "Ni number/Driving licence"
      );
    }

    const isMissingRequired = requiredForThisUser.some(
      (req) => !uploadedTitles.includes(req.toLowerCase()),
    );

    const refCount = uploadedTitles.filter(
      (t) => t.includes("reference") && !t.includes("dbs"),
    ).length;

    if (isMissingRequired || refCount < MIN_REFERENCE_COUNT) {
      employeeDocumentNonCompliantCount++;
    }
  });

  return {
    passport: rtwRequiredEmployeeIds.length - compliantPassportIds.length,
    visa: rtwRequiredEmployeeIds.length - compliantVisaIds.length,
    immigration: rtwRequiredEmployeeIds.length - compliantImmigrationIds.length,
    rtw: rtwRequiredEmployeeIds.length - compliantRTWIds.length,
    dbs: totalEmployees - compliantDbsIds.length,
    appraisal: totalEmployees - compliantAppraisalIds.length,
    spot: totalEmployees - compliantSpotCheckIds.length,
    supervision: totalEmployees - compliantSupervisionIds.length,
    induction: totalEmployees - compliantInductionIds.length,
    qa: totalEmployees - compliantQaIds.length,
    disciplinary: activeDisciplinaryIssues,
    // training: nonCompliantTrainingIds.length,
    employeeDocument: employeeDocumentNonCompliantCount, 
    // meeting: meetingNonCompliantCount, 
    // policy: policyNonCompliantCount, 
    // healthAndSafety: healthAndSafetyNonCompliantCount, 
  };
};

export const ScheduleCheckStatuServices = {
  getCompanyComplianceStats,
  getPassportComplianceList,
  getVisaComplianceList,
  getDbsComplianceList,
  getImmigrationComplianceList,
  getAppraisalComplianceList,
  getRtwComplianceList,
  getSpotCheckComplianceList,
  getSupervisionComplianceList,
  // getTrainingComplianceList,
  getInductionComplianceList,
  getDisciplinaryComplianceList,
  getQaComplianceList,
  getEmployeeDocumentComplianceList,
};