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

  const service = SERVICES.find(
    (s) => s.id === id && !s.paymentRequired
  );

  const [step, setStep] = useState<"details" | "brief" | "confirmed">(
    "details"
  );

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
    if (!service) {
      navigate("/services", { replace: true });
    }
  }, [service, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function update<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleDetailsSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      setErrorMsg("Please fill in your name and email.");
      return;
    }

    setErrorMsg(null);
    setStep("brief");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!service) {
      setErrorMsg("Service not found. Please return to the services page.");
      return;
    }

    if (!form.message.trim()) {
      setErrorMsg("Please describe your project briefly.");
      return;
    }

    if (!id) {
      setErrorMsg("Invalid service ID. Please return to the services page.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const serviceId = id;

    console.log("Submitting service request:", {
      serviceId,
      serviceName: service.title,
    });

    const { error } = await supabase
      .from("service_requests")
      .insert({
        service_id: serviceId,
        client_name: form.name.trim(),
        client_email: form.email.trim(),
        client_phone: form.phone.trim() || null,
        message: form.message.trim(),
        budget: form.timeline.trim() || null,
        request_status: "new",
        email_sent: false,
      });

    if (error) {
      console.error("Service request database error:", error);

      setIsSubmitting(false);

      if (error.code === "23503") {
        setErrorMsg(
          `The service "${serviceId}" does not exist in the database.`
        );
      } else {
        setErrorMsg(
          "Something went wrong saving your request. Please try again."
        );
      }

      return;
    }

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey) {
        const response = await fetch(
          `${supabaseUrl}/functions/v1/send-confirmation-mail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${supabaseAnonKey}`,
              apikey: supabaseAnonKey,
            },
            body: JSON.stringify({
              template: "service_request",
              data: {
                client_name: form.name.trim(),
                client_email: form.email.trim(),
                service_name: service.title,
              },
            }),
          }
        );

        if (!response.ok) {
          console.error(
            "Confirmation email function returned:",
            response.status,
            await response.text()
          );
        }
      } else {
        console.error(
          "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY."
        );
      }
    } catch (emailError) {
      console.error("Email dispatch failed:", emailError);
    }

    setIsSubmitting(false);
    setStep("confirmed");
  }

  if (!service) {
    return null;
  }

  const steps = ["Your Details", "Project Brief", "Confirmation"];

  const currentStepIndex =
    step === "details" ? 0 : step === "brief" ? 1 : 2;

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-5xl lg:text-[68px] font-bold tracking-tight uppercase leading-none text-neutral-900">
            {service.title
              .toUpperCase()
              .replace("/ $2,000", "")
              .replace("FULL BRANDING", "BRANDING")
              .trim()}{" "}
            <span className="font-serif italic text-[#5D1F17]">
              REQUEST
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-xs sm:text-sm leading-relaxed text-neutral-600">
            {service.description}
          </p>
        </motion.div>

        <div className="mb-10 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-neutral-400">
          {steps.map((stepTitle, index) => (
            <div
              key={stepTitle}
              className="flex items-center gap-2"
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-bold ${
                  index <= currentStepIndex
                    ? "border-[#5D1F17] bg-[#5D1F17] text-white"
                    : "border-neutral-300 bg-white text-neutral-400"
                }`}
              >
                {index === 2 && step === "confirmed" ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  index + 1
                )}
              </div>

              <span
                className={
                  index <= currentStepIndex
                    ? "text-neutral-900"
                    : "text-neutral-400"
                }
              >
                {stepTitle}
              </span>

              {index < steps.length - 1 && (
                <span className="mx-1 h-px w-6 bg-neutral-200" />
              )}
            </div>
          ))}
        </div>

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
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2"
                    >
                      <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-[#5D1F17]" />
                      <span>{feature}</span>
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
                    onChange={(value) => update("name", value)}
                    required
                    placeholder="Jane Doe"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="Email"
                      icon={Mail}
                      type="email"
                      value={form.email}
                      onChange={(value) => update("email", value)}
                      required
                      placeholder="jane@company.com"
                    />

                    <InputField
                      label="Phone (optional)"
                      icon={Phone}
                      type="tel"
                      value={form.phone}
                      onChange={(value) => update("phone", value)}
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
                  Tell us about your brand, goals, and what you'd like to
                  focus on. Be as detailed as possible — this helps us
                  prepare and scope your request accurately before we reach
                  out.
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
                      onChange={(e) =>
                        update("timeline", e.target.value)
                      }
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
                      onChange={(e) =>
                        update("message", e.target.value)
                      }
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
                    onClick={() => {
                      setErrorMsg(null);
                      setStep("details");
                    }}
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
                <Check
                  className="h-6 w-6 text-white"
                  strokeWidth={2.5}
                />
              </div>

              <h3 className="text-xl sm:text-2xl font-light tracking-tight uppercase text-neutral-900">
                Request Received
              </h3>

              <p className="mt-4 max-w-md text-xs text-neutral-500 leading-relaxed">
                Thank you,{" "}
                <span className="font-semibold text-neutral-900">
                  {form.name}
                </span>
                . Your{" "}
                <span className="font-semibold text-neutral-900">
                  {service.title}
                </span>{" "}
                request has been delivered to Bimpe's dashboard and you'll
                receive a confirmation email shortly at{" "}
                <span className="font-semibold text-neutral-900">
                  {form.email}
                </span>
                .
              </p>

              <p className="mt-2 max-w-md text-xs text-neutral-500 leading-relaxed">
                You'll hear back with tailored next steps within 24Hrs.
              </p>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep("details");
                    setErrorMsg(null);
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      timeline: "",
                      message: "",
                    });
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
  onChange: (value: string) => void;
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