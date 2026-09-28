"use client";

import { Building2, MapPin, Search } from "lucide-react";
import { useState } from "react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useApplications } from "@/context/ApplicationContext";

export default function CompaniesPage() {
  const { applications } = useApplications();
  const [search, setSearch] = useState("");

  const companies = Object.values(
    applications.reduce<
      Record<
        string,
        {
          name: string;
          location: string;
          applications: number;
          interviews: number;
          offers: number;
        }
      >
    >((result, app) => {
      const key = app.company.trim().toLowerCase();

      if (!result[key]) {
        result[key] = {
          name: app.company,
          location: app.location,
          applications: 0,
          interviews: 0,
          offers: 0,
        };
      }

      result[key].applications++;

      if (app.status === "Interview") {
        result[key].interviews++;
      }

      if (app.status === "Offer") {
        result[key].offers++;
      }

      return result;
    }, {})
  ).filter((company) =>
    company.name
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  return (
    <DashboardLayout>
        <main className="p-3 sm:p-4 md:p-6">
          <div className="mx-auto max-w-[1600px]">
            <h1 className="text-2xl font-bold text-slate-900">
              Companies
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Companies you have applied to.
            </p>

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
                placeholder="Search companies..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {companies.length ? (
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {companies.map((company) => (
                  <div
                    key={company.name}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
                        {company.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <h2 className="truncate font-semibold text-slate-900">
                          {company.name}
                        </h2>

                        <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                          <MapPin size={14} />
                          <span className="truncate">
                            {company.location ||
                              "Not specified"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-3 border-t border-slate-100 pt-4 text-center">
                      <CompanyStat
                        value={company.applications}
                        label="Applied"
                      />

                      <CompanyStat
                        value={company.interviews}
                        label="Interviews"
                      />

                      <CompanyStat
                        value={company.offers}
                        label="Offers"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white py-16 text-center">
                <Building2
                  size={30}
                  className="mx-auto text-slate-400"
                />

                <h2 className="mt-3 font-semibold text-slate-900">
                  No companies found
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Companies will appear when you add applications.
                </p>
              </div>
            )}
          </div>
        </main>
     </DashboardLayout>
  );
}

function CompanyStat({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div>
      <p className="font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {label}
      </p>
    </div>
  );
}