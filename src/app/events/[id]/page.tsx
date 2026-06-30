"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import GlassCard from "@/components/GlassCard";
import { Calendar, Clock, MapPin, CheckCircle, ArrowLeft, CreditCard } from "lucide-react";

import { fetchEventDetailsAction, registerForEventAction } from "@/app/actions";

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<any>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  React.useEffect(() => {
    fetchEventDetailsAction(params.id).then(setEvent);
  }, [params.id]);

  const handleRegister = async () => {
    if (!event) return;
    setIsRegistering(true);
    
    try {
      await registerForEventAction(event.id);
      setIsRegistering(false);
      setRegistrationSuccess(true);
    } catch (err) {
      console.error(err);
      setIsRegistering(false);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center font-space text-lg text-on-surface-variant bg-background">
        Loading Event Details...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="pt-24 pb-20 px-6 max-w-4xl mx-auto flex-grow min-h-screen">
        <Link 
          href="/events" 
          className="inline-flex items-center gap-1 text-sm font-space font-bold text-on-surface-variant hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events</span>
        </Link>

        {/* Details Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Main Content Column */}
          <div className="md:col-span-8 space-y-6">
            <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-[24px] border border-glass-border bg-surface-lowest">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent-cyan/10 flex items-center justify-center">
                <span className="font-space text-2xl font-bold text-primary opacity-60">{event.title} Banner</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-space font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full">
                {event.category}
              </span>
              <h1 className="font-space text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
                {event.title}
              </h1>
              <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed mb-6">
                {event.description}
              </p>
            </div>
          </div>

          {/* Checkout Card Column */}
          <div className="md:col-span-4 space-y-6">
            <GlassCard className="border border-glass-border">
              <div className="text-center mb-6">
                <span className="font-sans text-xs text-on-surface-variant">Registration Fee</span>
                <h3 className="font-space text-3xl font-bold text-foreground mt-1">
                  {event.price === 0 ? "Free" : `₹${event.price}`}
                </h3>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                  <div className="text-xs text-on-surface-variant">
                    <p className="font-bold text-foreground">Date</p>
                    <p>{event.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                  <div className="text-xs text-on-surface-variant">
                    <p className="font-bold text-foreground">Time</p>
                    <p>{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                  <div className="text-xs text-on-surface-variant">
                    <p className="font-bold text-foreground">Venue</p>
                    <p className="line-clamp-2">{event.venue}</p>
                  </div>
                </div>
              </div>

              {!registrationSuccess ? (
                <button
                  type="button"
                  disabled={isRegistering}
                  onClick={handleRegister}
                  className="w-full electric-glow-btn bg-gradient-to-r from-primary to-primary-to text-white py-3 rounded-xl font-space text-sm font-bold flex items-center justify-center gap-2"
                >
                  {isRegistering ? (
                    <>
                      <CreditCard className="w-4 h-4 animate-bounce" />
                      <span>Paying with Razorpay...</span>
                    </>
                  ) : (
                    <>
                      <span>Register for Fest</span>
                    </>
                  )}
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <div className="text-xs font-sans">
                      <p className="font-bold">Registered successfully!</p>
                      <p className="opacity-90">Your ticket is active on the dashboard.</p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard/student"
                    className="w-full bg-surface-glass border border-glass-border hover:bg-white/5 text-foreground py-3 rounded-xl font-space text-xs font-bold flex items-center justify-center transition-all"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      </main>
    </>
  );
}
