"use client";
import { useState, useEffect } from "react";
import { Shield, ShoppingCart, Menu, X } from "lucide-react";
import { BRAND_NAME, BRAND_PARENT_URL } from "@/config/siteConfig";
import useUser from "@/utils/useUser";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: user, loading } = useUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-[#020617] border-b border-white/10 transition-shadow duration-200 ${
          scrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Parent Brand */}
            <a href="/" className="flex items-center gap-2 group">
              <Shield
                size={22}
                className="text-[#DC2626] group-hover:scale-110 transition-transform"
                fill="currentColor"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-[#DC2626] font-extrabold text-xl tracking-tight">
                  {BRAND_NAME}
                </span>
                <a
                  href={BRAND_PARENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-white/40 text-[10px] tracking-wide hover:text-white/60 transition-colors"
                >
                  A SouthernSky Company
                </a>
              </div>
            </a>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-white/90 hover:text-white font-medium text-sm rounded-md hover:bg-white/5 transition-colors duration-150"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop right side */}
            <div className="hidden md:flex items-center gap-2">
              {/* Cart */}
              <a
                href="/shop"
                className="p-2 text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                aria-label="Shop"
              >
                <ShoppingCart size={20} />
              </a>

              {/* Auth */}
              {!loading &&
                (user ? (
                  <a
                    href="/dashboard"
                    className="px-4 py-2 bg-[#DC2626] text-white font-semibold text-sm rounded-md hover:bg-[#b91c1c] transition-colors"
                  >
                    My Account
                  </a>
                ) : (
                  <a
                    href="/account/signin"
                    className="px-4 py-2 border border-white/30 text-white font-semibold text-sm rounded-md hover:bg-white/5 transition-colors"
                  >
                    Customer Login
                  </a>
                ))}
            </div>

            {/* Mobile: hamburger */}
            <div className="md:hidden flex items-center gap-1">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-white rounded-md hover:bg-white/5 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0f172a] border-t border-white/10">
            <nav className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-3 text-white/90 hover:text-white font-medium text-base rounded-md hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 space-y-2">
                {!loading && user ? (
                  <a
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center px-4 py-3 bg-[#DC2626] text-white font-bold rounded-md hover:bg-[#b91c1c] transition-colors"
                  >
                    My Account
                  </a>
                ) : (
                  <a
                    href="/account/signin"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center px-4 py-3 border border-white/30 text-white font-semibold rounded-md hover:bg-white/5 transition-colors"
                  >
                    Customer Login
                  </a>
                )}
                <a
                  href="/shop"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-4 py-3 bg-[#DC2626] text-white font-bold rounded-md hover:bg-[#b91c1c] transition-colors"
                >
                  Get Your Radio
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
