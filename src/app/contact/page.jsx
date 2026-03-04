"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BRAND_NAME, CONTACT_PHONE, CONTACT_EMAIL } from "@/config/siteConfig";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send message.");
      }
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
      setStatus(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <Navbar />

      {/* ── Page Header ── */}
      <div className="bg-[#1E3A8A] py-11 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/60 text-sm mb-1">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>{" "}
            &rsaquo; Contact
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            Talk to a Real Person
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            No bots. No ticket queues. Just honest answers from people who give
            a damn.
          </p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* ── Left: Contact Info ── */}
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">
              We&rsquo;d Love to Hear from You
            </h2>
            <p className="text-gray-600 leading-relaxed mb-7">
              Whether you have a question before you buy, need help with your
              radio, or just want to talk to someone who knows their stuff —
              we&rsquo;re here. We typically respond within a few hours during
              business hours.
            </p>

            {/* Contact tiles */}
            <div className="space-y-4 mb-8">
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group"
              >
                <div className="w-10 h-10 bg-[#1E3A8A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">
                    Phone
                  </p>
                  <p className="font-bold text-gray-900 group-hover:text-[#1E3A8A] transition-colors">
                    {CONTACT_PHONE}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group"
              >
                <div className="w-10 h-10 bg-[#1E3A8A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">
                    Email
                  </p>
                  <p className="font-bold text-gray-900 group-hover:text-[#1E3A8A] transition-colors">
                    {CONTACT_EMAIL}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 bg-[#1E3A8A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">
                    Location
                  </p>
                  <p className="font-bold text-gray-900">
                    Proudly Serving All of America
                  </p>
                </div>
              </div>
            </div>

            {/* Business hours */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-black text-gray-900 mb-3">Business Hours</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span className="font-semibold text-gray-800">
                    8:00 AM – 6:00 PM CST
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold text-gray-800">
                    9:00 AM – 2:00 PM CST
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold text-gray-400">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Form — floating card with red accent border ── */}
          <div>
            {/* contact-form-card class enables dark-mode CSS targeting */}
            <div
              className="contact-form-card bg-white rounded-2xl shadow-xl border-2 p-7 md:p-9"
              style={{ borderColor: "rgba(220,38,38,0.22)" }}
            >
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={52} className="text-green-500 mb-5" />
                  <h3 className="text-2xl font-black text-gray-900 mb-3">
                    Message Received!
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-sm">
                    We&rsquo;ll get back to you as soon as possible — usually
                    within a few hours. Thanks for reaching out.
                  </p>
                  <button
                    onClick={() => setStatus(null)}
                    className="px-6 py-3 bg-[#1E3A8A] text-white font-semibold rounded-xl hover:bg-[#163069] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-black text-gray-900 mb-5">
                    Send Us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Your Name <span className="text-[#DC2626]">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Smith"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30 focus:border-[#1E3A8A] transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="(555) 000-0000"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30 focus:border-[#1E3A8A] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Email Address <span className="text-[#DC2626]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30 focus:border-[#1E3A8A] transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Your Message <span className="text-[#DC2626]">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Ask us anything — we'll give you a straight answer."
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30 focus:border-[#1E3A8A] transition-colors resize-none"
                        required
                      />
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-4 bg-[#DC2626] hover:bg-[#b91c1c] disabled:opacity-60 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
                    >
                      {status === "loading" ? (
                        "Sending…"
                      ) : (
                        <>
                          Send Message
                          <Send size={16} />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      We respect your privacy. Your information is never shared
                      or sold.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
