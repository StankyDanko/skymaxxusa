import { Shield } from "lucide-react";
import {
  BRAND_NAME,
  BRAND_TAGLINE,
  BRAND_PARENT,
  BRAND_PARENT_URL,
  CONTACT_PHONE,
  CONTACT_EMAIL,
  FOUNDED_YEAR,
} from "@/config/siteConfig";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] text-white">
      {/* Top divider accent */}
      <div className="h-1 bg-gradient-to-r from-[#DC2626] via-[#3b82f6] to-[#22c55e]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Column */}
          <div>
            <a href="/" className="flex items-center gap-2 mb-4 group">
              <Shield
                size={22}
                className="text-[#DC2626]"
                fill="currentColor"
              />
              <span className="text-[#DC2626] font-extrabold text-xl tracking-tight">
                {BRAND_NAME}
              </span>
            </a>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              {BRAND_TAGLINE}
            </p>
            <p className="text-white/50 text-xs mt-4">
              100% American Owned &bull; Privacy Guaranteed &bull; Superior
              Service Since {FOUNDED_YEAR}
            </p>
            <p className="text-white/40 text-xs mt-2">
              A{" "}
              <a
                href={BRAND_PARENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3b82f6] hover:text-[#60a5fa] transition-colors"
              >
                {BRAND_PARENT}
              </a>{" "}
              Company
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/dashboard"
                  className="text-white/70 hover:text-white text-sm transition-colors duration-150"
                >
                  Customer Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Reach Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded bg-white/10 text-[#DC2626] text-xs mt-0.5">
                  📞
                </span>
                <a
                  href={`tel:${CONTACT_PHONE}`}
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  {CONTACT_PHONE}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded bg-white/10 text-[#DC2626] text-xs mt-0.5">
                  ✉️
                </span>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="pt-3">
                <a
                  href="/contact"
                  className="inline-block px-5 py-2.5 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-semibold text-sm rounded-md transition-colors"
                >
                  Send a Message
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs text-center sm:text-left">
            &copy; {year} {BRAND_NAME}. All rights reserved. &mdash;{" "}
            <em>{BRAND_TAGLINE}</em>
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/40 hover:text-white/70 text-xs transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
