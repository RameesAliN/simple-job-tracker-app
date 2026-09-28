"use client";

import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Search,
} from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import InterviewCard from "@/components/interviews/InterviewCard";
import { useApplications } from "@/context/ApplicationContext";
import type { Application } from "@/types/application";
import {
  getInterviewDate,
  getInterviewState,
  type InterviewState,
} from "@/utils/interview";

export default function InterviewsPage() {
  const { applications } = useApplications();
  const [search, setSearch] = useState("");

  const interviews = applications.filter((app) => {
    const hasInterview =
      app.status === "Interview" ||
      Boolean(app.interviewDate);

    const query = search.toLowerCase().trim();

    const matchesSearch =
      !query ||
      app.company.toLowerCase().includes(query) ||
      app.position.toLowerCase().includes(query);

    return hasInterview && matchesSearch;
  });

  const getByState = (state: InterviewState) =>
    interviews.filter(
      (app) => getInterviewState(app) === state
    );

  const upcoming = getByState("Upcoming").sort(
    (a, b) =>
      getInterviewDate(a) - getInterviewDate(b)
  );

  const completed = getByState("Completed").sort(
    (a, b) =>
      getInterviewDate(b) - getInterviewDate(a)
  );

  const notScheduled = getByState("Not Scheduled");

  return (
    <DashboardLayout>
        <main className="p-3 sm:p-4 md:p-6">
          <div className="mx-auto max-w-[1600px]">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Interviews
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage upcoming and completed interviews.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <StatCard
                title="Upcoming"
                value={upcoming.length}
                className="text-purple-600"
              />

              <StatCard
                title="Completed"
                value={completed.length}
                className="text-green-600"
              />

              <StatCard
                title="Not Scheduled"
                value={notScheduled.length}
                className="text-amber-600"
              />
            </div>

            {/* Search */}
            <div className="relative mt-6 max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search interviews..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <InterviewSection
              title="Upcoming Interviews"
              items={upcoming}
              icon={<CalendarDays size={20} />}
            />

            <InterviewSection
              title="Not Scheduled"
              items={notScheduled}
              icon={<Clock size={20} />}
            />

            <InterviewSection
              title="Completed Interviews"
              items={completed}
              icon={<CheckCircle2 size={20} />}
            />

            {!interviews.length && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white py-16 text-center">
                <CalendarDays
                  size={30}
                  className="mx-auto text-slate-400"
                />

                <h2 className="mt-3 font-semibold text-slate-900">
                  No interviews found
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Interview applications will appear here.
                </p>
              </div>
            )}
          </div>
        </main>
     </DashboardLayout>
  );
}

function StatCard({
  title,
  value,
  className,
}: {
  title: string;
  value: number;
  className: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p
        className={`mt-2 text-2xl font-bold ${className}`}
      >
        {value}
      </p>
    </div>
  );
}

function InterviewSection({
  title,
  items,
  icon,
}: {
  title: string;
  items: Application[];
  icon: React.ReactNode;
}) {
  if (!items.length) return null;

  return (
    <section className="mt-8">
      <div className="flex items-center gap-2">
        <span className="text-slate-500">
          {icon}
        </span>

        <h2 className="font-semibold text-slate-900">
          {title}
        </h2>

        <span className="ml-auto text-sm text-slate-500">
          {items.length}
        </span>
      </div>

      <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((application) => (
          <InterviewCard
            key={application.id}
            application={application}
          />
        ))}
      </div>
    </section>
  );
}