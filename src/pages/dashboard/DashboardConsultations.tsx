import { useEffect, useState, useMemo } from "react";
import { 
  Search, 
  Mail, 
  RefreshCw, 
  Loader2, 
  Filter, 
  Download,
  CalendarClock,
  Users,
  Clock,
  Banknote,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Consultation } from "@/lib/types";
import { StatusBadge } from "./DashboardOverview";

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  NGN: "₦",
  GHS: "GH₵",
  KES: "KSh",
  ZAR: "R",
};

type StatusFilter = "all" | "paid" | "pending" | "failed";

export default function DashboardConsultations() {
  const [items, setItems] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [resending, setResending] = useState<string | null>(null);
  const [message, setMessage] = useState<{ tone: "ok" | "err"; text: string } | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("consultations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    setItems((data ?? []) as Consultation[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    let list = items;
    if (filter !== "all") list = list.filter((c) => c.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.client_name.toLowerCase().includes(q) ||
          c.client_email.toLowerCase().includes(q) ||
          c.reference.toLowerCase().includes(q)
      );
    }
    return list;
  }, [items, filter, search]);

  async function resendZoomLink(c: Consultation) {
    setResending(c.id);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              (await supabase.auth.getSession()).data.session?.access_token ?? ""
            }`,
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({ reference: c.reference }),
        }
      );
      const json = await res.json();
      if (json.success) {
        setMessage({ tone: "ok", text: `Zoom link email sent to ${c.client_email}.` });
        load();
      } else {
        setMessage({ tone: "err", text: `Could not resend: ${json.message ?? "unknown error"}` });
      }
    } catch (err) {
      setMessage({ tone: "err", text: `Error: ${String(err)}` });
    } finally {
      setResending(null);
    }
  }

  function exportCsv() {
    const header = ["reference", "client_name", "client_email", "date", "time", "amount", "currency", "status", "zoom_sent"];
    const rows = filtered.map((c) => [
      c.reference,
      c.client_name,
      c.client_email,
      c.session_date,
      c.session_time,
      (c.amount / 100).toFixed(2),
      c.currency,
      c.status,
      c.zoom_link_sent ? "yes" : "no",
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((cell) => `"${String(cell).replaceAll(`"`, `""`)}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `consultations-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const paidCount = items.filter((i) => i.status === "paid").length;
  const pendingCount = items.filter((i) => i.status === "pending").length;
  const failedCount = items.filter((i) => i.status === "failed").length;
  const revenue = items
    .filter((c) => c.status === "paid")
    .reduce((sum, c) => sum + c.amount, 0);

  const statTiles = [
    {
      label: "Total Bookings",
      value: items.length,
      icon: Users,
      accent: "from-neutral-500/15 to-neutral-500/0",
      iconBg: "bg-neutral-500/10 text-neutral-700",
    },
    {
      label: "Paid Sessions",
      value: paidCount,
      icon: Banknote,
      accent: "from-emerald-500/15 to-emerald-500/0",
      iconBg: "bg-emerald-500/10 text-emerald-700",
    },
    {
      label: "Awaiting Payment",
      value: pendingCount,
      icon: Clock,
      accent: "from-amber-500/15 to-amber-500/0",
      iconBg: "bg-amber-500/10 text-amber-700",
    },
    {
      label: "Revenue",
      value: `${(revenue / 100).toFixed(0)}`,
      icon: Sparkles,
      accent: "from-[#5D1F17]/15 to-[#5D1F17]/0",
      iconBg: "bg-[#5D1F17]/10 text-[#5D1F17]",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">
            Bookings
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-light tracking-tight text-neutral-900">
            Consultations
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Track paid sessions, send Zoom links, and manage the calendar.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={exportCsv}
            disabled={!filtered.length}
            className="group inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-medium text-neutral-600 transition-all duration-300 hover:border-neutral-400 hover:shadow-sm disabled:opacity-50"
          >
            <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" /> 
            Export CSV
          </button>
          <button
            type="button"
            onClick={load}
            className="group inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2 text-xs font-medium text-white transition-all duration-300 hover:bg-neutral-800 hover:shadow-sm"
          >
            <RefreshCw className={`h-3 w-3 transition-transform ${loading ? "animate-spin" : "group-hover:rotate-180"}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stat tiles */}
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
                <p className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 tabular-nums">
                  {loading ? "—" : tile.value}
                </p>
              </div>
              <div className={`grid h-10 w-10 place-items-center rounded-xl ${tile.iconBg} transition-transform group-hover:scale-110`}>
                <tile.icon className="h-4 w-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {message && (
        <div
          className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-medium ${
            message.tone === "ok"
              ? "border-emerald-200/60 bg-emerald-50 text-emerald-700"
              : "border-red-200/60 bg-red-50 text-red-700"
          }`}
        >
          {message.tone === "ok" ? (
            <Sparkles className="h-3.5 w-3.5" />
          ) : (
            <Loader2 className="h-3.5 w-3.5" />
          )}
          {message.text}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-neutral-200/70 bg-white p-3 shadow-sm">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or reference…"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50/40 py-2.5 pl-10 pr-4 text-xs outline-none transition-all duration-300 focus:border-[#5D1F17] focus:bg-white focus:ring-2 focus:ring-[#5D1F17]/10"
          />
        </div>
        <div className="flex items-center gap-1 rounded-xl border border-neutral-200 bg-neutral-50/40 p-1">
          <span className="hidden sm:grid h-8 w-8 place-items-center text-neutral-400">
            <Filter className="h-3.5 w-3.5" />
          </span>
          {(["all", "paid", "pending", "failed"] as StatusFilter[]).map((f) => {
            const count =
              f === "all"
                ? items.length
                : f === "paid"
                  ? paidCount
                  : f === "pending"
                    ? pendingCount
                    : failedCount;
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

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200/70 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/40">
                {[
                  "Client",
                  "Schedule",
                  "Amount",
                  "Status",
                  "Zoom",
                  "",
                ].map((h, i) => (
                  <th
                    key={h}
                    className={`px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400 ${
                      i === 5 ? "text-right" : ""
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
                      <p className="text-xs text-neutral-500">Loading consultations…</p>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-neutral-100">
                        <CalendarClock className="h-5 w-5 text-neutral-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-700">No bookings found</p>
                        <p className="mt-1 text-[11px] text-neutral-500">
                          Try adjusting your filters or search terms.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr 
                    key={c.id} 
                    className="group text-xs transition-all duration-200 hover:bg-gradient-to-r hover:from-neutral-50/80 hover:to-transparent"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#5D1F17]/20 to-amber-500/20 text-[11px] font-bold text-[#5D1F17] ring-1 ring-inset ring-[#5D1F17]/10">
                          {c.client_name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-neutral-900">{c.client_name}</p>
                          <p className="text-[11px] text-neutral-500">{c.client_email}</p>
                          {c.notes && (
                            <p className="mt-1 max-w-[280px] truncate text-[10px] italic text-neutral-400">
                              "{c.notes}"
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-neutral-900">{c.session_date}</div>
                      <div className="mt-0.5 flex items-center gap-1 text-[11px] text-neutral-500">
                        <Clock className="h-3 w-3" />
                        {c.session_time}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold tabular-nums text-neutral-900">
                        {(CURRENCY_SYMBOLS[c.currency] ?? c.currency)}
                        {(c.amount / 100).toFixed(0)}
                      </span>
                      <span className="ml-1 text-[10px] font-medium uppercase text-neutral-400">
                        {c.currency}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-6 py-4">
                      {c.status === "paid" ? (
                        c.zoom_link_sent ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200/60">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Sent
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-700 ring-1 ring-inset ring-amber-200/60">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                            Pending
                          </span>
                        )
                      ) : (
                        <span className="text-[11px] text-neutral-300">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {c.status === "paid" && (
                        <button
                          type="button"
                          onClick={() => resendZoomLink(c)}
                          disabled={resending === c.id}
                          className="group inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-600 transition-all duration-300 hover:border-[#5D1F17] hover:bg-[#5D1F17]/5 hover:text-[#5D1F17] hover:shadow-sm disabled:opacity-50"
                        >
                          {resending === c.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Mail className="h-3 w-3 transition-transform group-hover:scale-110" />
                          )}
                          {c.zoom_link_sent ? "Resend" : "Send link"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-neutral-100 bg-neutral-50/40 px-6 py-3 text-[10px] font-medium text-neutral-500">
          <span className="tabular-nums">
            Showing {filtered.length} of {items.length} bookings
          </span>
          <span className="flex items-center gap-1">
            Sorted by newest first
            <ChevronRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </div>
  );
}