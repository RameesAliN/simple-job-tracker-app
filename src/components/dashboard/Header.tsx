"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  Menu,
  Search,
} from "lucide-react";

type Props = {
  onMenuClick?: () => void;
};

export default function Header({
  onMenuClick,
}: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = search.trim();
    if (!query) return;

    router.push(
      `/applications?search=${encodeURIComponent(query)}`
    );

    setSearch("");
  }

  return (
    <header className="flex h-18.5 w-full items-center gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
      {/* Mobile Menu */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="shrink-0 text-slate-600 lg:hidden"
      >
        <Menu size={24} />
      </button>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="min-w-0 flex-1 md:max-w-md"
      >
        <div className="flex h-10 items-center gap-2 rounded-xl bg-slate-100 px-3 sm:h-11 sm:gap-3 sm:px-4">
          <Search
            size={18}
            className="shrink-0 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search applications..."
            aria-label="Search applications"
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>
      </form>

      {/* Desktop Spacer */}
      <div className="hidden flex-1 md:block" />

      {/* User */}
      <div className="flex shrink-0 items-center gap-3 sm:gap-5">
        <button
          type="button"
          aria-label="Notifications"
          className="relative hidden text-slate-500 sm:block"
        >
          <Bell size={22} />

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-400 text-sm font-medium text-white sm:h-10 sm:w-10">
            RA
          </div>

          <span className="hidden whitespace-nowrap text-sm font-semibold text-slate-900 lg:block">
            Ramees Ali
          </span>

          <ChevronDown
            size={17}
            className="hidden text-slate-500 lg:block"
          />
        </div>
      </div>
    </header>
  );
}