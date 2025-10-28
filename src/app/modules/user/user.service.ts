import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { UserSearchableFields } from "./user.constant";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../errors/AppError";
import { sendEmailToReference } from "../../utils/sendEmailToReference";
import { JobApplication } from "../jobApplications/jobApplication.model";
import crypto from "crypto";


const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(UserSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleUserFromDB = async (id: string, selectFields: string = '') => {
  let query = User.findById(id);
  
  if (selectFields) {
    query = query.select(selectFields);
  }

  const result = await query;
  return result;
};

// const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {

//   const user = await User.findById(id);
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "User not found");
//   }

//   const result = await User.findByIdAndUpdate(id, payload, {
//     new: true,
//     runValidators: true,
//   });

//   return result;
// };


export const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // ✅ Update user data
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  // ✅ Trigger reference emails when profile completed
  if (payload.isCompleted === true) {
    // Find job application for this user
    const jobApplication = await JobApplication.findOne({ applicantId: id }).populate("jobId", "jobTitle");

    if (jobApplication) {
      const jobRole = (jobApplication.jobId as any)?.jobTitle || "";
      const applicantName = result?.name || "";
      const applicantEmail = result?.email || "";

      // Define reference data
      const referenceData = [
        {
          refFlag: result?.ref1Submit,
          refEmail: result?.professionalReferee1?.email?.trim().toLowerCase(),
          refName: result?.professionalReferee1?.name,
          refPosition: result?.professionalReferee1?.position,
          refType: "ref1",
          refRelation: result?.professionalReferee1?.relationship,
        },
        {
          refFlag: result?.ref2Submit,
          refEmail: result?.professionalReferee2?.email?.trim().toLowerCase(),
          refName: result?.professionalReferee2?.name,
          refPosition: result?.professionalReferee2?.position,
          refType: "ref2",
          refRelation: result?.professionalReferee2?.relationship,
        },
        {
          refFlag: result?.ref3Submit,
          refEmail: result?.personalReferee?.email?.trim().toLowerCase(),
          refName: result?.personalReferee?.name,
          refPosition: result?.personalReferee?.position,
          refType: "ref3",
          refRelation: result?.personalReferee?.relationship,
        },
      ];

      // Loop through references and send emails
      for (const ref of referenceData) {
        if (ref?.refEmail && ref?.refFlag === false) {
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

            // console.log(`✅ Reference email sent to ${ref.refEmail}`);
          } catch (error) {
            console.error(`❌ Failed to send reference email to ${ref.refEmail}:`, error);
          }
        }
      }
    }
  }

  return result;
};

export const UserServices = {
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,

};
