"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpLeft, 
  ArrowUpRight, 
  Check, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  Loader2,
  AlertCircle,
  Calendar,
  User
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { launchPaystackCheckout, generateReference } from "@/lib/paystack";

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

const CONSULTATION_FEE_USD = 100;

function buildMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export default function ConsultationPage() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"pick" | "details" | "payment" | "confirmed">("pick");
  const [form, setForm] = useState({ name: "", email: "", notes: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentReference, setPaymentReference] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [feeUsd, setFeeUsd] = useState(CONSULTATION_FEE_USD);
  const [paymentCurrency, setPaymentCurrency] = useState<string>("USD");

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const cells = useMemo(() => buildMonthGrid(year, month), [year, month]);

  const isPast = (day: number) => {
    const d = new Date(year, month, day);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < t;
  };

  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const changeMonth = (delta: number) => {
    setViewDate(new Date(year, month + delta, 1));
    setSelectedDay(null);
    setSelectedTime(null);
  };

  const canContinue = selectedDay !== null && selectedTime !== null;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  // Fetch the live consultation fee and currency from site settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await supabase
          .from("site_settings")
          .select("key, value")
          .in("key", ["consultation_fee_usd", "payment_currency"]);

        const rows = (data ?? []) as { key: string; value: string }[];
        for (const row of rows) {
          if (row.key === "consultation_fee_usd" && !isNaN(Number(row.value))) {
            setFeeUsd(Number(row.value));
          }
          if (row.key === "payment_currency" && row.value.trim()) {
            setPaymentCurrency(row.value.trim().toUpperCase());
          }
        }
      } catch (err) {
        console.warn("Failed to fetch consultation settings:", err);
      }
    };

    fetchSettings();
  }, []);

  const handlePaystackPayment = async () => {
    if (!form.name || !form.email || selectedDay === null || !selectedTime) {
      setPaymentError("Please fill in all required fields.");
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      const reference = generateReference();
      const sessionDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;

      console.log("Creating booking:", {
        reference,
        client_name: form.name,
        client_email: form.email,
        session_date: sessionDate,
        session_time: selectedTime,
      });

      // Insert the consultation record
      const { data: consultation, error: insertError } = await supabase
        .from("consultations")
        .insert({
          reference,
          client_name: form.name.trim(),
          client_email: form.email.trim(),
          notes: form.notes?.trim() || null,
          session_date: sessionDate,
          session_time: selectedTime,
          amount: feeUsd * 100,
          currency: paymentCurrency,
          status: "pending",
          zoom_link_sent: false,
        })
        .select()
        .single();

      if (insertError) {
        console.error("Insert error:", insertError);
        throw new Error(`Booking failed: ${insertError.message}`);
      }

      console.log("Booking created:", consultation);
      setPaymentReference(reference);

      // Determine Paystack amount
      // Paystack uses cents for USD
      const paystackAmount = feeUsd * 100; // $100 = 10000 cents

      console.log("Launching Paystack with:", {
        email: form.email,
        amount: paystackAmount,
        reference,
        currency: paymentCurrency,
      });

      // Launch Paystack checkout
      launchPaystackCheckout({
        email: form.email.trim(),
        amount: paystackAmount,
        reference,
        name: form.name.trim(),
        currency: paymentCurrency,
        metadata: {
          consultation_id: consultation.id,
          session_date: sessionDate,
          session_time: selectedTime,
          custom_fields: [
            {
              display_name: "Session",
              variable_name: "session",
              value: `1-on-1 Consultation — ${sessionDate} @ ${selectedTime}`,
            },
            {
              display_name: "Client Name",
              variable_name: "client_name",
              value: form.name.trim(),
            },
          ],
        },
        onSuccess: async (transaction) => {
          console.log("Payment successful:", transaction);
          try {
            // Verify payment server-side
            const res = await fetch(
              `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-payment`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                  apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
                },
                body: JSON.stringify({ reference }),
              }
            );
            const json = await res.json();
            if (!json.success) {
              console.warn("Verification pending — webhook will finalize it.", json);
            }
          } catch (err) {
            console.warn("Verification call failed — webhook will finalize it.", err);
          }
          setIsProcessing(false);
          setStep("confirmed");
        },
        onCancel: () => {
          console.log("Payment cancelled by user");
          setIsProcessing(false);
        },
        onError: (error) => {
          console.error("Payment error:", error);
          setIsProcessing(false);
          setPaymentError("Payment could not be completed. Please check your Paystack configuration.");
        },
      });
    } catch (err) {
      console.error("Full booking error:", err);
      const errorMessage = err instanceof Error ? err.message : "Could not start the booking. Please try again.";
      setPaymentError(errorMessage);
      setIsProcessing(false);
    }
  };

  const selectedDateLabel =
    selectedDay !== null
      ? `${MONTH_NAMES[month]} ${selectedDay}, ${year}`
      : null;

  return (
    <div className="w-full bg-white text-neutral-900 font-sans pt-20 sm:pt-28 lg:pt-36 pb-24 sm:pb-32 px-6 sm:px-12 lg:px-20 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl">
        
        {/* GO BACK Button Container */}
        <div className="mb-6 flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#5D1F17] bg-white text-[#5D1F17] hover:border-neutral-900 hover:text-neutral-900 text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow hover:shadow-md group/btn"
          >
            <ArrowUpLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            <span>GO BACK</span>
          </Link>
        </div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-5xl lg:text-[68px] font-semibold sm:font-light uppercase tracking-tight leading-none text-neutral-900">
            1-ON-1 WITH <span className="font-serif italic text-[#5D1F17]">BIMPE MOHAMMED</span>
          </h1>
        </motion.div>

        {/* Header Copy */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 items-start mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-6"
          >
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 font-normal">
              Book a dedicated private session with Bimpe Mohammed to assess your current brand architecture, refine audience positioning, and create high-level strategy tailored to your long-term goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-6"
          >
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 font-normal">
              Select your preferred date and time on the calendar below. Each consultation is engineered to provide absolute clarity, executive direction, and actionable next steps.
            </p>
          </motion.div>
        </div>

        {/* Booking Panel Component */}
        <div className="border border-zinc-200 grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden shadow-sm">
          {/* Calendar Left Side */}
          <div className="lg:col-span-7 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-zinc-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight uppercase">
                {MONTH_NAMES[month]} {year}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeMonth(-1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 text-neutral-500 hover:border-[#5D1F17] hover:text-[#5D1F17] transition-colors duration-300"
                  aria-label="Previous month"
                >
                  ‹
                </button>
                <button
                  onClick={() => changeMonth(1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 text-neutral-500 hover:border-[#5D1F17] hover:text-[#5D1F17] transition-colors duration-300"
                  aria-label="Next month"
                >
                  ›
                </button>
              </div>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 mb-3">
              {WEEKDAYS.map((w, i) => (
                <div
                  key={i}
                  className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 text-center"
                >
                  {w}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-y-2">
              {cells.map((day, i) => {
                if (day === null) return <div key={i} />;
                const disabled = isPast(day);
                const selected = selectedDay === day;
                return (
                  <div key={i} className="flex justify-center">
                    <button
                      disabled={disabled}
                      onClick={() => {
                        setSelectedDay(day);
                        setSelectedTime(null);
                      }}
                      className={`relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ${
                        disabled
                          ? "text-neutral-300 cursor-not-allowed"
                          : selected
                          ? "bg-[#5D1F17] text-white shadow-sm"
                          : "text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      {day}
                      {isToday(day) && !selected && (
                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#5D1F17]" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Time Slots */}
            <AnimatePresence>
              {selectedDay !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-8 mt-8 border-t border-zinc-200">
                    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-4">
                      <Clock className="w-3.5 h-3.5" />
                      Available Times — {selectedDateLabel}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {TIME_SLOTS.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2.5 text-xs font-semibold rounded-full border transition-all duration-300 ${
                            selectedTime === time
                              ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                              : "border-zinc-200 text-neutral-600 hover:border-[#5D1F17] hover:text-[#5D1F17]"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Form & Summary Right Side */}
          <div className="lg:col-span-5 p-6 sm:p-10 bg-neutral-50/60 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {step === "pick" && (
                <motion.div
                  key="pick"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col"
                >
                  <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-4 font-mono">
                    SESSION SUMMARY
                  </p>
                  <h3 className="text-lg sm:text-xl font-medium tracking-tight text-neutral-900 uppercase mb-2">
                    1-on-1 Strategy Consultation
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed mb-8">
                    A comprehensive 60-minute virtual strategy session directly with Bimpe Mohammed to refine your brand position and execution path.
                  </p>

                  <div className="space-y-4 text-xs text-neutral-600 mb-8">
                    <div className="flex justify-between border-b border-zinc-200 pb-3">
                      <span className="font-semibold text-neutral-400 uppercase tracking-wide">Advisor</span>
                      <span className="font-medium text-neutral-900">Bimpe Mohammed</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-200 pb-3">
                      <span className="font-semibold text-neutral-400 uppercase tracking-wide">Date</span>
                      <span className="font-medium text-neutral-900">{selectedDateLabel || "Select a date"}</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-200 pb-3">
                      <span className="font-semibold text-neutral-400 uppercase tracking-wide">Time</span>
                      <span className="font-medium text-neutral-900">{selectedTime || "Select a time"}</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-200 pb-3">
                      <span className="font-semibold text-neutral-400 uppercase tracking-wide">Fee</span>
                      <span className="font-medium text-neutral-900">${feeUsd} {paymentCurrency}</span>
                    </div>
                  </div>

                  <button
                    disabled={!canContinue}
                    onClick={() => setStep("details")}
                    className={`mt-auto inline-flex items-center justify-center gap-2 w-full font-semibold text-xs tracking-wider uppercase py-3.5 px-6 rounded-full transition-all duration-300 ${
                      canContinue
                        ? "bg-[#5D1F17] hover:bg-[#4A1812] text-white cursor-pointer shadow hover:shadow-md"
                        : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                    }`}
                  >
                    <span>Continue</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}

              {step === "details" && (
                <motion.form
                  key="details"
                  onSubmit={handleDetailsSubmit}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex-1 flex flex-col"
                >
                  <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-4 font-mono">
                    YOUR DETAILS
                  </p>
                  <h3 className="text-lg font-bold tracking-tight mb-6 text-neutral-900">
                    {selectedDateLabel} · {selectedTime}
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1.5 block">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-full px-5 py-3 text-xs text-neutral-800 outline-none focus:border-[#5D1F17] transition-colors duration-300"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1.5 block">
                        Email
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-full px-5 py-3 text-xs text-neutral-800 outline-none focus:border-[#5D1F17] transition-colors duration-300"
                        placeholder="jane@company.com"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1.5 block">
                        Core Focus / Topic For Bimpe
                      </label>
                      <textarea
                        rows={3}
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-3 text-xs text-neutral-800 outline-none focus:border-[#5D1F17] transition-colors duration-300 resize-none"
                        placeholder="Briefly detail what you would like Bimpe to focus on during your session..."
                      />
                    </div>
                  </div>

                  <div className="mt-auto flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep("pick")}
                      className="flex-1 border border-zinc-200 rounded-full text-neutral-600 hover:border-neutral-400 font-semibold text-xs tracking-wider uppercase py-3.5 px-6 transition-colors duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-[2] inline-flex items-center justify-center gap-2 bg-[#5D1F17] hover:bg-[#4A1812] text-white rounded-full font-semibold text-xs tracking-wider uppercase py-3.5 px-6 transition-colors duration-300 shadow hover:shadow-md"
                    >
                      <span>Proceed to Payment</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.form>
              )}

              {step === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex-1 flex flex-col"
                >
                  <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-4 font-mono">
                    PAYMENT CHECKOUT
                  </p>
                  <h3 className="text-lg font-bold tracking-tight mb-6 text-neutral-900">
                    Confirm Consultation
                  </h3>

                  <div className="bg-white border border-zinc-200 rounded-2xl p-4 mb-6 space-y-3 text-xs">
                    <div className="flex justify-between text-neutral-600">
                      <span className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5" />
                        Client
                      </span>
                      <span className="font-semibold text-neutral-900">{form.name}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        Schedule
                      </span>
                      <span className="font-semibold text-neutral-900">{selectedDateLabel} @ {selectedTime}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span className="flex items-center gap-2">
                        <CreditCard className="w-3.5 h-3.5" />
                        Session Fee
                      </span>
                      <span className="font-semibold text-neutral-900">${feeUsd} {paymentCurrency}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-neutral-100 border border-zinc-200 rounded-full mb-6 px-5">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="text-[11px] font-medium text-neutral-600">Encrypted via</span>
                    </div>
                    <span className="font-bold text-xs tracking-tight text-[#0BA4DB]">
                      paystack
                    </span>
                  </div>

                  {paymentError && (
                    <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-3.5 py-2.5">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <p className="text-[11px] text-red-600">{paymentError}</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-auto flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep("details")}
                      disabled={isProcessing}
                      className="flex-1 border border-zinc-200 rounded-full text-neutral-600 hover:border-neutral-400 font-semibold text-xs tracking-wider uppercase py-3.5 px-6 transition-colors duration-300 disabled:opacity-50"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handlePaystackPayment}
                      disabled={isProcessing}
                      className="flex-[2] inline-flex items-center justify-center gap-2 bg-[#0BA4DB] hover:bg-[#0993C4] text-white rounded-full font-semibold text-xs tracking-wider uppercase py-3.5 px-6 transition-colors duration-300 shadow hover:shadow-md disabled:opacity-75"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Pay ${feeUsd}</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "confirmed" && (
                <motion.div
                  key="confirmed"
                  initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: -2 }}
                  transition={{ 
                    duration: 0.6, 
                    type: "spring", 
                    bounce: 0.4 
                  }}
                  className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-white border border-neutral-900 rounded-2xl shadow-xl my-auto"
                >
                  <div className="w-14 h-14 rounded-full bg-[#5D1F17] flex items-center justify-center mb-6 shadow-md">
                    <Check className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-light tracking-tight text-neutral-900 uppercase mb-2">
                    SESSION CONFIRMED
                  </h3>

                  <p className="text-xs text-neutral-500 leading-relaxed max-w-xs mb-1">
                    Your 1-on-1 strategy session with <span className="font-semibold text-neutral-900">Bimpe Mohammed</span> is booked for
                  </p>

                  <p className="text-sm font-semibold text-[#5D1F17] mb-4">
                    {selectedDateLabel} at {selectedTime}
                  </p>

                  {paymentReference && (
                    <p className="text-[10px] font-mono text-neutral-500 bg-neutral-100 px-3 py-1 border border-neutral-200 rounded-full mb-6">
                      REF: {paymentReference}
                    </p>
                  )}

                  <p className="text-[11px] text-neutral-600 leading-relaxed max-w-xs">
                    A confirmation email along with your private <span className="font-semibold text-neutral-900">Google Meet link</span> has been sent to <span className="font-semibold text-neutral-900">{form.email}</span>. We look forward to meeting with you, {form.name.split(" ")[0]}.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}