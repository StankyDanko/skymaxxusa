"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BRAND_NAME, BRAND_PARENT, BRAND_PARENT_URL, CONTACT_EMAIL } from "@/config/siteConfig";
import {
  Tv,
  Monitor,
  Zap,
  Shield,
  Users,
  Headphones,
  ArrowRight,
  Star,
  Radio,
  CheckCircle,
} from "lucide-react";

const FEATURES = [
  {
    icon: Monitor,
    title: "Live Channels",
    desc: "Hundreds of live channels including news, sports, entertainment, and local programming.",
  },
  {
    icon: Zap,
    title: "No Contracts",
    desc: "Month-to-month service with no long-term commitments. Cancel anytime, no questions asked.",
  },
  {
    icon: Shield,
    title: "Reliable Streams",
    desc: "Server-grade infrastructure ensures buffer-free viewing, even during peak hours.",
  },
  {
    icon: Users,
    title: "Whole-Home Access",
    desc: "Watch on your TV, phone, tablet, or laptop. Multiple streams for the whole family.",
  },
  {
    icon: Headphones,
    title: "Real Support",
    desc: "Call us and a real person picks up. No bots, no runaround, no overseas call centers.",
  },
  {
    icon: Star,
    title: "Personalized Packages",
    desc: "Choose the channels you actually want. We build packages around your family, not the other way around.",
  },
];

export default function StreamingPage() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <Navbar />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #020617 0%, #0f172a 100%)" }}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#3b82f6]" />

        {/* Radial glow orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 lg:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-5">
                <Tv size={13} className="text-[#3b82f6]" />
                <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">
                  Premium Streaming Television
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
                SkyMaxx{" "}
                <span className="text-[#3b82f6]">Streaming TV</span>
              </h1>

              <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-7">
                Live channels, movies, shows, and sports &mdash; delivered with the same
                reliability and American support you expect from {BRAND_NAME}. No hidden
                fees. No contracts. Just great entertainment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold text-base rounded-lg shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
                >
                  Get Started
                  <ArrowRight size={18} />
                </a>
                <a
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold text-base rounded-lg hover:bg-white/5 transition-colors"
                >
                  <Radio size={16} />
                  Explore Our Radios
                </a>
              </div>
            </div>

            {/* Right: TV visual */}
            <div className="relative flex justify-center">
              <div className="relative w-72 h-72 md:w-80 md:h-80 group">
                <div className="absolute inset-0 bg-[#3b82f6]/15 rounded-full blur-3xl" />
                <div className="absolute -inset-4 bg-[#3b82f6]/10 rounded-full blur-3xl" />
                <div className="relative z-10 w-full h-full rounded-2xl shadow-2xl border border-white/10 bg-gradient-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center group-hover:-translate-y-2 group-hover:shadow-[0_32px_64px_rgba(0,0,0,0.4)] transition-all duration-500">
                  <Monitor size={96} className="text-[#3b82f6]/60" strokeWidth={1} />
                </div>
                {/* Badge */}
                <div className="absolute -bottom-4 -right-4 z-20 bg-[#1e293b] rounded-xl px-4 py-3 shadow-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Tv size={14} className="text-[#3b82f6]" />
                    <Radio size={14} className="text-[#DC2626]" />
                  </div>
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                    A {BRAND_NAME}
                  </p>
                  <p className="text-sm font-extrabold text-white">
                    Service
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
              <CheckCircle size={13} className="text-[#22c55e]" />
              No Contracts
            </span>
            <span className="text-white/20 hidden md:block">&bull;</span>
            <span className="flex items-center gap-2">
              <CheckCircle size={13} className="text-[#22c55e]" />
              No Hidden Fees
            </span>
            <span className="text-white/20 hidden md:block">&bull;</span>
            <span className="flex items-center gap-2">
              <CheckCircle size={13} className="text-[#22c55e]" />
              Cancel Anytime
            </span>
            <span className="text-white/20 hidden md:block">&bull;</span>
            <span className="flex items-center gap-2">
              <Users size={13} className="text-[#3b82f6]" />
              Real American Support
            </span>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-12 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
              Entertainment Done Right
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Premium streaming TV backed by the same hands-on support that
              built our reputation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-[#1e293b] rounded-2xl p-5 border border-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-[#3b82f6]/10 rounded-xl flex items-center justify-center mb-3">
                    <Icon size={20} className="text-[#3b82f6]" />
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1.5">
                    {f.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-12 bg-[#0f172a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
              Getting Started Is Easy
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Choose Your Package",
                desc: "Pick the channel lineup that fits your household. Sports, news, entertainment, family — we've got options for everyone.",
              },
              {
                step: "2",
                title: "We Set You Up",
                desc: "Our team walks you through setup on your devices. TV, phone, tablet, laptop — whatever you watch on, we'll get it working.",
              },
              {
                step: "3",
                title: "Start Watching",
                desc: "That's it. No complicated installs, no hardware to buy. Just reliable streaming entertainment from a name you trust.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-5 items-start bg-[#1e293b] rounded-2xl p-6 border border-white/10"
              >
                <div className="w-10 h-10 bg-[#3b82f6] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black text-sm">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        className="py-14"
        style={{ background: "linear-gradient(180deg, #0f172a 0%, #020617 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Tv size={36} className="text-[#3b82f6] mx-auto mb-5" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Ready for better TV?
          </h2>
          <p className="text-white/60 text-lg md:text-xl mb-7 max-w-xl mx-auto">
            Real channels. Real support. No surprises on your bill.
            Get in touch and we&rsquo;ll build a package that works for your household.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold rounded-xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight size={18} />
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-colors"
            >
              Back to Home
            </a>
          </div>

          <p className="mt-8 text-white/30 text-sm">
            SkyMaxx Streaming TV is a service of{" "}
            <a href={BRAND_PARENT_URL} className="text-[#3b82f6]/60 hover:text-[#3b82f6] transition-colors">
              {BRAND_PARENT}
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
