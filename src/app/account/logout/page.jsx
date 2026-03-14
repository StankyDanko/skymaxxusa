"use client";
import { useEffect } from "react";
import useAuth from "@/utils/useAuth";
import { Shield, LogOut } from "lucide-react";
import { BRAND_NAME } from "@/config/siteConfig";

export default function LogoutPage() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/", redirect: true });
  };

  // Auto-sign-out on mount
  useEffect(() => {
    handleSignOut();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center px-4">
      <a href="/" className="flex items-center gap-2 mb-10">
        <Shield size={24} className="text-[#DC2626]" fill="currentColor" />
        <span className="text-[#DC2626] font-extrabold text-2xl">
          {BRAND_NAME}
        </span>
      </a>

      <div className="w-full max-w-sm bg-[#1e293b] rounded-2xl shadow-2xl p-8 text-center border border-white/10">
        <LogOut size={36} className="text-white/40 mx-auto mb-4" />
        <h1 className="text-xl font-extrabold text-white mb-2">
          Signing you out…
        </h1>
        <p className="text-white/50 text-sm">
          Thanks for using {BRAND_NAME}. See you next time.
        </p>
      </div>
    </div>
  );
}
