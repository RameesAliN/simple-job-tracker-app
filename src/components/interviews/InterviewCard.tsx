import {
  Building2,
  CalendarDays,
  Clock,
  MapPin,
  Phone,
  Video,
} from "lucide-react";

import type { Application } from "@/types/application";
import {
  formatInterviewDate,
  formatInterviewTime,
  getInterviewState,
} from "@/utils/interview";

type Props = {
  application: Application;
};

export default function InterviewCard({
  application,
}: Props) {
  const state = getInterviewState(application);

  const badgeStyle = {
    Upcoming: "bg-purple-100 text-purple-700",
    Completed: "bg-green-100 text-green-700",
    "Not Scheduled": "bg-amber-100 text-amber-700",
  }[state];

  const TypeIcon =
    application.interviewType === "Phone"
      ? Phone
      : application.interviewType === "On-site"
        ? Building2
        : Video;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
            {application.company.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-slate-900">
              {application.company}
            </h3>

            <p className="truncate text-sm text-slate-500">
              {application.position}
            </p>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${badgeStyle}`}
        >
          {state}
        </span>
      </div>

      <div className="mt-5 space-y-3 text-sm text-slate-600">
        <div className="flex items-center gap-3">
          <CalendarDays
            size={17}
            className="text-slate-400"
          />

          {formatInterviewDate(
            application.interviewDate
          )}
        </div>

        <div className="flex items-center gap-3">
          <Clock
            size={17}
            className="text-slate-400"
          />

          {formatInterviewTime(
            application.interviewTime
          )}
        </div>

        <div className="flex items-center gap-3">
          <TypeIcon
            size={17}
            className="text-slate-400"
          />

          {application.interviewType
            ? `${application.interviewType} Interview`
            : "Interview type not set"}
        </div>

        <div className="flex items-center gap-3">
          <MapPin
            size={17}
            className="text-slate-400"
          />

          {application.location ||
            "Location not specified"}
        </div>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
          {application.jobType}
        </span>
      </div>
    </div>
  );
}