"use client";

import { FormEvent } from "react";
import { X } from "lucide-react";

import { useApplications } from "@/context/ApplicationContext";
import type {
  Application,
  ApplicationStatus,
  InterviewType,
} from "@/types/application";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  application?: Application | null;
};

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function AddApplicationModal({
  isOpen,
  onClose,
  application = null,
}: Props) {
  const { addApplication, updateApplication } =
    useApplications();

  if (!isOpen) return null;

  const isEditing = Boolean(application);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const value = (name: string) =>
      String(data.get(name) || "");

    const newApplication: Application = {
      id: application?.id ?? crypto.randomUUID(),
      company: value("company"),
      position: value("position"),
      location: value("location"),
      jobType: value("jobType"),
      appliedDate: value("appliedDate"),
      status: value("status") as ApplicationStatus,
      jobUrl: value("jobUrl"),
      notes: value("notes"),
      interviewDate: value("interviewDate"),
      interviewTime: value("interviewTime"),
      interviewType:
        (data.get("interviewType") as InterviewType) ||
        undefined,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isEditing ? updateApplication(newApplication) : addApplication(newApplication);

    form.reset();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-3 sm:p-4">
      <div className="flex max-h-[calc(100dvh-24px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl sm:max-h-[90vh]">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
              {isEditing
                ? "Edit Application"
                : "Add Application"}
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              {isEditing
                ? "Update your job application details."
                : "Add a new job application to your tracker."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={21} />
          </button>
        </div>

        <form
          key={application?.id ?? "new-application"}
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                label="Company"
                name="company"
                required
                placeholder="Google"
                defaultValue={application?.company}
              />

              <Field
                label="Position"
                name="position"
                required
                placeholder="Frontend Developer"
                defaultValue={application?.position}
              />

              <Field
                label="Location"
                name="location"
                placeholder="Bangalore, India"
                defaultValue={application?.location}
              />

              <SelectField
                label="Job Type"
                name="jobType"
                defaultValue={
                  application?.jobType ?? "Full-time"
                }
                options={[
                  "Full-time",
                  "Part-time",
                  "Contract",
                  "Internship",
                  "Freelance",
                ]}
              />

              <Field
                label="Applied Date"
                name="appliedDate"
                type="date"
                required
                defaultValue={application?.appliedDate}
              />

              <SelectField
                label="Status"
                name="status"
                defaultValue={
                  application?.status ?? "Applied"
                }
                options={[
                  "Applied",
                  "Interview",
                  "Offer",
                  "Rejected",
                ]}
              />
            </div>

            {/* Interview Details */}
            <div className="mt-6 rounded-2xl border border-purple-100 bg-purple-50/50 p-4 sm:p-5">
              <h3 className="font-semibold text-slate-900">
                Interview Details
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Add these details when an interview is
                scheduled.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Interview Date"
                  name="interviewDate"
                  type="date"
                  defaultValue={
                    application?.interviewDate
                  }
                />

                <Field
                  label="Interview Time"
                  name="interviewTime"
                  type="time"
                  defaultValue={
                    application?.interviewTime
                  }
                />

                <div className="sm:col-span-2">
                  <SelectField
                    label="Interview Type"
                    name="interviewType"
                    defaultValue={
                      application?.interviewType ??
                      "Video"
                    }
                    options={[
                      "Video",
                      "Phone",
                      "On-site",
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5">
              <Field
                label="Job URL"
                name="jobUrl"
                type="url"
                placeholder="https://example.com/jobs/123"
                defaultValue={application?.jobUrl}
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="notes"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Notes
              </label>

              <textarea
                id="notes"
                name="notes"
                rows={4}
                defaultValue={application?.notes ?? ""}
                placeholder="Add notes about this application..."
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="flex shrink-0 gap-3 border-t border-slate-200 bg-white px-4 py-3 sm:justify-end sm:px-6 sm:py-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:flex-none"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:flex-none"
            >
              {isEditing
                ? "Update Application"
                : "Add Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue = "",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue: string;
  options: string[];
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className={inputClass}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}