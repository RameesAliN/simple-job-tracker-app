"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f8fc]">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:ml-70">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
        />

        {children}
      </div>
    </div>
  );
}