import { useEffect, useState } from "react";
import { 
  Loader2, 
  Save, 
  Video, 
  DollarSign, 
  Mail,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Shield,
  Clock,
  Zap
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface SettingsStats {
  total: number;
  configured: number;
  lastUpdated: string | null;
}

export default function DashboardSettings() {
  const [zoomLink, setZoomLink] = useState("");
  const [fee, setFee] = useState("100");
  const [contactEmail, setContactEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ tone: "ok" | "err"; text: string } | null>(null);
  const [stats, setStats] = useState<SettingsStats>({
    total: 3,
    configured: 0,
    lastUpdated: null,
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("key, value, updated_at");
        
        if (error) throw error;
        
        const map = Object.fromEntries(
          (data ?? []).map((r) => [r.key, r.value ?? ""])
        );
        
        const zoomValue = map.zoom_link ?? "";
        const feeValue = map.consultation_fee_usd ?? "100";
        const emailValue = map.contact_email ?? "";
        
        setZoomLink(zoomValue);
        setFee(feeValue);
        setContactEmail(emailValue);
        
        // Calculate stats
        const configuredCount = [zoomValue, feeValue, emailValue].filter(
          (v) => v && v.trim() !== ""
        ).length;
        
        const latestUpdate = data?.reduce((latest, row) => {
          if (!row.updated_at) return latest;
          if (!latest || row.updated_at > latest) return row.updated_at;
          return latest;
        }, null as string | null);
        
        setStats({
          total: 3,
          configured: configuredCount,
          lastUpdated: latestUpdate,
        });
      } catch (err) {
        console.error("Error loading settings:", err);
        setMessage({ tone: "err", text: "Failed to load settings. Please try again." });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      // Validate inputs
      if (zoomLink && !zoomLink.startsWith("https://")) {
        throw new Error("Zoom link must start with https://");
      }
      
      if (contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
        throw new Error("Please enter a valid email address");
      }
      
      const feeValue = parseInt(fee);
      if (isNaN(feeValue) || feeValue < 1) {
        throw new Error("Consultation fee must be at least $1");
      }

      const updates = [
        { key: "zoom_link", value: zoomLink.trim() },
        { key: "consultation_fee_usd", value: String(feeValue) },
        { key: "contact_email", value: contactEmail.trim() },
      ];

      for (const u of updates) {
        const { error } = await supabase
          .from("site_settings")
          .upsert(
            { ...u, updated_at: new Date().toISOString() },
            { onConflict: "key" }
          );
        
        if (error) throw error;
      }

      // Update stats
      const configuredCount = [zoomLink.trim(), String(feeValue), contactEmail.trim()].filter(
        (v) => v && v.trim() !== ""
      ).length;
      
      setStats({
        ...stats,
        configured: configuredCount,
        lastUpdated: new Date().toISOString(),
      });

      setMessage({ tone: "ok", text: "Settings saved successfully!" });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (err) {
      console.error("Save error:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setMessage({ tone: "err", text: `Failed to save: ${errorMessage}` });
    } finally {
      setSaving(false);
    }
  }

  const settingsCards = [
    {
      label: "Zoom Link",
      value: zoomLink ? "Configured" : "Not set",
      icon: Video,
      accent: "from-blue-500/15 to-blue-500/0",
      iconBg: "bg-blue-500/10 text-blue-700",
      status: zoomLink ? "active" : "inactive",
    },
    {
      label: "Consultation Fee",
      value: `$${fee}`,
      icon: DollarSign,
      accent: "from-emerald-500/15 to-emerald-500/0",
      iconBg: "bg-emerald-500/10 text-emerald-700",
      status: fee ? "active" : "inactive",
    },
    {
      label: "Contact Email",
      value: contactEmail || "Not set",
      icon: Mail,
      accent: "from-amber-500/15 to-amber-500/0",
      iconBg: "bg-amber-500/10 text-amber-700",
      status: contactEmail ? "active" : "inactive",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">
            Configuration
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-light tracking-tight text-neutral-900">
            Settings
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Configure your consultation preferences and contact details.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {stats.configured}/{stats.total} configured
        </div>
      </div>

      {/* Settings Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {settingsCards.map((card) => (
          <div
            key={card.label}
            className="group relative overflow-hidden rounded-2xl border border-neutral-200/70 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-900/5"
          >
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accent} opacity-60`} />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                  {card.label}
                </p>
                <p className={`mt-2 text-sm font-semibold truncate ${
                  card.status === "active" ? "text-neutral-900" : "text-neutral-400"
                }`}>
                  {card.value}
                </p>
              </div>
              <div className={`grid h-10 w-10 place-items-center rounded-xl ${card.iconBg} transition-transform group-hover:scale-110`}>
                <card.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="relative mt-3">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                card.status === "active"
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200/60"
                  : "bg-neutral-100 text-neutral-500 ring-1 ring-inset ring-neutral-200/60"
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${
                  card.status === "active" ? "bg-emerald-500" : "bg-neutral-400"
                }`} />
                {card.status === "active" ? "Active" : "Pending"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Message */}
      {message && (
        <div
          className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-medium ${
            message.tone === "ok"
              ? "border-emerald-200/60 bg-emerald-50 text-emerald-700"
              : "border-red-200/60 bg-red-50 text-red-700"
          }`}
        >
          {message.tone === "ok" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          {message.text}
        </div>
      )}

      {/* Settings Form */}
      {loading ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200/70 bg-white px-5 py-16">
          <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
          <p className="text-xs text-neutral-500">Loading settings…</p>
        </div>
      ) : (
        <form 
          onSubmit={save} 
          className="overflow-hidden rounded-2xl border border-neutral-200/70 bg-white shadow-sm"
        >
          <div className="border-b border-neutral-100 bg-neutral-50/40 px-6 py-4">
            <h2 className="text-sm font-semibold tracking-tight text-neutral-900">
              Consultation Settings
            </h2>
            <p className="mt-0.5 text-[11px] text-neutral-500">
              These settings control your booking and payment flow
            </p>
          </div>

          <div className="space-y-6 p-6">
            {/* Zoom Link */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                <Video className="h-3.5 w-3.5" />
                Zoom Meeting Link
              </label>
              <input
                type="url"
                value={zoomLink}
                onChange={(e) => setZoomLink(e.target.value)}
                placeholder="https://zoom.us/j/…"
                className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none transition-all duration-300 focus:border-[#5D1F17] focus:ring-2 focus:ring-[#5D1F17]/10"
              />
              <div className="mt-2 flex items-start gap-2 rounded-lg bg-blue-50/50 p-3">
                <Zap className="h-3.5 w-3.5 mt-0.5 shrink-0 text-blue-600" />
                <p className="text-[11px] leading-relaxed text-blue-700">
                  This link is emailed to clients automatically after successful payment. Use a
                  recurring/personal meeting room link so it stays valid for every session.
                </p>
              </div>
            </div>

            {/* Consultation Fee */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                <DollarSign className="h-3.5 w-3.5" />
                Consultation Fee (USD)
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-neutral-400">
                  $
                </span>
                <input
                  type="number"
                  min="1"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 py-2.5 pl-8 pr-4 text-sm outline-none transition-all duration-300 focus:border-[#5D1F17] focus:ring-2 focus:ring-[#5D1F17]/10"
                />
              </div>
              <div className="mt-2 flex items-start gap-2 rounded-lg bg-emerald-50/50 p-3">
                <Clock className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-600" />
                <p className="text-[11px] leading-relaxed text-emerald-700">
                  Charged via Paystack at checkout. Changes apply to new bookings immediately.
                </p>
              </div>
            </div>

            {/* Contact Email */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                <Mail className="h-3.5 w-3.5" />
                Contact Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none transition-all duration-300 focus:border-[#5D1F17] focus:ring-2 focus:ring-[#5D1F17]/10"
                placeholder="you@example.com"
              />
              <div className="mt-2 flex items-start gap-2 rounded-lg bg-amber-50/50 p-3">
                <Shield className="h-3.5 w-3.5 mt-0.5 shrink-0 text-amber-600" />
                <p className="text-[11px] leading-relaxed text-amber-700">
                  Used for booking notifications and client communications.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-neutral-100 bg-neutral-50/40 px-6 py-4">
            <div className="text-[10px] text-neutral-500">
              {stats.lastUpdated && (
                <span>
                  Last updated: {new Date(stats.lastUpdated).toLocaleString()}
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={saving}
              className="group inline-flex items-center gap-2 rounded-full bg-[#5D1F17] px-6 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#4A1812] hover:shadow-lg hover:shadow-[#5D1F17]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                  Save Settings
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}