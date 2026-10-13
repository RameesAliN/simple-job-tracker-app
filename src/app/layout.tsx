import type { Metadata } from "next";
import "./globals.css";

import { ApplicationProvider } from "@/context/ApplicationContext";

export const metadata: Metadata = {
  title: "Simple Job Tracker App",
  description: "A simple application to track job applications, interviews, and application statuses.",
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