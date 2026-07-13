import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.router";

import { NotificationsRoutes } from "../modules/notification/notification.route";
import { UploadDocumentRoutes } from "../modules/documents/documents.route";
import { JobApplicationRoutes } from "../modules/jobApplications/jobApplication.route";
import { InterviewRoutes } from "../modules/interview/interview.route";
import { JobRoutes } from "../modules/job/job.route";
import { ReferenceRoutes } from "../modules/applicantReference/reference.route";
import { EmailDraftRoutes } from "../modules/email-drafts/email-drafts.route";
import { SignatureRoutes } from "../modules/signature/signature.route";
import { EmailRoutes } from "../modules/email/email.route";
import { EcertRoutes } from "../modules/ecert/ecert.route";
import { EcertFormRoutes } from "../modules/EcertForm/ecertFrom.route";
import { DbsFormRoutes } from "../modules/dbsForm/dbsForm.route";
import { BankDetailsRoutes } from "../modules/bankDetailsForm/bankDetailsFrom.route";
import { MedicalQuestionRoutes } from "../modules/postMedicalQuestion/medicalQuestion.route";
import { StarterChecklistRoutes } from "../modules/starterCheckListForm/starterCheckList.route";
import { LogsRoutes } from "../modules/logs/logs.route";
import { ConfidentialityFormRoutes } from "../modules/confidentialityForm/confidentialityForm.route";
import { EmployementContractRoutes } from "../modules/employementContract/employementContract.route";
import { JobContractRoutes } from "../modules/jobContract/jobContract.route";
import { DesignationRoutes } from "../modules/designation/designation.router";
import { ContractTypeRoutes } from "../modules/contractType/contractType.router";
import { EmployeeDocumentRoutes } from "../modules/employeeDocument/employeeDocument.router";
import { ScheduleCheckRoutes } from "../modules/scheduleCheck/scheduleCheck.router";
import { AppraisalRoutes } from "../modules/appraisal/appraisal.router";
import { DisciplinaryRoutes } from "../modules/disciplinary/disciplinary.route";
import { EmployeeTrainingRoutes } from "../modules/employeeTraining/employeeTraining.router";
import { ImmigrationStatusRoutes } from "../modules/immigrationStatus/immigrationStatus.router";
import { InductionRoutes } from "../modules/induction/induction.route";
import { PassportRoutes } from "../modules/passport/passport.route";
import { QACheckRoutes } from "../modules/qaCheck/QACheck.route";
import { ScheduleCheckStatusRoutes } from "../modules/scheduleCheckStatus/scheduleCheckStatus.router";
import { SpotCheckRoutes } from "../modules/spotCheck/spotCheck.route";
import { SupervisionRoutes } from "../modules/supervision/supervision.route";
import { VisaCheckRoutes } from "../modules/visaCheck/visaCheck.router";
import { LeaverRoutes } from "../modules/leaver/leaver.router";
import { RightToWorkRoutes } from "../modules/rightToWork/rightToWork.router";
import { ServiceUserScheduleRoutes } from "../modules/serviceUserSchedule/serviceUserSchedule.router";
import { ServiceTypeRoutes } from "../modules/serviceType/serviceType.router";
import { FunderRoutes } from "../modules/funder/funder.router";
import { ScheduleRoutes } from "../modules/schedule/schedule.router";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },

  {
    path: "/notifications",
    route: NotificationsRoutes,
  },
  {
    path: "/documents",
    route: UploadDocumentRoutes,
  },
  {
    path: "/application-job",
    route: JobApplicationRoutes,
  },

  {
    path: "/jobs",
    route: JobRoutes,
  },

  {
    path: "/interview",
    route: InterviewRoutes,
  },
  {
    path: "/reference",
    route: ReferenceRoutes,
  },
  {
    path: "/email-drafts",
    route: EmailDraftRoutes,
  },
  {
    path: "/signature",
    route: SignatureRoutes,
  },
  {
    path: "/email",
    route: EmailRoutes,
  },
  {
    path: "/ecerts",
    route: EcertRoutes,
  },
  {
    path: "/ecert-form",
    route: EcertFormRoutes,
  },
  {
    path: "/dbs-form",
    route: DbsFormRoutes,
  },
  {
    path: "/bank-details",
    route: BankDetailsRoutes,
  },
  {
    path: "/medical-form",
    route: MedicalQuestionRoutes,
  },
  {
    path: "/starter-checklist-form",
    route: StarterChecklistRoutes,
  },
  {
    path: "/logs",
    route: LogsRoutes,
  },
  {
    path: "/confidentiality",
    route: ConfidentialityFormRoutes,
  },
  {
    path: "/employement-contracts",
    route: EmployementContractRoutes,
  },
  {
    path: "/job-contracts",
    route: JobContractRoutes,
  },
  {
    path: "/designation",
    route: DesignationRoutes,
  },
  {
    path: "/contract-type",
    route: ContractTypeRoutes,
  },
   {
    path: "/employee-documents",
    route: EmployeeDocumentRoutes,
  },
  {
    path: "/schedule-check",
    route: ScheduleCheckRoutes,
  },
  {
    path: "/visa",
    route: VisaCheckRoutes,
  },
  {
    path: "/dbs",
    route: DbsFormRoutes,
  },
  {
    path: "/passport",
    route: PassportRoutes,
  },
 {
    path: "/right-to-work",
    route: RightToWorkRoutes,
  },
  {
    path: "/immigration",
    route: ImmigrationStatusRoutes,
  },
  {
    path: "/appraisal",
    route: AppraisalRoutes,
  },
  {
    path: "/schedule-status",
    route: ScheduleCheckStatusRoutes,
  },
  {
    path: "/employee-training",
    route: EmployeeTrainingRoutes,
  },
  {
    path: "/supervision",
    route: SupervisionRoutes,
  },
  {
    path: "/spot-check",
    route: SpotCheckRoutes,
  },

  {
    path: "/induction",
    route: InductionRoutes,
  },
  {
    path: "/disciplinary",
    route: DisciplinaryRoutes,
  },
  {
    path: "/qa",
    route: QACheckRoutes,
  },
    {
    path: "/leaver",
    route: LeaverRoutes,
  },   {
    path: "/service-Type",
    route: ServiceTypeRoutes,
  },
   {
    path: "/serviceuser-schedule",
    route: ServiceUserScheduleRoutes,
  },  {
    path: "/service-funder",
    route: FunderRoutes,
  },
  {
    path: "/schedules",
    route: ScheduleRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
