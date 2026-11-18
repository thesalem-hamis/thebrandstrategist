import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaBehance, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, ChevronDown, CircleHelp, Mail, User, X } from "lucide-react";
import { disablePixel, enablePixel, trackEvent } from "@/lib/metaPixel";
import { supabase } from "@/lib/supabase";
import type { BookProduct } from "@/lib/types";
import bookImage from "../assets/authentic.png";
import authorImage from "../assets/BIMPE-3.jpg";

const BTN = "bg-[#7A1F2B] text-white border border-[#C0485A]/40 hover:bg-[#8F2636]";
const BURG = "text-[#C0485A]";
const GREEN = "text-[#8DBB77]";
const BODY = "space-y-5 text-sm leading-7 text-white/65 sm:text-base sm:leading-8";

function formatPrice(p: BookProduct | null) {
  if (!p) return "—";
  const amt = p.price / 100;
  if (p.currency === "NGN") return "₦" + amt.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return "$" + amt.toFixed(2);
}

function useScrollStory(rootRef: React.RefObject<HTMLElement | null>) {
  const reduceMotion = useReducedMotion();
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reduceMotion) return;
    const SELECTOR =
      "main > section:not(:first-of-type) :is(h2,h3,h4,p,li,blockquote,img):not(article *):not(figure *), [data-reveal]";
    const items = Array.from(root.querySelectorAll<HTMLElement>(SELECTOR)).map((el) => ({
      el,
      heading: el.matches("h2,h3") || el.hasAttribute("data-heading"),
      last: -1,
    }));
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const item of items) {
        const { el, heading } = item;
        const from = vh * (heading ? 0.94 : 0.96);
        const to = vh * (heading ? 0.5 : 0.72);
        const top = el.getBoundingClientRect().top;
        const p = Math.min(1, Math.max(0, (from - top) / (from - to)));
        if (Math.abs(p - item.last) < 0.004) continue;
        item.last = p;
        if (p >= 1) {
          el.style.removeProperty("opacity");
          el.style.removeProperty("transform");
          el.style.removeProperty("mask-image");
          el.style.removeProperty("-webkit-mask-image");
          continue;
        }
        el.style.transform = `translate3d(0, ${(1 - p) * 28}px, 0)`;
        if (heading) {
          const mask = `linear-gradient(105deg, #000 ${p * 150 - 50}%, transparent ${p * 150}%)`;
          el.style.setProperty("mask-image", mask);
          el.style.setProperty("-webkit-mask-image", mask);
        } else {
          el.style.opacity = String(p);
        }
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      for (const { el } of items) {
        el.style.removeProperty("opacity");
        el.style.removeProperty("transform");
        el.style.removeProperty("mask-image");
        el.style.removeProperty("-webkit-mask-image");
      }
    };
  }, [rootRef, reduceMotion]);
}

const faqs = [
  {
    question: "Is this book only for business owners?",
    answer:
      "No. It's for entrepreneurs, graduates, creatives, career professionals and anyone who wants to be known for what they carry. Personal brands and business brands both get a full treatment.",
  },
  {
    question: "I'm not sure what my brand even is yet. Is this too advanced?",
    answer:
      'It\'s built for exactly that stage. The ZOOM Framework and the 7-Day Plan walk you from "I do a lot of things" to a clear one-sentence message.',
  },
  {
    question: "Will this help me charge more?",
    answer:
      "The book shows how clarity, presentation and positioning shape how people value you. That's what I've applied in my own work. Results depend on your offer, your market and how you apply what you learn, so no specific outcome is promised.",
  },
  {
    question: "Do I need a big following or budget?",
    answer: "No. You need honesty about who you are and the willingness to take one aligned step at a time.",
  },
  {
    question: "Can it help me rebrand after a setback or a pivot?",
    answer:
      "Yes. There's a full section on rebranding for businesses and for personal life, with a step-by-step example of rebuilding trust through consistent action.",
  },
  {
    question: "How do I get the book after I pay?",
    answer:
      "After successful Paystack payment, you'll receive confirmation and download/delivery details by email. Check spam/junk if needed. Contact support if you have trouble.",
  },
];

const chapters = [
  {
    title: "What is branding, really?",
    text: "Learn what a brand is and isn't, the three kinds of brands (personal, business and rebrand), and why you already have a brand whether you've worked on it or not.",
  },
  {
    title: "The branding dilemma.",
    text: "Spot the four traps that keep talented people invisible: identity confusion, a muffled message, going silent in transition, and an outside that doesn't match your inside.",
  },
  {
    title: "The power of branding.",
    text: "See how intentional branding helped a teacher become Head of Department, a man rebuild his credibility after a public failure, an artisan outgrow her street corner, and a fresh graduate land global opportunities.",
  },
  {
    title: "The ZOOM Framework.",
    text: "Build your brand in three levels of clarity: Zoom Out (purpose), Zoom Mid (strategy and positioning), Zoom In (visuals, voice and touchpoints). Includes a worksheet you can fill in right away.",
  },
  {
    title: "The 7-Day Branding Action Plan.",
    text: "One powerful step a day: your why, your people, your offer, your message, your tone, your visuals, and finally, showing up.",
  },
  {
    title: "Case studies of real brand builders.",
    text: "Learn from global icons and everyday people who used authenticity, vision and strategy to build brands that resonate.",
  },
];

const problems = [
  {
    n: "01",
    title: "You keep getting compared on price.",
    body: "When people can't tell what makes you different, the only thing left to compare is the number. So you drop it, and still don't always get the yes.",
  },
  {
    n: "02",
    title: "You keep explaining yourself.",
    body: '"I do a lot of things." "It depends who I\'m talking to." If you can\'t say what you do in one sentence, your audience can\'t repeat it for you, and nobody refers what they can\'t describe.',
  },
  {
    n: "03",
    title: "Your outside doesn't match your inside.",
    body: "You've done the inner work. But your page, your photos and your proposals still look like a beginner's. People judge your value by what they see before they ever experience you.",
  },
  {
    n: "04",
    title: "You keep going quiet while you figure it out.",
    body: "You're pivoting, growing or starting over, so you stop showing up until everything feels perfect. Meanwhile, your momentum slips.",
  },
  {
    n: "05",
    title: "You keep second-guessing yourself.",
    body: "After enough almost-yeses, you start to wonder if you're good enough. The problem was never your ability. It was how you were being seen.",
  },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/itsbnm", Icon: FaInstagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/adebimpe-mohammed-a60087150?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", Icon: FaLinkedinIn },
  { label: "YouTube", href: "https://youtube.com/@itsbnm?si=mBHHSArnISwQYZx_", Icon: FaYoutube },
  { label: "Behance", href: "https://www.behance.net/adebimpmohamme", Icon: FaBehance },
];

const testimonials = [
  {
    quote:
      "Building Authentic Brands is a practical, insightful guide for anyone looking to build a brand that is true to their identity and purpose. It's especially valuable for business owners and startups who need clarity, structure, and actionable steps to stand out in a crowded market. The book's frameworks and case studies make it easy to apply its lessons, whether you're just starting or looking to refresh your brand.",
    name: "Dr Kayode Ayankoya",
    place: "Microsoft",
  },
  {
    quote:
      "Your book, Building Authentic Brands is so amazing, at first, I thought it was one of those book or courses online like I mean, the average ones, but I mean this course was worth my money.Thank you for sharing real life examples that we can relate with, that was the major highlight for me. Is there a way I can connect with you personally for further guidance on building my business and personal brand? I don't mind paying for that",
    name: "Soyemi Boluwatife",
    place: "Nigeria",
  },
  {
    quote:
      "This is a very good resource, well articulated and as an individual, one gets actionable steps that they can apply. The zoom framework was the magic for me. Thank you",
    name: "Natasha Nalyaka",
    place: "Kenya",
  },
  {
    quote:
      "I found the Zoom framework for branding very practical and have begun applying it to my business. If you want to create an identity that takes you or your business forward, this book is an incredible resource.",
    name: "Klug Udumaga",
    place: "Nigeria",
  },
];

function GlowCheck({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#8DBB77]/70 bg-[#8DBB77]/15 shadow-[0_0_10px_rgba(141,187,119,0.75),0_0_26px_rgba(141,187,119,0.4)] ${className}`}
    >
      <Check strokeWidth={3} className="h-3.5 w-3.5 text-[#B6E3A0] drop-shadow-[0_0_6px_rgba(141,187,119,1)]" />
    </span>
  );
}

function GlowX({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#E0556B]/70 bg-[#E0556B]/15 shadow-[0_0_10px_rgba(224,85,107,0.8),0_0_26px_rgba(224,85,107,0.45)] ${className}`}
    >
      <X strokeWidth={3} className="h-3.5 w-3.5 text-[#FF8196] drop-shadow-[0_0_6px_rgba(255,90,115,1)]" />
    </span>
  );
}

function BookImage({ className = "", imgClassName = "" }: { className?: string; imgClassName?: string }) {
  const reduceMotion = useReducedMotion();
  const low = "0 0 24px rgba(192,72,90,0.45), 0 0 60px rgba(122,31,43,0.35), inset 0 0 18px rgba(192,72,90,0.15)";
  const high = "0 0 38px rgba(192,72,90,0.8), 0 0 100px rgba(122,31,43,0.55), inset 0 0 26px rgba(192,72,90,0.3)";
  return (
    <motion.div
      animate={reduceMotion ? { boxShadow: low } : { boxShadow: [low, high, low] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={`relative z-10 mx-auto w-fit max-w-full rounded-2xl border border-[#C0485A]/70 bg-white/[0.03] p-3 sm:p-4 ${className}`}
    >
      <img
        src={bookImage}
        alt="Building Authentic Brands book mockup"
        className={`block h-auto w-auto max-w-full rounded-lg object-contain ${imgClassName}`}
      />
    </motion.div>
  );
}

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="mb-3 rounded-2xl border border-[#1b1712]/15 bg-[#fbf7ec] p-4 shadow-[0_2px_10px_rgba(27,23,18,0.08)] sm:mb-4 sm:p-6">
      <span aria-hidden="true" className="block text-4xl font-semibold leading-none text-[#7A1F2B] sm:text-5xl">
        &ldquo;
      </span>
      <blockquote className="mt-2 text-xs leading-6 text-[#1b1712]/80 sm:text-sm sm:leading-7">{t.quote}</blockquote>
      <figcaption className="mt-4 border-t border-[#1b1712]/15 pt-3 text-xs font-semibold text-[#1b1712] sm:text-sm">
        {t.name}
        <span className="block text-[11px] font-normal text-[#7A1F2B] sm:text-xs">{t.place}</span>
      </figcaption>
    </figure>
  );
}

function TestimonialWall() {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const columns = [
    { items: [testimonials[0], testimonials[3]], dir: "normal" },
    { items: [testimonials[1], testimonials[2]], dir: "reverse" },
  ];
  return (
    <div>
      <style>{`@keyframes bab-scroll { from { transform: translateY(0); } to { transform: translateY(-33.3333%); } }`}</style>
      <div
        role="button"
        tabIndex={0}
        aria-label={paused ? "Resume scrolling testimonials" : "Pause scrolling testimonials"}
        onClick={() => setPaused((p) => !p)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setPaused((p) => !p))}
        className={`mx-auto grid h-[480px] max-w-5xl cursor-pointer grid-cols-2 gap-3 overflow-hidden sm:h-[560px] sm:gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8DBB77] ${reduceMotion ? "!overflow-y-auto" : ""}`}
      >
        {columns.map((col, i) => (
          <div key={i} className={reduceMotion ? "" : "overflow-hidden"}>
            <div
              style={
                reduceMotion
                  ? undefined
                  : { animation: `bab-scroll 55s linear infinite ${col.dir}`, animationPlayState: paused ? "paused" : "running" }
              }
            >
              {(reduceMotion ? [0] : [0, 1, 2]).map((copy) =>
                col.items.map((t) => <TestimonialCard key={`${copy}-${t.name}`} t={t} />)
              )}
            </div>
          </div>
        ))}
      </div>
      {!reduceMotion && (
        <p className="mt-4 text-center text-[11px] text-white/40">
          {paused ? "Paused. Tap to resume." : "Tap to pause."}
        </p>
      )}
    </div>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={className}>{children}</div>;
}

function Section({ id, alt = false, narrow = false, children }: { id?: string; alt?: boolean; narrow?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className={`border-b border-white/10 ${alt ? "bg-[#0d0e0e]" : ""}`}>
      <div className={`mx-auto ${narrow ? "max-w-4xl" : "max-w-7xl"} px-5 py-20 sm:px-8 sm:py-28 lg:px-12`}>{children}</div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, children }: { eyebrow?: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl text-center">
      {eyebrow && <p className={`mb-4 text-[10px] font-bold uppercase tracking-[0.24em] sm:text-xs ${GREEN}`}>{eyebrow}</p>}
      <h2 className="text-3xl font-semibold leading-[1.04] tracking-[-0.045em] text-white sm:text-4xl lg:text-6xl">{title}</h2>
      {children && <div className="mt-5 text-sm leading-7 text-white/65 sm:text-base">{children}</div>}
    </Reveal>
  );
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {faqs.map((faq, index) => {
        const open = openIndex === index;
        return (
          <div key={faq.question} className="py-5 sm:py-6">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              className="flex min-h-11 w-full items-center justify-between gap-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8DBB77]"
            >
              <span className="text-sm font-medium text-white sm:text-base">{faq.question}</span>
              <ChevronDown className={`h-4 w-4 shrink-0 text-[#8DBB77] transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pt-3 text-sm leading-7 text-white/60">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function AuthenticBrands() {
  const [product, setProduct] = useState<BookProduct | null>(null);
  const [busy, setBusy] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("book_products")
        .select("*")
        .or("title.ilike.%Building Authentic Brands%,sku.eq.brand-strategist-book")
        .eq("active", true)
        .limit(1)
        .maybeSingle();
      if (data) setProduct(data as BookProduct);
    })();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    const reference = params.get("reference");
    if (payment !== "callback" || !reference) return;
    (async () => {
      try {
        setBusy(true);
        setPaymentError(null);
        const { data, error: fnErr } = await supabase.functions.invoke("verify-payment", { body: { reference } });
        if (fnErr) throw new Error(fnErr.message || "Payment verification failed");
        if (!data?.success || !data?.paid) throw new Error(data?.message || "Payment could not be verified");
        setPaymentSuccess(true);
        setCheckoutOpen(true);
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (e) {
        setPaymentError(e instanceof Error ? e.message : "Payment verification failed");
        setCheckoutOpen(true);
        window.history.replaceState({}, document.title, window.location.pathname);
      } finally {
        setBusy(false);
      }
    })();
  }, []);

  const openCheckout = () => {
    setFormError(null);
    setPaymentError(null);
    setPaymentSuccess(false);
    setName("");
    setEmail("");
    setCheckoutOpen(true);
  };

  const handleBuyClick = () => {
    trackEvent("InitiateCheckout");
    openCheckout();
  };

  const startCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) {
      setFormError("Book not available right now.");
      return;
    }
    const n = name.trim();
    const em = email.trim();
    if (!n) {
      setFormError("Please enter your full name.");
      return;
    }
    if (!em) {
      setFormError("Please enter your email address.");
      return;
    }
    setFormError(null);
    setBusy(true);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke("initialize-payment", {
        body: {
          type: "book_order",
          client_name: n,
          client_email: em,
          client_phone: null,
          product_id: product.id,
          quantity: 1,
          callback_path: "/buildingauthenticbrands",
        },
      });
      if (fnErr) throw new Error(fnErr.message || "Unable to initialize payment");
      if (!data?.success || !data?.authorization_url) throw new Error(data?.message || "Unable to initialize payment");
      window.location.href = data.authorization_url;
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Unable to start payment");
      setBusy(false);
    }
  };

  return (
    <>
      <AuthenticBrandsPage onBuyClick={handleBuyClick} priceLabel={formatPrice(product)} busy={busy} />
      {checkoutOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111] p-6 text-white shadow-xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{paymentSuccess ? "Payment successful" : "Get the book"}</h3>
                <p className="mt-1 text-xs text-white/60">
                  {paymentSuccess
                    ? "Your payment was confirmed."
                    : "Enter your details, then you’ll go to Paystack to pay."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutOpen(false)}
                className="rounded-full p-1 text-white/60 hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {paymentSuccess ? (
              <div className="space-y-4">
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-3 text-sm text-emerald-200">
                  Payment verified. Your receipt and download/delivery details have been sent to your email.
                </div>
                <button
                  type="button"
                  onClick={() => setCheckoutOpen(false)}
                  className={`w-full rounded-full px-4 py-3 text-sm font-semibold ${BTN}`}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                {paymentError && (
                  <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                    {paymentError}
                  </div>
                )}
                {formError && (
                  <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                    {formError}
                  </div>
                )}
                <form onSubmit={startCheckout} className="space-y-4">
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-10 pr-3 text-sm text-white outline-none focus:border-[#8DBB77]"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-10 pr-3 text-sm text-white outline-none focus:border-[#8DBB77]"
                      required
                    />
                  </div>
                  <button type="submit" disabled={busy || !product} className={`w-full rounded-full px-4 py-3 text-sm font-semibold ${BTN} disabled:opacity-60`}>
                    {busy ? "Redirecting to Paystack…" : `Pay ${formatPrice(product)}`}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function AuthenticBrandsPage({ onBuyClick, priceLabel, busy }: { onBuyClick: () => void; priceLabel: string; busy: boolean }) {
  const mainRef = useRef<HTMLElement>(null);
  useScrollStory(mainRef);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    enablePixel();
    return disablePixel;
  }, []);

  return (
    <main ref={mainRef} className="min-h-screen overflow-hidden bg-[#080909] font-sans text-white selection:bg-[#7A1F2B] selection:text-white">
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(122,31,43,0.28),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-24 sm:px-8 sm:pb-28 sm:pt-36 lg:px-12 lg:pb-32">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center"
          >
            <p
              className={`mb-6 max-w-2xl text-[10px] font-semibold uppercase leading-6 tracking-[0.19em] text-[#A9D894] [text-shadow:0_0_6px_rgba(141,187,119,0.9),0_0_18px_rgba(141,187,119,0.55),0_0_36px_rgba(141,187,119,0.3)] sm:text-xs`}
            >
              For founders and professionals who are serious about being known, and paid, for what they carry.
            </p>
            <h1 className="text-balance text-[clamp(2.5rem,6.4vw,5.8rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
              Same work. <span className={BURG}>20x the price.</span> The difference is your <span className={BURG}>brand.</span>
            </h1>
            <div className="mt-10 w-full sm:mt-12">
              <BookImage imgClassName="max-h-[200px] sm:max-h-[280px]" />
            </div>
            <p className="mt-8 max-w-xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
              My clients could pay $100 elsewhere but they choose to pay me $2,000 because of the experience. It’s presentation, packaging, and
              clarity. <em>Building Authentic Brands</em> shows you how to build a brand that earns that trust without pretending to be someone
              you’re not.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={onBuyClick}
                disabled={busy}
                className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3.5 text-xs font-bold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8DBB77] sm:text-sm disabled:opacity-60 ${BTN}`}
              >
                <span>{busy ? "Loading…" : "Get the Book Now"}</span>
                {!busy && <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
              </button>
              <p className="max-w-sm text-[11px] leading-5 text-white/45">
                {priceLabel} · Instant PDF download · Includes the 7-Day Branding Action Plan
              </p>
            </div>
          </motion.div>
          <div className="mx-auto mt-14 grid max-w-xl grid-cols-3 border-t border-white/15 pt-6 text-center">
            <div className="pr-3">
              <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
                10<span className={BURG}>+</span>
              </p>
              <p className="mt-2 text-[10px] leading-4 text-white/50 sm:text-xs">years building brands</p>
            </div>
            <div className="border-l border-white/15 px-3 sm:px-5">
              <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
                500<span className={BURG}>+</span>
              </p>
              <p className="mt-2 text-[10px] leading-4 text-white/50 sm:text-xs">companies, startups and individuals empowered</p>
            </div>
            <div className="border-l border-white/15 pl-3 sm:pl-5">
              <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
                $2k<span className={BURG}> / </span>$100
              </p>
              <p className="mt-2 text-[10px] leading-4 text-white/50 sm:text-xs">the gap a brand makes</p>
            </div>
          </div>
          <div className="mx-auto mt-14 max-w-3xl border-t-2 border-[#8DBB77] pt-6 text-center">
            <p className="text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
              This book is not for people who want a quick logo. It’s for people ready to get clear, show up properly, and charge what they’re worth.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-5">
            {["You’re good at what you do, but it doesn’t always come across.", "You attract the wrong audience or get clients who only ask for discounts.", "You feel stuck and are tired of having to explain yourself."].map((text) => (
              <div key={text} className="border-t-2 border-[#8DBB77] pt-5">
                <p className="text-sm leading-7 text-white/70 sm:text-base">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <SectionIntro title="If you're tired of being overlooked or underpriced, this was written for you.">
          <p className="text-lg text-white sm:text-xl">
            You're capable, but your brand hasn't caught up to your skill. So people hesitate, compare you and move on.
          </p>
        </SectionIntro>
        <div className="mx-auto max-w-3xl divide-y divide-white/10 border-y border-white/10">
          {["You know you're good, but people don't always see it.", "You attract the wrong clients or get the same hesitant questions.", 'You keep hearing, "Can you do it for less?"', "You feel unclear about how to present yourself.", "You sense you're not being taken as seriously as you should be."].map((line) => (
            <div key={line} className="flex items-start gap-4 py-5 sm:py-6">
              <GlowX className="mt-0.5" />
              <p className="text-sm leading-7 text-white/70 sm:text-base">{line}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-4xl text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${GREEN}`}>Here's the truth</p>
          <p className="mt-4 text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
            It's not about how talented you are. It's about how <span className={BURG}>clear and confident</span> your brand feels.
          </p>
          <p className="mt-5 text-sm leading-7 text-white/55 sm:text-base">This book shows you how to fix that.</p>
        </div>
      </Section>

      <Section alt>
        <SectionIntro title={<>What happens when people <span className={BURG}>can't place</span> you.</>} />
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-4">
            {[
              { t: "They hesitate.", d: "Something feels unclear, so they pause instead of paying." },
              { t: "They compare you.", d: "If they can't see the difference, they look at the number." },
              { t: "They choose someone else.", d: "Often someone louder, not better, but clearer." },
            ].map((card) => (
              <article key={card.t} className="rounded-xl border border-[#8DBB77]/30 bg-[#8DBB77]/[0.06] p-5">
                <h3 className="text-base font-semibold text-white">{card.t}</h3>
                <p className="mt-2 text-sm leading-7 text-white/55">{card.d}</p>
              </article>
            ))}
          </div>
          <div className={BODY}>
            <p>This has nothing to do with your skill. It has everything to do with how your brand shows up.</p>
            <p>Maybe you say different things on different days. Maybe your visuals don't match the level you actually work at. Maybe you've been quiet while you figured things out, and people forgot what you stand for.</p>
            <p>When your brand is blurry, people feel it. And people don't pay for what feels unclear.</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionIntro eyebrow="Why this keeps happening" title="It's not a talent problem. It's a positioning problem." />
        <div className="mx-auto grid max-w-4xl divide-y divide-white/10">
          {problems.map((item) => (
            <Reveal key={item.n} className="grid grid-cols-[42px_1fr] gap-4 border-b border-white/10 py-6 sm:py-8">
              <span className={`pt-1 text-xs font-semibold ${GREEN}`}>{item.n}</span>
              <div>
                <h4 className="text-base font-semibold text-white sm:text-lg">{item.title}</h4>
                <p className="mt-3 text-sm leading-7 text-white/55">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center text-xl font-medium leading-relaxed tracking-tight text-white sm:text-2xl">
          You can't outgrow confusion. You have to confront it. <span className={BURG}>And you can start today.</span>
        </p>
      </Section>

      <Section alt>
        <SectionIntro title={<>Two people. Same skill. One charges $100. One charges <span className={BURG}>$2,000.</span></>} />
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="self-start rounded-2xl border border-[#8DBB77]/25 bg-[#101211] p-5 sm:p-7">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <span className="text-xs text-white/50">$100</span>
              <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/15 backdrop-blur-md">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: reduceMotion ? 0 : 2.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-white/30 to-white/90 shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                />
              </div>
              <span className={`text-xs font-semibold ${BURG}`}>$2,000</span>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "6%" }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: reduceMotion ? 0 : 1.2, ease: "easeOut" }}
                  className="h-2 rounded-full bg-white/45"
                />
              </div>
              <span className="w-28 text-[10px] text-white/40">Positioning</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: reduceMotion ? 0 : 2.2, delay: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-2 rounded-full bg-[#7A1F2B] shadow-[0_0_14px_rgba(192,72,90,0.6)]"
                />
              </div>
              <span className="w-28 text-[10px] text-white/40">Perceived value</span>
            </div>
          </div>
          <div className={BODY}>
            <p>In my industry, there are people who charge $100 and clients leave them and choose to pay me $2,000.</p>
            <p>They don’t just pay because my work is 20 times better, they also pay because of the experience that comes with working with me.</p>
            <p>
              That’s the same reason I attract high-paying clients. They don’t pay for effort. They pay for confidence, clarity and the feeling that
              they’re in the right hands. A brand creates that feeling before you say a single word.
            </p>
            <blockquote className="my-8 border-l-2 border-[#8DBB77] py-2 pl-5 text-xl font-medium leading-relaxed text-white sm:pl-7 sm:text-2xl">
              Your price is a reflection of your positioning. Change how you’re seen, and you change what you can charge.
            </blockquote>
            <p>That’s not a trick. It’s a skill. And it can be learned, step by step, without faking who you are.</p>
            <p className="font-medium text-white">That’s why I wrote this book.</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionIntro title={<>Introducing <em>Building Authentic Brands</em></>}>
          <p className="text-lg text-white sm:text-xl">How to craft a powerful, authentic brand that can change the course of your life or business.</p>
        </SectionIntro>
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="mx-auto w-full max-w-sm">
            <BookImage className="w-full" imgClassName="w-full" />
          </div>
          <div>
            <div className={BODY}>
              <p>
                This book was born from more than a decade of working with people and businesses who struggled, not because they lacked talent or
                passion, but because they lacked clarity in how they presented themselves.
              </p>
              <p>
                It gives you a clear path to discovering, building and expressing a brand that truly reflects who you are or what your business stands
                for. No fluff. No borrowed personality. No waiting until everything is perfect.
              </p>
              <p>
                Every chapter gives you insight, reflection, real examples and practical steps, so you move from confusion to clarity, and from
                clarity to being seen.
              </p>
            </div>
            <div className="mt-8 text-center lg:text-left">
              <button type="button" onClick={onBuyClick} disabled={busy} className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3.5 text-xs font-bold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8DBB77] sm:text-sm disabled:opacity-60 ${BTN}`}>
                <span>{busy ? "Loading…" : "Get the Book Now"}</span>
                {!busy && <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
              </button>
            </div>
          </div>
        </div>
      </Section>

      <Section alt>
        <SectionIntro title={<>Everything you need to go from blurry to <span className={BURG}>bold.</span></>} />
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              className="grid grid-cols-[3.5rem_1fr] items-center gap-4 sm:grid-cols-[8rem_1fr] sm:gap-8 md:col-span-2"
            >
              <motion.span
                variants={{ hidden: { opacity: 0, scale: 0.7 }, visible: { opacity: 1, scale: 1, transition: { duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] } } }}
                className={`text-center text-6xl font-semibold leading-none tracking-[-0.06em] sm:text-8xl ${BURG}`}
              >
                {index + 1}
              </motion.span>
              <motion.article
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 1 } } }}
                className="min-h-[9rem] rounded-2xl border border-[#8DBB77]/25 bg-[#101211] p-6 sm:p-8"
              >
                <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">{chapter.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">{chapter.text}</p>
              </motion.article>
            </motion.div>
          ))}
          <div className="rounded-2xl border border-[#8DBB77]/30 bg-[#8DBB77]/[0.07] p-6 text-center sm:p-8 md:col-span-2">
            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${GREEN}`}>Plus</p>
            <p className="mt-3 text-base leading-7 text-white sm:text-lg">
              reflection questions, practical next steps and a full section on rebranding for anyone starting over.
            </p>
          </div>
        </div>
        <div className="mt-10 text-center">
          <button type="button" onClick={onBuyClick} disabled={busy} className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3.5 text-xs font-bold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8DBB77] sm:text-sm disabled:opacity-60 ${BTN}`}>
            <span>{busy ? "Loading…" : "Yes, I'm Ready to Build"}</span>
            {!busy && <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
          </button>
        </div>
      </Section>

      <Section>
        <SectionIntro title="What people are saying" />
        <TestimonialWall />
      </Section>

      <Section alt>
        <SectionIntro eyebrow="About the author" title={<>Written by someone who's built brands <span className={BURG}>for over a decade.</span></>} />
        <div className="grid items-center gap-10 lg:grid-cols-[0.45fr_0.55fr] lg:gap-20">
          <Reveal className="mx-auto w-full max-w-sm lg:mx-0">
            <div className="rounded-2xl border border-[#8DBB77]/30 bg-[#101211] p-3 sm:p-4">
              <img src={authorImage} alt="Adebimpe Mohammed, author of Building Authentic Brands" className="aspect-[4/5] w-full rounded-xl object-cover object-top" />
            </div>
          </Reveal>
          <div className={BODY}>
            <p className="text-lg font-medium text-white sm:text-xl">I'm Adebimpe Mohammed, Creative Director and founder of BNM Brand House.</p>
            <p>For over 10 years, I've helped founders, creatives and professionals stop being overlooked and start being recognised, trusted and paid well for what they carry.</p>
            <p>This book is everything I've learned from doing that work, written so you can apply it to your own brand, step by step.</p>
            <p className="font-medium text-white">You already have something worth showing. Let me help you show it properly.</p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <div className="mx-auto w-full max-w-[280px] sm:max-w-xs lg:max-w-sm">
            <BookImage className="w-full" imgClassName="w-full" />
          </div>
          <div>
            <p className={`mb-4 text-[10px] font-bold uppercase tracking-[0.24em] sm:text-xs ${GREEN}`}>Get the book</p>
            <h2 className="text-3xl font-semibold leading-[1.04] tracking-[-0.045em] text-white sm:text-4xl">
              Stop waiting to feel ready. <span className={BURG}>Start today.</span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/60 sm:text-base">
              You don't need a perfect brand to start. You need clarity, honesty and the willingness to show up. Everything else can be built from there.
            </p>
            <div className="mt-6 space-y-3">
              {["The complete ZOOM Framework, step by step", "The 7-Day Branding Action Plan", "Reflection questions and practical worksheets", "Real case studies from people who rebuilt their brand", "Guidance on personal brands, business brands and rebranding"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <GlowCheck className="mt-0.5" />
                  <p className="text-sm leading-6 text-white/75">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-white/10 bg-[#101211] p-6 text-center sm:p-8">
              <div className="text-center">
                <p className={`mt-2 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl ${BURG}`}>{priceLabel}</p>
              </div>
              <div className="mt-7">
                <button type="button" onClick={onBuyClick} disabled={busy} className={`inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full px-7 py-3.5 text-xs font-bold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8DBB77] sm:text-sm disabled:opacity-60 ${BTN}`}>
                  <span>{busy ? "Loading…" : "Get the Book Now"}</span>
                  {!busy && <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                </button>
              </div>
              <p className="mt-4 text-center text-xs leading-6 text-white/45">Secure checkout powered by Paystack. Instant access after payment.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section narrow>
        <SectionIntro title="Frequently asked questions.">
          <CircleHelp className="mx-auto mb-4 h-6 w-6 text-[#8DBB77]" />
        </SectionIntro>
        <FaqAccordion />
      </Section>

      <section className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(122,31,43,0.3),transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            You can keep hoping people will see your value. Or you can <span className={BURG}>show them.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-3xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
            Your next high-paying client, your next opportunity, your next level of influence is already watching how you show up. The only question is
            what they see.
          </p>
          <p className="mt-6 text-xl font-medium text-white sm:text-2xl">You are the brand. Make it count.</p>
          <div className="mt-8">
            <button type="button" onClick={onBuyClick} disabled={busy} className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3.5 text-xs font-bold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8DBB77] sm:text-sm disabled:opacity-60 ${BTN}`}>
              <span>{busy ? "Loading…" : "Get Building Authentic Brands Now"}</span>
              {!busy && <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
            </button>
          </div>
          <p className="mt-4 text-xs text-white/45">Be known for what you carry.</p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 text-xs text-white/40 sm:flex-row sm:justify-between">
          <p>© Adebimpe Mohammed · BNM Brand House</p>
          <div className="flex items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-[#C0485A] hover:bg-[#7A1F2B] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8DBB77]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#080909]/95 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-white sm:text-sm">Building Authentic Brands</p>
            <p className="text-[10px] text-white/45">{priceLabel}</p>
          </div>
          <button
            type="button"
            onClick={onBuyClick}
            disabled={busy}
            className={`inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full px-5 py-3 text-[10px] font-bold transition sm:text-xs disabled:opacity-60 ${BTN}`}
          >
            Get the Book <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="h-[72px]" aria-hidden="true" />
    </main>
  );
}
