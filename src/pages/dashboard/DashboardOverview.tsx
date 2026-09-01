import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  FileText,
  Inbox,
  DollarSign,
  ArrowUpRight,
  ArrowUp,
  TrendingUp,
  Clock,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Consultation, ServiceInquiry } from "@/lib/types";

interface Stats {
  paidConsultations: number;
  pendingConsultations: number;
  revenueCents: number;
  publishedPosts: number;
  draftPosts: number;
  newInquiries: number;
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<Stats>({
    paidConsultations: 0,
    pendingConsultations: 0,
    revenueCents: 0,
    publishedPosts: 0,
    draftPosts: 0,
    newInquiries: 0,
  });
  const [recent, setRecent] = useState<Consultation[]>([]);
  const [recentInquiries, setRecentInquiries] = useState<ServiceInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [consultRes, blogRes, inquiryRes, recentRes, recentInqRes] = await Promise.all([
        supabase.from("consultations").select("status, amount"),
        supabase.from("blog_posts").select("published"),
        supabase.from("service_inquiries").select("status"),
        supabase
          .from("consultations")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("service_inquiries")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(4),
      ]);

      const consultations = (consultRes.data ?? []) as { status: string; amount: number }[];
      const posts = (blogRes.data ?? []) as { published: boolean }[];
      const inquiries = (inquiryRes.data ?? []) as { status: string }[];

      setStats({
        paidConsultations: consultations.filter((c) => c.status === "paid").length,
        pendingConsultations: consultations.filter((c) => c.status === "pending").length,
        revenueCents: consultations
          .filter((c) => c.status === "paid")
          .reduce((s, c) => s + (c.amount ?? 0), 0),
        publishedPosts: posts.filter((p) => p.published).length,
        draftPosts: posts.filter((p) => !p.published).length,
        newInquiries: inquiries.filter((i) => i.status === "new").length,
      });
      setRecent((recentRes.data ?? []) as Consultation[]);
      setRecentInquiries((recentInqRes.data ?? []) as ServiceInquiry[]);
      setLoading(false);
    }
    load();
  }, []);

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const cards = [
    {
      label: "Revenue",
      value: `$${(stats.revenueCents / 100).toFixed(0)}`,
      sub: `${stats.paidConsultations} paid sessions`,
      icon: DollarSign,
      accent: "from-emerald-500/15 to-emerald-500/0",
      iconBg: "bg-emerald-500/10 text-emerald-700",
      to: "/dashboard/consultations",
    },
    {
      label: "Bookings",
      value: stats.paidConsultations + stats.pendingConsultations,
      sub: `${stats.pendingConsultations} awaiting payment`,
      icon: CalendarDays,
      accent: "from-[#5D1F17]/15 to-[#5D1F17]/0",
      iconBg: "bg-[#5D1F17]/10 text-[#5D1F17]",
      to: "/dashboard/consultations",
    },
    {
      label: "Published Articles",
      value: stats.publishedPosts,
      sub: `${stats.draftPosts} drafts`,
      icon: FileText,
      accent: "from-amber-500/15 to-amber-500/0",
      iconBg: "bg-amber-500/10 text-amber-700",
      to: "/dashboard/blog",
    },
    {
      label: "New Inquiries",
      value: stats.newInquiries,
      sub: "Follow up to convert",
      icon: Inbox,
      accent: "from-blue-500/15 to-blue-500/0",
      iconBg: "bg-blue-500/10 text-blue-700",
      to: "/dashboard/inquiries",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">
            {today}
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-light tracking-tight text-neutral-900">
            Welcome back, <span className="font-semibold">Bimpe</span>
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Here's how your brand work is moving today.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          All systems operational
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.to}
            className="group relative overflow-hidden rounded-2xl border border-neutral-200/70 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-900/5"
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accent} opacity-60`}
            />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                  {card.label}
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 tabular-nums">
                  {loading ? "—" : card.value}
                </p>
                <p className="mt-1 text-[11px] text-neutral-500">{card.sub}</p>
              </div>
              <div
                className={`grid h-10 w-10 place-items-center rounded-xl ${card.iconBg} transition-transform group-hover:scale-110`}
              >
                <card.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="relative mt-5 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              <span>View</span>
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent bookings */}
        <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-neutral-200/70 bg-white">
          <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
            <div>
              <h2 className="text-sm font-semibold tracking-tight">Recent Bookings</h2>
              <p className="text-[11px] text-neutral-500">Latest 1-on-1 sessions</p>
            </div>
            <Link
              to="/dashboard/consultations"
              className="inline-flex items-center gap-1 rounded-full bg-neutral-900 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white"
            >
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          {loading ? (
            <div className="px-6 py-10 text-center text-xs text-neutral-400">Loading…</div>
          ) : recent.length === 0 ? (
            <EmptyState
              icon={<CalendarDays className="h-5 w-5" />}
              title="No bookings yet"
              hint="Once clients book a session, you'll see them here in real time."
            />
          ) : (
            <ul className="divide-y divide-neutral-100">
              {recent.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between gap-3 px-6 py-3.5 transition-colors hover:bg-neutral-50/60"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 text-[11px] font-bold text-neutral-700">
                      {c.client_name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-neutral-900">
                        {c.client_name}
                      </p>
                      <p className="truncate text-[11px] text-neutral-500">
                        {c.session_date} · {c.session_time}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="hidden sm:inline text-[11px] font-medium text-neutral-500 tabular-nums">
                      ${(c.amount / 100).toFixed(0)}
                    </span>
                    <StatusBadge status={c.status} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Side rail */}
        <div className="space-y-6">
          {/* Performance card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c0a09] to-[#1c1917] p-6 text-white">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#5D1F17]/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-amber-500/20 blur-3xl" />
            <div className="relative">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                This month
              </p>
              <p className="mt-3 flex items-baseline gap-2 text-3xl font-light tabular-nums">
                <span>${(stats.revenueCents / 100).toFixed(0)}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                  <TrendingUp className="h-2.5 w-2.5" /> Live
                </span>
              </p>
              <p className="mt-1 text-xs text-white/60">Revenue collected</p>

              <div className="mt-5 grid grid-cols-2 gap-3 text-center">
                <Mini label="Paid" value={stats.paidConsultations} />
                <Mini label="Pending" value={stats.pendingConsultations} />
              </div>
            </div>
          </div>

          {/* Latest inquiries */}
          <div className="overflow-hidden rounded-2xl border border-neutral-200/70 bg-white">
            <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-3.5">
              <h3 className="text-sm font-semibold tracking-tight">Latest Inquiries</h3>
              <Link
                to="/dashboard/inquiries"
                className="text-[10px] font-bold uppercase tracking-wider text-[#5D1F17]"
              >
                View
              </Link>
            </div>
            {loading ? (
              <div className="px-5 py-8 text-center text-xs text-neutral-400">Loading…</div>
            ) : recentInquiries.length === 0 ? (
              <p className="px-5 py-8 text-center text-[11px] text-neutral-400">
                No inquiries yet
              </p>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {recentInquiries.map((i) => (
                  <li key={i.id} className="px-5 py-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-xs font-semibold text-neutral-900">
                        {i.name}
                      </p>
                      <span className="rounded-full bg-[#5D1F17]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#5D1F17]">
                        {i.service.split(" ")[0]}
                      </span>
                    </div>
                    <p className="mt-0.5 flex items-center gap-1 text-[10px] text-neutral-500">
                      <Clock className="h-2.5 w-2.5" />
                      {new Date(i.created_at).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <p className="text-2xl font-semibold tabular-nums">{value}</p>
      <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/50">{label}</p>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    paid: "bg-emerald-50 text-emerald-700 ring-emerald-200/60",
    pending: "bg-amber-50 text-amber-700 ring-amber-200/60",
    failed: "bg-red-50 text-red-600 ring-red-200/60",
    new: "bg-blue-50 text-blue-700 ring-blue-200/60",
    contacted: "bg-violet-50 text-violet-700 ring-violet-200/60",
    closed: "bg-neutral-100 text-neutral-500 ring-neutral-200/60",
    live: "bg-emerald-50 text-emerald-700 ring-emerald-200/60",
    draft: "bg-neutral-100 text-neutral-500 ring-neutral-200/60",
  };
  const cls = map[status] ?? "bg-neutral-100 text-neutral-500 ring-neutral-200/60";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${cls}`}
    >
      {status === "paid" && <ArrowUp className="h-2.5 w-2.5" />}
      {status}
    </span>
  );
}

function EmptyState({
  icon,
  title,
  hint,
}: {
  icon: React.ReactNode;
  title: string;
  hint: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-neutral-100 text-neutral-400">
        {icon}
      </div>
      <p className="text-xs font-semibold text-neutral-700">{title}</p>
      <p className="max-w-xs text-[11px] text-neutral-500">{hint}</p>
    </div>
  );
}