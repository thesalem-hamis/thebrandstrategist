import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpLeft, ArrowUpRight, Loader2, CheckCircle2, Mail, Phone, User as UserIcon, MessageSquare } from "lucide-react";
import { supabase } from "@/lib/supabase";

const SERVICES = [
  { value: "personal-brand", label: "Personal Brand Strategy" },
  { value: "brand-identity", label: "Brand Identity & Design" },
  { value: "business-brand", label: "Business Brand Strategy" },
  { value: "communication", label: "Communication & Content" },
  { value: "growth", label: "Brand Growth & Advisory" },
  { value: "retainer", label: "Retainer / Fractional Leadership" },
  { value: "other", label: "Something Else" },
];

const BUDGETS = [
  "Under $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Not sure yet",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: SERVICES[0].value,
    budget: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      service: form.service,
      budget: form.budget || null,
      message: form.message.trim() || null,
    };

    const { error: insertError } = await supabase
      .from("service_inquiries")
      .insert(payload);

    setSubmitting(false);

    if (insertError) {
      setError("Something went wrong sending your inquiry. Please try again.");
      console.error(insertError);
      return;
    }

    setDone(true);
  }

  function reset() {
    setDone(false);
    setForm({ name: "", email: "", phone: "", service: SERVICES[0].value, budget: "", message: "" });
  }

  return (
    <div className="w-full bg-white text-neutral-900 font-sans pt-20 sm:pt-28 lg:pt-36 pb-24 sm:pb-32 px-6 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#5D1F17] bg-white text-[#5D1F17] hover:border-neutral-900 hover:text-neutral-900 text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow hover:shadow-md group/btn"
          >
            <ArrowUpLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            <span>GO BACK</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-5xl lg:text-[68px] font-semibold sm:font-light uppercase tracking-tight leading-none text-neutral-900">
            LET'S BUILD <span className="font-serif italic text-[#5D1F17]">TOGETHER</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 items-start mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-6 text-xs sm:text-sm leading-relaxed text-neutral-700 font-normal"
          >
            Tell us about your brand and what you're trying to achieve. For retainer, identity systems, growth advisory and other engagements that go beyond a single consultation, share a few details and we'll get back to you within two business days.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-6 text-xs sm:text-sm leading-relaxed text-neutral-700 font-normal"
          >
            Looking for a quick 60-minute strategy session instead? Use the booking page to reserve a 1-on-1 slot with Bimpe and pay securely via Paystack.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Left: form */}
          <div className="lg:col-span-7 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-zinc-200">
            {done ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex h-full min-h-[420px] flex-col items-center justify-center text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#5D1F17] flex items-center justify-center mb-6 shadow-md">
                  <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={2.2} />
                </div>
                <h3 className="text-xl sm:text-2xl font-light tracking-tight uppercase text-neutral-900 mb-2">
                  Inquiry Received
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed max-w-sm mb-1">
                  Thank you, <span className="font-semibold text-neutral-900">{form.name.split(" ")[0]}</span> — your message has been delivered to Bimpe's dashboard.
                </p>
                <p className="text-xs text-neutral-500 leading-relaxed max-w-sm mb-6">
                  You'll hear back at <span className="font-semibold text-neutral-900">{form.email}</span> within two business days.
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded-full border border-zinc-200 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:border-neutral-400"
                  >
                    Send Another
                  </button>
                  <Link
                    to="/book-a-session"
                    className="inline-flex items-center gap-2 rounded-full bg-[#5D1F17] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#4A1812]"
                  >
                    Book a Session <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 font-mono">
                  PROJECT INQUIRY
                </p>
                <h3 className="text-lg sm:text-xl font-medium tracking-tight uppercase text-neutral-900 -mt-2">
                  Tell Us About Your Brand
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Full Name"
                    icon={UserIcon}
                    required
                    value={form.name}
                    onChange={(v) => update("name", v)}
                    placeholder="Jane Doe"
                  />
                  <Field
                    label="Email"
                    icon={Mail}
                    type="email"
                    required
                    value={form.email}
                    onChange={(v) => update("email", v)}
                    placeholder="jane@company.com"
                  />
                </div>

                <Field
                  label="Phone (optional)"
                  icon={Phone}
                  type="tel"
                  value={form.phone}
                  onChange={(v) => update("phone", v)}
                  placeholder="+1 555 0123"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1.5 block">
                      Service of Interest
                    </label>
                    <select
                      required
                      value={form.service}
                      onChange={(e) => update("service", e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-full px-5 py-3 text-xs text-neutral-800 outline-none focus:border-[#5D1F17] transition-colors"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1.5 block">
                      Budget Range
                    </label>
                    <select
                      value={form.budget}
                      onChange={(e) => update("budget", e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-full px-5 py-3 text-xs text-neutral-800 outline-none focus:border-[#5D1F17] transition-colors"
                    >
                      <option value="">Select a range…</option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1.5 block">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="pointer-events-none absolute left-5 top-4 w-3.5 h-3.5 text-neutral-400" />
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Tell us about your brand, your goals and where you'd like to be in 90 days…"
                      className="w-full bg-white border border-zinc-200 rounded-2xl pl-11 pr-5 py-3 text-xs text-neutral-800 outline-none focus:border-[#5D1F17] transition-colors resize-none"
                    />
                  </div>
                </div>

                {error && (
                  <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-[11px] text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#5D1F17] py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow hover:bg-[#4A1812] disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send Inquiry <ArrowUpRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right: details */}
          <aside className="lg:col-span-5 p-6 sm:p-10 bg-neutral-50/60 flex flex-col gap-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 font-mono mb-3">
                WHAT HAPPENS NEXT
              </p>
              <ol className="space-y-3 text-xs text-neutral-600 leading-relaxed">
                {[
                  "Your inquiry lands directly in the admin dashboard.",
                  "Bimpe reviews your goals and brand context personally.",
                  "You'll receive a tailored reply with next steps and a quote within two business days.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#5D1F17] text-[10px] font-bold text-[#5D1F17]">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-t border-zinc-200 pt-6">
              <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 font-mono mb-3">
                OTHER WAYS TO REACH US
              </p>
              <ul className="space-y-3 text-xs text-neutral-700">
                <li className="flex items-center gap-3">
                  <Mail className="w-3.5 h-3.5 text-[#5D1F17]" />
                  hello@thebrandstrategist.com
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-3.5 h-3.5 text-[#5D1F17]" />
                  By appointment via the booking page
                </li>
              </ul>
            </div>

            <div className="border-t border-zinc-200 pt-6">
              <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 font-mono mb-3">
                PREFER A 1-ON-1?
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Book a focused 60-minute consultation. We'll cover assessment, opportunity mapping, and next steps in a single session.
              </p>
              <Link
                to="/book-a-session"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5D1F17] hover:text-neutral-900 transition-colors"
              >
                Book a Session <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  icon: typeof UserIcon;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

function Field({ label, icon: Icon, type = "text", required, value, onChange, placeholder }: FieldProps) {
  return (
    <div>
      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1.5 block">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-5 top-1/2 w-3.5 h-3.5 -translate-y-1/2 text-neutral-400" />
        <input
          required={required}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white border border-zinc-200 rounded-full pl-11 pr-5 py-3 text-xs text-neutral-800 outline-none focus:border-[#5D1F17] transition-colors"
        />
      </div>
    </div>
  );
}