import { useEffect, useState, type FormEvent } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpLeft,
  ArrowUpRight,
  Check,
  Loader2,
  Mail,
  Phone,
  User as UserIcon,
  MessageSquare,
  DollarSign,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { SERVICES } from "@/pages/ServicesPage";

const STEP_TITLES = ["Your Details", "Project Brief", "Confirmation"];

export default function ServiceRequestPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = SERVICES.find((s) => s.id === id && !s.paymentRequired);

  const [step, setStep] = useState<"details" | "brief" | "confirmed">("details");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    timeline: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // If the service doesn't exist or requires payment, bounce to /services
    if (!service) {
      navigate("/services", { replace: true });
    }
  }, [service, navigate]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleDetailsSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) {
      setErrorMsg("Please fill in your name and email.");
      return;
    }
    setStep("brief");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!service || !form.message) {
      setErrorMsg("Please describe your project briefly.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const { error } = await supabase.from("service_requests").insert({
      service_id: service.id,
      client_name: form.name,
      client_email: form.email,
      client_phone: form.phone || null,
      message: form.message,
      budget: form.timeline || null,
      request_status: "new",
      email_sent: false,
    });

    if (error) {
      setIsSubmitting(false);
      setErrorMsg("Something went wrong saving your request. Please try again.");
      console.error(error);
      return;
    }

    // Trigger the confirmation email via the edge function
    fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-confirmation-mail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          template: "service_request",
          data: {
            client_name: form.name,
            client_email: form.email,
            service_name: service.title,
          },
        }),
      }
    ).catch((e) => console.error("email dispatch failed:", e));

    setIsSubmitting(false);
    setStep("confirmed");
  }

  if (!service) {
    return null;
  }

  const steps = ["Your Details", "Project Brief", "Confirmation"];

  return (
    <div className="w-full bg-white text-neutral-900 font-sans pt-20 sm:pt-28 lg:pt-36 pb-24 sm:pb-32 px-6 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex justify-start">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#5D1F17] bg-white text-[#5D1F17] hover:border-neutral-900 hover:text-neutral-900 text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow hover:shadow-md group/btn"
          >
            <ArrowUpLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            <span>GO BACK</span>
          </Link>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-5xl lg:text-[68px] font-bold tracking-tight uppercase leading-none text-neutral-900">
            {service.title.toUpperCase().replace("/ $2,000", "").replace("FULL BRANDING", "BRANDING").trim()}{" "}
            <span className="font-serif italic text-[#5D1F17]">REQUEST</span>
          </h1>
          <p className="mt-4 max-w-2xl text-xs sm:text-sm leading-relaxed text-neutral-600">
            {service.description}
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-10 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-neutral-400">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-bold ${
                  i === steps.indexOf(step === "details" ? "Your Details" : step === "brief" ? "Project Brief" : "Confirmation")
                    ? "border-[#5D1F17] bg-[#5D1F17] text-white"
                    : i === 2
                      ? "border-neutral-300 bg-white text-neutral-400"
                      : "border-neutral-300 bg-white text-neutral-400"
                }`}
              >
                {i === 2 && step === "confirmed" ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={
                  i === steps.indexOf(step === "details" ? "Your Details" : step === "brief" ? "Project Brief" : "Confirmation")
                    ? "text-neutral-900"
                    : "text-neutral-400"
                }
              >
                {s}
              </span>
              {i < steps.length - 1 && <span className="mx-1 h-px w-6 bg-neutral-200" />}
            </div>
          ))}
        </div>

        {/* Form */}
        <AnimatePresence mode="wait">
          {step === "details" && (
            <motion.form
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onSubmit={handleDetailsSubmit}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 border border-zinc-200 rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="md:col-span-5 bg-neutral-50/60 p-6 sm:p-10 flex flex-col justify-center">
                <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 font-mono mb-4">
                  {STEP_TITLES[0].toUpperCase()}
                </p>
                <h3 className="text-lg font-medium tracking-tight text-neutral-900 uppercase mb-4">
                  {service.title}
                </h3>
                <ul className="space-y-2.5 text-xs text-neutral-600">
                  {service.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-[#5D1F17]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-7 p-6 sm:p-10 flex flex-col">
                <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 font-mono mb-4">
                  Your Contact Info
                </p>

                <div className="space-y-4 mb-8">
                  <InputField
                    label="Full Name"
                    icon={UserIcon}
                    value={form.name}
                    onChange={(v) => update("name", v)}
                    required
                    placeholder="Jane Doe"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="Email"
                      icon={Mail}
                      type="email"
                      value={form.email}
                      onChange={(v) => update("email", v)}
                      required
                      placeholder="jane@company.com"
                    />
                    <InputField
                      label="Phone (optional)"
                      icon={Phone}
                      type="tel"
                      value={form.phone}
                      onChange={(v) => update("phone", v)}
                      placeholder="+1 555 0123"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <p className="mb-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-[11px] text-red-600">
                    {errorMsg}
                  </p>
                )}

                <div className="mt-auto">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#5D1F17] hover:bg-[#4A1812] text-white font-semibold text-xs tracking-wider uppercase py-3.5 px-6 rounded-full shadow transition-colors"
                  >
                    <span>Continue</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.form>
          )}

          {step === "brief" && (
            <motion.form
              key="brief"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 border border-zinc-200 rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="md:col-span-5 bg-neutral-50/60 p-6 sm:p-10 flex flex-col justify-center">
                <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 font-mono mb-4">
                  {STEP_TITLES[1].toUpperCase()}
                </p>
                <h3 className="text-lg font-medium tracking-tight text-neutral-900 uppercase mb-4">
                  Project Brief
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Tell us about your brand, goals, and what you'd like to focus on.
                  Be as detailed as possible — this helps us prepare and scope your
                  request accurately before we reach out.
                </p>
              </div>
              <div className="md:col-span-7 p-6 sm:p-10 flex flex-col">
                <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 font-mono mb-4">
                  Project Description
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1.5 block">
                      Timeline (optional)
                    </label>
                    <input
                      value={form.timeline}
                      onChange={(e) => update("timeline", e.target.value)}
                      placeholder="e.g. Launch Q1 2027"
                      className="w-full bg-white border border-zinc-200 rounded-full px-5 py-3 text-xs outline-none focus:border-[#5D1F17] transition-colors"
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1.5 block">
                    Describe your project
                  </label>
                  <div className="relative">
                    <MessageSquare className="pointer-events-none absolute left-5 top-4 w-3.5 h-3.5 text-neutral-400" />
                    <textarea
                      rows={6}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Share your goals, what's not working, and what a successful outcome looks like for you..."
                      className="w-full bg-white border border-zinc-200 rounded-2xl pl-11 pr-5 py-3 text-xs outline-none focus:border-[#5D1F17] transition-colors resize-none"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <p className="mb-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-[11px] text-red-600">
                    {errorMsg}
                  </p>
                )}

                <div className="mt-auto flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("details")}
                    disabled={isSubmitting}
                    className="flex-1 border border-zinc-200 rounded-full text-neutral-600 hover:border-neutral-400 font-semibold text-xs tracking-wider uppercase py-3.5 px-6 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] inline-flex items-center justify-center gap-2 bg-[#5D1F17] hover:bg-[#4A1812] text-white font-semibold text-xs tracking-wider uppercase py-3.5 px-6 rounded-full shadow transition-colors disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending…</span>
                      </>
                    ) : (
                      <>
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>Submit Request</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.form>
          )}

          {step === "confirmed" && (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex h-full min-h-[320px] flex-col items-center justify-center text-center rounded-2xl border border-neutral-200/70 bg-white py-12"
            >
              <div className="mb-6 grid h-14 w-14 place-items-center rounded-full bg-[#5D1F17]">
                <Check className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl sm:text-2xl font-light tracking-tight uppercase text-neutral-900">
                Request Received
              </h3>
              <p className="mt-4 max-w-md text-xs text-neutral-500 leading-relaxed">
                Thank you, <span className="font-semibold text-neutral-900">{form.name}</span>.
                Your {service.title} request has been delivered to Bimpe's dashboard
                and you'll receive a confirmation email shortly at{" "}
                <span className="font-semibold text-neutral-900">{form.email}</span>.
              </p>
              <p className="mt-2 max-w-md text-xs text-neutral-500 leading-relaxed">
                You'll hear back with tailored next steps within two business days.
              </p>
              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep("details");
                     setForm({ name: "", email: "", phone: "", timeline: "", message: "" });
                  }}
                  className="rounded-full border border-neutral-200 px-5 py-2.5 text-xs font-semibold text-neutral-600 hover:border-neutral-400"
                >
                  Send another
                </button>
                <Link
                  to="/book-a-session"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5D1F17] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#4A1812]"
                >
                  Book a Session
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function InputField({
  label,
  icon: Icon,
  value,
  onChange,
  required,
  placeholder,
  type = "text",
}: {
  label: string;
  icon: typeof UserIcon;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1.5 block">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
        <input
          required={required}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white border border-zinc-200 rounded-full pl-11 pr-5 py-3 text-xs outline-none focus:border-[#5D1F17] transition-colors"
        />
      </div>
    </div>
  );
}