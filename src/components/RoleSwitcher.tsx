"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Users, GraduationCap, ShieldAlert, CheckSquare, Settings } from "lucide-react";
import GlassCard from "./GlassCard";

export default function RoleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Define modes
  const roles = [
    {
      name: "Student Mode",
      path: "/dashboard/student",
      description: "Explore events, buy tickets, and view check-in QR codes.",
      icon: GraduationCap,
      color: "text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20",
    },
    {
      name: "Organizer Mode",
      path: "/dashboard/organizer",
      description: "Create new fests and track registration analytics.",
      icon: Settings,
      color: "text-primary bg-primary/10 border-primary/20",
    },
    {
      name: "Admin Mode",
      path: "/dashboard/admin",
      description: "Moderate event reviews and manage user permissions.",
      icon: ShieldAlert,
      color: "text-red-400 bg-red-400/10 border-red-400/20",
    },
    {
      name: "Volunteer Mode",
      path: "/dashboard/volunteer",
      description: "Check in student attendees by scanning QR codes.",
      icon: CheckSquare,
      color: "text-green-400 bg-green-400/10 border-green-400/20",
    },
  ];

  // Helper to check if current route matches path prefix
  const isCurrentMode = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {isOpen ? (
        <GlassCard className="border border-glass-border p-4 mb-3 w-80 shadow-[0_0_30px_rgba(139,92,246,0.2)] animate-fade-in">
          <header className="border-b border-glass-border/30 pb-2 mb-3">
            <h4 className="font-space text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-primary" />
              <span>Switch Workspace Mode</span>
            </h4>
          </header>
          <div className="space-y-2">
            {roles.map((role) => {
              const Icon = role.icon;
              const active = isCurrentMode(role.path);
              return (
                <button
                  key={role.path}
                  onClick={() => {
                    setIsOpen(false);
                    router.push(role.path);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start gap-3 group ${
                    active
                      ? "border-primary bg-primary/10 shadow-[0_0_10px_rgba(139,92,246,0.15)]"
                      : "border-glass-border hover:border-primary/40 hover:bg-white/5"
                  }`}
                >
                  <span className={`p-2 rounded-lg border shrink-0 ${role.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <div>
                    <h5 className="font-space text-xs font-bold text-foreground">{role.name}</h5>
                    <p className="font-sans text-[10px] text-on-surface-variant leading-relaxed mt-0.5">{role.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </GlassCard>
      ) : null}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="electric-glow-btn bg-gradient-to-r from-primary to-primary-to text-white px-5 py-3 rounded-2xl font-space text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.4)]"
      >
        <Users className="w-4 h-4" />
        <span>Switch Mode ⇄</span>
      </button>
    </div>
  );
}
