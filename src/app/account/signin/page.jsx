"use client";
import { useState } from "react";
import useAuth from "@/utils/useAuth";
import { Shield, Lock, Eye, EyeOff } from "lucide-react";
import { BRAND_NAME } from "@/config/siteConfig";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signInWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await signInWithCredentials({
        email,
        password,
        callbackUrl: "/dashboard",
        redirect: true,
      });
    } catch (err) {
      setError("Incorrect email or password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E3A8A] flex flex-col items-center justify-center px-4 py-12">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Logo */}
      <a href="/" className="flex items-center gap-2 mb-8">
        <Shield size={24} className="text-[#DC2626]" fill="currentColor" />
        <span className="text-[#DC2626] font-extrabold text-2xl">
          {BRAND_NAME}
        </span>
      </a>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <Lock size={32} className="text-[#1E3A8A] mx-auto mb-3" />
          <h1 className="text-2xl font-extrabold text-gray-900">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to access your customer portal
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5" noValidate>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30 focus:border-[#1E3A8A] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30 focus:border-[#1E3A8A] transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#DC2626] hover:bg-[#b91c1c] disabled:opacity-60 text-white font-bold rounded-xl transition-colors shadow-md"
          >
            {loading ? "Signing In…" : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            New customer?{" "}
            <a
              href={`/account/signup${typeof window !== "undefined" ? window.location.search : ""}`}
              className="text-[#1E3A8A] font-semibold hover:underline"
            >
              Create an account
            </a>
          </p>
        </div>

        <div className="mt-5 pt-5 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
            <Lock size={10} />
            Your account is protected with 256-bit encryption
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
