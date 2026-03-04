"use client";
import { useState, useEffect } from "react";
import {
  Shield,
  Radio,
  CreditCard,
  RefreshCw,
  LogOut,
  Wrench,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import {
  BRAND_NAME,
  RADIO_MODEL_NAME,
  SERVICE_PLANS,
} from "@/config/siteConfig";
import useUser from "@/utils/useUser";

// ── Status pill helper ─────────────────────────────────────────
function StatusPill({ status }) {
  const map = {
    active: { label: "Active", cls: "bg-green-100 text-green-700" },
    expired: { label: "Expired", cls: "bg-red-100 text-red-700" },
    suspended: { label: "Suspended", cls: "bg-yellow-100 text-yellow-700" },
  };
  const s = map[status] || { label: status, cls: "bg-gray-100 text-gray-600" };
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.cls}`}
    >
      {s.label}
    </span>
  );
}

// ── Days remaining helper ──────────────────────────────────────
function daysRemaining(endDate) {
  const end = new Date(endDate);
  const now = new Date();
  return Math.ceil((end - now) / (1000 * 60 * 60 * 24));
}

export default function DashboardPage() {
  const { data: user, loading: userLoading } = useUser();
  const [radios, setRadios] = useState([]);
  const [payments, setPayments] = useState([]);
  const [radiosLoading, setRadiosLoading] = useState(true);
  const [paymentsLoading, setPaymentsLoading] = useState(true);
  const [radiosError, setRadiosError] = useState(null);
  const [paymentsError, setPaymentsError] = useState(null);
  const [renewLoading, setRenewLoading] = useState(null);
  const [activeSection, setActiveSection] = useState("radios");

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin?callbackUrl=/dashboard";
    }
  }, [user, userLoading]);

  // Fetch radios
  useEffect(() => {
    if (!user) return;
    const fetchRadios = async () => {
      try {
        const res = await fetch("/api/dashboard/radios");
        if (!res.ok) throw new Error("Failed to load radios");
        const data = await res.json();
        setRadios(data.radios || []);
      } catch (err) {
        console.error(err);
        setRadiosError("Could not load your radios. Please refresh.");
      } finally {
        setRadiosLoading(false);
      }
    };
    fetchRadios();
  }, [user]);

  // Fetch payments
  useEffect(() => {
    if (!user) return;
    const fetchPayments = async () => {
      try {
        const res = await fetch("/api/dashboard/payments");
        if (!res.ok) throw new Error("Failed to load payments");
        const data = await res.json();
        setPayments(data.payments || []);
      } catch (err) {
        console.error(err);
        setPaymentsError("Could not load payment history. Please refresh.");
      } finally {
        setPaymentsLoading(false);
      }
    };
    fetchPayments();
  }, [user]);

  const handleRenew = async (radioId) => {
    setRenewLoading(radioId);
    try {
      const plan = SERVICE_PLANS[0];
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "renewal",
          planId: plan.id,
          radioId,
          redirectURL: window.location.origin + "/dashboard",
        }),
      });
      if (!res.ok) throw new Error("Checkout failed");
      const { url } = await res.json();
      if (url) window.open(url, "_blank", "popup");
    } catch (err) {
      console.error(err);
      alert("Could not start renewal. Please try again or call us.");
    } finally {
      setRenewLoading(null);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading…</div>
      </div>
    );
  }

  if (!user) return null;

  const navItems = [
    { id: "radios", label: "My Radios", icon: Radio },
    { id: "payments", label: "Payment History", icon: CreditCard },
    { id: "management", label: "Device Management", icon: Wrench },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* ── Top bar ── */}
      <header className="bg-[#1E3A8A] h-14 flex items-center px-4 sm:px-6 shadow-md">
        <div className="flex items-center gap-2 flex-1">
          <Shield size={18} className="text-[#DC2626]" fill="currentColor" />
          <a href="/" className="text-[#DC2626] font-extrabold text-lg">
            {BRAND_NAME}
          </a>
          <span className="text-white/30 mx-2">|</span>
          <span className="text-white/70 text-sm hidden sm:block">
            Customer Portal
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/70 text-sm hidden sm:block">
            {user.name || user.email}
          </span>
          <a
            href="/account/logout"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <LogOut size={13} />
            Sign Out
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Welcome back{user.name ? `, ${user.name.split(" ")[0]}` : ""}.
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your radios, view service status, and renew with one click.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Sidebar Nav ── */}
          <aside className="lg:w-56 flex-shrink-0">
            <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold transition-colors border-b border-gray-50 last:border-b-0 ${
                      isActive
                        ? "bg-[#1E3A8A] text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                    {isActive && (
                      <ChevronRight size={14} className="ml-auto opacity-60" />
                    )}
                  </button>
                );
              })}
              <a
                href="/shop"
                className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-[#DC2626] hover:bg-red-50 transition-colors"
              >
                <ArrowRight size={16} />
                Order Another Radio
              </a>
            </nav>

            {/* Quick support */}
            <div className="mt-4 bg-[#1E3A8A]/5 border border-[#1E3A8A]/10 rounded-2xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-2 font-medium">
                Need help?
              </p>
              <a
                href="/contact"
                className="text-[#1E3A8A] text-sm font-bold hover:underline"
              >
                Contact Support
              </a>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <main className="flex-1 min-w-0">
            {/* ─────── MY RADIOS ─────── */}
            {activeSection === "radios" && (
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 mb-5 flex items-center gap-2">
                  <Radio size={20} className="text-[#1E3A8A]" />
                  My Radios
                </h2>

                {radiosLoading ? (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center text-gray-400 text-sm">
                    Loading your radios…
                  </div>
                ) : radiosError ? (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center gap-3 text-red-700 text-sm">
                    <AlertCircle size={18} />
                    {radiosError}
                  </div>
                ) : radios.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <Radio size={40} className="text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm font-medium mb-1">
                      No radios registered yet
                    </p>
                    <p className="text-gray-400 text-xs mb-5">
                      Once you order a radio, it will appear here automatically.
                    </p>
                    <a
                      href="/shop"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DC2626] text-white font-bold text-sm rounded-xl hover:bg-[#b91c1c] transition-colors"
                    >
                      Shop Now
                      <ArrowRight size={14} />
                    </a>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {radios.map((radio) => {
                      const days = daysRemaining(radio.service_end_date);
                      const expiringSoon = days <= 30 && days > 0;
                      const isExpired = days <= 0;
                      return (
                        <div
                          key={radio.id}
                          className={`bg-white rounded-2xl shadow-sm border p-6 ${
                            isExpired
                              ? "border-red-200"
                              : expiringSoon
                                ? "border-yellow-200"
                                : "border-gray-100"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-[#1E3A8A]/10 rounded-xl flex items-center justify-center">
                                  <Radio size={18} className="text-[#1E3A8A]" />
                                </div>
                                <div>
                                  <h3 className="font-bold text-gray-900 text-sm">
                                    {radio.nickname || radio.model_name}
                                  </h3>
                                  <p className="text-gray-400 text-xs">
                                    SN: {radio.serial_number}
                                  </p>
                                </div>
                                <StatusPill status={radio.status} />
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                                <div>
                                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">
                                    Service Start
                                  </p>
                                  <p className="text-gray-900 text-sm font-semibold">
                                    {new Date(
                                      radio.service_start_date,
                                    ).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">
                                    Service Ends
                                  </p>
                                  <p
                                    className={`text-sm font-semibold ${isExpired ? "text-red-600" : expiringSoon ? "text-yellow-600" : "text-gray-900"}`}
                                  >
                                    {new Date(
                                      radio.service_end_date,
                                    ).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">
                                    Firmware
                                  </p>
                                  <p className="text-gray-900 text-sm font-semibold">
                                    v{radio.firmware_version}
                                  </p>
                                </div>
                              </div>

                              {(expiringSoon || isExpired) && (
                                <div
                                  className={`mt-3 flex items-center gap-2 text-xs font-medium ${isExpired ? "text-red-600" : "text-yellow-600"}`}
                                >
                                  <AlertCircle size={13} />
                                  {isExpired
                                    ? "Service has expired. Renew now to restore coverage."
                                    : `Service expires in ${days} days — renew soon.`}
                                </div>
                              )}
                            </div>

                            <div className="flex-shrink-0">
                              <button
                                onClick={() => handleRenew(radio.id)}
                                disabled={renewLoading === radio.id}
                                className={`flex items-center gap-2 px-5 py-2.5 font-bold text-sm rounded-xl transition-colors ${
                                  isExpired
                                    ? "bg-[#DC2626] hover:bg-[#b91c1c] text-white"
                                    : "bg-[#1E3A8A] hover:bg-[#163069] text-white"
                                } disabled:opacity-60`}
                              >
                                <RefreshCw size={14} />
                                {renewLoading === radio.id
                                  ? "Loading…"
                                  : "Renew Service"}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ─────── PAYMENT HISTORY ─────── */}
            {activeSection === "payments" && (
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 mb-5 flex items-center gap-2">
                  <CreditCard size={20} className="text-[#1E3A8A]" />
                  Payment History
                </h2>

                {paymentsLoading ? (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center text-gray-400 text-sm">
                    Loading your payment history…
                  </div>
                ) : paymentsError ? (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center gap-3 text-red-700 text-sm">
                    <AlertCircle size={18} />
                    {paymentsError}
                  </div>
                ) : payments.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <CreditCard
                      size={40}
                      className="text-gray-200 mx-auto mb-4"
                    />
                    <p className="text-gray-500 text-sm font-medium">
                      No payments on record yet
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Your purchase history will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                              Description
                            </th>
                            <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {payments.map((p, i) => (
                            <tr
                              key={p.id}
                              className={`border-b border-gray-50 last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                            >
                              <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                                {new Date(p.created_at).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                )}
                              </td>
                              <td className="px-5 py-4 text-gray-700 font-medium">
                                {p.description ||
                                  (p.order_type === "hardware"
                                    ? `${RADIO_MODEL_NAME} — Hardware Purchase`
                                    : `${RADIO_MODEL_NAME} — Service Renewal`)}
                              </td>
                              <td className="px-5 py-4 text-gray-900 font-bold text-right whitespace-nowrap">
                                ${(p.amount_cents / 100).toFixed(2)}
                              </td>
                              <td className="px-5 py-4 text-right">
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                    p.status === "succeeded"
                                      ? "bg-green-100 text-green-700"
                                      : p.status === "pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {p.status === "succeeded"
                                    ? "Paid"
                                    : p.status === "pending"
                                      ? "Pending"
                                      : "Failed"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ─────── DEVICE MANAGEMENT (Coming Soon) ─────── */}
            {activeSection === "management" && (
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 mb-5 flex items-center gap-2">
                  <Wrench size={20} className="text-[#1E3A8A]" />
                  Device Update & Management Tool
                </h2>

                <div className="bg-gradient-to-br from-[#1E3A8A] to-[#0f2260] rounded-2xl p-8 md:p-12 text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Wrench size={32} className="text-white" />
                  </div>
                  <div className="inline-block px-3 py-1 bg-[#DC2626] text-white text-xs font-bold rounded-full uppercase tracking-wider mb-5">
                    Coming Soon
                  </div>
                  <h3 className="text-white font-extrabold text-2xl md:text-3xl mb-4">
                    Device Update & Management Tool
                  </h3>
                  <p className="text-white/70 text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-6">
                    We&rsquo;re building a tool that will let you update your
                    radios directly from this portal — push firmware, check
                    device health, and manage your fleet from one place.
                  </p>
                  <p className="text-white/50 text-sm max-w-md mx-auto">
                    <strong className="text-white/80">Until then:</strong> Call
                    us or send us a message and we&rsquo;ll handle any updates
                    or configuration for you — personally.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="/contact"
                      className="px-6 py-3 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-bold rounded-xl transition-colors"
                    >
                      Contact Us for Updates
                    </a>
                    <a
                      href="/"
                      className="px-6 py-3 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                    >
                      Back to Home
                    </a>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
