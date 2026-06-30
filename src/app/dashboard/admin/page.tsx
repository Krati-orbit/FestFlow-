"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import GlassCard from "@/components/GlassCard";
import { 
  ShieldAlert, 
  Users, 
  Sparkles, 
  IndianRupee, 
  CheckCircle, 
  XCircle,
  ShieldAlert as AdminIcon,
  Crown
} from "lucide-react";
import { 
  fetchAdminDashboardAction, 
  approveEventAction, 
  rejectEventAction, 
  updateUserRoleAction 
} from "@/app/actions";

export default function AdminDashboard() {
  const [data, setData] = useState<{
    totalUsers: number;
    activeFests: number;
    pendingFestsCount: number;
    totalPlatformRevenue: number;
    users: any[];
    pendingEvents: any[];
  }>({
    totalUsers: 0,
    activeFests: 0,
    pendingFestsCount: 0,
    totalPlatformRevenue: 0,
    users: [],
    pendingEvents: [],
  });

  const loadData = () => {
    fetchAdminDashboardAction().then(setData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (eventId: string) => {
    try {
      await approveEventAction(eventId);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (eventId: string) => {
    try {
      await rejectEventAction(eventId);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRoleChange = async (userId: string, newRole: "STUDENT" | "ORGANIZER" | "ADMIN" | "VOLUNTEER") => {
    try {
      await updateUserRoleAction(userId, newRole);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex-grow min-h-screen">
        <header className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="font-space text-3xl md:text-5xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Crown className="w-8 h-8 text-yellow-400 shrink-0" />
              <span>Admin Console</span>
            </h1>
            <p className="font-sans text-sm text-on-surface-variant">
              System Administrator: Dean Harrison. Oversee campus users, moderate fest requests, and track metrics.
            </p>
          </div>
        </header>

        {/* Stats Bento Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <GlassCard className="border border-glass-border p-6 flex justify-between items-center">
            <div>
              <p className="font-sans text-xs text-on-surface-variant">System Users</p>
              <h3 className="font-space text-3xl font-bold text-foreground mt-2">{data.totalUsers}</h3>
            </div>
            <span className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Users className="w-5 h-5" />
            </span>
          </GlassCard>

          <GlassCard className="border border-glass-border p-6 flex justify-between items-center">
            <div>
              <p className="font-sans text-xs text-on-surface-variant">Active Fests</p>
              <h3 className="font-space text-3xl font-bold text-foreground mt-2">{data.activeFests}</h3>
            </div>
            <span className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan">
              <Sparkles className="w-5 h-5" />
            </span>
          </GlassCard>

          <GlassCard className="border border-glass-border p-6 flex justify-between items-center">
            <div>
              <p className="font-sans text-xs text-on-surface-variant">Pending Reviews</p>
              <h3 className={`font-space text-3xl font-bold mt-2 ${data.pendingFestsCount > 0 ? "text-yellow-400 animate-pulse" : "text-foreground"}`}>
                {data.pendingFestsCount}
              </h3>
            </div>
            <span className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400">
              <ShieldAlert className="w-5 h-5" />
            </span>
          </GlassCard>

          <GlassCard className="border border-glass-border p-6 flex justify-between items-center">
            <div>
              <p className="font-sans text-xs text-on-surface-variant">Total Volume</p>
              <h3 className="font-space text-3xl font-bold text-foreground mt-2">₹{data.totalPlatformRevenue.toLocaleString()}</h3>
            </div>
            <span className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
              <IndianRupee className="w-5 h-5" />
            </span>
          </GlassCard>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Moderation Queue Column */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-space text-lg font-bold text-foreground flex items-center gap-1.5">
              <ShieldAlert className="w-5 h-5 text-yellow-400" />
              <span>Event Moderation Queue ({data.pendingEvents.length})</span>
            </h3>

            <div className="space-y-4">
              {data.pendingEvents.length > 0 ? (
                data.pendingEvents.map((event) => (
                  <GlassCard key={event.id} className="border border-glass-border p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[9px] font-space font-bold uppercase tracking-wider bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 px-2 py-0.5 rounded-full">
                            Pending Review
                          </span>
                          <h4 className="font-space text-base font-bold text-foreground mt-2.5">{event.title}</h4>
                        </div>
                        <span className="font-space text-sm font-bold text-primary">
                          {event.price === 0 ? "Free" : `₹${event.price}`}
                        </span>
                      </div>
                      
                      <p className="font-sans text-xs text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-glass-border/10 grid grid-cols-2 gap-2 text-[10px] font-space uppercase text-on-surface-variant font-bold">
                        <p>Venue: <span className="text-foreground">{event.venue}</span></p>
                        <p>Date: <span className="text-foreground">{event.date}</span></p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-6 border-t border-glass-border/10 pt-4">
                      <button
                        onClick={() => handleApprove(event.id)}
                        className="flex-1 bg-green-500/10 border border-green-500/20 hover:bg-green-500 hover:text-white text-green-400 py-2 rounded-xl font-space text-xs font-bold flex items-center justify-center gap-1 transition-all"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve Fest</span>
                      </button>
                      <button
                        onClick={() => handleReject(event.id)}
                        className="flex-1 bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white text-red-400 py-2 rounded-xl font-space text-xs font-bold flex items-center justify-center gap-1 transition-all"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </GlassCard>
                ))
              ) : (
                <GlassCard className="border border-glass-border p-8 text-center text-on-surface-variant font-sans text-xs">
                  Moderation queue is clean. No pending event requests.
                </GlassCard>
              )}
            </div>
          </div>

          {/* User Management Column */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-space text-lg font-bold text-foreground flex items-center gap-1.5">
              <Users className="w-5 h-5 text-primary" />
              <span>Campus User Directory ({data.users.length})</span>
            </h3>

            <GlassCard className="border border-glass-border overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-glass-border/30 font-space text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                    <th className="py-4 px-5">User</th>
                    <th className="py-4 px-5">Current Role</th>
                    <th className="py-4 px-5 text-right">Edit Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-glass-border/10 font-sans text-xs text-on-surface-variant">
                  {data.users.map((user) => (
                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-5">
                        <p className="font-bold text-foreground leading-tight">{user.name}</p>
                        <p className="text-[10px] opacity-80 mt-0.5">{user.email}</p>
                      </td>
                      <td className="py-4 px-5">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-space font-bold uppercase tracking-wide border ${
                          user.role === "ADMIN" 
                            ? "bg-red-500/10 border-red-500/20 text-red-400"
                            : user.role === "ORGANIZER"
                            ? "bg-primary/10 border-primary/20 text-primary"
                            : user.role === "VOLUNTEER"
                            ? "bg-green-500/10 border-green-500/20 text-green-400"
                            : "bg-accent-cyan/10 border-accent-cyan/20 text-accent-cyan"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                          className="bg-surface-lowest border border-glass-border rounded-lg text-[10px] font-space font-bold uppercase text-foreground px-2 py-1 focus:ring-1 focus:ring-primary outline-none cursor-pointer"
                        >
                          <option value="STUDENT">Student</option>
                          <option value="ORGANIZER">Organizer</option>
                          <option value="VOLUNTEER">Volunteer</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          </div>
        </div>
      </main>
    </>
  );
}
