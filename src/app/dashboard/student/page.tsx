"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import GlassCard from "@/components/GlassCard";
import TicketModal from "@/components/TicketModal";
import { Calendar, MapPin, QrCode, Award, ArrowRight, Download } from "lucide-react";

import { fetchStudentDashboardAction } from "@/app/actions";

// Mock finished fests for certificate downloads
const pastEvents = [
  {
    id: "genesis-2025",
    title: "Genesis Tech Fest 2025",
    date: "March 15, 2025",
    role: "Participant",
    certificateUrl: "https://cloudinary.com/cert/genesis-2025.pdf",
  },
  {
    id: "sports-meet-2025",
    title: "Inter-College Sports Meet 2025",
    date: "April 02, 2025",
    role: "Runner Up (Basketball)",
    certificateUrl: "https://cloudinary.com/cert/sports-2025.pdf",
  },
];

export default function StudentDashboard() {
  const [activeTickets, setActiveTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  React.useEffect(() => {
    fetchStudentDashboardAction().then((res) => {
      setActiveTickets(res.activeTickets);
    });
  }, []);

  const openTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar />

      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex-grow min-h-screen">
        <header className="mb-12">
          <h1 className="font-space text-3xl md:text-5xl font-bold text-foreground mb-2">
            Student Dashboard
          </h1>
          <p className="font-sans text-sm text-on-surface-variant">
            Welcome back, Alex. Manage your active registrations, scan tickets, and download participation certificates.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Active Registrations Column */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="font-space text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-primary" />
              <span>Active Registrations ({activeTickets.length})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {activeTickets.map((ticket) => (
                <GlassCard 
                  key={ticket.id}
                  className="border border-glass-border hover:shadow-[0_0_24px_rgba(139,92,246,0.1)] flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-space font-bold uppercase tracking-wider bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 px-2.5 py-0.5 rounded-full">
                      {ticket.status}
                    </span>
                    <h4 className="font-space text-lg font-bold text-foreground mt-4 mb-2">
                      {ticket.title}
                    </h4>
                    
                    <div className="space-y-2 mt-4 mb-6 text-xs text-on-surface-variant font-sans">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary shrink-0" />
                        <span>{ticket.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        <span>{ticket.venue}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openTicket(ticket)}
                    className="w-full bg-primary/10 border border-primary/20 hover:border-primary/50 text-primary py-2.5 rounded-xl font-space text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>View QR Ticket</span>
                  </button>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Certificate Downloads Column */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-space text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-accent-cyan" />
              <span>Certificates & Awards</span>
            </h3>

            <div className="space-y-4">
              {pastEvents.map((cert) => (
                <GlassCard key={cert.id} className="border border-glass-border p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-space text-sm font-bold text-foreground leading-snug">
                        {cert.title}
                      </h4>
                      <p className="font-sans text-[10px] text-on-surface-variant mt-1">
                        Role: {cert.role} • {cert.date}
                      </p>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => alert(`Downloading certificate for ${cert.title}`)}
                      className="p-2 bg-accent-cyan/10 border border-accent-cyan/20 hover:border-accent-cyan text-accent-cyan rounded-xl transition-all"
                      title="Download Certificate"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* Render QR Ticket Modal */}
        {selectedTicket && (
          <TicketModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            eventTitle={selectedTicket.title}
            eventDate={selectedTicket.date}
            eventTime={selectedTicket.time}
            eventVenue={selectedTicket.venue}
            ticketId={selectedTicket.ticketId}
            studentName={selectedTicket.studentName}
          />
        )}
      </main>
    </>
  );
}
