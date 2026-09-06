import { useEffect, useState, useMemo } from "react";
import {
  Search,
  RefreshCw,
  Loader2,
  Filter,
  Download,
  ClipboardList,
  Clock,
  Sparkles,
  ChevronRight,
  Mail,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { ServiceRequest, RequestStatus } from "@/lib/types";
import { StatusBadge } from "./DashboardOverview";

type StatusFilter = "all" | RequestStatus;

export default function DashboardServiceRequests() {
  const [items, setItems] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [resending, setResending] = useState<string | null>(null);
  const [message, setMessage] = useState<{ tone: "ok" | "err"; text: string } | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("service_requests")
      .select("*, services!inner(name)")
      .order("created_at", { ascending: false })
      .limit(200);
    setItems((data ?? []) as unknown as ServiceRequest[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    let list = items;
    if (filter !== "all") list = list.filter((r) => r.request_status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.client_name.toLowerCase().includes(q) ||
          r.client_email.toLowerCase().includes(q)
      );
    }
    return list;
  }, [items, filter, search]);

  async function handleContact(r: ServiceRequest) {
    const subject = encodeURIComponent(`Following up on your ${r.services?.name ?? "Service Request"}`);
    const body = encodeURIComponent(
      `Hi ${r.client_name},\n\nThank you for reaching out. We've reviewed your request and would like to schedule a brief call to discuss your ${r.services?.name?.toLowerCase() ?? "project"} goals.\n\nPlease let us know your availability over the next few days.\n\nBest regards,\nBimpe\nThe Brand Strategist`
    );
    window.location.href = `mailto:${r.client_email}?subject=${subject}&body=${body}`;

    updateStatus(r, "contacted");
  }

  async function updateStatus(r: ServiceRequest, status: RequestStatus) {
    await supabase
      .from("service_requests")
      .update({ request_status: status })
      .eq("id", r.id);
    load();
  }

  async function resendEmail(r: ServiceRequest) {
    setResending(r.id);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-confirmation-mail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              (await supabase.auth.getSession()).data.session?.access_token ?? ""
            }`,
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({
            template: "service_request",
            data: {
              client_name: r.client_name,
              client_email: r.client_email,
              service_name: r.services?.name ?? "Service Request",
            },
            _tracking: {
              id: r.id,
              type: "service_request",
            },
          }),
        }
      );
      const json = await res.json();
      if (json.success) {
        setMessage({ tone: "ok", text: `Confirmation email re-sent to ${r.client_email}.` });
      } else {
        setMessage({ tone: "err", text: `Could not resend: ${json.error ?? "unknown error"}` });
      }
    } catch (err) {
      setMessage({ tone: "err", text: `Error: ${String(err)}` });
    } finally {
      setResending(null);
    }
  }

  function exportCsv() {
    const header = ["service", "client_name", "client_email", "phone", "status", "created_at", "message"];
    const rows = filtered.map((r) => [
      r.services?.name ?? r.service_id ?? "",
      r.client_name,
      r.client_email,
      r.client_phone ?? "",
      r.request_status,
      new Date(r.created_at).toISOString().slice(0, 10),
      (r.message ?? "").replace(/"/g, '""'),
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `service-requests-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const newCount = items.filter((i) => i.request_status === "new").length;
  const contactedCount = items.filter((i) => i.request_status === "contacted").length;
  const completedCount = items.filter((i) => i.request_status === "completed").length;

  const statTiles = [
    {
      label: "Total Requests",
      value: items.length,
      icon: ClipboardList,
      accent: "from-neutral-500/15 to-neutral-500/0",
      iconBg: "bg-neutral-500/10 text-neutral-700",
    },
    {
      label: "New",
      value: newCount,
      icon: Clock,
      accent: "from-amber-500/15 to-amber-500/0",
      iconBg: "bg-amber-500/10 text-amber-700",
    },
    {
      label: "Contacted",
      value: contactedCount,
      icon: Mail,
      accent: "from-blue-500/15 to-blue-500/0",
      iconBg: "bg-blue-500/10 text-blue-700",
    },
    {
      label: "Completed",
      value: completedCount,
      icon: Sparkles,
      accent: "from-emerald-500/15 to-emerald-500/0",
      iconBg: "bg-emerald-500/10 text-emerald-700",
    },
  ];

  const allFilters: StatusFilter[] = ["all", "new", "contacted", "confirmed", "completed", "cancelled"];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">
            Service Requests
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-light tracking-tight text-neutral-900">
            Strategy &amp; Branding Requests
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Track strategy setup and full branding inquiries. Update status and resend confirmation emails.
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
            placeholder="Search by name or email…"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50/40 py-2.5 pl-10 pr-4 text-xs outline-none transition-all duration-300 focus:border-[#5D1F17] focus:bg-white focus:ring-2 focus:ring-[#5D1F17]/10"
          />
        </div>
        <div className="flex items-center gap-1 rounded-xl border border-neutral-200 bg-neutral-50/40 p-1">
          <span className="hidden sm:grid h-8 w-8 place-items-center text-neutral-400">
            <Filter className="h-3.5 w-3.5" />
          </span>
          {allFilters.map((f) => {
            const count =
              f === "all"
                ? items.length
                : items.filter((r) => r.request_status === f).length;
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
          <table className="w-full min-w-[920px] text-left">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/40">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">Client</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">Service</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">Email</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
                      <p className="text-xs text-neutral-500">Loading requests…</p>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-neutral-100">
                        <ClipboardList className="h-5 w-5 text-neutral-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-700">No requests found</p>
                        <p className="mt-1 text-[11px] text-neutral-500">
                          Try adjusting your filters or search terms.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr
                    key={r.id}
                    className="group text-xs transition-all duration-200 hover:bg-gradient-to-r hover:from-neutral-50/80 hover:to-transparent"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#5D1F17]/20 to-amber-500/20 text-[11px] font-bold text-[#5D1F17] ring-1 ring-inset ring-[#5D1F17]/10">
                          {r.client_name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-neutral-900">{r.client_name}</p>
                          <p className="text-[11px] text-neutral-500">{r.client_email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-neutral-900">{r.services?.name ?? r.service_id ?? "Service Request"}</div>
                      {r.message && (
                        <p className="mt-0.5 max-w-[280px] truncate text-[10px] italic text-neutral-400">
                          "{r.message}"
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={r.request_status} />
                    </td>
                    <td className="px-6 py-4">
                      {r.email_sent ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                          Sent
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {r.request_status !== "completed" && r.request_status !== "cancelled" && (
                          <button
                            type="button"
                            onClick={() => handleContact(r)}
                            className="group inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-600 transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm"
                          >
                            <Mail className="h-3 w-3 transition-transform group-hover:scale-110" />
                            Contact
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => resendEmail(r)}
                          disabled={resending === r.id}
                          className="group inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-600 transition-all duration-300 hover:border-[#5D1F17] hover:bg-[#5D1F17]/5 hover:text-[#5D1F17] hover:shadow-sm disabled:opacity-50"
                        >
                          {resending === r.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Mail className="h-3 w-3 transition-transform group-hover:scale-110" />
                          )}
                          Resend
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-neutral-100 bg-neutral-50/40 px-6 py-3 text-[10px] font-medium text-neutral-500">
          <span className="tabular-nums">
            Showing {filtered.length} of {items.length} requests
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
