export type ApplicationStatus =
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected";

export type InterviewType =
  | "Video"
  | "Phone"
  | "On-site";

export type Application = {
  id: string;
  company: string;
  position: string;
  location: string;
  jobType: string;
  appliedDate: string;
  status: ApplicationStatus;
  jobUrl: string;
  notes: string;

  interviewDate?: string;
  interviewTime?: string;
  interviewType?: InterviewType;
};