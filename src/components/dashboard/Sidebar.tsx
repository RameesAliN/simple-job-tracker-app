"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  LayoutDashboard,
  Settings,
  X,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Applications", href: "/applications", icon: BriefcaseBusiness },
  { name: "Interviews", href: "/interviews", icon: CalendarDays },
  { name: "Companies", href: "/companies", icon: Building2 },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

type Props = {
  open?: boolean;
  onClose?: () => void;
};

export default function Sidebar({
  open = false,
  onClose,
}: Props) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-70 flex-col bg-[#0f172a] text-white transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between px-6">
          <Link
            href="/"
            onClick={onClose}
            className="text-xl font-bold"
          >
            JobTracker
          </Link>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;

            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={19} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3 rounded-xl p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold">
              RA
            </div>

            <div>
              <p className="text-sm font-semibold">
                Ramees Ali
              </p>
              <p className="text-xs text-slate-400">
                Job Seeker
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}