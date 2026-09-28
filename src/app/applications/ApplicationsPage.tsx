"use client";

import { useState } from "react";
import {
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AddApplicationModal from "@/components/dashboard/AddApplicationModal";
import DeleteApplicationModal from "@/components/dashboard/DeleteApplicationModal";
import { useApplications } from "@/context/ApplicationContext";
import type { Application } from "@/types/application";

export default function ApplicationsPage() {
  const { applications, deleteApplication } = useApplications();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") ?? ""
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] =
    useState<Application | null>(null);
  const [deletingApplication, setDeletingApplication] =
    useState<Application | null>(null);

  const filteredApplications = applications.filter((application) => {
    const value = search.toLowerCase().trim();

    return (
      application.company.toLowerCase().includes(value) ||
      application.position.toLowerCase().includes(value)
    );
  });

  function getStatusStyle(status: string) {
    switch (status) {
      case "Applied":
        return "bg-blue-50 text-blue-600";

      case "Interview":
        return "bg-purple-50 text-purple-600";

      case "Offer":
        return "bg-green-50 text-green-600";

      case "Rejected":
        return "bg-red-50 text-red-600";

      default:
        return "bg-slate-100 text-slate-600";
    }
  }

  function formatDate(date: string) {
    if (!date) return "-";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function handleAddApplication() {
    setEditingApplication(null);
    setIsModalOpen(true);
  }

  function handleEditApplication(application: Application) {
    setEditingApplication(application);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditingApplication(null);
  }

  return (

    <DashboardLayout>
      <main className="p-3 sm:p-4 md:p-6">
        <div className="mx-auto w-full max-w-[1600px]">
          {/* Page Heading */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Applications
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage and track all your job applications.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddApplication}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus size={19} />
              Add Application
            </button>
          </div>

          {/* Search */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex h-11 w-full max-w-md items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <Search
                size={19}
                className="shrink-0 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search company or position..."
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Applications */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {filteredApplications.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <p className="font-semibold text-slate-700">
                  {applications.length === 0
                    ? "No applications yet"
                    : "No applications found"}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  {applications.length === 0
                    ? "Add your first job application to start tracking your job search."
                    : "Try searching with a different company or position."}
                </p>

                {applications.length === 0 && (
                  <button
                    type="button"
                    onClick={handleAddApplication}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Plus size={18} />
                    Add Application
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/60 text-left">
                        <th className="px-6 py-4 text-xs font-medium uppercase text-slate-400">
                          Company
                        </th>

                        <th className="px-6 py-4 text-xs font-medium uppercase text-slate-400">
                          Position
                        </th>

                        <th className="px-6 py-4 text-xs font-medium uppercase text-slate-400">
                          Location
                        </th>

                        <th className="px-6 py-4 text-xs font-medium uppercase text-slate-400">
                          Applied Date
                        </th>

                        <th className="px-6 py-4 text-xs font-medium uppercase text-slate-400">
                          Status
                        </th>

                        <th className="px-6 py-4 text-xs font-medium uppercase text-slate-400">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredApplications.map((application) => (
                        <tr
                          key={application.id}
                          className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                        >
                          {/* Company */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 font-semibold text-blue-600">
                                {application.company
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <span className="font-medium text-slate-900">
                                {application.company}
                              </span>
                            </div>
                          </td>

                          {/* Position */}
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {application.position}
                          </td>

                          {/* Location */}
                          <td className="px-6 py-4 text-sm text-slate-500">
                            {application.location || "-"}
                          </td>

                          {/* Applied Date */}
                          <td className="px-6 py-4 text-sm text-slate-500">
                            {formatDate(application.appliedDate)}
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                                application.status
                              )}`}
                            >
                              {application.status}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  handleEditApplication(application)
                                }
                                className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                              >
                                <Pencil size={16} />
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() => setDeletingApplication(application)}
                                className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                              >
                                <Trash2 size={16} />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="divide-y divide-slate-100 md:hidden">
                  {filteredApplications.map((application) => (
                    <div
                      key={application.id}
                      className="p-5"
                    >
                      <div className="flex items-start gap-3">
                        {/* Company Initial */}
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-semibold text-blue-600">
                          {application.company
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0 flex-1">
                          {/* Company */}
                          <h2 className="truncate font-semibold text-slate-900">
                            {application.company}
                          </h2>

                          {/* Position */}
                          <p className="mt-1 text-sm text-slate-500">
                            {application.position}
                          </p>

                          {/* Location */}
                          {application.location && (
                            <p className="mt-1 text-xs text-slate-400">
                              {application.location}
                            </p>
                          )}

                          {/* Date + Status */}
                          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                            <span className="text-xs text-slate-500">
                              {formatDate(application.appliedDate)}
                            </span>

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                                application.status
                              )}`}
                            >
                              {application.status}
                            </span>
                          </div>

                          {/* Mobile Actions */}
                          <div className="mt-4 flex gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleEditApplication(application)
                              }
                              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                            >
                              <Pencil size={16} />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => setDeletingApplication(application)}
                              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>


      {/* Add / Edit Application Modal */}
      <AddApplicationModal
        isOpen={isModalOpen}
        application={editingApplication}
        onClose={handleCloseModal}
      />
      <DeleteApplicationModal
        application={deletingApplication}
        onClose={() => setDeletingApplication(null)}
        onConfirm={() => {
          if (!deletingApplication) return;

          deleteApplication(deletingApplication.id);
          setDeletingApplication(null);
        }}
      />
    </DashboardLayout>

  );
}