import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { JobApplicationSearchableFields } from "./jobApplication.constant";
import { TJobApplication } from "./jobApplication.interface";
import { JobApplication } from "./jobApplication.model";
import AppError from "../../errors/AppError";
import { application } from "express";
import mongoose from "mongoose";
import { sendEmail } from "../../utils/sendEmail";
import { sendEmailAdmin } from "../../utils/sendEmailAdmin";
import moment from "moment";
import { sendEmailToReference } from "../../utils/sendEmailToReference";
import crypto from "crypto";

const getAllJobApplicationFromDB = async (query: Record<string, unknown>) => {
  const { searchTerm, ...otherQueryParams } = query;

  const processedQuery: Record<string, any> = { ...otherQueryParams };



  const ApplicationQuery = new QueryBuilder(
    JobApplication.find().populate("jobId").populate({
      path: "applicantId",
      select: "title firstName initial lastName email phone",
    }),
    processedQuery
  )
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await ApplicationQuery.countTotal();
  const result = await ApplicationQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleJobApplicationFromDB = async (id: string) => {
  const result = await JobApplication.findById(id).populate("jobId");
  return result;
};

const updateJobApplicationIntoDB = async (
  id: string,
  payload: Partial<TJobApplication>
) => {
  const application = await JobApplication.findById(id);
  if (!application) {
    throw new AppError(httpStatus.NOT_FOUND, "Application not found");
  }

  const result = await JobApplication.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


interface PopulatedJobApplication extends Omit<TJobApplication, "jobId" | "applicantId"> {
  jobId: { jobTitle: string };
  applicantId: { name: string; email: string };
}


const createJobApplicationIntoDB = async (
  payload: Partial<TJobApplication>
) => {

  if (!payload.jobId || !payload.applicantId) {
    throw new Error("Both jobId and applicantId are required");
  }

  // Check if application already exists for this jobId and applicantId
  const existingApplication = await JobApplication.findOne({
    jobId: payload.jobId,
    applicantId: payload.applicantId
  });

  if (existingApplication) {
    throw new Error("You have already applied for this job.");
  }



  const result = await JobApplication.create(payload);

  const populatedResult = await JobApplication.findById(result._id)
    .populate("jobId", "jobTitle")
    .populate("applicantId", "name email availableFromDate phone dateOfBirth countryOfResidence ref1Submit ref2Submit ref3Submit professionalReferee1 professionalReferee2 personalReferee isCompleted") as unknown as PopulatedJobApplication;

  if (!populatedResult) {
    throw new Error("Failed to populate job application");
  }

  const applicant = populatedResult.applicantId;
  const jobRole = populatedResult.jobId?.jobTitle || "";

  const title = populatedResult?.jobId?.jobTitle;
  const applicantName = populatedResult?.applicantId?.name;
  const applicantEmail = populatedResult?.applicantId?.email;

  const emailSubject = `Thank you for applying to Everycare`;
  const otp = "";


  const phone = (populatedResult?.applicantId as any)?.phone;
  const countryOfResidence = (populatedResult?.applicantId as any)?.countryOfResidence;
  const formattedCountryOfResidence = countryOfResidence
    ? countryOfResidence.charAt(0).toUpperCase() + countryOfResidence.slice(1)
    : '';

  const dob = (populatedResult?.applicantId as any)?.dateOfBirth;
  const formattedDob = dob ? moment(dob).format("DD MMM, YYYY") : "N/A";
  const availableFromDate = (populatedResult?.applicantId as any)?.availableFromDate;
  const formattedAvailableFromDate = availableFromDate ? moment(availableFromDate).format("DD MMM, YYYY") : "N/A";
  const adminSubject = `New Application Received: ${title}`;



  await sendEmail(
    applicantEmail,
    "job-application",
    emailSubject,
    applicantName,
    otp,
    title
  );

  await sendEmailAdmin(
    "admin@everycareromford.co.uk",
    "job-application-admin",
    adminSubject,
    applicantName,
    otp,
    title,
    applicantEmail,
    phone,
    formattedCountryOfResidence,
    formattedDob,
    formattedAvailableFromDate
  );
  interface Referee {
    name?: string;
    email?: string;
    relationship?: string;
  }

  interface Applicant {
    _id: string;
    name: string;
    isCompleted?: boolean;
    ref1Submit?: boolean;
    ref2Submit?: boolean;
    ref3Submit?: boolean;
    professionalReferee1?: Referee;
    professionalReferee2?: Referee;
    personalReferee?: Referee;
  }

  type ReferenceData = {
    refFlag?: boolean;
    refEmail?: string;
    refPosition?: string;
    refName?: string;
    refType: "ref1" | "ref2" | "ref3";
    refRelation?: string;
  };

  // --- Trigger reference emails if user has completed their profile ---
  if (applicant?.isCompleted === true) {
    const referenceData: ReferenceData[] = [
      {
        refFlag: applicant?.ref1Submit,
        refEmail: applicant?.professionalReferee1?.email.trim().toLowerCase(),
        refName: applicant?.professionalReferee1?.name,
        refPosition: applicant?.professionalReferee1.position,
        refType: "ref1",
        refRelation: applicant?.professionalReferee1?.relationship,
      },
      {
        refFlag: applicant?.ref2Submit,
        refEmail: applicant?.professionalReferee2?.email.trim().toLowerCase(),
        refName: applicant?.professionalReferee2?.name,
        refPosition: applicant?.professionalReferee2.position,

        refType: "ref2",
        refRelation: applicant.professionalReferee2?.relationship,
      },
      {
        refFlag: applicant?.ref3Submit,
        refEmail: applicant?.personalReferee?.email.trim().toLowerCase(),
        refName: applicant?.personalReferee?.name,
        refType: "ref3",
        refRelation: applicant?.personalReferee?.relationship,
        refPosition: applicant?.personalReferee.position,

      },
    ];

    for (const ref of referenceData) {
      if (ref.refEmail && ref.refFlag !== true) {
        try {
          const basePath = ref.refType === "ref3" ? "personal" : "professional";
          const randomToken = crypto.randomBytes(24).toString("hex");
          const formatForUrl = (str = "") => encodeURIComponent(str.trim().replace(/\s+/g, "-"));

           const applicationLink = `https://everycare.netlify.app/${basePath}?${formatForUrl(
              applicantName
            )}&${formatForUrl(
              applicantEmail
            )}&${formatForUrl(ref.refName)}&${formatForUrl(
              ref.refRelation
            )}&${formatForUrl(ref.refPosition)}&${formatForUrl(
              jobRole
            )}&${formatForUrl(
              ref.refType
            )}&${randomToken}`;
            
          await sendEmailToReference(
            ref.refEmail,
            "reference-letter",
            `Reference Request for ${applicantName}`,
            applicantName,
            ref.refName || "",
            applicationLink,
            jobRole
          );

        } catch (error) {
          console.error(`❌ Failed to send reference email to ${ref.refEmail}:`, error);
        }
      }
    }
  }


  return result;
};

export const JobApplicationServices = {
  getAllJobApplicationFromDB,
  getSingleJobApplicationFromDB,
  updateJobApplicationIntoDB,
  createJobApplicationIntoDB,
};
