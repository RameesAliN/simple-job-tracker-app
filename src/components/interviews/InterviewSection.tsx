import type { ReactNode } from "react";
import type { Application } from "@/types/application";
import InterviewCard from "./InterviewCard";

type Props = {
  title: string;
  description: string;
  items: Application[];
  icon: ReactNode;
};

export default function InterviewSection({
  title,
  description,
  items,
  icon,
}: Props) {
  if (!items.length) return null;

  return (
    <section className="mt-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm">
          {icon}
        </div>

        <div>
          <h2 className="font-semibold text-slate-900">
            {title}
          </h2>

          <p className="text-sm text-slate-500">
            {description}
          </p>
        </div>

        <span className="ml-auto rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-600 shadow-sm">
          {items.length}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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