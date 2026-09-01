import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  Inbox,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Bell,
  Search,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true, badge: null },
  { to: "/dashboard/consultations", label: "Consultations", icon: CalendarDays, badge: "Bookings" },
  { to: "/dashboard/blog", label: "Blog Posts", icon: FileText, badge: null },
  { to: "/dashboard/inquiries", label: "Inquiries", icon: Inbox, badge: "Leads" },
  { to: "/dashboard/settings", label: "Settings", icon: Settings, badge: null },
];

export default function DashboardLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/dashboard/login");
  };

  const initials = (user?.email ?? "A").slice(0, 2).toUpperCase();

  const SidebarContent = (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-8">
        <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#5D1F17] to-[#3a120c] text-white shadow-lg shadow-[#5D1F17]/20">
          <Sparkles className="h-4 w-4" />
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0c0a09]" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white tracking-tight">The Brand Strategist</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">Admin Console</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        <p className="px-3 pb-2 pt-1 text-[9px] font-bold uppercase tracking-[0.22em] text-white/30">
          Workspace
        </p>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-white/10 to-white/[0.04] text-white shadow-inner shadow-black/20 ring-1 ring-white/10"
                  : "text-white/55 hover:bg-white/[0.04] hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-[#C9962F]" />
                )}
                <item.icon
                  className={`h-4 w-4 transition-colors ${
                    isActive ? "text-[#E5B649]" : "text-white/45 group-hover:text-white/70"
                  }`}
                />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      isActive
                        ? "bg-[#5D1F17]/30 text-[#E5B649]"
                        : "bg-white/5 text-white/40 group-hover:bg-white/10"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User card */}
      <div className="mx-3 mb-4 mt-4 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#5D1F17] to-[#3a120c] text-[11px] font-bold text-white">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-medium text-white">{user?.email ?? "Admin"}</p>
            <p className="text-[10px] text-white/40">Signed in</p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="grid h-8 w-8 place-items-center rounded-lg text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white"
            title="Sign out"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf9f7] text-neutral-900">
      {/* Sidebar — desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-[#0c0a09] text-white lg:block">
        {SidebarContent}
      </aside>

      {/* Sidebar — mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 bg-[#0c0a09] shadow-2xl">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 grid h-9 w-9 place-items-center rounded-lg bg-white/[0.06] text-white"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
            {SidebarContent}
          </div>
        </div>
      )}

      {/* Main column */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-neutral-200/70 bg-white/80 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-neutral-200 text-neutral-600 lg:hidden"
                aria-label="Open dashboard menu"
              >
                <Menu className="h-4 w-4" />
              </button>
              <div className="hidden md:flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-xs text-neutral-500 shadow-sm min-w-0">
                <Search className="h-3.5 w-3.5 shrink-0" />
                <input
                  className="w-56 bg-transparent outline-none placeholder:text-neutral-400"
                  placeholder="Quick search…"
                />
                <span className="ml-2 hidden xl:inline rounded border border-neutral-200 px-1.5 py-0.5 text-[9px] font-bold text-neutral-400">
                  ⌘K
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3.5 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:border-[#5D1F17] hover:text-[#5D1F17]"
              >
                View site <ExternalLink className="h-3 w-3" />
              </a>
              <button
                type="button"
                className="relative grid h-9 w-9 place-items-center rounded-full border border-neutral-200 text-neutral-500 transition-colors hover:border-[#5D1F17] hover:text-[#5D1F17]"
                aria-label="Notifications"
              >
                <Bell className="h-3.5 w-3.5" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#5D1F17]" />
              </button>
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#5D1F17] to-[#3a120c] text-[11px] font-bold text-white">
                {initials}
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}