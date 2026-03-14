"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  RADIO_MODEL_NAME,
  RADIO_MODEL_DESCRIPTION,
  RADIO_MODEL_FEATURES,
  RADIO_MODEL_SPECS,
  HARDWARE_PRICE,
  HARDWARE_PRICE_CENTS,
  SERVICE_PLANS,
  HARDWARE_INCLUDES_SERVICE_MONTHS,
} from "@/config/siteConfig";
import {
  Check,
  Shield,
  Lock,
  Truck,
  Star,
  ArrowRight,
  Info,
  RefreshCw,
  CheckCircle,
} from "lucide-react";
import useUser from "@/utils/useUser";

const TABS = ["Overview", "Features", "Specs"];

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const { data: user } = useUser();

  const handleBuyHardware = async () => {
    setCheckoutLoading(true);
    setCheckoutError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "hardware",
          redirectURL:
            typeof window !== "undefined"
              ? window.location.origin + "/dashboard"
              : "",
        }),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Checkout failed");
      }
      const { url } = await response.json();
      if (url) window.open(url, "_blank", "popup");
    } catch (err) {
      console.error(err);
      setCheckoutError(
        err.message || "Something went wrong. Please try again.",
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleRenew = async (plan) => {
    setCheckoutLoading(true);
    setCheckoutError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "renewal",
          planId: plan.id,
          redirectURL:
            typeof window !== "undefined"
              ? window.location.origin + "/dashboard"
              : "",
        }),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Checkout failed");
      }
      const { url } = await response.json();
      if (url) window.open(url, "_blank", "popup");
    } catch (err) {
      console.error(err);
      setCheckoutError(
        err.message || "Something went wrong. Please try again.",
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Navbar />

      {/* ── Page Header ── */}
      <div className="bg-[#020617] py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/60 text-sm mb-1">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>{" "}
            &rsaquo; Shop
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-white">
            {RADIO_MODEL_NAME}
          </h1>
          <p className="text-white/70 text-lg mt-1">
            Nationwide LTE Push-to-Talk Radio — Built to Last
          </p>
        </div>
      </div>

      {/* ── Product Section ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Image gallery */}
          <div className="sticky top-24">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg aspect-[4/3] group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-[#1e293b]">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop"
                alt={RADIO_MODEL_NAME}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="flex flex-col items-center p-3 bg-[#1e293b] rounded-xl border border-white/10 text-center">
                <Shield size={18} className="text-[#DC2626] mb-1.5" />
                <span className="text-xs font-semibold text-white">
                  Encrypted
                </span>
                <span className="text-xs text-white/50">AES-256</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-[#1e293b] rounded-xl border border-white/10 text-center">
                <Truck size={18} className="text-[#DC2626] mb-1.5" />
                <span className="text-xs font-semibold text-white">
                  Pre-Activated
                </span>
                <span className="text-xs text-white/50">Ready to use</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-[#1e293b] rounded-xl border border-white/10 text-center">
                <RefreshCw size={18} className="text-[#DC2626] mb-1.5" />
                <span className="text-xs font-semibold text-white">
                  Managed
                </span>
                <span className="text-xs text-white/50">We handle updates</span>
              </div>
            </div>
          </div>

          {/* Right: Purchase panel */}
          <div>
            {/* Tabs */}
            <div className="flex gap-1 bg-[#020617] rounded-lg p-1 mb-6 w-fit">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                    activeTab === tab
                      ? "bg-[#1e293b] text-white shadow-sm"
                      : "text-white/50 hover:text-white/70"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === "Overview" && (
              <div className="prose max-w-none mb-8">
                <p className="text-white/70 text-base leading-relaxed">
                  {RADIO_MODEL_DESCRIPTION}
                </p>
              </div>
            )}
            {activeTab === "Features" && (
              <ul className="space-y-3 mb-8">
                {RADIO_MODEL_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle
                      size={18}
                      className="text-[#DC2626] mt-0.5 flex-shrink-0"
                    />
                    <span className="text-white/70 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            )}
            {activeTab === "Specs" && (
              <div className="mb-8">
                <div className="rounded-xl border border-white/10 overflow-hidden">
                  {Object.entries(RADIO_MODEL_SPECS).map(([key, val], i) => (
                    <div
                      key={key}
                      className={`flex justify-between px-4 py-3 text-sm ${
                        i % 2 === 0 ? "bg-[#1e293b]" : "bg-[#0f172a]"
                      }`}
                    >
                      <span className="text-white/50 font-medium">{key}</span>
                      <span className="text-white font-semibold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── HARDWARE PURCHASE ── */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 mb-5 text-white border border-white/10">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-black text-xl">{RADIO_MODEL_NAME}</h3>
                  <p className="text-white/60 text-xs mt-0.5">
                    One-time hardware purchase
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black text-3xl text-white">${HARDWARE_PRICE}</p>
                  <p className="text-white/60 text-xs">+ free shipping</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 mb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Check size={14} className="text-[#DC2626]" />
                  <span className="text-white/80 text-sm">
                    Includes{" "}
                    <strong>
                      {HARDWARE_INCLUDES_SERVICE_MONTHS} full months
                    </strong>{" "}
                    of nationwide service
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Check size={14} className="text-[#DC2626]" />
                  <span className="text-white/80 text-sm">
                    Pre-activated — works out of the box
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#DC2626]" />
                  <span className="text-white/80 text-sm">
                    1-year hardware warranty
                  </span>
                </div>
              </div>

              {checkoutError && (
                <div className="bg-red-500/20 border border-red-400/30 rounded-lg px-4 py-3 mb-3 text-red-200 text-sm">
                  {checkoutError}
                </div>
              )}

              {user ? (
                <button
                  onClick={handleBuyHardware}
                  disabled={checkoutLoading}
                  className="w-full py-4 bg-[#DC2626] hover:bg-[#b91c1c] disabled:opacity-60 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  {checkoutLoading ? (
                    "Loading checkout…"
                  ) : (
                    <>
                      Order Now — Secure Checkout
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              ) : (
                <a
                  href="/account/signin?callbackUrl=/shop"
                  className="block w-full py-4 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-bold rounded-xl transition-colors text-center shadow-lg"
                >
                  Sign In to Order
                </a>
              )}
              <p className="text-white/40 text-xs text-center mt-3 flex items-center justify-center gap-1">
                <Lock size={10} />
                256-bit SSL secured checkout via Stripe
              </p>
            </div>

            {/* "Only one model" note */}
            <div className="flex items-start gap-2 p-4 bg-[#1e293b] border border-white/10 rounded-xl mb-6">
              <Info size={16} className="text-[#DC2626] mt-0.5 flex-shrink-0" />
              <p className="text-white/70 text-sm">
                <strong className="text-white">One model available now — more coming soon.</strong>{" "}
                We&rsquo;re focused on perfecting this one before we expand.
                You&rsquo;re getting our best.
              </p>
            </div>

            {/* ── SERVICE RENEWALS ── */}
            <div>
              <h3 className="text-white font-black text-xl mb-2">
                Service Renewal Plans
              </h3>
              <p className="text-white/50 text-sm mb-5">
                Already have a {RADIO_MODEL_NAME}? Renew your annual service
                below. We handle everything — you just click once.
              </p>
              <div className="space-y-4">
                {SERVICE_PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() =>
                      setSelectedPlan(selectedPlan === plan.id ? null : plan.id)
                    }
                    className={`relative rounded-2xl border-2 p-5 cursor-pointer transition-all ${
                      selectedPlan === plan.id
                        ? "border-[#DC2626] bg-[#DC2626]/10"
                        : "border-white/10 bg-[#1e293b] hover:border-white/20"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-4 px-3 py-0.5 bg-[#DC2626] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                        Most Popular
                      </span>
                    )}
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-white text-sm">
                          {plan.name}
                        </h4>
                        <p className="text-white/50 text-xs mt-0.5">
                          {plan.description}
                        </p>
                        <ul className="mt-3 space-y-1.5">
                          {plan.features.map((f) => (
                            <li
                              key={f}
                              className="flex items-center gap-2 text-xs text-white/60"
                            >
                              <Check size={12} className="text-[#DC2626]" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-black text-xl text-white">
                          ${plan.price}
                        </p>
                        <p className="text-white/40 text-xs">/{plan.period}</p>
                      </div>
                    </div>
                    {selectedPlan === plan.id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRenew(plan);
                        }}
                        disabled={checkoutLoading}
                        className="mt-4 w-full py-3 bg-[#DC2626] hover:bg-[#b91c1c] disabled:opacity-60 text-white font-bold rounded-xl transition-colors text-sm"
                      >
                        {checkoutLoading
                          ? "Loading…"
                          : "Renew Service — Secure Checkout"}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
