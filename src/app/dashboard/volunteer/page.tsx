"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import GlassCard from "@/components/GlassCard";
import { 
  CheckCircle2, 
  QrCode, 
  Search, 
  Users, 
  Hourglass,
  Scan,
  AlertCircle
} from "lucide-react";
import { fetchVolunteerDashboardAction, checkInTicketAction } from "@/app/actions";

export default function VolunteerDashboard() {
  const [data, setData] = useState<{
    stats: { totalTickets: number; checkedIn: number; pendingCheckIns: number };
    registrations: any[];
  }>({
    stats: { totalTickets: 0, checkedIn: 0, pendingCheckIns: 0 },
    registrations: [],
  });
  const [ticketInput, setTicketInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<{
    success: boolean;
    message: string;
    studentName?: string;
    eventTitle?: string;
  } | null>(null);

  const loadData = () => {
    fetchVolunteerDashboardAction().then(setData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketInput.trim()) return;

    setIsVerifying(true);
    setVerifyResult(null);

    try {
      const reg = await checkInTicketAction(ticketInput.trim());
      setVerifyResult({
        success: true,
        message: "Check-in successful!",
        studentName: reg.studentName,
        eventTitle: data.registrations.find(r => r.ticketId.toLowerCase() === ticketInput.trim().toLowerCase())?.eventTitle || "Registered Fest",
      });
      setTicketInput("");
      loadData(); // Reload stats and lists
    } catch (err: any) {
      setVerifyResult({
        success: false,
        message: err.message || "Invalid ticket code. Please try again.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const filteredRegistrations = data.registrations.filter((r) =>
    r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.eventTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex-grow min-h-screen">
        <header className="mb-12">
          <h1 className="font-space text-3xl md:text-5xl font-bold text-foreground mb-2">
            Volunteer Scanner
          </h1>
          <p className="font-sans text-sm text-on-surface-variant">
            Welcome back, Marcus. Scan ticket codes or enter serial keys to check in student attendees.
          </p>
        </header>

        {/* Scanner Panel and Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Quick Check-in Scanner box */}
          <GlassCard className="lg:col-span-5 border border-glass-border p-6 shadow-[0_0_24px_rgba(34,211,238,0.05)]">
            <h3 className="font-space text-base font-bold text-foreground mb-4 flex items-center gap-1.5">
              <Scan className="w-5 h-5 text-accent-cyan" />
              <span>Verify Ticket Attendance</span>
            </h3>

            <form onSubmit={handleCheckIn} className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-space text-[10px] font-bold text-foreground uppercase tracking-wider">
                  Ticket Verification ID
                </label>
                <div className="relative">
                  <QrCode className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={ticketInput}
                    onChange={(e) => setTicketInput(e.target.value)}
                    placeholder="e.g. TICKET-TECH-7729-XX"
                    className="w-full bg-surface-lowest/50 border border-glass-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-accent-cyan focus:border-accent-cyan transition-all font-space"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full electric-glow-btn bg-gradient-to-r from-accent-cyan to-primary text-white py-3 rounded-xl font-space text-xs font-bold flex items-center justify-center gap-1.5"
              >
                {isVerifying ? "Verifying ticket..." : "Verify & Check In"}
              </button>
            </form>

            {/* Check-In verification alert result */}
            {verifyResult && (
              <div className="mt-4 animate-fade-in">
                {verifyResult.success ? (
                  <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                    <div className="text-xs font-sans">
                      <p className="font-bold">{verifyResult.message}</p>
                      <p className="mt-1 opacity-90">
                        Student: <span className="font-bold text-white">{verifyResult.studentName}</span>
                      </p>
                      <p className="opacity-90">
                        Event: <span className="font-bold text-white">{verifyResult.eventTitle}</span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div className="text-xs font-sans font-bold">
                      <p>{verifyResult.message}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </GlassCard>

          {/* Quick Stats Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 h-full">
            <GlassCard className="border border-glass-border flex flex-col justify-between p-6">
              <div>
                <p className="font-sans text-xs text-on-surface-variant">Tickets Sold</p>
                <h3 className="font-space text-3xl font-bold text-foreground mt-2">{data.stats.totalTickets}</h3>
              </div>
              <span className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mt-4">
                <QrCode className="w-4 h-4" />
              </span>
            </GlassCard>

            <GlassCard className="border border-glass-border flex flex-col justify-between p-6">
              <div>
                <p className="font-sans text-xs text-on-surface-variant">Checked In</p>
                <h3 className="font-space text-3xl font-bold text-green-400 mt-2">{data.stats.checkedIn}</h3>
              </div>
              <span className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mt-4">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </GlassCard>

            <GlassCard className="border border-glass-border flex flex-col justify-between p-6">
              <div>
                <p className="font-sans text-xs text-on-surface-variant">Pending Gate</p>
                <h3 className="font-space text-3xl font-bold text-accent-cyan mt-2">{data.stats.pendingCheckIns}</h3>
              </div>
              <span className="w-9 h-9 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan mt-4">
                <Hourglass className="w-4 h-4" />
              </span>
            </GlassCard>
          </div>
        </div>

        {/* Registered Students Directory */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <h3 className="font-space text-lg font-bold text-foreground">Student Registrations List</h3>
            
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search ticket ID or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-lowest/50 border border-glass-border rounded-xl pl-9 pr-4 py-2.5 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>

          <GlassCard className="border border-glass-border overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-glass-border/30 font-space text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Ticket ID</th>
                  <th className="py-4 px-6">Student Name</th>
                  <th className="py-4 px-6">Event Name</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass-border/10 font-sans text-xs text-on-surface-variant">
                {filteredRegistrations.length > 0 ? (
                  filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-space font-bold text-foreground uppercase tracking-tight">
                        {reg.ticketId}
                      </td>
                      <td className="py-4 px-6 text-foreground">{reg.studentName}</td>
                      <td className="py-4 px-6">{reg.eventTitle}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-space font-bold uppercase tracking-wide border ${
                          reg.scanned
                            ? "bg-green-500/10 border-green-500/20 text-green-400"
                            : "bg-primary/10 border-primary/20 text-primary"
                        }`}>
                          {reg.scanned ? "Checked In" : "Registered"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-on-surface-variant">
                      No registrations matching search query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </GlassCard>
        </section>
      </main>
    </>
  );
}
