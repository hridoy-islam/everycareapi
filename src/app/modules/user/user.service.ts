import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { UserSearchableFields } from "./user.constant";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../errors/AppError";
import { sendEmailToReference } from "../../utils/sendEmailToReference";
import { JobApplication } from "../jobApplications/jobApplication.model";

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

  // Update user first
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  // --- Trigger reference emails when completed ---
  if (payload.isCompleted === true) {
    // Check if user has applied for a job
    const jobApplication = await JobApplication.findOne({ applicantId: id })
      .populate("jobId", "jobTitle");

    if (jobApplication) {
      const jobRole = jobApplication.jobId?.jobTitle || "";

      // Send reference emails if not already submitted
      const referenceData = [
        {
          refFlag: result?.ref1Submit,
          refEmail: result?.professionalReferee1?.email.trim().toLowerCase(),
          refName: result?.professionalReferee1?.name,
          refType: "ref1",
          refRelation: result?.professionalReferee1?.relationship,
        },
        {
          refFlag: result?.ref2Submit,
          refEmail: result?.professionalReferee2?.email.trim().toLowerCase(),
          refName: result?.professionalReferee2?.name,
          refType: "ref2",
          refRelation: result?.professionalReferee2?.relationship,

        },
        {
          refFlag: result?.ref3Submit,
          refEmail: result?.personalReferee?.email.trim().toLowerCase(),
          refName: result?.personalReferee?.name,
          refType: "ref3",
          refRelation: result?.personalReferee?.relationship,

        },
      ];

      for (const ref of referenceData) {
        if (ref?.refEmail && ref?.refFlag === false) {
          try {
            // ✅ Determine route based on type
            const basePath =
              ref.refType === "ref3"
                ? "personal"
                : "professional";

            // ✅ Generate dynamic link

            const formatForUrl = (str = "") => encodeURIComponent(str.trim().replace(/\s+/g, "-"));


            const applicationLink = `https://everycare.netlify.app/${ref.refType}/${formatForUrl(
              result?.name || "")}/${id}/${basePath}/${formatForUrl(ref.refRelation || "")}/${formatForUrl(
              jobRole || ""
            )}`;

            // ✅ Send email
            await sendEmailToReference(
              ref.refEmail,
              "reference-letter",
              `Reference Request for ${result?.name}`,
              result?.name || "", //applicant name
              ref.refName || "", //reference name
              applicationLink,
              jobRole
            );

            console.log(`✅ Reference email sent to ${ref.refEmail}`);
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
