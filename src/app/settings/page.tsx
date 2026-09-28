"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, User } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const defaultProfile = {
  name: "Ramees Ali",
  email: "",
  location: "",
};

export default function SettingsPage() {
  const [profile, setProfile] = useState(defaultProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = localStorage.getItem("profile");

      if (stored) {
        try {
          setProfile(JSON.parse(stored));
        } catch {
          localStorage.removeItem("profile");
        }
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <DashboardLayout>
        <main className="p-3 sm:p-4 md:p-6">
          <div className="mx-auto max-w-225">
            <h1 className="text-2xl font-bold text-slate-900">
              Settings
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your profile preferences.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <User size={25} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Profile Information
                  </h2>

                  <p className="text-sm text-slate-500">
                    Update your personal details.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  value={profile.name}
                  onChange={(name) =>
                    setProfile({ ...profile, name })
                  }
                />

                <Field
                  label="Email"
                  type="email"
                  value={profile.email}
                  onChange={(email) =>
                    setProfile({ ...profile, email })
                  }
                />

                <Field
                  label="Location"
                  value={profile.location}
                  onChange={(location) =>
                    setProfile({ ...profile, location })
                  }
                />
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
                {saved && (
                  <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                    <CheckCircle2 size={16} />
                    Saved
                  </span>
                )}

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </main>
     </DashboardLayout>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
      />
    </label>
  );
}