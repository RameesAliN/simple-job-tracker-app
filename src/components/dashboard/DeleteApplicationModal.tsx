"use client";

import { AlertTriangle, X } from "lucide-react";

import type { Application } from "@/types/application";

type DeleteApplicationModalProps = {
  application: Application | null;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteApplicationModal({
  application,
  onClose,
  onConfirm,
}: DeleteApplicationModalProps) {
  if (!application) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertTriangle size={24} />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close delete confirmation"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Delete Application?
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Are you sure you want to delete your application for{" "}
            <span className="font-semibold text-slate-700">
              {application.position}
            </span>{" "}
            at{" "}
            <span className="font-semibold text-slate-700">
              {application.company}
            </span>
            ? This action cannot be undone.
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 p-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Delete Application
          </button>
        </div>
      </div>
    </div>
  );
}