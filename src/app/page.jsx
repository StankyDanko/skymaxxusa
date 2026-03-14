"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BRAND_NAME,
  RADIO_MODEL_NAME,
  HARDWARE_PRICE,
  HARDWARE_INCLUDES_SERVICE_MONTHS,
  FOUNDED_YEAR,
} from "@/config/siteConfig";
import {
  Radio,
  Lock,
  Wrench,
  RefreshCw,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Tv,
  Monitor,
} from "lucide-react";

// ── Testimonials ──────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Dale Hutchins",
    role: "Construction Site Foreman, Texas",
    quote:
      "I've tried every radio system out there. SkyMaxxUSA is the first one where someone actually picks up the phone when I call. They set me up right and stayed with me every step. That's rare these days.",
    stars: 5,
  },
  {
    name: "Gary Westbrook",
    role: "Ranch Owner, Montana",
    quote:
      "Out here cell service is a joke. These radios work when my iPhone doesn't. My boys can reach me across 10,000 acres, clear as a bell. SkyMaxxUSA has earned my loyalty.",
    stars: 5,
  },
  {
    name: "Robert 'Bobby' Sievert",
    role: "Security Company Owner, Georgia",
    quote:
      "Privacy matters in this line of work. Knowing our communications are encrypted and our data stays private — that's not a nice-to-have, it's a requirement. SkyMaxxUSA delivers.",
    stars: 5,
  },
  {
    name: "Mike Callahan",
    role: "Volunteer Fire Dept. Captain, Ohio",
    quote:
      "When emergencies happen, we can't rely on cell networks. SkyMaxxUSA got our whole crew on a secure channel in one afternoon. The renewal process? Painless. They handle it all.",
    stars: 5,
  },
];

// ── Benefits ─────────────────────────────────────────────────
const BENEFITS = [
  {
    icon: Globe,
    title: "Unlimited Nationwide Range",
    desc: "Talk coast to coast with zero dead zones. Our LTE network keeps you connected wherever you work.",
  },
  {
    icon: Lock,
    title: "Military-Grade Encryption",
    desc: "AES-256 encryption keeps every conversation private. Your words stay yours — period.",
  },
  {
    icon: Wrench,
    title: "Managed Updates & Renewals",
    desc: "We handle firmware updates and service renewals entirely. You focus on your work, we handle the tech.",
  },
  {
    icon: Zap,
    title: "Works When Cell Phones Fail",
    desc: "Dedicated PTT network — not dependent on congested cell towers. When it counts, we're there.",
  },
  {
    icon: Users,
    title: "Simple for Any Team or Family",
    desc: "No technical knowledge required. One button, clear voice. Works for a crew of 2 or 2,000.",
  },
  {
    icon: Tv,
    title: "Streaming TV Entertainment",
    desc: "Live channels, on-demand content, and reliable streaming — all from a name you already trust.",
  },
];

// ── Testimonial Carousel ──────────────────────────────────────
function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  const t = TESTIMONIALS[current];

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Active card */}
      <div className="bg-[#1e293b] rounded-2xl shadow-xl p-7 md:p-10 border border-white/10 transition-all duration-300">
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: t.stars }).map((_, i) => (
            <Star
              key={i}
              size={17}
              className="text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-white/90 text-lg md:text-xl font-medium leading-relaxed mb-5">
          &ldquo;{t.quote}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#DC2626] flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0">
            {t.name[0]}
          </div>
          <div>
            <p className="font-bold text-white text-sm">{t.name}</p>
            <p className="text-white/50 text-xs">{t.role}</p>
          </div>
          {/* Red accent line */}
          <div className="ml-auto w-8 h-0.5 bg-[#DC2626] rounded-full opacity-60" />
        </div>
      </div>

      {/* Dot indicators + arrows */}
      <div className="flex items-center justify-center gap-4 mt-5">
        <button
          onClick={prev}
          className="p-2 rounded-full border border-white/10 bg-[#1e293b] hover:bg-[#334155] text-white/70 transition-colors shadow-sm"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex gap-2 items-center">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-200 ${
                i === current
                  ? "w-5 h-2.5 bg-[#DC2626]"
                  : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-2 rounded-full border border-white/10 bg-[#1e293b] hover:bg-[#334155] text-white/70 transition-colors shadow-sm"
          aria-label="Next testimonial"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Counter */}
      <p className="text-center text-xs text-white/30 mt-3">
        {current + 1} of {TESTIMONIALS.length} reviews
      </p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <Navbar />

      {/* ────────────────────────────────────────────
          HERO
      ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #020617 0%, #0f172a 100%)" }}>
        {/* Flag-stripe top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#DC2626]" />

        {/* Radial glow orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)" }}
        />

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 lg:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-5">
                <Shield
                  size={13}
                  className="text-[#DC2626]"
                  fill="currentColor"
                />
                <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">
                  100% American Owned &amp; Operated
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
                Secure Communications &amp;{" "}
                <span className="text-[#22c55e]">Trusted</span> Entertainment
              </h1>

              <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-7">
                From nationwide encrypted push-to-talk radios to reliable streaming TV —
                SkyMaxxUSA delivers private, dependable services backed by real American support.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-bold text-base rounded-lg shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
                >
                  Explore Our Radios
                  <ArrowRight size={18} />
                </a>
                <a
                  href="/streaming"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold text-base rounded-lg hover:bg-white/5 transition-colors"
                >
                  Streaming TV Plans
                </a>
              </div>
            </div>

            {/* Right: Radio image */}
            <div className="relative flex justify-center">
              <div className="relative w-72 h-72 md:w-80 md:h-80 group">
                <div className="absolute inset-0 bg-[#DC2626]/15 rounded-full blur-3xl" />
                <div className="absolute -inset-4 bg-[#3b82f6]/10 rounded-full blur-3xl" />
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop"
                  alt={`${RADIO_MODEL_NAME} — Nationwide LTE PTT Radio`}
                  className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl border border-white/10 group-hover:-translate-y-2 group-hover:shadow-[0_32px_64px_rgba(0,0,0,0.4)] transition-all duration-500"
                />
                {/* Two Services badge */}
                <div className="absolute -bottom-4 -right-4 z-20 bg-[#1e293b] rounded-xl px-4 py-3 shadow-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Radio size={14} className="text-[#DC2626]" />
                    <Tv size={14} className="text-[#3b82f6]" />
                  </div>
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                    Two Services
                  </p>
                  <p className="text-sm font-extrabold text-white">
                    One Trusted Name
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-[#1e293b]/80 backdrop-blur-sm py-3.5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-white/70 text-sm font-medium">
            <span className="flex items-center gap-2">
              <Shield
                size={13}
                className="text-[#DC2626]"
                fill="currentColor"
              />
              100% American Owned
            </span>
            <span className="text-white/20 hidden md:block">•</span>
            <span className="flex items-center gap-2">
              <Lock size={13} className="text-[#22c55e]" />
              Privacy Guaranteed
            </span>
            <span className="text-white/20 hidden md:block">•</span>
            <span className="flex items-center gap-2">
              <Star size={13} className="text-yellow-400" fill="currentColor" />
              Superior Service Since {FOUNDED_YEAR}
            </span>
            <span className="text-white/20 hidden md:block">•</span>
            <span className="flex items-center gap-2">
              <Radio size={13} className="text-[#DC2626]" />
              Pre-Activated &amp; Ready to Use
            </span>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          BENEFITS
      ──────────────────────────────────────────── */}
      <section className="py-12 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
              Two Services. One Trusted Name.
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Secure radios for the job site. Streaming TV for the living room.
              Here&rsquo;s what sets SkyMaxxUSA apart.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="bg-[#1e293b] rounded-2xl p-5 border border-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-[#DC2626]/10 rounded-xl flex items-center justify-center mb-3">
                    <Icon size={20} className="text-[#DC2626]" />
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1.5">
                    {b.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          FEATURED PRODUCT
      ──────────────────────────────────────────── */}
      <section className="py-12 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
              One Radio. Everything You Need.
            </h2>
            <p className="text-white/50 text-lg">
              We focused on building it right the first time — more models
              coming soon.
            </p>
          </div>

          <div className="max-w-2xl mx-auto group">
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] group-hover:-translate-y-1.5 transition-all duration-400 border border-white/10">
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative min-h-[240px] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?w=600&auto=format&fit=crop"
                    alt={RADIO_MODEL_NAME}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f172a]/50" />
                </div>

                {/* Details */}
                <div className="p-7 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-[#DC2626] text-white text-xs font-bold rounded-full uppercase tracking-wider mb-3">
                      Featured Radio
                    </span>
                    <h3 className="text-white font-black text-2xl mb-2">
                      {RADIO_MODEL_NAME}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                      Nationwide LTE push-to-talk. Military-grade encrypted.
                      Ships pre-activated and ready the moment it arrives.
                    </p>
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="text-white font-black text-3xl">
                        ${HARDWARE_PRICE}
                      </span>
                      <span className="text-white/40 text-sm">one-time</span>
                    </div>
                    <p className="text-[#22c55e] font-semibold text-sm mb-5">
                      ✓ Includes {HARDWARE_INCLUDES_SERVICE_MONTHS} full months
                      of service
                    </p>
                  </div>
                  <a
                    href="/shop"
                    className="block w-full text-center px-6 py-3.5 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-bold rounded-xl transition-colors shadow-lg"
                  >
                    View Details &amp; Order
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          STREAMING TV TEASER
      ──────────────────────────────────────────── */}
      <section className="py-12 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-[#1e293b] rounded-3xl p-8 md:p-12 border border-white/10 overflow-hidden">
              {/* Blue accent glow */}
              <div
                className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)" }}
              />
              <div
                className="absolute -bottom-20 -left-20 w-[250px] h-[250px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }}
              />

              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-[#3b82f6]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Monitor size={32} className="text-[#3b82f6]" />
                </div>

                <span className="inline-block px-3 py-1 bg-[#3b82f6]/10 text-[#3b82f6] text-xs font-bold rounded-full uppercase tracking-wider mb-4">
                  New Service
                </span>

                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                  SkyMaxx Streaming TV
                </h2>

                <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto mb-6">
                  Live channels, movies, shows, and sports — delivered with the same
                  reliability and American support you expect from SkyMaxxUSA. No
                  hidden fees. No contracts. Just great entertainment.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/streaming"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold text-base rounded-lg shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Learn More
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          TESTIMONIALS
      ──────────────────────────────────────────── */}
      <section className="py-12 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
              Trusted by Real Americans
            </h2>
            <p className="text-white/50 text-lg">
              Hear from the people who depend on SkyMaxxUSA every single day.
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ────────────────────────────────────────────
          FINAL CTA
      ──────────────────────────────────────────── */}
      <section className="py-14" style={{ background: "linear-gradient(180deg, #020617 0%, #0f172a 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Shield
            size={36}
            className="text-[#DC2626] mx-auto mb-5"
            fill="currentColor"
          />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-white/60 text-lg md:text-xl mb-7 max-w-xl mx-auto">
            Whether it&rsquo;s secure radios for your team or streaming TV for your
            home — we&rsquo;ve got you covered. One company. Real support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-bold rounded-xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Explore Our Radios
              <ArrowRight size={18} />
            </a>
            <a
              href="/streaming"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-colors"
            >
              Streaming TV Plans
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
