import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import logo from "@/assets/logo.svg";

const NAV_LINKS = [
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "/services" },
  { label: "PROJECTS", href: "/projects" },
  // { label: "BLOG", href: "/blog" },
  { label: "RESOURCES", href: "/book" },
];

const REVEAL_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  const textColor = isHomePage
    ? "text-white/90 hover:text-white"
    : "text-neutral-900/90 hover:text-neutral-900";

  const handleMobileNavigate = (targetHref: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      if (targetHref.startsWith("/#")) {
        const elementId = targetHref.replace("/#", "");
        if (location.pathname === "/") {
          const el = document.getElementById(elementId);
          el?.scrollIntoView({ behavior: "smooth" });
        } else {
          navigate("/");
          setTimeout(() => {
            const el = document.getElementById(elementId);
            el?.scrollIntoView({ behavior: "smooth" });
          }, 300);
        }
      } else {
        navigate(targetHref);
      }
    }, 450);
  };

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 pointer-events-none">
        {/* ========================================================= */}
        {/* MOBILE HEADER LAYOUT (< sm screens)                       */}
        {/* ========================================================= */}
        <div className="flex sm:hidden items-center justify-between px-3 py-3 w-full pointer-events-auto">
          {/* Mobile Logo: 80px height, pushed left */}
          <Link
            to="/"
            className="flex shrink-0 items-center transition-transform duration-200 hover:scale-[1.03]"
          >
            <img
              src={logo}
              alt="The Brand Strategist"
              className="h-[80px] w-auto object-contain"
            />
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-[70] flex h-11 w-11 items-center justify-center transition-colors duration-200 hover:text-[#4a1812]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25, ease: REVEAL_EASE }}
                  className="flex items-center justify-center text-white"
                >
                  <X className="h-6 w-6" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.25, ease: REVEAL_EASE }}
                  className="flex items-center justify-center text-[#5D1F17]"
                >
                  <Menu className="h-6 w-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP HEADER LAYOUT (>= sm screens)                      */}
        {/* ========================================================= */}
        <div className="hidden sm:flex items-center justify-center py-1 px-8 pointer-events-auto">
          {/* Logo & Nav elements tightly grouped together */}
          <div className="flex items-center gap-5 md:gap-6">
            {/* Desktop Logo: Positioned closely to links */}
            <Link
              to="/"
              className="flex shrink-0 items-center transition-transform duration-200 hover:scale-[1.03]"
            >
              <img
                src={logo}
                alt="The Brand Strategist"
                className="h-[88px] md:h-[104px] w-auto object-contain"
              />
            </Link>

            {/* Links & CTA Button */}
            <div className="flex items-center gap-6 md:gap-8">
              <nav className="flex items-center gap-5 md:gap-7">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`whitespace-nowrap text-[10px] md:text-[11px] font-medium tracking-[0.04em] transition-colors duration-200 ${textColor}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <Link
                  to="/book-a-session"
                  className="flex items-center justify-center h-auto rounded-full bg-[#5D1F17] px-4 py-2 md:px-[18px] md:py-[9px] text-[10px] md:text-[11px] font-semibold tracking-[0.02em] text-white uppercase whitespace-nowrap shadow-md transition-colors duration-200 hover:bg-[#4a1812]"
                >
                  BOOK A CONSULTATION
                  <ArrowUpRight className="ml-1.5 h-3 w-3 md:h-3.5 md:w-3.5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY MENU — CIRCULAR REVEAL */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(2% at calc(100% - 38px) 38px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 38px) 38px)" }}
            exit={{ clipPath: "circle(2% at calc(100% - 38px) 38px)" }}
            transition={{ duration: 0.6, ease: REVEAL_EASE }}
            className="fixed inset-0 z-[60] flex flex-col justify-between overflow-hidden bg-[#111111] p-7 text-white sm:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
              className="flex items-center justify-between border-b border-white/10 pb-7"
            >
              <button
                type="button"
                onClick={() => handleMobileNavigate("/")}
                className="flex items-center"
              >
                <img
                  src={logo}
                  alt="The Brand Strategist"
                  className="h-16 w-auto object-contain"
                />
              </button>

              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
              >
                <X className="h-6 w-6" />
              </button>
            </motion.div>

            <div className="my-auto flex flex-col gap-7 py-12">
              {NAV_LINKS.map((link, index) => (
                <motion.button
                  key={link.label}
                  type="button"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.06, ease: "easeOut" }}
                  onClick={() => handleMobileNavigate(link.href)}
                  className="text-left text-4xl font-light uppercase tracking-wide text-white/80 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            <div className="border-t border-white/10 pt-7">
              <motion.button
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                onClick={() => handleMobileNavigate("/#contact")}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#5D1F17] py-5 text-sm font-semibold uppercase tracking-wider text-white shadow-xl transition-colors duration-200 hover:bg-[#4a1812]"
              >
                BOOK A CONSULTATION
                <ArrowUpRight className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;