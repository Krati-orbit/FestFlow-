"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/GlassCard";
import { Sparkles, Mail, Lock, LogIn, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [role, setRole] = useState<"student" | "organizer">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sign in and redirect based on role
    setTimeout(() => {
      setIsSubmitting(false);
      if (role === "organizer") {
        router.push("/dashboard/organizer");
      } else {
        router.push("/dashboard/student");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Visual Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <Link 
        href="/"
        className="flex items-center gap-2 mb-8 relative z-10 hover:opacity-85 transition-opacity"
      >
        <Sparkles className="w-6 h-6 text-primary" />
        <span className="font-space text-2xl font-bold tracking-tight text-primary">FestFlow</span>
      </Link>

      <GlassCard className="w-full max-w-md border border-glass-border p-8 relative z-10 shadow-[0_0_50px_rgba(139,92,246,0.15)]">
        <header className="text-center mb-8">
          <h2 className="font-space text-xl font-bold text-foreground">Welcome Back</h2>
          <p className="font-sans text-xs text-on-surface-variant mt-1.5">
            Choose your workspace role to sign into FestFlow
          </p>
        </header>

        {/* Role Select Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-surface-lowest/50 border border-glass-border p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`py-2 rounded-lg font-space text-xs font-bold uppercase transition-all ${
              role === "student"
                ? "bg-primary text-white shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                : "text-on-surface-variant hover:text-foreground"
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole("organizer")}
            className={`py-2 rounded-lg font-space text-xs font-bold uppercase transition-all ${
              role === "organizer"
                ? "bg-primary text-white shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                : "text-on-surface-variant hover:text-foreground"
            }`}
          >
            Organizer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="font-space text-[10px] font-bold text-foreground uppercase tracking-wider" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. alex@university.edu"
                className="w-full bg-surface-lowest/50 border border-glass-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-space text-[10px] font-bold text-foreground uppercase tracking-wider" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-lowest/50 border border-glass-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full electric-glow-btn bg-gradient-to-r from-primary to-primary-to text-white py-3 rounded-xl font-space text-sm font-bold flex items-center justify-center gap-1.5 mt-6"
          >
            {isSubmitting ? (
              <span>Signing In...</span>
            ) : (
              <>
                <span>Sign Into Workspace</span>
                <LogIn className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-glass-border/30 pt-6">
          <p className="font-sans text-xs text-on-surface-variant">
            Don't have an account?{" "}
            <a href="#" className="font-space font-bold text-primary hover:text-accent-cyan underline transition-colors">
              Sign Up
            </a>
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
