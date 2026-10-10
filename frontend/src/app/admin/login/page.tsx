"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { adminLogin } from "@/lib/adminApi";
import { MotionPreset } from "@/components/MotionPreset";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFillDemo = () => {
    setEmail("ridwan@gmail.com");
    setPassword("admin123");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await adminLogin(email, password);
      if (res.token) {
        localStorage.setItem("craft_admin_token", res.token);
        localStorage.setItem("craft_admin_user", JSON.stringify(res.user));
        router.push("/admin");
      } else {
        throw new Error("No authorization token received.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-background via-background to-secondary/20">
      <MotionPreset
        fade
        blur
        slide={{ direction: "up", offset: 30 }}
        className="w-full max-w-md rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xl space-y-7 relative overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* Brand & Title */}
        <div className="text-center space-y-2">
          <div className="size-12 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="size-6 text-emerald-500" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Superadmin Portal
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage and update landing page content, services, experiences, portfolio & certificates.
          </p>
        </div>

        {/* Demo Quick Fill Banner */}
        <div className="p-3.5 rounded-2xl border border-border bg-muted/40 space-y-2 text-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-amber-500" />
              Superadmin Credentials
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-primary hover:underline font-semibold cursor-pointer text-[11px]"
            >
              Fill Demo Info
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground font-mono">
            Email: <strong className="text-foreground">ridwan@gmail.com</strong>
            <br />
            Pass: <strong className="text-foreground">admin123</strong>
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Email Address
            </label>
            <div className="relative">
              <Mail className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ridwan@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Password
            </label>
            <div className="relative">
              <Lock className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-all shadow-md cursor-pointer mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Enter Superadmin Dashboard</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Return to public website
          </Link>
        </div>

      </MotionPreset>
    </main>
  );
}
