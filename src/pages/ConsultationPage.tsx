// "use client";

// import { useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowUpRight, Check, Clock } from "lucide-react";

// const TIME_SLOTS = [
//   "9:00 AM", "10:00 AM", "11:00 AM",
//   "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
// ];

// const MONTH_NAMES = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December",
// ];

// const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

// function buildMonthGrid(year: number, month: number) {
//   const firstDay = new Date(year, month, 1).getDay();
//   const daysInMonth = new Date(year, month + 1, 0).getDate();
//   const cells: (number | null)[] = Array(firstDay).fill(null);
//   for (let d = 1; d <= daysInMonth; d++) cells.push(d);
//   return cells;
// }

// export default function ConsultationPage() {
//   const today = new Date();
//   const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
//   const [selectedDay, setSelectedDay] = useState<number | null>(null);
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);
//   const [step, setStep] = useState<"pick" | "details" | "confirmed">("pick");
//   const [form, setForm] = useState({ name: "", email: "", notes: "" });

//   const year = viewDate.getFullYear();
//   const month = viewDate.getMonth();
//   const cells = useMemo(() => buildMonthGrid(year, month), [year, month]);

//   const isPast = (day: number) => {
//     const d = new Date(year, month, day);
//     const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
//     return d < t;
//   };

//   const isToday = (day: number) =>
//     day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

//   const changeMonth = (delta: number) => {
//     setViewDate(new Date(year, month + delta, 1));
//     setSelectedDay(null);
//     setSelectedTime(null);
//   };

//   const canContinue = selectedDay !== null && selectedTime !== null;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setStep("confirmed");
//   };

//   const selectedDateLabel =
//     selectedDay !== null
//       ? `${MONTH_NAMES[month]} ${selectedDay}, ${year}`
//       : null;

//   return (
//     <div className="w-full bg-white text-neutral-900 font-sans">
//       {/* Header */}
//       <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24 pb-12 sm:pb-16">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//         >
//           <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">
//             BOOK A SESSION
//           </p>
//           <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-semibold tracking-tight leading-[1.08] max-w-2xl">
//             Let's Talk About Your{" "}
//             <span className="font-serif italic font-normal text-[#5D1F17]">
//               Brand's Future
//             </span>
//           </h1>
//           <p className="mt-6 text-neutral-500 text-xs sm:text-sm leading-relaxed max-w-lg">
//             Pick a date and time that works for you. Every consultation starts
//             with understanding your business before we talk strategy.
//           </p>
//         </motion.div>
//       </section>

//       {/* Booking Panel */}
//       <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-24 sm:pb-32">
//         <div className="border border-zinc-200 grid grid-cols-1 lg:grid-cols-12">
//           {/* Calendar */}
//           <div className="lg:col-span-7 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-zinc-200">
//             <div className="flex items-center justify-between mb-8">
//               <h2 className="text-lg sm:text-xl font-bold tracking-tight">
//                 {MONTH_NAMES[month]} {year}
//               </h2>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => changeMonth(-1)}
//                   className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 text-neutral-500 hover:border-[#5D1F17] hover:text-[#5D1F17] transition-colors duration-300"
//                   aria-label="Previous month"
//                 >
//                   ‹
//                 </button>
//                 <button
//                   onClick={() => changeMonth(1)}
//                   className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 text-neutral-500 hover:border-[#5D1F17] hover:text-[#5D1F17] transition-colors duration-300"
//                   aria-label="Next month"
//                 >
//                   ›
//                 </button>
//               </div>
//             </div>

//             {/* Weekday labels */}
//             <div className="grid grid-cols-7 mb-3">
//               {WEEKDAYS.map((w, i) => (
//                 <div
//                   key={i}
//                   className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 text-center"
//                 >
//                   {w}
//                 </div>
//               ))}
//             </div>

//             {/* Day grid */}
//             <div className="grid grid-cols-7 gap-y-2">
//               {cells.map((day, i) => {
//                 if (day === null) return <div key={i} />;
//                 const disabled = isPast(day);
//                 const selected = selectedDay === day;
//                 return (
//                   <div key={i} className="flex justify-center">
//                     <button
//                       disabled={disabled}
//                       onClick={() => {
//                         setSelectedDay(day);
//                         setSelectedTime(null);
//                       }}
//                       className={`relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ${
//                         disabled
//                           ? "text-neutral-300 cursor-not-allowed"
//                           : selected
//                           ? "bg-[#5D1F17] text-white"
//                           : "text-neutral-700 hover:bg-neutral-100"
//                       }`}
//                     >
//                       {day}
//                       {isToday(day) && !selected && (
//                         <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#5D1F17]" />
//                       )}
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Time Slots */}
//             <AnimatePresence>
//               {selectedDay !== null && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.4, ease: "easeOut" }}
//                   className="overflow-hidden"
//                 >
//                   <div className="pt-8 mt-8 border-t border-zinc-200">
//                     <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-4">
//                       <Clock className="w-3.5 h-3.5" />
//                       Available Times — {selectedDateLabel}
//                     </p>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
//                       {TIME_SLOTS.map((time) => (
//                         <button
//                           key={time}
//                           onClick={() => setSelectedTime(time)}
//                           className={`py-2.5 text-xs font-semibold rounded-none border transition-all duration-300 ${
//                             selectedTime === time
//                               ? "bg-neutral-900 text-white border-neutral-900"
//                               : "border-zinc-200 text-neutral-600 hover:border-[#5D1F17] hover:text-[#5D1F17]"
//                           }`}
//                         >
//                           {time}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Summary / Form Panel */}
//           <div className="lg:col-span-5 p-6 sm:p-10 bg-neutral-50/60 flex flex-col">
//             <AnimatePresence mode="wait">
//               {step === "pick" && (
//                 <motion.div
//                   key="pick"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="flex-1 flex flex-col"
//                 >
//                   <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-4">
//                     Session Details
//                   </p>
//                   <h3 className="text-lg font-bold tracking-tight mb-2">
//                     One on One Consultation
//                   </h3>
//                   <p className="text-xs text-neutral-500 leading-relaxed mb-8">
//                     A 60-minute strategy session covering brand assessment,
//                     opportunity identification, and next steps.
//                   </p>

//                   <div className="space-y-4 text-xs text-neutral-600 mb-8">
//                     <div className="flex justify-between border-b border-zinc-200 pb-3">
//                       <span className="font-semibold text-neutral-400 uppercase tracking-wide">Date</span>
//                       <span className="font-medium">{selectedDateLabel || "Select a date"}</span>
//                     </div>
//                     <div className="flex justify-between border-b border-zinc-200 pb-3">
//                       <span className="font-semibold text-neutral-400 uppercase tracking-wide">Time</span>
//                       <span className="font-medium">{selectedTime || "Select a time"}</span>
//                     </div>
//                     <div className="flex justify-between border-b border-zinc-200 pb-3">
//                       <span className="font-semibold text-neutral-400 uppercase tracking-wide">Duration</span>
//                       <span className="font-medium">60 minutes</span>
//                     </div>
//                   </div>

//                   <button
//                     disabled={!canContinue}
//                     onClick={() => setStep("details")}
//                     className={`mt-auto inline-flex items-center justify-center gap-2 w-full font-semibold text-xs tracking-wider uppercase py-3.5 px-6 transition-colors duration-300 ${
//                       canContinue
//                         ? "bg-[#5D1F17] hover:bg-[#4A1812] text-white cursor-pointer"
//                         : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
//                     }`}
//                   >
//                     <span>Continue</span>
//                     <ArrowUpRight className="w-3.5 h-3.5" />
//                   </button>
//                 </motion.div>
//               )}

//               {step === "details" && (
//                 <motion.form
//                   key="details"
//                   onSubmit={handleSubmit}
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   transition={{ duration: 0.35, ease: "easeOut" }}
//                   className="flex-1 flex flex-col"
//                 >
//                   <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-4">
//                     Your Details
//                   </p>
//                   <h3 className="text-lg font-bold tracking-tight mb-6">
//                     {selectedDateLabel} · {selectedTime}
//                   </h3>

//                   <div className="space-y-4 mb-8">
//                     <div>
//                       <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1.5 block">
//                         Full Name
//                       </label>
//                       <input
//                         required
//                         type="text"
//                         value={form.name}
//                         onChange={(e) => setForm({ ...form, name: e.target.value })}
//                         className="w-full bg-white border border-zinc-200 px-4 py-3 text-xs text-neutral-800 outline-none focus:border-[#5D1F17] transition-colors duration-300"
//                         placeholder="Jane Doe"
//                       />
//                     </div>
//                     <div>
//                       <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1.5 block">
//                         Email
//                       </label>
//                       <input
//                         required
//                         type="email"
//                         value={form.email}
//                         onChange={(e) => setForm({ ...form, email: e.target.value })}
//                         className="w-full bg-white border border-zinc-200 px-4 py-3 text-xs text-neutral-800 outline-none focus:border-[#5D1F17] transition-colors duration-300"
//                         placeholder="jane@company.com"
//                       />
//                     </div>
//                     <div>
//                       <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1.5 block">
//                         What Would You Like To Discuss?
//                       </label>
//                       <textarea
//                         rows={3}
//                         value={form.notes}
//                         onChange={(e) => setForm({ ...form, notes: e.target.value })}
//                         className="w-full bg-white border border-zinc-200 px-4 py-3 text-xs text-neutral-800 outline-none focus:border-[#5D1F17] transition-colors duration-300 resize-none"
//                         placeholder="Briefly tell me about your brand and goals..."
//                       />
//                     </div>
//                   </div>

//                   <div className="mt-auto flex gap-3">
//                     <button
//                       type="button"
//                       onClick={() => setStep("pick")}
//                       className="flex-1 border border-zinc-200 text-neutral-600 hover:border-neutral-400 font-semibold text-xs tracking-wider uppercase py-3.5 px-6 transition-colors duration-300"
//                     >
//                       Back
//                     </button>
//                     <button
//                       type="submit"
//                       className="flex-[2] inline-flex items-center justify-center gap-2 bg-[#5D1F17] hover:bg-[#4A1812] text-white font-semibold text-xs tracking-wider uppercase py-3.5 px-6 transition-colors duration-300"
//                     >
//                       <span>Confirm Booking</span>
//                       <ArrowUpRight className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 </motion.form>
//               )}

//               {step === "confirmed" && (
//                 <motion.div
//                   key="confirmed"
//                   initial={{ opacity: 0, scale: 0.96 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.4, ease: "easeOut" }}
//                   className="flex-1 flex flex-col items-center justify-center text-center py-8"
//                 >
//                   <div className="w-12 h-12 rounded-full bg-[#5D1F17] flex items-center justify-center mb-6">
//                     <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
//                   </div>
//                   <h3 className="text-xl font-bold tracking-tight mb-2">
//                     You're Booked
//                   </h3>
//                   <p className="text-xs text-neutral-500 leading-relaxed max-w-xs mb-1">
//                     Your consultation is confirmed for
//                   </p>
//                   <p className="text-sm font-semibold text-neutral-900 mb-6">
//                     {selectedDateLabel} at {selectedTime}
//                   </p>
//                   <p className="text-[11px] text-neutral-400 leading-relaxed max-w-xs">
//                     A confirmation email has been sent to {form.email}. Looking forward to it, {form.name.split(" ")[0]}.
//                   </p>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


"use client";

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpLeft, ArrowUpRight, Check, Clock, CreditCard, ShieldCheck, Loader2 } from "lucide-react";

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

  // Simulated Payment Handler with loading state
  const handleSimulatedPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentReference(`REF-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep("confirmed");
    }, 2000);
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
                      <span className="font-medium text-neutral-900">${CONSULTATION_FEE_USD} USD</span>
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
                      <span>Strategy Session</span>
                      <span className="font-semibold text-neutral-900">${CONSULTATION_FEE_USD} USD</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Client</span>
                      <span className="font-semibold text-neutral-900">{form.name}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Schedule</span>
                      <span className="font-semibold text-neutral-900">{selectedDateLabel} @ {selectedTime}</span>
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

                  <div className="mt-auto flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep("details")}
                      disabled={isProcessing}
                      className="flex-1 border border-zinc-200 rounded-full text-neutral-600 hover:border-neutral-400 font-semibold text-xs tracking-wider uppercase py-3.5 px-6 transition-colors duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleSimulatedPayment}
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
                          <span>Pay ${CONSULTATION_FEE_USD}</span>
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
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Clock,
//   Bell,
//   Check,
//   Video,
//   MapPin,
//   ArrowRight,
//   ArrowLeft,
//   Sparkles,
//   Calendar as CalendarIcon,
//   Send,
//   Search,
// } from "lucide-react";

// const STEPS = [
//   { id: 1, title: "Personal details" },
//   { id: 2, title: "Appointment details" },
//   { id: 3, title: "Strategy goals" },
//   { id: 4, title: "Platforms of focus" },
// ];

// const TIME_SLOTS = ["10:00 AM", "01:00 PM", "03:30 PM", "05:00 PM"];

// const MEETING_FORMATS = [
//   {
//     id: "google-meet",
//     title: "Google Meet Video Call",
//     desc: "1-on-1 Virtual strategy call with automated Google Calendar invite",
//     icon: Video,
//   },
//   {
//     id: "physical",
//     title: "Physical / In-Person Meeting",
//     desc: "Intensive in-person audit or team session at a physical location",
//     icon: MapPin,
//   },
// ];

// const STRATEGY_GOALS = [
//   "Brand Identity & Positioning",
//   "Content Strategy & Production",
//   "Social Media Growth & Reach",
//   "Paid Ads & Conversion Strategy",
//   "Influencer & Campaign Management",
//   "Full Profile / Account Audit",
// ];

// const PLATFORMS = [
//   "Instagram",
//   "TikTok",
//   "LinkedIn",
//   "YouTube",
//   "X (Twitter)",
//   "Meta Ads (FB/IG)",
// ];

// const DAYS_OF_WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

// export default function BookConsultation() {
//   const [currentStep, setCurrentStep] = useState(1);

//   // Dynamic Date Management
//   const [currentMonthDate, setCurrentMonthDate] = useState(new Date(2026, 8, 1)); // Sept 2026
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 8, 15));

//   // Form State
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     companyName: "",
//     meetingLocation: "Victoria Island, Lagos",
//     selectedTime: "01:00 PM",
//     meetingFormat: "google-meet",
//     selectedGoals: [] as string[],
//     selectedPlatforms: [] as string[],
//     additionalNotes: "",
//   });

//   const [reminderEnabled, setReminderEnabled] = useState(true);

//   // WhatsApp Destination Number
//   const CONSULTANT_WHATSAPP = "2347036464258";

//   // Dynamic Calendar Calculation
//   const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
//   const getFirstDayOfMonth = (year: number, month: number) => {
//     const day = new Date(year, month, 1).getDay();
//     return day === 0 ? 6 : day - 1; // Align Monday to index 0
//   };

//   const handlePrevMonth = () => {
//     setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1));
//   };

//   const handleNextMonth = () => {
//     setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1));
//   };

//   const toggleGoal = (goal: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       selectedGoals: prev.selectedGoals.includes(goal)
//         ? prev.selectedGoals.filter((g) => g !== goal)
//         : [...prev.selectedGoals, goal],
//     }));
//   };

// const togglePlatform = (platform: string) => {
//   setFormData((prev) => ({
//     ...prev,
//     selectedPlatforms: prev.selectedPlatforms.includes(platform)
//       ? prev.selectedPlatforms.filter((p) => p !== platform)
//       : [...prev.selectedPlatforms, platform], // Fix: changed 'p' to 'platform'
//   }));
// };

//   const handleNext = () => currentStep < 4 && setCurrentStep((prev) => prev + 1);
//   const handlePrev = () => currentStep > 1 && setCurrentStep((prev) => prev - 1);

//   // Dynamic Google Calendar Invite Creator
//   const createGoogleCalendarUrl = () => {
//     const title = encodeURIComponent(
//       `Strategy Session: ${formData.fullName || "Client"} x The Brand Strategist`
//     );
//     const details = encodeURIComponent(
//       `Consultation Format: ${
//         formData.meetingFormat === "google-meet" ? "Google Meet Video Call" : "Physical Meeting"
//       }\nLocation/Notes: ${formData.meetingLocation || "N/A"}\nGoals: ${formData.selectedGoals.join(", ")}`
//     );

//     const formattedDateStr = selectedDate.toISOString().replace(/-|:|\.\d\d\d/g, "").substring(0, 8);
//     const startTime = `${formattedDateStr}T130000Z`;
//     const endTime = `${formattedDateStr}T140000Z`;

//     return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&add=googlemeet`;
//   };

//   // Pure Frontend Dispatch to WhatsApp + Calendar
//   const handleBookingSubmit = () => {
//     const calendarUrl = createGoogleCalendarUrl();

//     const messageSummary = `
// 📅 *NEW STRATEGY BOOKING REQUEST*

// 👤 *Client Name:* ${formData.fullName || "N/A"}
// 📧 *Email:* ${formData.email || "N/A"}
// 📞 *Phone:* ${formData.phone || "N/A"}
// 🏢 *Brand:* ${formData.companyName || "N/A"}

// 🗓 *Date:* ${selectedDate.toDateString()}
// ⏰ *Time:* ${formData.selectedTime}
// 📌 *Format:* ${formData.meetingFormat === "google-meet" ? "Google Meet Call" : "Physical Meeting"}
// ${formData.meetingFormat === "physical" ? `📍 *Location:* ${formData.meetingLocation || "To be agreed"}\n` : ""}
// 🎯 *Strategy Goals:*
// ${formData.selectedGoals.length ? formData.selectedGoals.map((g) => `• ${g}`).join("\n") : "None selected"}

// 📱 *Platforms:*
// ${formData.selectedPlatforms.length ? formData.selectedPlatforms.map((p) => `• ${p}`).join("\n") : "None selected"}

// 📝 *Notes:* ${formData.additionalNotes || "None"}

// 📆 *Google Calendar & Meet Link:*
// ${calendarUrl}
//     `.trim();

//     window.open(calendarUrl, "_blank");
//     const whatsappUrl = `https://wa.me/${CONSULTANT_WHATSAPP}?text=${encodeURIComponent(messageSummary)}`;
//     window.location.href = whatsappUrl;
//   };

//   // Render Calendar Matrix Dynamically
//   const renderCalendarDays = () => {
//     const year = currentMonthDate.getFullYear();
//     const month = currentMonthDate.getMonth();
//     const totalDays = getDaysInMonth(year, month);
//     const firstDayIndex = getFirstDayOfMonth(year, month);

//     const cells = [];

//     // Empty lead cells
//     for (let i = 0; i < firstDayIndex; i++) {
//       cells.push(<div key={`empty-${i}`} className="p-2" />);
//     }

//     // Days of Month
//     for (let day = 1; day <= totalDays; day++) {
//       const thisDate = new Date(year, month, day);
//       const isSelected =
//         selectedDate.getDate() === day &&
//         selectedDate.getMonth() === month &&
//         selectedDate.getFullYear() === year;

//       cells.push(
//         <button
//           key={day}
//           type="button"
//           onClick={() => setSelectedDate(thisDate)}
//           className={`p-2.5 rounded-full text-xs font-medium flex items-center justify-center mx-auto h-9 w-9 transition-all ${
//             isSelected
//               ? "bg-[#5D1F17] text-white font-bold shadow-md"
//               : "text-neutral-900 hover:bg-[#5D1F17]/10 hover:text-[#5D1F17]"
//           }`}
//         >
//           {day}
//         </button>
//       );
//     }

//     return cells;
//   };

//   return (
//     <div className="min-h-screen bg-white pt-28 pb-16 px-4 sm:px-6 md:px-8 text-neutral-900 font-sans">
//       <div className="max-w-5xl mx-auto">
        
//         {/* PAGE HEADER */}
//         <div className="mb-10 text-center sm:text-left">
//           <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#5D1F17] bg-[#5D1F17]/10 px-3 py-1.5 rounded-full border border-[#5D1F17]/20 mb-3">
//             <Sparkles className="w-3.5 h-3.5" /> Strategy & Advisory Call
//           </span>
//           <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-900">
//             Book a Strategy Consultation
//           </h1>
//         </div>

//         {/* STEP PROGRESS HEADER */}
//         <div className="mb-10 overflow-x-auto pb-4">
//           <div className="flex items-center justify-between min-w-[680px] border-b border-neutral-200 pb-6">
//             {STEPS.map((step) => {
//               const isActive = currentStep === step.id;
//               const isCompleted = currentStep > step.id;

//               return (
//                 <button
//                   key={step.id}
//                   type="button"
//                   onClick={() => setCurrentStep(step.id)}
//                   className="flex items-center gap-3 transition-colors duration-200"
//                 >
//                   <div
//                     className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ${
//                       isCompleted
//                         ? "bg-[#5D1F17] text-white"
//                         : isActive
//                         ? "bg-neutral-900 text-white ring-4 ring-neutral-100"
//                         : "border border-neutral-300 text-neutral-400"
//                     }`}
//                   >
//                     {isCompleted ? <Check className="h-4 w-4" /> : `0${step.id}`}
//                   </div>
//                   <span
//                     className={`text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
//                       isActive || isCompleted ? "text-neutral-900 font-semibold" : "text-neutral-400"
//                     }`}
//                   >
//                     {step.title}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* STEP CONTENT CONTAINER */}
//         <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xl min-h-[520px] flex flex-col justify-between">
//           <AnimatePresence mode="wait">
            
//             {/* STEP 1: PERSONAL DETAILS */}
//             {currentStep === 1 && (
//               <motion.div
//                 key="step1"
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -15 }}
//                 transition={{ duration: 0.25 }}
//                 className="space-y-6"
//               >
//                 <div>
//                   <h2 className="text-2xl font-light text-neutral-900 mb-2">Personal Information</h2>
//                   <p className="text-sm text-neutral-500">Tell us about yourself and your brand.</p>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-xs font-medium uppercase tracking-wider text-neutral-600 mb-2">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="e.g. Sarah Jenkins"
//                       value={formData.fullName}
//                       onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                       className="w-full rounded-xl bg-neutral-50 border border-neutral-200 px-4 py-3 text-sm text-neutral-900 focus:border-[#5D1F17] focus:outline-none focus:ring-1 focus:ring-[#5D1F17]"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium uppercase tracking-wider text-neutral-600 mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       placeholder="sarah@yourbrand.com"
//                       value={formData.email}
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       className="w-full rounded-xl bg-neutral-50 border border-neutral-200 px-4 py-3 text-sm text-neutral-900 focus:border-[#5D1F17] focus:outline-none focus:ring-1 focus:ring-[#5D1F17]"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium uppercase tracking-wider text-neutral-600 mb-2">
//                       Phone Number / WhatsApp
//                     </label>
//                     <input
//                       type="tel"
//                       placeholder="+234..."
//                       value={formData.phone}
//                       onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                       className="w-full rounded-xl bg-neutral-50 border border-neutral-200 px-4 py-3 text-sm text-neutral-900 focus:border-[#5D1F17] focus:outline-none focus:ring-1 focus:ring-[#5D1F17]"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium uppercase tracking-wider text-neutral-600 mb-2">
//                       Brand / Business Name
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="e.g. Lumina Apparel"
//                       value={formData.companyName}
//                       onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
//                       className="w-full rounded-xl bg-neutral-50 border border-neutral-200 px-4 py-3 text-sm text-neutral-900 focus:border-[#5D1F17] focus:outline-none focus:ring-1 focus:ring-[#5D1F17]"
//                     />
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {/* STEP 2: APPOINTMENT DETAILS & DYNAMIC MAP */}
//             {currentStep === 2 && (
//               <motion.div
//                 key="step2"
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -15 }}
//                 transition={{ duration: 0.25 }}
//                 className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
//               >
//                 <div className="lg:col-span-7 space-y-6">
//                   <h2 className="text-xl font-medium text-neutral-900">Select a date & time</h2>

//                   {/* DYNAMIC CALENDAR PICKER */}
//                   <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-5">
//                     <div className="flex items-center justify-between mb-6">
//                       <button
//                         type="button"
//                         onClick={handlePrevMonth}
//                         className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-600 transition-colors"
//                       >
//                         <ChevronLeft className="w-5 h-5" />
//                       </button>
//                       <span className="text-sm font-semibold text-neutral-900">
//                         {currentMonthDate.toLocaleString("default", { month: "long" })} {currentMonthDate.getFullYear()}
//                       </span>
//                       <button
//                         type="button"
//                         onClick={handleNextMonth}
//                         className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-600 transition-colors"
//                       >
//                         <ChevronRight className="w-5 h-5" />
//                       </button>
//                     </div>

//                     <div className="grid grid-cols-7 text-center text-xs font-semibold text-neutral-400 mb-3">
//                       {DAYS_OF_WEEK.map((day) => (
//                         <span key={day}>{day}</span>
//                       ))}
//                     </div>

//                     <div className="grid grid-cols-7 gap-1 text-center text-sm">
//                       {renderCalendarDays()}
//                     </div>
//                   </div>

//                   {/* SCHEDULING CARD */}
//                   <div className="rounded-2xl bg-neutral-900 text-white p-5 space-y-3 shadow-lg">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="text-base font-medium">Scheduling Notification</h3>
//                         <p className="text-xs text-neutral-400">Notify me one day in advance.</p>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => setReminderEnabled(!reminderEnabled)}
//                         className={`p-2 rounded-xl transition-colors ${
//                           reminderEnabled ? "bg-[#5D1F17] text-white" : "bg-white/20 text-neutral-400"
//                         }`}
//                       >
//                         <Bell className="w-4 h-4" />
//                       </button>
//                     </div>

//                     <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-xs text-neutral-200">
//                       <Clock className="w-4 h-4 text-[#5D1F17]" />
//                       <span>
//                         Selected: {selectedDate.toDateString()} — {formData.selectedTime}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* TIME, FORMAT & DYNAMIC MAP */}
//                 <div className="lg:col-span-5 space-y-6">
//                   <div>
//                     <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-3">Available Time</h3>
//                     <div className="space-y-2.5">
//                       {TIME_SLOTS.map((time) => {
//                         const isSelected = formData.selectedTime === time;
//                         return (
//                           <button
//                             key={time}
//                             type="button"
//                             onClick={() => setFormData({ ...formData, selectedTime: time })}
//                             className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-xs font-medium transition-all ${
//                               isSelected
//                                 ? "border-[#5D1F17] bg-[#5D1F17]/10 text-neutral-900"
//                                 : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300"
//                             }`}
//                           >
//                             <span className="flex items-center gap-2">
//                               <Clock className="w-3.5 h-3.5 text-neutral-400" />
//                               {time}
//                             </span>
//                             <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${isSelected ? "border-[#5D1F17] bg-[#5D1F17]" : "border-neutral-400"}`}>
//                               {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
//                             </div>
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-3">Meeting Format</h3>
//                     <div className="space-y-2.5">
//                       {MEETING_FORMATS.map((format) => {
//                         const isSelected = formData.meetingFormat === format.id;
//                         const Icon = format.icon;
//                         return (
//                           <div
//                             key={format.id}
//                             onClick={() => setFormData({ ...formData, meetingFormat: format.id })}
//                             className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
//                               isSelected
//                                 ? "border-[#5D1F17] bg-[#5D1F17]/5"
//                                 : "border-neutral-200 bg-neutral-50 hover:border-neutral-300"
//                             }`}
//                           >
//                             <div className="p-2 rounded-lg bg-neutral-200 text-neutral-900 shrink-0 mt-0.5">
//                               <Icon className="w-4 h-4" />
//                             </div>
//                             <div className="flex-1">
//                               <div className="text-xs font-semibold text-neutral-900">{format.title}</div>
//                               <div className="text-[11px] text-neutral-500 mt-0.5">{format.desc}</div>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>

//                     {/* DYNAMIC GOOGLE MAP EMBED FOR PHYSICAL MEETINGS */}
//                     {formData.meetingFormat === "physical" && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         className="mt-5 space-y-3"
//                       >
//                         <label className="block text-xs font-medium uppercase tracking-wider text-neutral-600">
//                           Proposed Venue / Office Address
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="text"
//                             placeholder="Type meeting location..."
//                             value={formData.meetingLocation}
//                             onChange={(e) => setFormData({ ...formData, meetingLocation: e.target.value })}
//                             className="w-full rounded-xl bg-neutral-50 border border-neutral-200 pl-10 pr-4 py-2.5 text-xs text-neutral-900 focus:border-[#5D1F17] focus:outline-none"
//                           />
//                           <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
//                         </div>

//                         {/* INTERACTIVE GOOGLE MAP IFRAME */}
//                         <div className="h-44 w-full rounded-2xl overflow-hidden border border-neutral-200 shadow-inner">
//                           <iframe
//                             title="Dynamic Meeting Location Map"
//                             width="100%"
//                             height="100%"
//                             style={{ border: 0 }}
//                             loading="lazy"
//                             allowFullScreen
//                             src={`https://maps.google.com/maps?q=${encodeURIComponent(
//                               formData.meetingLocation || "Lagos, Nigeria"
//                             )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
//                           />
//                         </div>
//                       </motion.div>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {/* STEP 3: STRATEGY GOALS */}
//             {currentStep === 3 && (
//               <motion.div
//                 key="step3"
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -15 }}
//                 transition={{ duration: 0.25 }}
//                 className="space-y-6"
//               >
//                 <div>
//                   <h2 className="text-2xl font-light text-neutral-900 mb-2">Strategy Interest</h2>
//                   <p className="text-sm text-neutral-500">Select key areas to discuss.</p>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {STRATEGY_GOALS.map((goal) => {
//                     const isSelected = formData.selectedGoals.includes(goal);
//                     return (
//                       <button
//                         key={goal}
//                         type="button"
//                         onClick={() => toggleGoal(goal)}
//                         className={`flex items-center justify-between p-4 rounded-2xl border text-left text-sm transition-all ${
//                           isSelected
//                             ? "border-[#5D1F17] bg-[#5D1F17]/10 text-neutral-900 font-medium"
//                             : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300"
//                         }`}
//                       >
//                         <span>{goal}</span>
//                         <div className={`h-5 w-5 rounded-md border flex items-center justify-center ${isSelected ? "border-[#5D1F17] bg-[#5D1F17] text-white" : "border-neutral-400"}`}>
//                           {isSelected && <Check className="w-3.5 h-3.5" />}
//                         </div>
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium uppercase tracking-wider text-neutral-600 mb-2">
//                     Current Main Challenge
//                   </label>
//                   <textarea
//                     rows={4}
//                     placeholder="Briefly describe your goals or obstacles..."
//                     value={formData.additionalNotes}
//                     onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
//                     className="w-full rounded-2xl bg-neutral-50 border border-neutral-200 p-4 text-sm text-neutral-900 focus:border-[#5D1F17] focus:outline-none focus:ring-1 focus:ring-[#5D1F17]"
//                   />
//                 </div>
//               </motion.div>
//             )}

//             {/* STEP 4: PLATFORMS & DISPATCH */}
//             {currentStep === 4 && (
//               <motion.div
//                 key="step4"
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -15 }}
//                 transition={{ duration: 0.25 }}
//                 className="space-y-6"
//               >
//                 <div>
//                   <h2 className="text-2xl font-light text-neutral-900 mb-2">Platforms of Focus</h2>
//                   <p className="text-sm text-neutral-500">Which social channels are priority?</p>
//                 </div>

//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                   {PLATFORMS.map((platform) => {
//                     const isSelected = formData.selectedPlatforms.includes(platform);
//                     return (
//                       <button
//                         key={platform}
//                         type="button"
//                         onClick={() => togglePlatform(platform)}
//                         className={`flex flex-col items-center justify-center p-6 rounded-2xl border text-center transition-all ${
//                           isSelected
//                             ? "border-[#5D1F17] bg-[#5D1F17]/10 text-neutral-900 font-medium ring-1 ring-[#5D1F17]"
//                             : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300"
//                         }`}
//                       >
//                         <span className="text-base font-semibold">{platform}</span>
//                         <span className="text-[11px] text-neutral-400 mt-1">
//                           {isSelected ? "Selected" : "Tap to add"}
//                         </span>
//                       </button>
//                     );
//                   })}
//                 </div>

//                 {/* AUTOMATED DISPATCH SUMMARY */}
//                 <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 space-y-4">
//                   <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
//                     <Send className="w-3.5 h-3.5 text-[#5D1F17]" /> Pure Frontend Automation Summary
//                   </h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-600">
//                     <a
//                       href={createGoogleCalendarUrl()}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-2 bg-white p-3 rounded-xl border border-neutral-200 hover:border-[#5D1F17] transition-colors"
//                     >
//                       <CalendarIcon className="w-4 h-4 text-[#5D1F17]" />
//                       <span>Google Calendar Invite + Meet Link</span>
//                     </a>
//                     <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-neutral-200">
//                       <Send className="w-4 h-4 text-emerald-600" />
//                       <span>WhatsApp Dispatch to +2347036464258</span>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* ACTION BUTTONS */}
//           <div className="flex items-center justify-between border-t border-neutral-200 pt-8 mt-10">
//             <button
//               type="button"
//               onClick={handlePrev}
//               disabled={currentStep === 1}
//               className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
//                 currentStep === 1
//                   ? "opacity-30 cursor-not-allowed text-neutral-400"
//                   : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
//               }`}
//             >
//               <ArrowLeft className="w-4 h-4" /> Previous
//             </button>

//             {currentStep < 4 ? (
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#5D1F17] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#4a1812] transition-colors shadow-md"
//               >
//                 Next Step <ArrowRight className="w-4 h-4" />
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={handleBookingSubmit}
//                 className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#5D1F17] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#4a1812] transition-colors shadow-xl"
//               >
//                 Confirm & Open WhatsApp <Check className="w-4 h-4" />
//               </button>
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


// // import { CalEmbed } from "@/components/consultation/CalEmbed";

// // export default function ConsultationPage() {
// //   return (
// //     <div className="w-full bg-white text-neutral-900 font-sans">
// //       <section className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24 pb-10">
// //         <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">
// //           BOOK A SESSION
// //         </p>
// //         <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.08] max-w-xl">
// //           Let's Talk About Your{" "}
// //           <span className="font-serif italic font-normal text-[#5D1F17]">
// //             Brand's Future
// //           </span>
// //         </h1>
// //       </section>

// //       <section className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pb-24">
// //         <div className="border border-zinc-200 rounded-lg overflow-hidden">
// //           <CalEmbed />
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }