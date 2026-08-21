// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, ArrowUpRight } from "lucide-react";
// import logo from "@/assets/logo.svg";

// const NAV_LINKS = [
//   { label: "About", href: "#about" },
//   { label: "Services", href: "#services" },
//   { label: "Portfolio", href: "#portfolio" },
//   { label: "Resources", href: "#resources" },
// ];

// export function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <>
//       {/* Floating Centered Navbar Wrapper */}
//       <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 sm:top-6 pointer-events-none">
//         <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 rounded-2xl bg-white/15 p-1.5 backdrop-blur-xl border border-white/20 shadow-xl max-w-fit mx-auto">
          
//           {/* Logo Section */}
//           <a href="#" className="flex items-center px-3 py-1.5 transition-transform hover:scale-105">
//             <img
//               src={logo}
//               alt="Logo"
//               className="h-7 sm:h-8 w-auto object-contain brightness-0 invert"
//             />
//           </a>

//           {/* Centered White Container for Links (Desktop) */}
//           <nav className="hidden sm:flex items-center gap-6 md:gap-8 rounded-xl bg-white px-6 py-2.5 shadow-inner">
//             {NAV_LINKS.map((link) => (
//               <a
//                 key={link.label}
//                 href={link.href}
//                 className="text-xs font-semibold text-gray-800 transition-colors hover:text-black"
//               >
//                 {link.label}
//               </a>
//             ))}
//           </nav>

//           {/* Desktop CTA Button */}
//           <motion.a
//             href="#contact"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-[#5D1F17] px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-[#4A1812] transition-colors"
//           >
//             Book Consultation
//           </motion.a>

//           {/* Mobile Hamburger Toggle Button */}
//           <button
//             type="button"
//             aria-label="Toggle menu"
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md border border-white/20 sm:hidden transition-active active:scale-95"
//           >
//             <Menu className="h-5 w-5" />
//           </button>
//         </div>
//       </header>

//       {/* Mobile Full-Page Right-Slide Drawer */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md sm:hidden"
//             onClick={() => setMenuOpen(false)}
//           >
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               onClick={(e) => e.stopPropagation()}
//               className="absolute inset-y-0 right-0 flex w-full flex-col justify-between bg-[#111111] p-6 text-white shadow-2xl"
//             >
//               {/* Top Header inside Drawer */}
//               <div className="flex items-center justify-between border-b border-white/10 pb-6">
//                 <a href="#" className="flex items-center">
//                   <img
//                     src={logo}
//                     alt="Logo"
//                     className="h-10 w-auto object-contain brightness-0 invert"
//                   />
//                 </a>
//                 <button
//                   type="button"
//                   onClick={() => setMenuOpen(false)}
//                   className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white"
//                 >
//                   <X className="h-6 w-6" />
//                 </button>
//               </div>

//               {/* Navigation Links */}
//               <div className="flex flex-col gap-6 my-auto py-8">
//                 {NAV_LINKS.map((link, idx) => (
//                   <motion.a
//                     key={link.label}
//                     href={link.href}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 + idx * 0.05 }}
//                     onClick={() => setMenuOpen(false)}
//                     className="text-3xl font-light uppercase tracking-wider text-white/80 hover:text-white transition-colors"
//                   >
//                     {link.label}
//                   </motion.a>
//                 ))}
//               </div>

//               {/* Bottom CTA Button */}
//               <div className="pt-6 border-t border-white/10">
//                 <a
//                   href="#contact"
//                   onClick={() => setMenuOpen(false)}
//                   className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#5D1F17] py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl active:scale-[0.98] transition-transform"
//                 >
//                   Book A Consultation
//                   <ArrowUpRight className="h-4 w-4" />
//                 </a>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }



// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, ArrowUpRight } from "lucide-react";
// import logo from "@/assets/logo.svg";
// import blackLogo from "@/assets/black.svg";

// const NAV_LINKS = [
//   { label: "About", href: "#about" },
//   { label: "Services", href: "#services" },
//   { label: "Portfolio", href: "#portfolio" },
//   { label: "Resources", href: "#resources" },
// ];

// export function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const isScrolled = window.scrollY > 50;
//       if (isScrolled !== scrolled) {
//         setScrolled(isScrolled);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [scrolled]);

//   return (
//     <>
//       {/* Floating Centered Navbar Wrapper */}
//       <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 sm:top-6 pointer-events-none">
//         <div className={`pointer-events-auto flex items-center gap-2 sm:gap-3 rounded-2xl p-1.5 backdrop-blur-xl border shadow-xl max-w-fit mx-auto transition-all duration-300 ${
//           scrolled 
//             ? "bg-white/90 border-white/40" 
//             : "bg-white/15 border-white/20"
//         }`}>
          
//           {/* Logo Section - Much Bigger on Desktop */}
//           <a href="#" className="flex items-center px-3 py-1.5 transition-transform hover:scale-105">
//             <img
//               src={scrolled ? blackLogo : logo}
//               alt="Logo"
//               className="h-10 sm:h-10 md:h-10 w-auto object-contain transition-all duration-300"
//             />
//           </a>

//           {/* Centered White Container for Links (Desktop) */}
//           <nav className={`hidden sm:flex items-center gap-6 md:gap-8 rounded-xl px-6 py-2.5 shadow-inner transition-all duration-300 ${
//             scrolled ? "bg-white/50" : "bg-white"
//           }`}>
//             {NAV_LINKS.map((link) => (
//               <a
//                 key={link.label}
//                 href={link.href}
//                 className={`text-xs font-semibold transition-colors hover:text-black ${
//                   scrolled ? "text-gray-700" : "text-gray-800"
//                 }`}
//               >
//                 {link.label}
//               </a>
//             ))}
//           </nav>

//           {/* Desktop CTA Button */}
//           <motion.a
//             href="#contact"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className={`hidden sm:inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold shadow-md transition-colors ${
//               scrolled 
//                 ? "bg-[#5D1F17] hover:bg-[#4A1812] text-white" 
//                 : "bg-[#5D1F17] hover:bg-[#4A1812] text-white"
//             }`}
//           >
//             Book Consultation
//           </motion.a>

//           {/* Mobile Hamburger Toggle Button - Full width on mobile */}
//           <button
//             type="button"
//             aria-label="Toggle menu"
//             onClick={() => setMenuOpen(!menuOpen)}
//             className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl backdrop-blur-md border sm:hidden transition-active active:scale-95 ${
//               scrolled 
//                 ? "bg-black/10 text-black border-black/20" 
//                 : "bg-white/20 text-white border-white/20"
//             }`}
//           >
//             <Menu className="h-5 w-5" />
//           </button>
//         </div>
//       </header>

//       {/* Mobile Full-Page Right-Slide Drawer */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md sm:hidden"
//             onClick={() => setMenuOpen(false)}
//           >
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               onClick={(e) => e.stopPropagation()}
//               className="absolute inset-y-0 right-0 flex w-full flex-col justify-between bg-[#111111] p-6 text-white shadow-2xl"
//             >
//               {/* Top Header inside Drawer */}
//               <div className="flex items-center justify-between border-b border-white/10 pb-6">
//                 <a href="#" className="flex items-center">
//                   <img
//                     src={logo}
//                     alt="Logo"
//                     className="h-10 w-auto object-contain brightness-0 invert"
//                   />
//                 </a>
//                 <button
//                   type="button"
//                   onClick={() => setMenuOpen(false)}
//                   className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white"
//                 >
//                   <X className="h-6 w-6" />
//                 </button>
//               </div>

//               {/* Navigation Links */}
//               <div className="flex flex-col gap-6 my-auto py-8">
//                 {NAV_LINKS.map((link, idx) => (
//                   <motion.a
//                     key={link.label}
//                     href={link.href}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 + idx * 0.05 }}
//                     onClick={() => setMenuOpen(false)}
//                     className="text-3xl font-light uppercase tracking-wider text-white/80 hover:text-white transition-colors"
//                   >
//                     {link.label}
//                   </motion.a>
//                 ))}
//               </div>

//               {/* Bottom CTA Button */}
//               <div className="pt-6 border-t border-white/10">
//                 <a
//                   href="#contact"
//                   onClick={() => setMenuOpen(false)}
//                   className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#5D1F17] py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl active:scale-[0.98] transition-transform"
//                 >
//                   Book A Consultation
//                   <ArrowUpRight className="h-4 w-4" />
//                 </a>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import logo from "@/assets/logo.svg";
import blackLogo from "@/assets/black.svg";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Resources", href: "#resources" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <>
      {/* Navbar Wrapper - Pushed higher on desktop */}
      <header className="fixed top-2 sm:top-3 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
        <div
          className={`pointer-events-auto flex items-center justify-between sm:justify-start gap-2 sm:gap-3 w-full sm:max-w-fit transition-all duration-300 ${
            scrolled
              ? "backdrop-blur-xl border shadow-xl rounded-2xl p-1.5 sm:p-1.5 bg-white/10 border-white/20"
              : "bg-transparent border-transparent shadow-none rounded-none p-0"
          }`}
        >
          {/* Logo Section */}
          <a
            href="#"
            className="flex items-center px-3 py-1.5 transition-transform hover:scale-105"
          >
            <img
              src={scrolled ? blackLogo : logo}
              alt="Logo"
              className={`w-auto object-contain transition-all duration-300 ${
                scrolled
                  ? "h-8 sm:h-8 md:h-8"
                  : "h-16 sm:h-20 md:h-24"
              }`}
            />
          </a>

          {/* Centered White Container for Links (Desktop) */}
          <nav
            className={`hidden sm:flex items-center gap-6 md:gap-8 rounded-xl px-6 py-2.5 transition-all duration-300 ${
              scrolled
                ? "bg-white/50 shadow-inner"
                : "bg-white shadow-md"
            }`}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-xs font-semibold transition-colors hover:text-black ${
                  scrolled ? "text-gray-700" : "text-gray-800"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button (Burgundy Pill-Style) */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5D1F17] hover:bg-[#4a1812] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(93,31,23,0.4)]"
          >
            <span>BOOK A CONSULTATION</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex h-10 w-10 sm:hidden items-center justify-center transition-all duration-300 active:scale-95 ml-auto ${
              scrolled
                ? "text-black hover:text-black/70"
                : "text-white hover:text-white/70"
            }`}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Full-Page Right-Slide Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md sm:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-y-0 right-0 flex w-full flex-col justify-between bg-[#111111] p-6 text-white shadow-2xl"
            >
              {/* Top Header inside Drawer */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <a href="#" className="flex items-center">
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-10 w-auto object-contain brightness-0 invert"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-6 my-auto py-8">
                {NAV_LINKS.map((link, idx) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    onClick={() => setMenuOpen(false)}
                    className="text-3xl font-light uppercase tracking-wider text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              {/* Bottom Drawer CTA Button (Burgundy Pill-Style) */}
              <div className="pt-6 border-t border-white/10">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#5D1F17] hover:bg-[#4a1812] py-4 text-xs font-semibold uppercase tracking-wider text-white shadow-xl transition-all duration-300 active:scale-[0.98]"
                >
                  <span>BOOK A CONSULTATION</span>
                  <ArrowUpRight className="h-4 w-4" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;