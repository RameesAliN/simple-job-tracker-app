"use client";

import {
  Building2,
  CalendarDays,
  Clock,
  Phone,
  Video,
} from "lucide-react";

import { useApplications } from "@/context/ApplicationContext";
import {
  formatInterviewDate,
  formatInterviewTime,
  getInterviewDate,
  getInterviewState,
} from "@/utils/interview";

export default function UpcomingInterviews() {
  const { applications } = useApplications();

  const upcoming = applications
    .filter(
      (app) =>
        getInterviewState(app) === "Upcoming"
    )
    .sort(
      (a, b) =>
        getInterviewDate(a) - getInterviewDate(b)
    )
    .slice(0, 3);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-slate-900">
        Upcoming Interviews
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Your next scheduled interviews
      </p>

      {upcoming.length ? (
        <div className="mt-5 space-y-4">
          {upcoming.map((app) => {
            const TypeIcon =
              app.interviewType === "Phone"
                ? Phone
                : app.interviewType === "On-site"
                  ? Building2
                  : Video;

            return (
              <div
                key={app.id}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
                    {app.company.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-slate-900">
                      {app.company}
                    </h3>

                    <p className="truncate text-sm text-slate-500">
                      {app.position}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      size={15}
                      className="text-slate-400"
                    />

                    {formatInterviewDate(
                      app.interviewDate
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock
                      size={15}
                      className="text-slate-400"
                    />

                    {formatInterviewTime(
                      app.interviewTime
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <TypeIcon
                      size={15}
                      className="text-slate-400"
                    />

                    {app.interviewType
                      ? `${app.interviewType} Interview`
                      : "Interview"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-5 flex min-h-55 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 text-center">
          <CalendarDays
            size={24}
            className="text-slate-400"
          />

          <p className="mt-3 font-medium text-slate-800">
            No upcoming interviews
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Scheduled interviews will appear here.
          </p>
        </div>
      )}
    </section>
  );
}