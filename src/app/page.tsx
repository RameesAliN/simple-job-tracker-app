import ApplicationOverview from "@/components/dashboard/ApplicationOverview";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import RecentApplications from "@/components/dashboard/RecentApplications";
import UpcomingInterviews from "@/components/dashboard/UpcomingInterviews";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function Home() {
  return (
     <DashboardLayout>
        <main className="p-3 sm:p-4 md:p-6">
          <div className="mx-auto w-full max-w-[1600px]">
            <DashboardOverview />

            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
              <ApplicationOverview />
              <UpcomingInterviews />
            </div>

            <RecentApplications />
          </div>
        </main>
     </DashboardLayout>
  );
}