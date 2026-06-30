import React from "react";
import { X, Calendar, MapPin, CheckCircle, Clock } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  ticketId: string;
  studentName: string;
}

export default function TicketModal({
  isOpen,
  onClose,
  eventTitle,
  eventDate,
  eventTime,
  eventVenue,
  ticketId,
  studentName,
}: TicketModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-md" 
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative w-full max-w-sm glass-panel border border-glass-border rounded-[24px] p-6 text-center shadow-[0_0_50px_rgba(139,92,246,0.3)] animate-in fade-in zoom-in-95 duration-200">
        <button 
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-on-surface-variant hover:text-white transition-colors"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand */}
        <div className="flex justify-center items-center gap-1.5 mb-6">
          <span className="font-space font-bold uppercase tracking-widest text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
            FESTFLOW TICKET
          </span>
        </div>

        {/* QR Code Container */}
        <div className="flex justify-center mb-6">
          <div className="bg-white p-4 rounded-2xl border-4 border-primary/20 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <QRCodeSVG 
              value={ticketId} 
              size={180} 
              level="H" 
              fgColor="#101221" 
              includeMargin={false}
            />
          </div>
        </div>

        {/* Ticket Details */}
        <h3 className="font-space text-lg font-bold text-foreground mb-1 leading-snug">
          {eventTitle}
        </h3>
        <p className="font-sans text-xs text-primary mb-4 font-semibold">
          Attendee: {studentName}
        </p>

        <div className="space-y-2 text-left bg-surface-lowest/50 border border-glass-border rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <Calendar className="w-4 h-4 text-accent-cyan" />
            <span>{eventDate}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <Clock className="w-4 h-4 text-accent-cyan" />
            <span>{eventTime}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <MapPin className="w-4 h-4 text-accent-cyan" />
            <span>{eventVenue}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-accent-cyan text-sm font-space font-bold">
          <CheckCircle className="w-4 h-4 animate-pulse" />
          <span>Ticket Status: Active</span>
        </div>
      </div>
    </div>
  );
}
