import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import logo from "@/assets/logo.svg";

const COMPANY_LINKS = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const RESOURCE_LINKS = [
  { label: "Free eBook", href: "#" },
  { label: "Development Tutorial", href: "#" },
  { label: "How to - Blog", href: "#" },
  { label: "Youtube Playlist", href: "#" },
];

const SOCIAL_LINKS = [
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  // { icon: FaGithub, href: "#", label: "Github" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white text-black pt-16 pb-8 px-6 sm:px-12 lg:px-20 border-t border-gray-100 font-sans">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start gap-12 lg:gap-16">
        
        {/* Left Column: Logo & Desktop Copyright */}
        <div className="flex flex-col gap-8 min-w-[200px]">
          <a href="#" className="inline-block">
            <img
              src={logo}
              alt="Brand Logo"
              className="h-20 w-auto object-contain"
            />
          </a>
          
          {/* Copyright (Hidden on Mobile, Visible on Desktop) */}
          <p className="hidden md:block text-xs text-zinc-600 font-medium">
            © {currentYear}, All Rights Reserved
          </p>
        </div>

        {/* Right Columns Container */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-12 lg:gap-16 w-full max-w-3xl">
          
          {/* Company Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-800">
              COMPANY
            </h4>
            <ul className="flex flex-col gap-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-zinc-600 hover:text-black transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-800">
              RESOURCES
            </h4>
            <ul className="flex flex-col gap-3">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-zinc-600 hover:text-black transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social Icons */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-800">
                NEWSLETTER
              </h4>
              
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-2.5 w-full max-w-xs"
              >
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL ADDRESS"
                  required
                  className="w-full bg-black text-white placeholder-zinc-400 text-[10px] tracking-wider uppercase font-medium px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                />
                <button
                  type="submit"
                  className="w-full bg-white hover:bg-zinc-50 text-black border border-black text-[10px] font-bold tracking-wider uppercase py-3 rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  SUBSCRIBE NOW
                </button>
              </form>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-5 justify-start mt-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-black hover:text-zinc-600 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Mobile-Only Bottom Copyright Bar */}
      <div className="mt-12 pt-6 border-t border-gray-100 text-center md:hidden">
        <p className="text-xs text-zinc-600 font-medium">
          © {currentYear}, All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;