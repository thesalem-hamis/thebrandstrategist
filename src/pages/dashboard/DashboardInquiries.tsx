import { useEffect, useState, useMemo } from "react";
import { 
  Search, 
  RefreshCw, 
  Loader2, 
  Mail, 
  Phone, 
  Inbox,
  MessageSquare,
  Clock,
  Filter,
  CheckCircle2,
  UserPlus,
  ChevronRight
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { ServiceInquiry } from "@/lib/types";

type StatusFilter = "all" | "new" | "contacted" | "closed";

export default function DashboardInquiries() {
  const [items, setItems] = useState<ServiceInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [updating, setUpdating] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("service_inquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    setItems((data ?? []) as ServiceInquiry[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    let list = items;
    if (filter !== "all") list = list.filter((i) => i.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.email.toLowerCase().includes(q) ||
          i.service.toLowerCase().includes(q)
      );
    }
    return list;
  }, [items, filter, search]);

  async function setStatus(inquiry: ServiceInquiry, status: ServiceInquiry["status"]) {
    setUpdating(inquiry.id);
    await supabase.from("service_inquiries").update({ status }).eq("id", inquiry.id);
    setUpdating(null);
    load();
  }

  const newCount = items.filter((i) => i.status === "new").length;
  const contactedCount = items.filter((i) => i.status === "contacted").length;
  const closedCount = items.filter((i) => i.status === "closed").length;

  const statTiles = [
    {
      label: "New Inquiries",
      value: newCount,
      icon: Inbox,
      accent: "from-amber-500/15 to-amber-500/0",
      iconBg: "bg-amber-500/10 text-amber-700",
      description: "Awaiting response",
    },
    {
      label: "Contacted",
      value: contactedCount,
      icon: UserPlus,
      accent: "from-blue-500/15 to-blue-500/0",
      iconBg: "bg-blue-500/10 text-blue-700",
      description: "Follow-up needed",
    },
    {
      label: "Closed",
      value: closedCount,
      icon: CheckCircle2,
      accent: "from-emerald-500/15 to-emerald-500/0",
      iconBg: "bg-emerald-500/10 text-emerald-700",
      description: "Completed inquiries",
    },
    {
      label: "Total",
      value: items.length,
      icon: MessageSquare,
      accent: "from-neutral-500/15 to-neutral-500/0",
      iconBg: "bg-neutral-500/10 text-neutral-700",
      description: "All time inquiries",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">
            Client Management
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-light tracking-tight text-neutral-900">
            Service Inquiries
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            {newCount > 0 ? (
              <span className="font-medium text-amber-700">
                {newCount} new {newCount === 1 ? "inquiry" : "inquiries"} waiting
              </span>
            ) : (
              "All caught up!"
            )}{" "}
            · {items.length} total — follow up with potential clients here.
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2.5 text-xs font-medium text-white transition-all duration-300 hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-900/20"
        >
          <RefreshCw className={`h-3 w-3 transition-transform ${loading ? "animate-spin" : "group-hover:rotate-180"}`} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {statTiles.map((tile) => (
          <div
            key={tile.label}
            className="group relative overflow-hidden rounded-2xl border border-neutral-200/70 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-900/5"
          >
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tile.accent} opacity-60`} />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                  {tile.label}
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 tabular-nums">
                  {loading ? "—" : tile.value}
                </p>
                <p className="mt-1 text-[11px] text-neutral-500">{tile.description}</p>
              </div>
              <div className={`grid h-10 w-10 place-items-center rounded-xl ${tile.iconBg} transition-transform group-hover:scale-110`}>
                <tile.icon className="h-4 w-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-neutral-200/70 bg-white p-3 shadow-sm">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or service…"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50/40 py-2.5 pl-10 pr-4 text-xs outline-none transition-all duration-300 focus:border-[#5D1F17] focus:bg-white focus:ring-2 focus:ring-[#5D1F17]/10"
          />
        </div>
        <div className="flex items-center gap-1 rounded-xl border border-neutral-200 bg-neutral-50/40 p-1">
          <span className="hidden sm:grid h-8 w-8 place-items-center text-neutral-400">
            <Filter className="h-3.5 w-3.5" />
          </span>
          {(["all", "new", "contacted", "closed"] as StatusFilter[]).map((f) => {
            const count =
              f === "all"
                ? items.length
                : f === "new"
                  ? newCount
                  : f === "contacted"
                    ? contactedCount
                    : closedCount;
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-[11px] font-semibold capitalize transition-all duration-300 ${
                  active
                    ? "bg-neutral-900 text-white shadow-md shadow-neutral-900/20"
                    : "text-neutral-500 hover:bg-white hover:text-neutral-900 hover:shadow-sm"
                }`}
              >
                {f}
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold tabular-nums ${
                    active ? "bg-white/15 text-white" : "bg-neutral-200 text-neutral-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Inquiries List */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200/70 bg-white shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center gap-3 px-5 py-16">
            <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
            <p className="text-xs text-neutral-500">Loading inquiries…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-5 py-16">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-neutral-100">
              <Inbox className="h-5 w-5 text-neutral-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-neutral-700">No inquiries found</p>
              <p className="mt-1 text-[11px] text-neutral-500">
                Try adjusting your filters or search terms.
              </p>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {filtered.map((i) => (
              <li 
                key={i.id} 
                className="group px-6 py-5 transition-all duration-200 hover:bg-gradient-to-r hover:from-neutral-50/80 hover:to-transparent"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#5D1F17]/20 to-amber-500/20 text-[11px] font-bold text-[#5D1F17] ring-1 ring-inset ring-[#5D1F17]/10">
                        {i.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">{i.name}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[#5D1F17]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#5D1F17] ring-1 ring-inset ring-[#5D1F17]/10">
                            {i.service}
                          </span>
                          {i.budget && (
                            <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[10px] font-semibold text-neutral-600 ring-1 ring-inset ring-neutral-200/60">
                              {i.budget}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-neutral-500">
                      <a 
                        href={`mailto:${i.email}`} 
                        className="group flex items-center gap-1.5 transition-colors hover:text-[#5D1F17]"
                      >
                        <Mail className="h-3 w-3 transition-transform group-hover:scale-110" /> 
                        {i.email}
                      </a>
                      {i.phone && (
                        <a 
                          href={`tel:${i.phone}`} 
                          className="group flex items-center gap-1.5 transition-colors hover:text-[#5D1F17]"
                        >
                          <Phone className="h-3 w-3 transition-transform group-hover:scale-110" /> 
                          {i.phone}
                        </a>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        {new Date(i.created_at).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {i.message && (
                      <div className="mt-3 rounded-xl bg-neutral-50/60 border border-neutral-100 p-3.5">
                        <p className="text-xs leading-relaxed text-neutral-600">
                          {i.message}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5">
                    {(["new", "contacted", "closed"] as const).map((s) => {
                      const isActive = i.status === s;
                      const isUpdating = updating === i.id;
                      
                      const statusStyles = {
                        new: isActive
                          ? "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200/60"
                          : "hover:bg-amber-50 hover:text-amber-700 hover:ring-1 hover:ring-inset hover:ring-amber-200/60",
                        contacted: isActive
                          ? "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200/60"
                          : "hover:bg-blue-50 hover:text-blue-700 hover:ring-1 hover:ring-inset hover:ring-blue-200/60",
                        closed: isActive
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200/60"
                          : "hover:bg-emerald-50 hover:text-emerald-700 hover:ring-1 hover:ring-inset hover:ring-emerald-200/60",
                      }[s];

                      return (
                        <button
                          key={s}
                          type="button"
                          disabled={isUpdating || isActive}
                          onClick={() => setStatus(i, s)}
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-50 ${
                            isActive
                              ? statusStyles
                              : `border border-neutral-200 text-neutral-400 ${statusStyles}`
                          }`}
                        >
                          {isUpdating && isActive ? (
                            <Loader2 className="h-2.5 w-2.5 animate-spin" />
                          ) : null}
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {!loading && filtered.length > 0 && (
          <div className="flex items-center justify-between border-t border-neutral-100 bg-neutral-50/40 px-6 py-3 text-[10px] font-medium text-neutral-500">
            <span className="tabular-nums">
              Showing {filtered.length} of {items.length} inquiries
            </span>
            <span className="flex items-center gap-1">
              Sorted by newest first
              <ChevronRight className="h-3 w-3" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}