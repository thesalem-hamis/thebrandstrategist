import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa6";

import logo from "@/assets/logo.svg";

const COMPANY_LINKS = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

// const RESOURCE_LINKS = [
//   { label: "Brand Strategy", href: "#services" },
//   { label: "Social Media", href: "#services" },
//   { label: "Content Strategy", href: "#services" },
//   { label: "Case Studies", href: "#portfolio" },
// ];

const SOCIAL_LINKS = [
  { icon: FaXTwitter, href: "#", label: "X" },
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
];

const BURGUNDY = "#6B1F3A";

export function Footer() {
  return (
    <footer className="w-full bg-white text-black font-sans overflow-hidden">

      {/* Burgundy top accent */}
      <div
        className="h-[3px] w-full"
        style={{ backgroundColor: BURGUNDY }}
      />

      {/* =====================================================
          TOP FOOTER
      ===================================================== */}
      <div className="border-b border-black/15">
        <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr]">

          {/* =================================================
              LEFT — BRAND STATEMENT
          ================================================= */}
          <div
            className="
              min-h-[220px]
              p-6
              sm:p-8
              lg:p-10
              border-b
              md:border-b-0
              md:border-r
              border-black/15
              flex
              flex-col
              justify-between
            "
          >
            <p
              className="
                max-w-[370px]
                text-sm
                sm:text-[15px]
                leading-[1.3]
                font-medium
                tracking-[-0.02em]
              "
            >
              We build brands with clarity, strategy and
              intention — creating meaningful identities
              and social experiences that connect with
              the right audience.
            </p>

            <p className="text-xs text-black/40">
              Brand Strategy · Social Media Strategy
            </p>
          </div>

          {/* =================================================
              CENTER — EXPLORE
          ================================================= */}
          <div
            className="
              min-h-[220px]
              p-6
              sm:p-8
              lg:p-10
              border-b
              md:border-b-0
              md:border-r
              border-black/15
              flex
              flex-col
              justify-between
            "
          >
            <p className="text-xs text-black/40 lowercase">
              explore
            </p>

            <nav className="flex flex-col gap-3">
              {COMPANY_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="
                    group
                    w-fit
                    text-sm
                    font-medium
                    transition-all
                    duration-300
                    hover:translate-x-1
                  "
                >
                  <span className="transition-colors duration-300 group-hover:text-[#6B1F3A]">
                    {link.label}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* =================================================
              RIGHT — FOLLOW
          ================================================= */}
          <div
            className="
              min-h-[220px]
              p-6
              sm:p-8
              lg:p-10
              flex
              flex-col
              justify-between
            "
          >
            <p className="text-xs text-black/40 lowercase">
              follow
            </p>

            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      w-fit
                      text-sm
                      font-medium
                    "
                  >
                    <span
                      className="
                        opacity-0
                        -translate-x-2
                        transition-all
                        duration-300
                        group-hover:opacity-100
                        group-hover:translate-x-0
                      "
                      style={{ color: BURGUNDY }}
                    >
                      <Icon className="w-3 h-3" />
                    </span>

                    <span
                      className="
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                        group-hover:text-[#6B1F3A]
                      "
                    >
                      {social.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          CENTER STATEMENT
      ===================================================== */}
      <div
        className="
          relative
          px-5
          sm:px-10
          lg:px-16
          py-14
          sm:py-18
          lg:py-20
        "
      >
        <div className="max-w-[900px] mx-auto text-center">

          <h2
            className="
              text-[clamp(2rem,4.5vw,4.5rem)]
              leading-[0.88]
              tracking-[-0.065em]
              font-medium
              uppercase
              text-black/[0.075]
              select-none
            "
          >
            Building
            <br />
            Brands
            <br />
            That Matter
          </h2>

        </div>

        {/* =================================================
            LOGO + CONTACT
        ================================================= */}
        <div
          className="
            mt-14
            sm:mt-18
            flex
            flex-col
            sm:flex-row
            items-start
            sm:items-end
            justify-between
            gap-10
          "
        >

          {/* Larger Logo */}
          <a href="#" className="block">
            <img
              src={logo}
              alt="Brand Logo"
              className="
                h-20
                sm:h-24
                lg:h-28
                w-auto
                object-contain
              "
            />
          </a>

          {/* Contact */}
          <div className="text-left sm:text-right">

            <p className="text-xs text-black/40 mb-1">
              contact us
            </p>

            <a
              href="mailto:hello@example.com"
              className="
                text-xs
                sm:text-sm
                font-medium
                transition-colors
                duration-300
                hover:text-[#6B1F3A]
              "
            >
              hello@example.com
            </a>

          </div>

        </div>
      </div>

      {/* =====================================================
          BOTTOM BAR
      ===================================================== */}
      <div className="border-t border-black/15 px-6 sm:px-10 lg:px-16 py-5">

        <div
          className="
            max-w-[1600px]
            mx-auto
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-4
            text-[10px]
            uppercase
            tracking-[0.15em]
            text-black/40
          "
        >

          {/* Copyright */}
          <span>
            All Rights Reserved.
          </span>

          {/* Small service links */}
          <div className="flex gap-6">

            <a
              href="#services"
              className="
                hover:text-[#6B1F3A]
                transition-colors
                duration-300
              "
            >
              Brand Strategy
            </a>

            <a
              href="#services"
              className="
                hover:text-[#6B1F3A]
                transition-colors
                duration-300
              "
            >
              Social Media
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;