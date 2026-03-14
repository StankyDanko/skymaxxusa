import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RADIO_MODEL_NAME, HARDWARE_PRICE } from "@/config/siteConfig";
import { Package, Zap, Radio, RefreshCw, ArrowRight } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Package,
    title: "Order Your Radio",
    description: `Place your order for the ${RADIO_MODEL_NAME} on our secure checkout. One-time purchase at $${HARDWARE_PRICE} — no subscription traps, no hidden fees. Just a straight deal.`,
    detail:
      "We accept all major credit cards via Stripe's bank-grade secure checkout. Your financial info never touches our servers.",
  },
  {
    number: "02",
    icon: Zap,
    title: "We Ship It Pre-Activated",
    description:
      "Your radio ships within 1-3 business days, fully activated and ready to go. We configure everything before it leaves our hands.",
    detail:
      "No setup required on your end. No apps to install. No accounts to create on a third-party system. We handle all of that for you.",
  },
  {
    number: "03",
    icon: Radio,
    title: "Start Talking Immediately",
    description:
      "Take it out of the box, power it on, and push the button. That's it. Nationwide coverage starts the moment you receive it.",
    detail:
      "Works on the LTE network — the same infrastructure that powers modern cell phones, but on a dedicated, private PTT channel.",
  },
  {
    number: "04",
    icon: RefreshCw,
    title: "We Handle Everything After That",
    description:
      "Renewals, firmware updates, troubleshooting — we manage it all. You won't be left alone to figure things out. We've got your back.",
    detail:
      "When your annual service comes due, we reach out directly. No surprise lapses. No scrambling. Just a simple renewal and you're good for another year.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <Navbar />

      {/* Header */}
      <div className="bg-[#020617] py-11 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
          How It Works
        </h1>
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
          We believe buying a radio should be as simple as a handshake.
          Here&rsquo;s exactly what happens — start to finish.
        </p>
      </div>

      {/* Steps */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#DC2626] to-[#3b82f6] opacity-30 hidden md:block" />

          <div className="space-y-12 md:space-y-0">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`relative md:flex items-center gap-8 md:gap-12 mb-10 md:mb-16 ${
                    isEven ? "" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div className="flex-1 bg-[#1e293b] border border-white/10 rounded-2xl p-7 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-11 h-11 bg-[#DC2626]/10 rounded-xl flex items-center justify-center">
                        <Icon size={22} className="text-[#DC2626]" />
                      </div>
                      <span className="text-[#DC2626]/30 font-black text-3xl">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="font-black text-white text-xl mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed mb-2">
                      {step.description}
                    </p>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {step.detail}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex flex-shrink-0 w-6 h-6 rounded-full bg-[#DC2626] border-4 border-[#0f172a] shadow-md z-10" />

                  {/* Spacer for alternate side */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="bg-[#0a101f] py-11">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-7 text-center">
            Straight Answers to Common Questions
          </h2>
          <div className="space-y-5">
            {[
              {
                q: "Do I need to sign a contract?",
                a: "Never. We don't believe in trapping customers. Your annual renewal is always your choice. No penalties. No fine print.",
              },
              {
                q: "What happens if my radio breaks?",
                a: `Your ${RADIO_MODEL_NAME} comes with a 1-year hardware warranty. If something's wrong, call us. We take care of our customers.`,
              },
              {
                q: "Can I add more radios later?",
                a: "Absolutely. Order as many as you need. Each radio gets its own service, and you manage everything through your customer portal.",
              },
              {
                q: "What if I need help setting things up?",
                a: "Pick up the phone and call us. A real person will answer. We'll walk you through anything you need — no bots, no ticket queues.",
              },
              {
                q: "Is my private communication actually private?",
                a: "Yes. Military-grade AES-256 encryption on every transmission. We don't monitor, record, or sell your communications. Your privacy is our promise.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="bg-[#1e293b] rounded-xl p-5 border border-white/10"
              >
                <h4 className="font-bold text-white mb-1.5">{faq.q}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#020617] py-11 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Simple enough. Let&rsquo;s get you set up.
          </h2>
          <p className="text-white/70 text-lg mb-7">
            It takes less than 5 minutes to order. Your radio ships in days.
          </p>
          <a
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-bold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl shadow-lg"
          >
            Order Your Radio Now
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
