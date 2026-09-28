"use client";

import { useApplications } from "@/context/ApplicationContext";

export default function ApplicationOverview() {
  const { applications } = useApplications();

  const months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - (5 - i));

    const count = applications.filter((app) => {
      if (!app.appliedDate) return false;

      const applied = new Date(
        `${app.appliedDate}T00:00:00`
      );

      return (
        applied.getMonth() === date.getMonth() &&
        applied.getFullYear() === date.getFullYear()
      );
    }).length;

    return {
      label: date.toLocaleDateString("en-US", {
        month: "short",
      }),
      count,
    };
  });

  const max = Math.max(
    ...months.map((month) => month.count),
    1
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Application Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Applications from the last 6 months
        </p>
      </div>

      <div className="mt-8 flex h-60 items-end gap-3 sm:gap-5">
        {months.map((month) => {
          const height =
            month.count === 0
              ? 4
              : Math.max(
                  (month.count / max) * 100,
                  12
                );

          return (
            <div
              key={month.label}
              className="flex h-full flex-1 flex-col items-center justify-end"
            >
              <span className="mb-2 text-xs font-semibold text-slate-600">
                {month.count}
              </span>

              <div className="flex h-45 w-full items-end justify-center">
                <div
                  className="w-full max-w-12 rounded-t-lg bg-blue-500 transition-all duration-300"
                  style={{
                    height: `${height}%`,
                  }}
                />
              </div>

              <span className="mt-3 text-xs font-medium text-slate-500">
                {month.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}