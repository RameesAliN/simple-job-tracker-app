import type { Application } from "@/types/application";

export type InterviewState =
  | "Upcoming"
  | "Completed"
  | "Not Scheduled";

export function getInterviewState(
  application: Application
): InterviewState {
  if (!application.interviewDate) {
    return "Not Scheduled";
  }

  const interview = new Date(
    `${application.interviewDate}T${
      application.interviewTime || "23:59"
    }`
  );

  return interview < new Date()
    ? "Completed"
    : "Upcoming";
}

export function getInterviewDate(
  application: Application
) {
  if (!application.interviewDate) return 0;

  return new Date(
    `${application.interviewDate}T${
      application.interviewTime || "00:00"
    }`
  ).getTime();
}

export function formatInterviewDate(date?: string) {
  if (!date) return "Not scheduled";

  return new Date(
    `${date}T00:00:00`
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatInterviewTime(time?: string) {
  if (!time) return "Time not set";

  return new Date(
    `2000-01-01T${time}`
  ).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}