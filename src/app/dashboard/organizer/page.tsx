"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import GlassCard from "@/components/GlassCard";
import TrendChart from "@/components/TrendChart";
import { 
  PlusCircle, 
  Calendar, 
  Users, 
  IndianRupee, 
  TrendingUp, 
  Search, 
  Filter,
  Edit,
  BarChart,
  MoreVertical,
  CheckSquare,
  Square
} from "lucide-react";
import { fetchOrganizerDashboardAction, fetchTasksAction, toggleTaskAction } from "@/app/actions";

export default function OrganizerDashboard() {
  const [stats, setStats] = useState<{
    totalEvents: number;
    totalRegistrations: number;
    grossRevenue: number;
    managedEvents: any[];
  }>({
    totalEvents: 0,
    totalRegistrations: 0,
    grossRevenue: 0,
    managedEvents: [],
  });
  const [tasks, setTasks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchOrganizerDashboardAction().then(setStats);
    fetchTasksAction().then(setTasks);
  }, []);

  const toggleTask = async (id: number) => {
    try {
      const updatedTasks = await toggleTaskAction(id);
      setTasks(updatedTasks);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredEvents = stats.managedEvents.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.venue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex-grow min-h-screen">
        {/* Header and CTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="font-space text-3xl md:text-5xl font-bold text-foreground mb-2">
              Organizer Dashboard
            </h1>
            <p className="font-sans text-sm text-on-surface-variant">
              Welcome back, Sarah. Here's what's happening with your campus fests.
            </p>
          </div>
          <Link
            href="/dashboard/organizer/create"
            className="electric-glow-btn bg-gradient-to-r from-primary to-primary-to text-white px-6 py-3.5 rounded-xl font-space text-sm font-bold flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Create New Event</span>
          </Link>
        </div>

        {/* Stats Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Events */}
          <GlassCard className="border border-glass-border hover:shadow-[0_0_24px_rgba(139,92,246,0.1)] flex items-center justify-between">
            <div>
              <p className="font-sans text-xs text-on-surface-variant">Total Events</p>
              <h3 className="font-space text-3xl font-bold text-foreground mt-1">{stats.totalEvents}</h3>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Calendar className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-space font-bold bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>+12%</span>
              </span>
            </div>
          </GlassCard>

          {/* Registrations */}
          <GlassCard className="border border-glass-border hover:shadow-[0_0_24px_rgba(139,92,246,0.1)] flex items-center justify-between">
            <div>
              <p className="font-sans text-xs text-on-surface-variant">Total Registrations</p>
              <h3 className="font-space text-3xl font-bold text-foreground mt-1">{stats.totalRegistrations.toLocaleString()}</h3>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan">
                <Users className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-space font-bold bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>+8.4%</span>
              </span>
            </div>
          </GlassCard>

          {/* Revenue */}
          <GlassCard className="border border-glass-border hover:shadow-[0_0_24px_rgba(139,92,246,0.1)] flex items-center justify-between">
            <div>
              <p className="font-sans text-xs text-on-surface-variant">Gross Revenue</p>
              <h3 className="font-space text-3xl font-bold text-foreground mt-1">₹{stats.grossRevenue.toLocaleString()}</h3>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <IndianRupee className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-space font-bold bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>+22%</span>
              </span>
            </div>
          </GlassCard>
        </section>

        {/* Main Content: Chart & Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
          {/* Trend Chart */}
          <GlassCard className="lg:col-span-8 border border-glass-border">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-space text-lg font-bold text-foreground">Registrations Trend</h3>
              <select className="bg-surface-lowest border border-glass-border rounded-xl font-space text-xs text-on-surface-variant px-3 py-1.5 focus:ring-1 focus:ring-primary outline-none">
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
              </select>
            </div>
            <TrendChart />
          </GlassCard>

          {/* Tasks & Guide */}
          <div className="lg:col-span-4 space-y-6">
            <GlassCard className="border border-glass-border">
              <h3 className="font-space text-lg font-bold text-foreground mb-6">Upcoming Tasks</h3>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div 
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className="flex items-start gap-3 p-2 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group"
                  >
                    {task.completed ? (
                      <CheckSquare className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-5 h-5 text-on-surface-variant group-hover:text-primary shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className={`font-space text-sm font-semibold leading-tight ${task.completed ? "line-through text-on-surface-variant/50" : "text-foreground"}`}>
                        {task.text}
                      </p>
                      <p className="font-sans text-[10px] text-on-surface-variant mt-0.5">{task.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="bg-gradient-to-br from-primary/10 to-primary-to/10 border border-primary/20 rounded-[20px] p-6 shadow-lg">
              <h4 className="font-space text-base font-bold text-white mb-2 leading-tight">
                Need help planning your next event?
              </h4>
              <p className="font-sans text-xs text-on-surface-variant mb-4">
                Read our high-velocity guidelines for creating maximum impact.
              </p>
              <button className="bg-white text-surface-lowest px-4 py-2 rounded-lg font-space text-xs font-bold hover:scale-105 active:scale-95 transition-transform">
                Explore Guide
              </button>
            </div>
          </div>
        </div>

        {/* Managed Events Table */}
        <GlassCard className="border border-glass-border p-0 overflow-hidden">
          <div className="px-6 py-5 border-b border-glass-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-space text-lg font-bold text-foreground">Managed Events</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search managed events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-surface-lowest/50 border border-glass-border rounded-xl text-xs text-foreground outline-none focus:ring-1 focus:ring-primary w-52 md:w-64"
                />
              </div>
              <button className="p-2 border border-glass-border rounded-xl hover:bg-white/5 text-on-surface-variant">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-lowest/40 border-b border-glass-border">
                  <th className="px-6 py-4 font-space text-xs font-bold text-on-surface-variant uppercase tracking-wider">Event Details</th>
                  <th className="px-6 py-4 font-space text-xs font-bold text-on-surface-variant uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 font-space text-xs font-bold text-on-surface-variant uppercase tracking-wider">Registrations</th>
                  <th className="px-6 py-4 font-space text-xs font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 font-space text-xs font-bold text-on-surface-variant uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass-border/30">
                {filteredEvents.map((event) => {
                  const percent = Math.round((event.registered / event.capacity) * 100);
                  return (
                    <tr key={event.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-space text-sm font-semibold text-foreground">{event.title}</p>
                          <p className="font-sans text-xs text-on-surface-variant">{event.venue}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-sans text-on-surface-variant">{event.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col w-32">
                          <span className="font-space text-xs text-foreground font-semibold">{event.registered} / {event.capacity}</span>
                          <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full bg-gradient-to-r from-primary to-primary-to`} 
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-space font-bold uppercase tracking-wider ${
                          event.status === "Active" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                          event.status === "Draft" ? "bg-white/10 text-on-surface-variant border border-white/20" :
                          "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                        }`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button className="text-on-surface-variant hover:text-primary transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-on-surface-variant hover:text-accent-cyan transition-colors">
                            <BarChart className="w-4 h-4" />
                          </button>
                          <button className="text-on-surface-variant hover:text-foreground transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </main>
    </>
  );
}
