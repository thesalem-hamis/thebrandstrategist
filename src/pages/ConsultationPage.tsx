// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ArrowUpLeft,
//   ArrowUpRight,
//   Check,
//   Clock,
//   CreditCard,
//   ShieldCheck,
//   Loader2,
//   AlertCircle,
//   Calendar,
//   User,
// } from "lucide-react";
// import { supabase } from "@/lib/supabase";

// const TIME_SLOTS = [
//   "9:00 AM",
//   "10:00 AM",
//   "11:00 AM",
//   "1:00 PM",
//   "2:00 PM",
//   "3:00 PM",
//   "4:00 PM",
// ];

// const MONTH_NAMES = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

// const CONSULTATION_SERVICE_ID = "consultation";
// const CONSULTATION_FEE_USD = 100;

// function buildMonthGrid(year: number, month: number) {
//   const firstDay = new Date(year, month, 1).getDay();
//   const daysInMonth = new Date(year, month + 1, 0).getDate();

//   const cells: (number | null)[] = Array(firstDay).fill(null);

//   for (let day = 1; day <= daysInMonth; day++) {
//     cells.push(day);
//   }

//   return cells;
// }

// export default function ConsultationPage() {
//   const today = new Date();

//   const [viewDate, setViewDate] = useState(
//     new Date(today.getFullYear(), today.getMonth(), 1)
//   );

//   const [selectedDay, setSelectedDay] = useState<number | null>(null);
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);

//   const [step, setStep] = useState<
//     "pick" | "details" | "payment" | "confirmed"
//   >("pick");

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     notes: "",
//   });

//   const [isProcessing, setIsProcessing] = useState(false);
//   const [paymentReference, setPaymentReference] = useState<string | null>(null);
//   const [paymentError, setPaymentError] = useState<string | null>(null);
//   const [feeUsd, setFeeUsd] = useState(CONSULTATION_FEE_USD);
//   const [blockedDates, setBlockedDates] = useState<Set<string>>(new Set());

//   const year = viewDate.getFullYear();
//   const month = viewDate.getMonth();

//   const cells = useMemo(
//     () => buildMonthGrid(year, month),
//     [year, month]
//   );

//   const isPast = (day: number) => {
//     const selectedDate = new Date(year, month, day);
//     const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
//     return selectedDate < currentDate;
//   };

//   const isBlocked = (day: number) => {
//     const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
//     return blockedDates.has(dateStr);
//   };

//   const isToday = (day: number) => {
//     return (
//       day === today.getDate() &&
//       month === today.getMonth() &&
//       year === today.getFullYear()
//     );
//   };

//   const changeMonth = (delta: number) => {
//     setViewDate(new Date(year, month + delta, 1));
//     setSelectedDay(null);
//     setSelectedTime(null);
//     setPaymentError(null);
//   };

//   const canContinue =
//     selectedDay !== null && selectedTime !== null;

//   useEffect(() => {
//     const fetchFee = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("site_settings")
//           .select("value")
//           .eq("key", "consultation_fee_usd")
//           .maybeSingle();

//         if (error) {
//           console.warn(
//             "Could not fetch consultation fee:",
//             error.message
//           );
//           return;
//         }

//         if (
//           data?.value !== null &&
//           data?.value !== undefined &&
//           !isNaN(Number(data.value))
//         ) {
//           setFeeUsd(Number(data.value));
//         }
//       } catch (error) {
//         console.warn(
//           "Failed to fetch consultation fee:",
//           error
//         );
//       }
//     };

//     fetchFee();

//     supabase
//       .from("blocked_dates")
//       .select("date")
//       .then(({ data }) => {
//         if (data) setBlockedDates(new Set(data.map((r: { date: string }) => r.date)));
//       });
//   }, []);

//   useEffect(() => {
//     const params = new URLSearchParams(
//       window.location.search
//     );

//     const payment = params.get("payment");
//     const reference = params.get("reference");

//     if (payment !== "callback" || !reference) {
//       return;
//     }

//     const verifyPayment = async () => {
//       try {
//         setIsProcessing(true);
//         setPaymentError(null);

//         const { data, error } =
//           await supabase.functions.invoke(
//             "verify-payment",
//             {
//               body: {
//                 reference,
//               },
//             }
//           );

//         if (error) {
//           throw new Error(
//             error.message ||
//               "Payment verification failed"
//           );
//         }

//         if (!data?.success || !data?.paid) {
//           throw new Error(
//             data?.message ||
//               "Payment could not be verified"
//           );
//         }

//         setPaymentReference(reference);
//         setStep("confirmed");

//         localStorage.removeItem(
//           "consultation_reference"
//         );

//         window.history.replaceState(
//           {},
//           document.title,
//           "/book-a-session"
//         );
//       } catch (error) {
//         console.error(
//           "Payment verification error:",
//           error
//         );

//         setPaymentError(
//           error instanceof Error
//             ? error.message
//             : "Payment verification failed"
//         );
//       } finally {
//         setIsProcessing(false);
//       }
//     };

//     verifyPayment();
//   }, []);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleDetailsSubmit = (
//     event: React.FormEvent
//   ) => {
//     event.preventDefault();

//     setPaymentError(null);
//     setStep("payment");
//   };

//   const handlePaystackPayment = async () => {
//     if (
//       !form.name.trim() ||
//       !form.email.trim() ||
//       selectedDay === null ||
//       !selectedTime
//     ) {
//       setPaymentError(
//         "Please fill in all required fields."
//       );
//       return;
//     }

//     setIsProcessing(true);
//     setPaymentError(null);

//     try {
//       const sessionDate =
//         String(year) +
//         "-" +
//         String(month + 1).padStart(2, "0") +
//         "-" +
//         String(selectedDay).padStart(2, "0");

//       const { data, error } =
//         await supabase.functions.invoke(
//           "initialize-payment",
//           {
//             body: {
//               service_id: CONSULTATION_SERVICE_ID,
//               type: "consultation",
//               client_name: form.name.trim(),
//               client_email: form.email.trim(),
//               notes: form.notes.trim(),
//               session_date: sessionDate,
//               session_time: selectedTime,
//             },
//           }
//         );

//       if (error) {
//         throw new Error(
//           error.message ||
//             "Unable to initialize payment"
//         );
//       }

//       if (!data?.success) {
//         throw new Error(
//           data?.message ||
//             "Unable to initialize payment"
//         );
//       }

//       if (!data?.authorization_url) {
//         throw new Error(
//           "Paystack checkout URL was not returned"
//         );
//       }

//       if (!data?.reference) {
//         throw new Error(
//           "Payment reference was not returned"
//         );
//       }

//       localStorage.setItem(
//         "consultation_reference",
//         data.reference
//       );

//       window.location.href =
//         data.authorization_url;
//     } catch (error) {
//       console.error(
//         "Payment initialization error:",
//         error
//       );

//       setPaymentError(
//         error instanceof Error
//           ? error.message
//           : "Could not start the booking. Please try again."
//       );

//       setIsProcessing(false);
//     }
//   };

//   const selectedDateLabel =
//     selectedDay !== null
//       ? MONTH_NAMES[month] +
//         " " +
//         selectedDay +
//         ", " +
//         year
//       : null;

//   return (
//     <div className="w-full bg-white text-neutral-900 font-sans pt-20 sm:pt-28 lg:pt-36 pb-24 sm:pb-32 px-6 sm:px-12 lg:px-20 border-b border-neutral-200">
//       <div className="mx-auto max-w-7xl">

//         <div className="mb-6 flex justify-start">
//           <Link
//             to="/"
//             className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#5D1F17] bg-white text-[#5D1F17] hover:border-neutral-900 hover:text-neutral-900 text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow hover:shadow-md group/btn"
//           >
//             <ArrowUpLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5" />
//             <span>GO BACK</span>
//           </Link>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="mb-8 sm:mb-12"
//         >
//           <h1 className="text-3xl sm:text-5xl lg:text-[68px] font-semibold sm:font-light font-sans uppercase tracking-tight leading-none text-neutral-900">
//             1-ON-1 WITH{" "}
//             <span className="font-sans font-semibold text-[#5D1F17]">
//               BIMPE MOHAMMED
//             </span>
//           </h1>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 items-start mb-12 sm:mb-16">

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{
//               duration: 0.6,
//               delay: 0.1,
//             }}
//             className="md:col-span-6"
//           >
//             <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 font-normal">
//               Book a dedicated private session with
//               Bimpe Mohammed to assess your current
//               brand architecture, refine audience
//               positioning, and create high-level
//               strategy tailored to your long-term
//               goals.
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{
//               duration: 0.6,
//               delay: 0.15,
//             }}
//             className="md:col-span-6"
//           >
//             <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 font-normal">
//               Select your preferred date and time
//               on the calendar below. Each consultation
//               is engineered to provide absolute
//               clarity, executive direction, and
//               actionable next steps.
//             </p>
//           </motion.div>
//         </div>

//         <div className="border border-zinc-200 grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden shadow-sm">

//           <div className="lg:col-span-7 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-zinc-200">

//             <div className="flex items-center justify-between mb-8">
//               <h2 className="text-lg sm:text-xl font-bold tracking-tight uppercase">
//                 {MONTH_NAMES[month]} {year}
//               </h2>

//               <div className="flex items-center gap-2">
//                 <button
//                   type="button"
//                   onClick={() => changeMonth(-1)}
//                   className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 text-neutral-500 hover:border-[#5D1F17] hover:text-[#5D1F17] transition-colors duration-300"
//                   aria-label="Previous month"
//                 >
//                   ‹
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => changeMonth(1)}
//                   className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 text-neutral-500 hover:border-[#5D1F17] hover:text-[#5D1F17] transition-colors duration-300"
//                   aria-label="Next month"
//                 >
//                   ›
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-7 mb-3">
//               {WEEKDAYS.map((weekday, index) => (
//                 <div
//                   key={weekday + index}
//                   className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 text-center"
//                 >
//                   {weekday}
//                 </div>
//               ))}
//             </div>

//             <div className="grid grid-cols-7 gap-y-2">
//               {cells.map((day, index) => {
//                 if (day === null) {
//                   return <div key={index} />;
//                 }

//                 const blocked = isBlocked(day);
//                 const past = isPast(day);
//                 const disabled = past || blocked;
//                 const selected = selectedDay === day;

//                 return (
//                   <div
//                     key={index}
//                     className="flex justify-center"
//                   >
//                     <button
//                       type="button"
//                       disabled={disabled}
//                       onClick={() => {
//                         setSelectedDay(day);
//                         setSelectedTime(null);
//                         setPaymentError(null);
//                       }}
//                       className={`relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ${
//                         blocked
//                           ? "bg-neutral-100 text-neutral-300 cursor-not-allowed"
//                           : past
//                           ? "text-neutral-300 cursor-not-allowed"
//                           : selected
//                           ? "bg-[#5D1F17] text-white shadow-sm"
//                           : "text-neutral-700 hover:bg-neutral-100"
//                       }`}
//                     >
//                       {day}

//                       {blocked && (
//                         <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-[3px]">
//                           <span className="w-[3px] h-[3px] rounded-full bg-neutral-300" />
//                           <span className="w-[3px] h-[3px] rounded-full bg-neutral-300" />
//                         </span>
//                       )}

//                       {isToday(day) && !selected && !blocked && (
//                         <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#5D1F17]" />
//                       )}
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>

//             <AnimatePresence>
//               {selectedDay !== null && (
//                 <motion.div
//                   initial={{
//                     opacity: 0,
//                     height: 0,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     height: "auto",
//                   }}
//                   exit={{
//                     opacity: 0,
//                     height: 0,
//                   }}
//                   transition={{
//                     duration: 0.4,
//                     ease: "easeOut",
//                   }}
//                   className="overflow-hidden"
//                 >
//                   <div className="pt-8 mt-8 border-t border-zinc-200">

//                     <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-4">
//                       <Clock className="w-3.5 h-3.5" />
//                       Available Times —{" "}
//                       {selectedDateLabel}
//                     </p>

//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
//                       {TIME_SLOTS.map((time) => (
//                         <button
//                           key={time}
//                           type="button"
//                           onClick={() => {
//                             setSelectedTime(time);
//                             setPaymentError(null);
//                           }}
//                           className={`py-2.5 text-xs font-semibold rounded-full border transition-all duration-300 ${
//                             selectedTime === time
//                               ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
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

//           <div className="lg:col-span-5 p-6 sm:p-10 bg-neutral-50/60 flex flex-col justify-between">

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
//                   <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-4 font-mono">
//                     SESSION SUMMARY
//                   </p>

//                   <h3 className="text-lg sm:text-xl font-medium tracking-tight text-neutral-900 uppercase mb-2">
//                     1-on-1 Strategy Consultation
//                   </h3>

//                   <p className="text-xs text-neutral-600 leading-relaxed mb-8">
//                     A comprehensive 60-minute virtual
//                     strategy session directly with Bimpe
//                     Mohammed to refine your brand
//                     position and execution path.
//                   </p>

//                   <div className="space-y-4 text-xs text-neutral-600 mb-8">

//                     <div className="flex justify-between border-b border-zinc-200 pb-3">
//                       <span className="font-semibold text-neutral-400 uppercase tracking-wide">
//                         Advisor
//                       </span>

//                       <span className="font-medium text-neutral-900">
//                         Bimpe Mohammed
//                       </span>
//                     </div>

//                     <div className="flex justify-between border-b border-zinc-200 pb-3">
//                       <span className="font-semibold text-neutral-400 uppercase tracking-wide">
//                         Date
//                       </span>

//                       <span className="font-medium text-neutral-900">
//                         {selectedDateLabel ||
//                           "Select a date"}
//                       </span>
//                     </div>

//                     <div className="flex justify-between border-b border-zinc-200 pb-3">
//                       <span className="font-semibold text-neutral-400 uppercase tracking-wide">
//                         Time
//                       </span>

//                       <span className="font-medium text-neutral-900">
//                         {selectedTime ||
//                           "Select a time"}
//                       </span>
//                     </div>

//                     <div className="flex justify-between border-b border-zinc-200 pb-3">
//                       <span className="font-semibold text-neutral-400 uppercase tracking-wide">
//                         Fee
//                       </span>

//                       <span className="font-medium text-neutral-900">
//                         {feeUsd} USD
//                       </span>
//                     </div>
//                   </div>

//                   <button
//                     type="button"
//                     disabled={!canContinue}
//                     onClick={() => setStep("details")}
//                     className={`mt-auto inline-flex items-center justify-center gap-2 w-full font-semibold text-xs tracking-wider uppercase py-3.5 px-6 rounded-full transition-all duration-300 ${
//                       canContinue
//                         ? "bg-[#5D1F17] hover:bg-[#4A1812] text-white cursor-pointer shadow hover:shadow-md"
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
//                   onSubmit={handleDetailsSubmit}
//                   initial={{
//                     opacity: 0,
//                     x: 20,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     x: 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     x: -20,
//                   }}
//                   transition={{
//                     duration: 0.35,
//                     ease: "easeOut",
//                   }}
//                   className="flex-1 flex flex-col"
//                 >
//                   <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-4 font-mono">
//                     YOUR DETAILS
//                   </p>

//                   <h3 className="text-lg font-bold tracking-tight mb-6 text-neutral-900">
//                     {selectedDateLabel} ·{" "}
//                     {selectedTime}
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
//                         onChange={(event) =>
//                           setForm({
//                             ...form,
//                             name: event.target.value,
//                           })
//                         }
//                         className="w-full bg-white border border-zinc-200 rounded-full px-5 py-3 text-xs text-neutral-800 outline-none focus:border-[#5D1F17] transition-colors duration-300"
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
//                         onChange={(event) =>
//                           setForm({
//                             ...form,
//                             email: event.target.value,
//                           })
//                         }
//                         className="w-full bg-white border border-zinc-200 rounded-full px-5 py-3 text-xs text-neutral-800 outline-none focus:border-[#5D1F17] transition-colors duration-300"
//                         placeholder="jane@company.com"
//                       />
//                     </div>

//                     <div>
//                       <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1.5 block">
//                         Core Focus / Topic For Bimpe
//                       </label>

//                       <textarea
//                         rows={3}
//                         value={form.notes}
//                         onChange={(event) =>
//                           setForm({
//                             ...form,
//                             notes: event.target.value,
//                           })
//                         }
//                         className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-3 text-xs text-neutral-800 outline-none focus:border-[#5D1F17] transition-colors duration-300 resize-none"
//                         placeholder="Briefly detail what you would like Bimpe to focus on during your session..."
//                       />
//                     </div>
//                   </div>

//                   <div className="mt-auto flex gap-3">

//                     <button
//                       type="button"
//                       onClick={() => setStep("pick")}
//                       className="flex-1 border border-zinc-200 rounded-full text-neutral-600 hover:border-neutral-400 font-semibold text-xs tracking-wider uppercase py-3.5 px-6 transition-colors duration-300"
//                     >
//                       Back
//                     </button>

//                     <button
//                       type="submit"
//                       className="flex-[2] inline-flex items-center justify-center gap-2 bg-[#5D1F17] hover:bg-[#4A1812] text-white rounded-full font-semibold text-xs tracking-wider uppercase py-3.5 px-6 transition-all duration-300 shadow hover:shadow-md"
//                     >
//                       <span>Proceed to Payment</span>
//                       <ArrowUpRight className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 </motion.form>
//               )}

//               {step === "payment" && (
//                 <motion.div
//                   key="payment"
//                   initial={{
//                     opacity: 0,
//                     x: 20,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     x: 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     x: -20,
//                   }}
//                   transition={{
//                     duration: 0.35,
//                     ease: "easeOut",
//                   }}
//                   className="flex-1 flex flex-col"
//                 >
//                   <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-4 font-mono">
//                     PAYMENT CHECKOUT
//                   </p>

//                   <h3 className="text-lg font-bold tracking-tight mb-6 text-neutral-900">
//                     Confirm Consultation
//                   </h3>

//                   <div className="bg-white border border-zinc-200 rounded-2xl p-4 mb-6 space-y-3 text-xs">

//                     <div className="flex justify-between text-neutral-600">
//                       <span className="flex items-center gap-2">
//                         <User className="w-3.5 h-3.5" />
//                         Client
//                       </span>

//                       <span className="font-semibold text-neutral-900">
//                         {form.name}
//                       </span>
//                     </div>

//                     <div className="flex justify-between text-neutral-600">
//                       <span className="flex items-center gap-2">
//                         <Calendar className="w-3.5 h-3.5" />
//                         Schedule
//                       </span>

//                       <span className="font-semibold text-neutral-900">
//                         {selectedDateLabel} @{" "}
//                         {selectedTime}
//                       </span>
//                     </div>

//                     <div className="flex justify-between text-neutral-600">
//                       <span className="flex items-center gap-2">
//                         <CreditCard className="w-3.5 h-3.5" />
//                         Session Fee
//                       </span>

//                       <span className="font-semibold text-neutral-900">
//                         {feeUsd} USD
//                       </span>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between p-3.5 bg-neutral-100 border border-zinc-200 rounded-full mb-6 px-5">

//                     <div className="flex items-center gap-2">
//                       <ShieldCheck className="w-4 h-4 text-emerald-600" />

//                       <span className="text-[11px] font-medium text-neutral-600">
//                         Encrypted via
//                       </span>
//                     </div>

//                     <span className="font-bold text-xs tracking-tight text-[#0BA4DB]">
//                       paystack
//                     </span>
//                   </div>

//                   {paymentError && (
//                     <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-3.5 py-2.5">
//                       <div className="flex items-center gap-2">

//                         <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />

//                         <p className="text-[11px] text-red-600">
//                           {paymentError}
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   <div className="mt-auto flex gap-3">

//                     <button
//                       type="button"
//                       onClick={() =>
//                         setStep("details")
//                       }
//                       disabled={isProcessing}
//                       className="flex-1 border border-zinc-200 rounded-full text-neutral-600 hover:border-neutral-400 font-semibold text-xs tracking-wider uppercase py-3.5 px-6 transition-colors duration-300 disabled:opacity-50"
//                     >
//                       Back
//                     </button>

//                     <button
//                       type="button"
//                       onClick={handlePaystackPayment}
//                       disabled={isProcessing}
//                       className="flex-[2] inline-flex items-center justify-center gap-2 bg-[#0BA4DB] hover:bg-[#0993C4] text-white rounded-full font-semibold text-xs tracking-wider uppercase py-3.5 px-6 transition-colors duration-300 shadow hover:shadow-md disabled:opacity-75"
//                     >
//                       {isProcessing ? (
//                         <>
//                           <Loader2 className="w-3.5 h-3.5 animate-spin" />
//                           <span>Processing...</span>
//                         </>
//                       ) : (
//                         <>
//                           <CreditCard className="w-3.5 h-3.5" />
//                           <span>
//                             Pay {feeUsd} USD
//                           </span>
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </motion.div>
//               )}

//               {step === "confirmed" && (
//                 <motion.div
//                   key="confirmed"
//                   initial={{
//                     opacity: 0,
//                     scale: 0.85,
//                     rotate: -8,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     scale: 1,
//                     rotate: -2,
//                   }}
//                   transition={{
//                     duration: 0.6,
//                     type: "spring",
//                     bounce: 0.4,
//                   }}
//                   className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-white border border-neutral-900 rounded-2xl shadow-xl my-auto"
//                 >
//                   <div className="w-14 h-14 rounded-full bg-[#5D1F17] flex items-center justify-center mb-6 shadow-md">
//                     <Check
//                       className="w-6 h-6 text-white"
//                       strokeWidth={2.5}
//                     />
//                   </div>

//                   <h3 className="text-xl sm:text-2xl font-light tracking-tight text-neutral-900 uppercase mb-2">
//                     SESSION CONFIRMED
//                   </h3>

//                   <p className="text-xs text-neutral-500 leading-relaxed max-w-xs mb-1">
//                     Your 1-on-1 strategy session with{" "}
//                     <span className="font-semibold text-neutral-900">
//                       Bimpe Mohammed
//                     </span>{" "}
//                     is booked for
//                   </p>

//                   <p className="text-sm font-semibold text-[#5D1F17] mb-4">
//                     {selectedDateLabel} at{" "}
//                     {selectedTime}
//                   </p>

//                   {paymentReference && (
//                     <p className="text-[10px] font-mono text-neutral-500 bg-neutral-100 px-3 py-1 border border-neutral-200 rounded-full mb-6">
//                       REF: {paymentReference}
//                     </p>
//                   )}

//                   <p className="text-[11px] text-neutral-600 leading-relaxed max-w-xs">
//                     A confirmation email along with
//                     your private{" "}
//                     <span className="font-semibold text-neutral-900">
//                       Google Meet link
//                     </span>{" "}
//                     has been sent to{" "}
//                     <span className="font-semibold text-neutral-900">
//                       {form.email}
//                     </span>
//                     . We look forward to meeting with
//                     you,{" "}
//                     {form.name.split(" ")[0]}.
//                   </p>
//                 </motion.div>
//               )}

//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, X } from "lucide-react";
import {
  FaBehance,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import authorImage from "../assets/BIMPE-3.jpg";

const BOOK_ROUTE = "/book-a-session";

/* ------------------------------ design tokens ------------------------------ */

const BURG = "text-[#5D1F17]";
const LABEL =
  "text-[11px] font-bold uppercase tracking-widest text-neutral-400";
const BODY_TEXT =
  "text-sm sm:text-base leading-relaxed text-neutral-700 font-normal";

const HEADING_BASE =
  "font-semibold sm:font-light font-sans uppercase tracking-tight text-neutral-900";
const H1 = `text-3xl sm:text-5xl lg:text-[68px] leading-none ${HEADING_BASE}`;
const H2 = `text-3xl sm:text-4xl lg:text-[52px] leading-[1.05] ${HEADING_BASE}`;

/* --------------------------------- content --------------------------------- */

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/itsbnm",
    Icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/adebimpe-mohammed-a60087150?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    Icon: FaLinkedinIn,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@itsbnm?si=mBHHSArnISwQYZx_",
    Icon: FaYoutube,
  },
  {
    label: "Behance",
    href: "https://www.behance.net/adebimpmohamme",
    Icon: FaBehance,
  },
];

const whoFor = [
  {
    title: "You know what to do, but you don't have the support to execute.",
    body: "The vision is clear. What's missing is a strategist beside you who turns it into a plan, then into action.",
  },
  {
    title:
      "You don't know exactly what you want, but you know you want to achieve something.",
    body: "You feel the pull toward something bigger. We find the shape of it together.",
  },
  {
    title: "You have too many ideas and no roadmap.",
    body: "Everything feels equally important, so nothing moves. You need someone to hold your hand and bring those ideas and visions off the page and into execution.",
  },
  {
    title: "You're underplaying yourself.",
    body: "You've been quietly underselling your capabilities, your gifts and your worth. It's time to be positioned at the level you actually operate.",
  },
  {
    title: "You're conflicted about what to prioritize.",
    body: "Which gift, which offer, which part of the business comes first? Clarity on that one question can change what you do next.",
  },
];

const reasons = [
  {
    title: "Credibility is decided before you speak.",
    body: "People form a view of you from your page, your name, your message and your presence, long before a call or a sale. A founder whose brand is clear gets trusted faster. A founder whose brand is blurry gets questioned, compared and discounted, no matter how good the work is.",
  },
  {
    title: "Loyalty comes from clarity, not noise.",
    body: "More posting won't create loyal customers. Knowing exactly who you're for, what you stand for and why you're different will. People stay with brands they understand and believe in.",
  },
  {
    title: "Your brand is an asset, not an expense.",
    body: "Your reputation and brand equity compound. Every partnership, invitation, referral, premium client and opportunity that finds you comes through how you're perceived. A personal brand done right makes you attractive to opportunities you haven't even applied for yet.",
  },
  {
    title: "Profit follows positioning.",
    body: "When people can't see your value, they negotiate your price. When they can, they pay it. Positioning is the difference between a founder who has to convince people and one they come looking for, whether the profit is yours as an individual or your business's.",
  },
  {
    title: "You can't read the label from inside the bottle.",
    body: "You're too close to your own brand. An outside strategist sees the blind spots, the contradictions and the buried strengths you've stopped noticing. After more than ten years and over 500 brands, I know where founders lose credibility and where they leave money on the table.",
  },
  {
    title: "Guessing is the most expensive option.",
    body: "The wrong brand direction costs months, money and momentum, and the wrong audience costs you the customers who would have stayed. One focused hour to get it right is $100.",
  },
];

const picture = [
  [
    "Credibility",
    "People hesitate, compare and ask for discounts",
    "People trust you quickly and know what you stand for",
  ],
  [
    "Customers",
    "You keep chasing new ones",
    "The right ones come, and stay",
  ],
  [
    "Opportunities",
    "You watch others get the invitations",
    "Partnerships, referrals and invitations find you",
  ],
  ["Profit", "You compete on price", "You're paid for the value you bring"],
];

const beforeAfter = [
  ["Conflicted", "Clarity"],
  ["Confused", "A clear direction"],
  ["Overwhelmed", "A sense of purpose"],
  ["Not knowing how to monetize my ideas", "1,000 ways to monetize them"],
];

const steps = [
  {
    lead: "Untangle.",
    text: "We lay out the ideas, goals and doubts in your head and sort what matters from what's noise.",
  },
  {
    lead: "Get clear.",
    text: "We define what you want to be known for, who you're here to serve and where you stand out.",
  },
  {
    lead: "Prioritize.",
    text: "We decide which gift, offer or part of the business leads, and what waits.",
  },
  {
    lead: "Monetize.",
    text: "We map the ways your ideas can earn, so your brand is built to pay you, not just to look good.",
  },
  {
    lead: "Move.",
    text: "We turn all of it into a practical roadmap with the first steps you can take today.",
  },
];

const offerItems = [
  "A private one-on-one brand strategy session with me",
  "Preparation on my side before we meet, based on your brand and your challenges",
  "Real strategies you can apply the same day",
  "A clear direction, priorities and a practical path to execution",
];

const notFor = [
  "You're curious about branding but not ready to act on it",
  "You want someone to hand you a finished brand without any input from you",
  "You're looking for motivation instead of a plan",
  "You're not willing to be honest about where your brand is right now",
];

const faqs = [
  {
    question: "Who is this session for?",
    answer:
      "Founders, business owners, professionals and creatives, with a personal brand or a business brand, who are ready to take their branding seriously, from first idea to execution.",
  },
  {
    question: "I don't know exactly what I want yet. Can I still book?",
    answer:
      "Yes. Many people come in knowing only that they want to achieve something. Clarity is what the session is for.",
  },
  {
    question: "I have too many ideas. Will you help me choose?",
    answer:
      "Yes. We sort, prioritize and turn the ideas that matter into a roadmap.",
  },
  {
    question: "Is this just motivation?",
    answer: "No. It's strategy you can apply today.",
  },
  {
    question: "Can you help me figure out how to monetize my idea?",
    answer:
      "Yes. Monetization is a core part of the conversation, so your brand is built to earn.",
  },
  {
    question: "Do I need an existing brand or business?",
    answer:
      "No. We work with personal brands, business brands, and ideas that are still on paper.",
  },
  {
    question: "How long is a session and how much does it cost?",
    answer:
      "Sessions are $100 per hour. [Add standard session length and any longer options.]",
  },
  {
    question: "How do I book and what happens after I pay?",
    answer: "[Booking steps, intake form, meeting link, timing.]",
  },
  {
    question: "What if I need to reschedule?",
    answer: "[Reschedule or refund policy.]",
  },
];

/* ------------------------------ building blocks ------------------------------ */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Section({
  id,
  dark = false,
  children,
}: {
  id?: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`w-full border-b font-sans ${
        dark
          ? "border-[#4A1812] bg-[#5D1F17] text-white"
          : "border-neutral-200 bg-white text-neutral-900"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-12 sm:py-28 lg:px-20">
        {children}
      </div>
    </section>
  );
}

function Accent({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <span className={`font-sans font-semibold ${dark ? "text-white" : BURG}`}>
      {children}
    </span>
  );
}

function SectionHead({
  title,
  intro,
  dark = false,
}: {
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
}) {
  return (
    <Reveal className="mb-12 grid grid-cols-1 items-end gap-6 sm:mb-16 md:grid-cols-12 lg:gap-12">
      <h2
        className={`${H2} ${dark ? "!text-white" : ""} ${
          intro ? "md:col-span-7" : "md:col-span-10"
        }`}
      >
        {title}
      </h2>

      {intro && (
        <div
          className={`space-y-4 text-sm leading-relaxed ${
            dark ? "text-white/75" : "text-neutral-700"
          } md:col-span-5`}
        >
          {intro}
        </div>
      )}
    </Reveal>
  );
}

const BTN_BASE =
  "box-border inline-flex max-w-full items-center justify-center gap-2 whitespace-normal break-words rounded-full px-5 py-3.5 text-center text-[11px] font-semibold uppercase leading-snug tracking-wide shadow transition-all duration-300 hover:shadow-md sm:px-6 sm:text-xs sm:tracking-wider sm:whitespace-nowrap";

const BTN_PRIMARY = "bg-[#5D1F17] text-white hover:bg-[#4A1812]";
const BTN_ON_DARK = "bg-white text-[#5D1F17] hover:bg-neutral-100";

function BookButton({
  children,
  className = "",
  onDark = false,
}: {
  children: ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      to={BOOK_ROUTE}
      className={`${BTN_BASE} ${
        onDark ? BTN_ON_DARK : BTN_PRIMARY
      } ${className}`}
    >
      <span className="min-w-0 flex-1">{children}</span>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
    </Link>
  );
}

function CenteredHead({
  title,
  children,
}: {
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-4xl text-center sm:mb-16">
      <h2 className={`${H2} text-balance`}>{title}</h2>

      {children && (
        <div className="mx-auto mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-neutral-700 sm:text-base">
          {children}
        </div>
      )}
    </Reveal>
  );
}

function Tick({
  tone = "burgundy",
  className = "",
}: {
  tone?: "burgundy" | "green";
  className?: string;
}) {
  const c =
    tone === "green"
      ? "border-[#5E9A47]/60 bg-[#8DBB77]/20 text-[#3F7A2A] shadow-[0_0_10px_rgba(94,154,71,0.45)]"
      : "border-[#5D1F17]/50 bg-[#5D1F17]/10 text-[#5D1F17] shadow-[0_0_10px_rgba(93,31,23,0.35)]";

  return (
    <span
      className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${c} ${className}`}
    >
      <Check strokeWidth={3} className="h-3.5 w-3.5" />
    </span>
  );
}

function Cross({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center text-[#5D1F17] ${className}`}
    >
      <X
        strokeWidth={3}
        className="h-6 w-6 drop-shadow-[0_0_8px_rgba(93,31,23,0.8)]"
      />
    </span>
  );
}

function GlassBar({ delay = 0 }: { delay?: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative h-[3px] w-full rounded-full bg-black/10 backdrop-blur-md">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{
          duration: reduceMotion ? 0 : 1.4,
          delay: reduceMotion ? 0 : delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative h-full rounded-full bg-gradient-to-r from-[#8DBB77]/30 to-[#8DBB77] shadow-[0_0_12px_rgba(141,187,119,0.9)]"
      >
        <span className="absolute -right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#8DBB77] shadow-[0_0_14px_rgba(94,154,71,1)]" />
      </motion.div>
    </div>
  );
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-t border-zinc-200">
      {faqs.map((faq, index) => {
        const open = openIndex === index;

        return (
          <div
            key={faq.question}
            className="border-b border-zinc-200 py-5 sm:py-6"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              className="group flex min-h-11 w-full items-center justify-between gap-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5D1F17]"
            >
              <span
                className={`text-sm font-semibold transition-colors duration-300 group-hover:text-[#5D1F17] sm:text-base ${
                  open ? BURG : "text-neutral-900"
                }`}
              >
                {faq.question}
              </span>

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-neutral-500 transition-colors duration-300 group-hover:border-[#5D1F17] group-hover:text-[#5D1F17]">
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pt-3 text-sm leading-relaxed text-neutral-600">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function ConsultationSalesPage() {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-white font-sans text-neutral-900 selection:bg-[#5D1F17] selection:text-white">
      {/* HERO — clean white background, no red glow */}
      <section className="relative w-full overflow-hidden border-b border-neutral-200 bg-white">
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pb-20 pt-20 text-center sm:px-12 sm:pb-28 sm:pt-28 lg:pt-36">
          <Reveal>
            <p
              className={`mx-auto mb-6 mt-8 max-w-2xl text-xs font-semibold leading-relaxed sm:mt-12 sm:text-sm ${BURG}`}
            >
              One-on-one brand strategy for anyone that believes their brand is
              worth it, with Adebimpe Mohammed, The Brand Strategist
            </p>

            <h1 className={`${H1} text-balance`}>
              Make your brand credible before you speak.{" "}
              <Accent>Profitable after you do.</Accent>
            </h1>
          </Reveal>

          <Reveal delay={0.1} className="mx-auto mt-10 max-w-2xl space-y-5">
            <p className={BODY_TEXT}>
              Your brand can do so much more, you just don’t know it yet. Or
              maybe you do, but you are not sure of the next steps to take. Sit
              with me for 60minutes and I’d show you how valuable your brand is.
            </p>

            <p className={BODY_TEXT}>
              You're building something real. But if people can't see how
              credible you are, they hesitate, compare you on price and give
              their loyalty elsewhere. In one private session, I help you build
              a brand that earns trust, attracts opportunities and turns your
              reputation into profit, for you or your business.
            </p>

            <p className="text-sm font-semibold leading-relaxed text-neutral-900 sm:text-base">
              Ten-plus years of experience. Over 500 brands. Strategies you can
              use today.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-14 w-full">
            <p className={`${LABEL} mb-8`}>What this session builds:</p>

            <p className="flex flex-nowrap items-center justify-center gap-x-2.5 whitespace-nowrap text-[13px] font-bold tracking-normal text-neutral-900 min-[400px]:gap-x-3 min-[400px]:text-base sm:gap-x-8 sm:text-3xl sm:tracking-wide">
              <span>CREDIBILITY</span>
              <span>LOYALTY</span>
              <span className="flex items-center gap-x-2.5 min-[400px]:gap-x-3 sm:gap-x-8">
                <span className={BURG}>&amp;</span>
                <span>PROFIT</span>
              </span>
            </p>
          </Reveal>

          <div className="mt-12 flex w-full flex-col items-center gap-4">
            <BookButton className="w-full max-w-[22rem] sm:w-fit">
              Book Your Session · $100/hour
            </BookButton>

            <p className="max-w-md text-xs leading-5 text-neutral-500">
              Live on Zoom. Click the button, pick your date and time, and book.
            </p>
          </div>

          <p className="mx-auto mt-14 max-w-2xl text-base font-medium leading-relaxed text-neutral-900 sm:text-lg">
            This is for founders who are serious about their brand. If you're
            ready to make moves, read on.
          </p>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <Section>
        <CenteredHead
          title={
            <>
              Sound familiar? <Accent>This session was built for you.</Accent>
            </>
          }
        >
          <p>
            Whether it's a personal brand or a business brand, you're ready to
            be seen properly and to take your branding seriously. You may be a
            founder who has struggled with your brand before, or someone just
            starting who is particular about getting it right.
          </p>
        </CenteredHead>

        <div className="relative mx-auto max-w-5xl">
          <div className="pointer-events-none absolute bottom-0 left-5 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#5D1F17]/40 to-transparent md:left-1/2" />

          <div className="space-y-8 md:space-y-10">
            {whoFor.map((item, i) => {
              const right = i % 2 === 1;

              return (
                <Reveal
                  key={item.title}
                  delay={i * 0.04}
                  className="relative pl-14 md:grid md:grid-cols-2 md:gap-20 md:pl-0"
                >
                  <span className="absolute left-5 top-7 -translate-x-1/2 rounded-full bg-white md:left-1/2">
                    <Tick />
                  </span>

                  <div
                    className={`group rounded-3xl bg-gradient-to-b from-white to-neutral-50 p-6 text-left shadow-[0_10px_40px_rgba(93,31,23,0.07)] ring-1 ring-[#5D1F17]/10 transition duration-300 hover:shadow-[0_16px_50px_rgba(93,31,23,0.15)] sm:p-8 ${
                      right ? "md:col-start-2" : "md:col-start-1 md:text-right"
                    }`}
                  >
                    <h3 className="text-base font-semibold leading-snug text-neutral-900 transition-colors duration-300 group-hover:text-[#5D1F17] sm:text-lg">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <p className="mx-auto mt-16 max-w-3xl text-center text-xl font-light leading-snug text-neutral-900 sm:text-3xl">
          If you're ready to make moves that move the needle,{" "}
          <Accent>you're in the right place.</Accent>
        </p>
      </Section>

      {/* WHY SIT DOWN WITH ME */}
      <Section>
        <SectionHead
          title={
            <>
              Your brand is either building your credibility{" "}
              <Accent>or quietly spending it.</Accent>
            </>
          }
          intro={
            <>
              <p>
                As a founder, two things decide how far you go: whether people
                trust you, and whether what you build pays. Credibility and
                profitability. They look like separate goals, but they're one
                chain. Trust creates loyal customers. Loyal customers create
                revenue. And the brand holding all of it together is either
                clear or it isn't.
              </p>
              <p className="font-semibold text-neutral-900">
                That's why this one hour matters.
              </p>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 shadow-sm md:grid-cols-2">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="group bg-white p-6 transition-colors duration-300 hover:bg-neutral-50 sm:p-10"
            >
              <h3 className="text-lg font-semibold leading-snug tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-[#5D1F17] sm:text-xl">
                {r.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* PICTURE IT — subtle green background glow */}
      <Section>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-6 -inset-y-10 -z-10 bg-[radial-gradient(ellipse_at_50%_35%,rgba(141,187,119,0.20)_0%,rgba(141,187,119,0.08)_38%,transparent_72%)] blur-2xl sm:-inset-x-12"
          />

          <CenteredHead
            title={
              <>
                Picture it. <Accent>Twelve months from now:</Accent>
              </>
            }
          />

          <div className="relative mx-auto max-w-5xl">
            <div className="relative hidden grid-cols-[1fr_3.5rem_1fr] gap-3 pb-6 text-center md:grid">
              <span className={LABEL}>Still guessing</span>
              <span />
              <span className={`${LABEL} !text-[#3F7A2A]`}>
                With a clear brand strategy
              </span>
            </div>

            <div className="relative space-y-9">
              {picture.map(([label, bad, good], i) => (
                <Reveal key={label} delay={i * 0.05}>
                  <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-[#5D1F17]">
                    {label}
                  </p>

                  <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[1fr_3.5rem_1fr]">
                    <div className="rounded-2xl bg-neutral-100/70 p-5 text-center text-sm leading-6 text-neutral-400">
                      <span className={`${LABEL} mb-1 block md:hidden`}>
                        Still guessing
                      </span>
                      {bad}
                    </div>

                    <span className="mx-auto flex h-10 w-10 rotate-90 items-center justify-center rounded-full border border-[#5E9A47]/60 bg-[#8DBB77]/20 text-[#3F7A2A] md:rotate-0">
                      <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                    </span>

                    <div className="rounded-2xl border border-[#8DBB77]/50 bg-white p-5 text-center text-sm font-medium leading-6 text-neutral-900 md:shadow-none">
                      <span
                        className={`${LABEL} mb-1 block !text-[#3F7A2A] md:hidden`}
                      >
                        With a clear brand strategy
                      </span>
                      {good}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center gap-8 text-center">
            <p className="max-w-3xl text-xl font-light leading-snug text-neutral-900 sm:text-3xl">
              The question isn't whether you can afford one hour.{" "}
              <Accent>
                It's what another year of guessing is costing you.
              </Accent>
            </p>

            <BookButton className="w-full max-w-[22rem] sm:w-fit">
              Book Your Session · $100/hour
            </BookButton>
          </div>
        </div>
      </Section>

      {/* BEFORE AND AFTER — subtle green background glow */}
      <Section>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-6 -inset-y-10 -z-10 bg-[radial-gradient(ellipse_at_50%_40%,rgba(141,187,119,0.20)_0%,rgba(141,187,119,0.08)_38%,transparent_72%)] blur-2xl sm:-inset-x-12"
          />

          <CenteredHead
            title={
              <>
                One session.{" "}
                <Accent>A completely different place to stand.</Accent>
              </>
            }
          />

          <div className="mx-auto max-w-4xl">
            <div className="hidden grid-cols-[1fr_7rem_1fr] gap-3 px-6 pb-4 sm:grid">
              <span className={`${LABEL} text-right`}>You come in</span>
              <span />
              <span className={`${LABEL} !text-[#3F7A2A]`}>You leave with</span>
            </div>

            <div className="space-y-4">
              {beforeAfter.map(([a, b], i) => (
                <Reveal key={a} delay={i * 0.06}>
                  <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-neutral-200 sm:grid sm:grid-cols-[1fr_7rem_1fr] sm:gap-3 sm:p-6 sm:text-left">
                    <div className="sm:text-right">
                      <span className={`${LABEL} mb-1 block sm:hidden`}>
                        You come in
                      </span>
                      <p className="text-base leading-snug text-neutral-400 sm:text-lg sm:leading-6">
                        {a}
                      </p>
                    </div>

                    <div className="w-1/2 max-w-[10rem] sm:w-full sm:max-w-none">
                      <GlassBar delay={0.3 + i * 0.15} />
                    </div>

                    <div>
                      <span
                        className={`${LABEL} mb-1 block !text-[#3F7A2A] sm:hidden`}
                      >
                        You leave with
                      </span>
                      <p className="flex items-center justify-center gap-3 text-base font-semibold leading-snug text-neutral-900 sm:justify-start sm:text-lg sm:leading-6">
                        <Tick tone="green" className="hidden sm:inline-flex" />
                        <span>{b}</span>
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <p className="mx-auto mt-14 max-w-3xl text-center text-xl font-light leading-snug text-neutral-900 sm:text-3xl">
            And you don't leave with theory.{" "}
            <Accent>
              You leave knowing what to do first, what to do next, and what to
              stop doing.
            </Accent>
          </p>
        </div>
      </Section>

      {/* WHAT HAPPENS */}
      <Section>
        <SectionHead
          title={
            <>
              From ideation to execution,{" "}
              <Accent>in one focused conversation.</Accent>
            </>
          }
          intro={
            <p>
              I don't show up cold. Before we meet, I learn about you, your brand
              and the challenges you're facing, so we spend your time on
              strategy, not introductions.
            </p>
          }
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 shadow-sm sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <div
              key={step.lead}
              className="group bg-white p-6 transition-colors duration-300 hover:bg-neutral-50 sm:p-8"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5D1F17] text-sm font-bold text-white">
                {i + 1}
              </span>

              <p className="mt-6 text-lg font-semibold uppercase tracking-tight text-[#5D1F17]">
                {step.lead}
              </p>

              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex w-full justify-center">
          <BookButton className="w-full max-w-[22rem] sm:mx-auto sm:w-fit">
            Book Your Session · $100/hour
          </BookButton>
        </div>
      </Section>

      {/* NOT ANOTHER MOTIVATIONAL SESSION */}
      <Section dark>
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12 lg:gap-12">
          <Reveal className="md:col-span-7">
            <h2 className={`${H2} !text-white`}>
              You've been inspired enough.{" "}
              <Accent dark>Now you need a plan.</Accent>
            </h2>
          </Reveal>

          <Reveal
            delay={0.1}
            className="space-y-4 text-sm leading-relaxed text-white/75 md:col-span-5"
          >
            <p>
              This isn't a pep talk and it isn't theory. We deal with real-life,
              applicable strategies that you can begin to apply today.
            </p>

            <p>
              You won't leave feeling fired up for a weekend and stuck by
              Monday. You'll leave knowing your direction, your priorities and
              your next move.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14 border-t border-white/25 pt-10">
          <blockquote className="text-3xl font-semibold uppercase leading-none tracking-tight sm:text-5xl sm:font-light lg:text-[68px]">
            Inspiration feels good.{" "}
            <span className="font-semibold">Strategy gets you paid.</span>
          </blockquote>
        </Reveal>
      </Section>

      {/* WHY WORK WITH ME */}
      <Section>
        <SectionHead
          title={
            <>
              You're not getting advice from a theorist.{" "}
              <Accent>
                You're getting a decade of pattern recognition.
              </Accent>
            </>
          }
        />

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 shadow-sm lg:col-span-5 lg:max-w-none">
            <img
              src={authorImage}
              alt="Adebimpe Mohammed"
              className="aspect-[4/5] w-full object-cover"
            />
          </Reveal>

          <Reveal
            delay={0.1}
            className={`space-y-5 lg:col-span-7 ${BODY_TEXT}`}
          >
            <p>
              I'm Adebimpe Mohammed, a brand strategist and founder of BNM Brand
              House. I've spent more than ten years in branding and have handled
              branding for over 500 companies and individuals.
            </p>

            <p>
              That work has taken me across continents and countries, [add
              specifics: regions, industries, types of clients]. I bring all of
              that exposure into your session, so you're not guessing. You're
              benefiting from what's worked, what hasn't and what's coming.
            </p>

            <p>
              I also know how much positioning changes what people are willing
              to pay. In my own industry I charge $2,000 for work others sell
              for $100, and I attract high-paying clients, because of how I
              present and package what I do.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* OFFER */}
      <Section id="offer">
        <CenteredHead
          title={
            <>
              One hour. One strategist.{" "}
              <Accent>A clear way forward.</Accent>
            </>
          }
        />

        <div className="mx-auto max-w-3xl">
          <Reveal className="rounded-[2rem] border border-neutral-200 bg-white p-6 text-center shadow-sm sm:p-12">
            <p className={`${LABEL} mb-8`}>What you get:</p>

            <div className="mx-auto grid max-w-2xl gap-5 text-left sm:grid-cols-2 sm:gap-x-8">
              {offerItems.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-neutral-700"
                >
                  <Tick tone="green" className="mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mx-auto my-10 h-px w-28 bg-neutral-200" />

            <p className={`text-xl font-light tracking-tight sm:text-2xl ${BURG}`}>
              $100 per hour
            </p>

            <div className="mt-8 flex flex-col items-center gap-4">
              <BookButton className="w-full max-w-[22rem] sm:w-fit">
                Book Your Session · $100/hour
              </BookButton>

              <p className="max-w-md text-xs leading-5 text-neutral-500">
                Live on Zoom. Click the button, pick your date and time, and
                book.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* WHO THIS IS NOT FOR */}
      <Section>
        <CenteredHead
          title={
            <>
              Please don't book <Accent>if this sounds like you.</Accent>
            </>
          }
        />

        <div className="relative mx-auto max-w-4xl">
          <div className="relative mx-auto flex max-w-xl flex-col gap-6">
            {notFor.map((item, i) => (
              <Reveal key={item} delay={i * 0.06}>
                <div className="flex items-center gap-5 text-left text-base leading-6 text-neutral-700 sm:text-lg">
                  <Cross className="h-8 w-8" />
                  <span>{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-16 max-w-3xl text-center text-xl font-light leading-snug text-neutral-900 sm:text-3xl">
          This session is for people ready to make moves.{" "}
          <Accent>If that's you, I'd love to work with you.</Accent>
        </p>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <h2 className={H2}>
              Frequently asked <Accent>questions.</Accent>
            </h2>
          </Reveal>

          <div className="lg:col-span-8">
            <FaqAccordion />
          </div>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section dark>
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className={`${H2} !text-white`}>
            You can keep carrying it alone.{" "}
            <Accent dark>
              Or you can walk in conflicted and walk out clear.
            </Accent>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
            The ideas are already there. The gifts are already there. What's
            missing is a clear direction and someone to build the path with you.
          </p>

          <p className="mt-6 text-xl font-light sm:text-2xl">
            One hour. A clear roadmap. Your next move, starting today.
          </p>

          <div className="mt-8 flex w-full justify-center px-0 sm:px-4">
            <BookButton
              onDark
              className="w-full max-w-[22rem] justify-center px-4 py-4 text-[10px] leading-relaxed min-[375px]:text-[11px] sm:w-fit sm:max-w-full sm:px-6 sm:py-3.5 sm:text-xs"
            >
              Book Your One-on-One Session · $100/hour
            </BookButton>
          </div>

          <p className="mt-4 text-xs text-white/60">For serious people only.</p>
        </Reveal>
      </Section>

      {/* FOOTER */}
      <footer className="bg-white px-6 py-8 sm:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 text-xs text-neutral-500 sm:flex-row sm:justify-between">
          <p>© Adebimpe Mohammed · BNM Brand House</p>

          <div className="flex items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-neutral-500 transition-colors duration-300 hover:border-[#5D1F17] hover:text-[#5D1F17] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5D1F17]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* STICKY BOOKING BAR */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white/95 px-3 py-3 backdrop-blur-xl sm:px-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 sm:px-8 lg:px-16">
          <p className="min-w-0 truncate text-xs font-semibold text-neutral-900 sm:text-sm">
            One-on-One Brand Session · $100/hour
          </p>

          <Link
            to={BOOK_ROUTE}
            className={`${BTN_BASE} ${BTN_PRIMARY} shrink-0 !px-5 !py-3`}
          >
            <span>Book Now</span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
          </Link>
        </div>
      </div>

      <div className="h-[72px] bg-white" aria-hidden="true" />
    </main>
  );
}
