import type { Metadata } from "next";
import "./globals.css";

import { ApplicationProvider } from "@/context/ApplicationContext";

export const metadata: Metadata = {
  title: "JobTracker",
  description: "Job application tracking dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ApplicationProvider>
          {children}
        </ApplicationProvider>
      </body>
    </html>
  );
}