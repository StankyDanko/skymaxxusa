import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BRAND_NAME,
  FOUNDED_YEAR,
  CONTACT_PHONE,
  CONTACT_EMAIL,
} from "@/config/siteConfig";
import { Shield, Heart, Lock, Star, ArrowRight } from "lucide-react";

const VALUES = [
  {
    icon: Shield,
    title: "Your Word is Bond",
    desc: "We don't make promises we can't keep. When we say something, we mean it. No exceptions.",
  },
  {
    icon: Lock,
    title: "Privacy Above All",
    desc: "Your communications are yours. We don't listen, record, or sell. Period. Full stop.",
  },
  {
    icon: Heart,
    title: "Handshake Guaranteed",
    desc: "We stand behind everything we sell. If it's not right, we make it right. That's how our father taught us to do business.",
  },
  {
    icon: Star,
    title: "Superior Service Always",
    desc: "Superior service isn't a slogan — it's how we do business. Real people, real answers, real fast.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <Navbar />

      {/* Header */}
      <div className="bg-[#1E3A8A] py-11 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/60 text-sm mb-1">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>{" "}
            &rsaquo; About Us
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            About {BRAND_NAME}
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl">
            Built on values that haven&rsquo;t changed in a hundred years.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="order-2 md:order-1">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80"
                  alt="Founder of SkyMaxxUSA"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            </div>

            {/* Story copy */}
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 bg-[#1E3A8A]/10 rounded-full px-4 py-1.5 mb-4">
                <Shield
                  size={14}
                  className="text-[#DC2626]"
                  fill="currentColor"
                />
                <span className="text-[#1E3A8A] text-xs font-bold uppercase tracking-wider">
                  Our Story
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-5 leading-tight">
                Built for the men who still believe a handshake means something.
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {BRAND_NAME} was started in {FOUNDED_YEAR} by a family that
                  grew up believing in two things above all else: doing honest
                  work and keeping your word.
                </p>
                <p>
                  Our father spent his career in industries where communication
                  was life or death — where you couldn&rsquo;t afford a dropped
                  call, a privacy breach, or a system that quit when you needed
                  it most. He always said the same thing:{" "}
                  <em className="text-gray-800 font-semibold">
                    &ldquo;Give people what you promised, charge a fair price,
                    and stand behind it no matter what.&rdquo;
                  </em>
                </p>
                <p>
                  We built {BRAND_NAME} in his honor and to his standard. Every
                  radio we ship is a direct reflection of those values. Every
                  call we answer is a commitment to the man on the other end of
                  the line.
                </p>
                <p>
                  We&rsquo;re not the biggest radio company in America. We
                  don&rsquo;t want to be. We want to be the most{" "}
                  <strong>trusted</strong> one.
                </p>
                <p className="font-semibold text-gray-800">
                  Word is bond. Handshake guaranteed. Privacy and security above
                  all. Superior service isn&rsquo;t a slogan — it&rsquo;s how we
                  do business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-11">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-7 text-center">
            The Values We Were Raised On
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-11 h-11 bg-[#1E3A8A]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon size={20} className="text-[#1E3A8A]" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1.5 text-sm">
                    {v.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-11 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-5">
            Our Promise to You
          </h2>
          <div className="bg-gradient-to-br from-[#1E3A8A] to-[#0f2260] rounded-2xl p-8 text-left">
            <p className="text-white/80 text-lg leading-relaxed mb-4">
              &ldquo;If you buy from us, we owe you our absolute best. Not just
              a good product — but real support, real honesty, and the decency
              to treat you like we&rsquo;d want to be treated ourselves.
            </p>
            <p className="text-white/80 text-lg leading-relaxed mb-5">
              If we ever fall short of that, call us. We&rsquo;ll make it right.
              That&rsquo;s our word. And our word is our bond.&rdquo;
            </p>
            <p className="text-white font-bold text-sm">
              — The {BRAND_NAME} Family
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-[#1E3A8A] py-11 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
            Want to talk before you buy? We&rsquo;d welcome the call.
          </h2>
          <p className="text-white/70 mb-6 text-lg">
            Call us at{" "}
            <a
              href={`tel:${CONTACT_PHONE}`}
              className="text-white font-bold hover:underline"
            >
              {CONTACT_PHONE}
            </a>{" "}
            or send a message below.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-bold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl shadow-lg"
          >
            Get in Touch
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
