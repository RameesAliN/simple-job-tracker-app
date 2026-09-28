import { Suspense } from "react";
import ApplicationsPage from "./ApplicationsPage";

export default function Page() {
  return (
    <Suspense fallback={<ApplicationsLoading />}>
      <ApplicationsPage />
    </Suspense>
  );
}

function ApplicationsLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f8fc]">
      <p className="text-sm text-slate-500">
        Loading applications...
      </p>
    </div>
  );
}