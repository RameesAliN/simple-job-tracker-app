"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";
import type { Application } from "@/types/application";

type ApplicationContextType = {
  applications: Application[];
  addApplication: (application: Application) => void;
  updateApplication: (application: Application) => void;
  deleteApplication: (id: string) => void;
};

const ApplicationContext =
  createContext<ApplicationContextType | undefined>(undefined);

export function ApplicationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [applications, setApplications] =
    useState<Application[]>([]);

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedApplications =
        localStorage.getItem("applications");

      if (savedApplications) {
        try {
          const parsedApplications =
            JSON.parse(savedApplications) as Application[];

          setApplications(parsedApplications);
        } catch (error) {
          console.error(
            "Failed to load applications:",
            error
          );
        }
      }

      setIsHydrated(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    localStorage.setItem(
      "applications",
      JSON.stringify(applications)
    );
  }, [applications, isHydrated]);

  function addApplication(application: Application) {
    setApplications((currentApplications) => [
      application,
      ...currentApplications,
    ]);
  }

  function updateApplication(
    updatedApplication: Application
  ) {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === updatedApplication.id
          ? updatedApplication
          : application
      )
    );
  }

  function deleteApplication(id: string) {
    setApplications((currentApplications) =>
      currentApplications.filter(
        (application) => application.id !== id
      )
    );
  }

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        addApplication,
        updateApplication,
        deleteApplication,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error(
      "useApplications must be used inside ApplicationProvider"
    );
  }

  return context;
}