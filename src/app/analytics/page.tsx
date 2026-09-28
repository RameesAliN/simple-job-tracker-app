"use client";

import {
  BriefcaseBusiness,
  CalendarCheck,
  CircleCheckBig,
  CircleX,
} from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useApplications } from "@/context/ApplicationContext";

export default function AnalyticsPage() {
  const { applications } = useApplications();

  const total = applications.length;
  const interviews = applications.filter(
    (app) => app.status === "Interview"
  ).length;
  const offers = applications.filter(
    (app) => app.status === "Offer"
  ).length;
  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;
  const applied = applications.filter(
    (app) => app.status === "Applied"
  ).length;

  const interviewRate = total
    ? Math.round((interviews / total) * 100)
    : 0;

  const offerRate = total
    ? Math.round((offers / total) * 100)
    : 0;

  const stats = [
    {
      title: "Total Applications",
      value: total,
      icon: BriefcaseBusiness,
    },
    {
      title: "Interviews",
      value: interviews,
      icon: CalendarCheck,
    },
    {
      title: "Offers",
      value: offers,
      icon: CircleCheckBig,
    },
    {
      title: "Rejected",
      value: rejected,
      icon: CircleX,
    },
  ];

  const statuses = [
    {
      label: "Applied",
      value: applied,
      className: "bg-blue-500",
    },
    {
      label: "Interview",
      value: interviews,
      className: "bg-purple-500",
    },
    {
      label: "Offer",
      value: offers,
      className: "bg-green-500",
    },
    {
      label: "Rejected",
      value: rejected,
      className: "bg-red-500",
    },
  ];

  return (

    <DashboardLayout>
      <main className="p-3 sm:p-4 md:p-6">
        <div className="mx-auto max-w-[1600px]">
          <h1 className="text-2xl font-bold text-slate-900">
            Analytics
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track your job application performance.
          </p>

          {/* Stats */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ title, value, icon: Icon }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      {title}
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {value}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <Icon size={21} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            {/* Status Distribution */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-semibold text-slate-900">
                Status Distribution
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current application status breakdown
              </p>

              <div className="mt-6 space-y-5">
                {statuses.map((status) => {
                  const percentage = total
                    ? Math.round(
                      (status.value / total) * 100
                    )
                    : 0;

                  return (
                    <div key={status.label}>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="font-medium text-slate-700">
                          {status.label}
                        </span>

                        <span className="text-slate-500">
                          {status.value} ({percentage}%)
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${status.className}`}
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Conversion */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-semibold text-slate-900">
                Conversion Rates
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your application progress
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <RateCard
                  value={interviewRate}
                  label="Interview Rate"
                />

                <RateCard
                  value={offerRate}
                  label="Offer Rate"
                />
              </div>

              <div className="mt-6 rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                  Applications tracked
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900">
                  {total}
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}

function RateCard({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-5 text-center">
      <p className="text-3xl font-bold text-blue-600">
        {value}%
      </p>

      <p className="mt-2 text-sm text-slate-500">
        {label}
      </p>
    </div>
  );
}
