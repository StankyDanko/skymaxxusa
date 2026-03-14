"use client";
import { useState } from "react";
import useAuth from "@/utils/useAuth";
import { Shield, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import { BRAND_NAME } from "@/config/siteConfig";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signUpWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPw) {
      setError("Passwords don't match. Please try again.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await signUpWithCredentials({
        email,
        password,
        name,
        callbackUrl: "/dashboard",
        redirect: true,
      });
    } catch (err) {
      setError(
        "This email may already be registered. Try signing in, or contact us for help.",
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 mb-8">
        <Shield size={24} className="text-[#DC2626]" fill="currentColor" />
        <span className="text-[#DC2626] font-extrabold text-2xl">
          {BRAND_NAME}
        </span>
      </a>

      <div className="w-full max-w-md bg-[#1e293b] rounded-2xl shadow-2xl p-8 border border-white/10">
        <div className="text-center mb-8">
          <UserPlus size={32} className="text-[#DC2626] mx-auto mb-3" />
          <h1 className="text-2xl font-extrabold text-white">
            Create Your Account
          </h1>
          <p className="text-white/50 text-sm mt-1">
            Set up your {BRAND_NAME} customer portal
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5" noValidate>
          <div>
            <label className="block text-sm font-semibold text-white/80 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Smith"
              className="w-full px-4 py-3 bg-[#0f172a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/30 focus:border-[#DC2626] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white/80 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full px-4 py-3 bg-[#0f172a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/30 focus:border-[#DC2626] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white/80 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full px-4 py-3 pr-11 bg-[#0f172a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/30 focus:border-[#DC2626] transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                tabIndex={-1}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white/80 mb-1.5">
              Confirm Password
            </label>
            <input
              type={showPw ? "text" : "password"}
              name="confirmPw"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              placeholder="Re-enter your password"
              className="w-full px-4 py-3 bg-[#0f172a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/30 focus:border-[#DC2626] transition-colors"
              required
            />
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#DC2626] hover:bg-[#b91c1c] disabled:opacity-60 text-white font-bold rounded-xl transition-colors shadow-md"
          >
            {loading ? "Creating Account…" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-white/50">
            Already have an account?{" "}
            <a
              href={`/account/signin${typeof window !== "undefined" ? window.location.search : ""}`}
              className="text-[#DC2626] font-semibold hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>

        <div className="mt-5 pt-5 border-t border-white/10 text-center">
          <p className="text-xs text-white/30 flex items-center justify-center gap-1">
            <Lock size={10} />
            Your privacy is guaranteed. We never sell your data.
          </p>
        </div>
      </div>

      <a
        href="/"
        className="mt-6 text-white/60 hover:text-white text-sm transition-colors"
      >
        &larr; Back to {BRAND_NAME}
      </a>
    </div>
  );
}
