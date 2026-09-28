"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import AddApplicationModal from "./AddApplicationModal";
import DeleteApplicationModal from "./DeleteApplicationModal";
import { useApplications } from "@/context/ApplicationContext";
import type { Application } from "@/types/application";

export default function RecentApplications() {
  const { applications, deleteApplication } =
    useApplications();

  const [editing, setEditing] =
    useState<Application | null>(null);

  const [deleting, setDeleting] =
    useState<Application | null>(null);

  const recent = applications.slice(0, 5);

  function statusStyle(status: string) {
    const styles: Record<string, string> = {
      Applied: "bg-blue-50 text-blue-600",
      Interview: "bg-purple-50 text-purple-600",
      Offer: "bg-green-50 text-green-600",
      Rejected: "bg-red-50 text-red-600",
    };

    return (
      styles[status] ??
      "bg-slate-100 text-slate-600"
    );
  }

  function formatDate(date: string) {
    if (!date) return "-";

    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <>
      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Applications
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest job applications
          </p>
        </div>

        {!recent.length ? (
          <div className="px-6 py-12 text-center">
            <p className="font-medium text-slate-700">
              No applications yet
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Add an application to see it here.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/60 text-left">
                    <TableHead>Company</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </tr>
                </thead>

                <tbody>
                  {recent.map((app) => (
                    <tr
                      key={app.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <CompanyIcon
                            company={app.company}
                          />

                          <span className="font-medium text-slate-900">
                            {app.company}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {app.position}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {formatDate(app.appliedDate)}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle(
                            app.status
                          )}`}
                        >
                          {app.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <Actions
                          onEdit={() =>
                            setEditing(app)
                          }
                          onDelete={() =>
                            setDeleting(app)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="divide-y divide-slate-100 md:hidden">
              {recent.map((app) => (
                <div
                  key={app.id}
                  className="p-4"
                >
                  <div className="flex items-start gap-3">
                    <CompanyIcon
                      company={app.company}
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="truncate font-semibold text-slate-900">
                            {app.company}
                          </h3>

                          <p className="mt-1 truncate text-sm text-slate-500">
                            {app.position}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle(
                            app.status
                          )}`}
                        >
                          {app.status}
                        </span>
                      </div>

                      <p className="mt-3 text-xs text-slate-400">
                        {formatDate(app.appliedDate)}
                      </p>

                      <div className="mt-3">
                        <Actions
                          onEdit={() =>
                            setEditing(app)
                          }
                          onDelete={() =>
                            setDeleting(app)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <AddApplicationModal
        isOpen={Boolean(editing)}
        application={editing}
        onClose={() => setEditing(null)}
      />

      <DeleteApplicationModal
        application={deleting}
        onClose={() => setDeleting(null)}
        onConfirm={() => {
          if (!deleting) return;

          deleteApplication(deleting.id);
          setDeleting(null);
        }}
      />
    </>
  );
}

function TableHead({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th className="px-6 py-4 text-xs font-medium uppercase text-slate-400">
      {children}
    </th>
  );
}

function CompanyIcon({
  company,
}: {
  company: string;
}) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-semibold text-blue-600">
      {company.charAt(0).toUpperCase()}
    </div>
  );
}

function Actions({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onEdit}
        aria-label="Edit application"
        className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-100"
      >
        <Pencil size={14} />
        Edit
      </button>

      <button
        type="button"
        onClick={onDelete}
        aria-label="Delete application"
        className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100"
      >
        <Trash2 size={14} />
        Delete
      </button>
    </div>
  );
}