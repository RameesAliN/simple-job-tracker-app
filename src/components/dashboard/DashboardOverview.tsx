"use client";

import { useState } from "react";
import AddApplicationModal from "./AddApplicationModal";
import { useApplications } from "@/context/ApplicationContext";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CircleCheck,
  CircleX,
  Plus,
} from "lucide-react";



export default function DashboardOverview() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { applications } = useApplications();

  const totalApplications = applications.length;

  const interviews = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const offers = applications.filter(
    (application) => application.status === "Offer"
  ).length;

  const rejected = applications.filter(
    (application) => application.status === "Rejected"
  ).length;

  const stats = [
    {
      title: "Total Applications",
      value: totalApplications,
      icon: BriefcaseBusiness,
      iconStyle: "bg-blue-100 text-blue-600",
    },
    {
      title: "Interviews",
      value: interviews,
      icon: CalendarDays,
      iconStyle: "bg-purple-100 text-purple-600",
    },
    {
      title: "Offers",
      value: offers,
      icon: CircleCheck,
      iconStyle: "bg-green-100 text-green-600",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: CircleX,
      iconStyle: "bg-red-100 text-red-500",
    },
  ];

  return (
    <section>
      {/* Welcome Banner */}
      <div className="flex flex-col gap-5 rounded-2xl bg-linear-to-r from-blue-600 to-blue-500 p-5 text-white sm:p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Welcome back, Ramees! 👋
          </h1>

          <p className="mt-2 text-sm text-blue-100 sm:text-base">
            Here&apos;s what&apos;s happening with your job search.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50 sm:w-fit"
        >
          <Plus size={19} />
          Add Application
        </button>
      </div>

      {/* Statistics */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconStyle}`}
                >
                  <Icon size={24} />
                </div>

                <ArrowUpRight size={18} className="text-slate-400" />
              </div>

              <p className="mt-5 text-sm font-medium text-slate-500">
                {stat.title}
              </p>

              <p className="mt-1 text-3xl font-bold text-slate-900">
                {stat.value}
              </p>

              <p className="mt-3 text-xs text-slate-500">
                Based on your applications
              </p>
            </div>
          );
        })}
      </div>
      <AddApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}