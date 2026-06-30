"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/GlassCard";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  X, 
  Calendar, 
  Clock, 
  Info,
  Zap,
  CheckCircle,
  Eye
} from "lucide-react";

import { createEventAction } from "@/app/actions";

const categories = ["Hackathon", "Cultural", "Sports", "Tech", "Business"];

export default function CreateEventWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [eventName, setEventName] = useState("");
  const [selectedCat, setSelectedCat] = useState("Hackathon");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [price, setPrice] = useState("0");
  const [capacity, setCapacity] = useState("100");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      try {
        await createEventAction({
          title: eventName,
          description,
          category: selectedCat,
          date,
          time,
          venue,
          price: parseFloat(price) || 0,
          capacity: parseInt(capacity) || 100,
        });
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setTimeout(() => {
          router.push("/dashboard/organizer");
        }, 1500);
      } catch (err) {
        console.error(err);
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground custom-scrollbar">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 h-20 flex justify-between items-center px-6 md:px-12 bg-surface-low/50 backdrop-blur-xl border-b border-glass-border">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="font-space text-xl font-bold tracking-tight text-primary">Fastflow</span>
        </div>
        <Link 
          href="/dashboard/organizer"
          className="text-on-surface-variant font-medium hover:text-primary transition-all flex items-center gap-1.5 px-4 py-2 rounded-xl glass-panel text-xs font-space"
        >
          <X className="w-4 h-4" />
          <span>Exit Wizard</span>
        </Link>
      </header>

      <main className="relative z-10 pt-28 pb-20 px-6 max-w-4xl mx-auto">
        {/* Multi-step Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative px-2 max-w-2xl mx-auto">
            {/* Background progress track */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2 z-0"></div>
            {/* Active progress fill */}
            <div 
              className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-primary to-primary-to -translate-y-1/2 z-0 transition-all duration-500 ease-in-out"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>

            {/* Step badges */}
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="relative z-10 flex flex-col items-center gap-2">
                <div 
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-space text-xs font-bold transition-all duration-300 border ${
                    step >= num 
                      ? "bg-primary text-white border-primary shadow-[0_0_15px_rgba(139,92,246,0.5)]" 
                      : "bg-surface-lowest text-on-surface-variant border-glass-border"
                  }`}
                >
                  {num}
                </div>
                <span className={`font-space text-[10px] uppercase font-bold tracking-wider ${step >= num ? "text-primary" : "text-on-surface-variant"}`}>
                  {num === 1 ? "Basic Info" : num === 2 ? "Venues" : num === 3 ? "Tickets" : "Review"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Wizard Form */}
        <GlassCard className="border border-glass-border p-8 mb-12">
          {submitSuccess ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="font-space text-2xl font-bold text-foreground">Event Published Successfully!</h2>
              <p className="font-sans text-sm text-on-surface-variant">Redirecting back to dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleNext} className="space-y-6">
              <header className="border-b border-glass-border/30 pb-6 mb-8">
                <h1 className="font-space text-2xl md:text-3xl font-bold text-foreground">
                  {step === 1 ? "Create New Event" : step === 2 ? "Configure Venue" : step === 3 ? "Ticket Options" : "Review & Publish"}
                </h1>
                <p className="font-sans text-xs text-on-surface-variant mt-1.5">
                  {step === 1 ? "Ignite your project's momentum. Provide the core details of your event." :
                   step === 2 ? "Where will the magic happen? Define the locations and capacity." :
                   step === 3 ? "Set up tickets, prices, and attendee restrictions." :
                   "Verify the details below before launching your event to campus."}
                </p>
              </header>

              {/* Step 1: Basic Info */}
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-7 space-y-4">
                    <div className="space-y-1.5">
                      <label className="font-space text-xs font-bold text-foreground uppercase tracking-wider" htmlFor="event-name">Event Name</label>
                      <input 
                        type="text" 
                        id="event-name" 
                        required
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        placeholder="e.g. Genesis Hackathon 2026"
                        className="w-full bg-surface-lowest/50 border border-glass-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-space text-xs font-bold text-foreground uppercase tracking-wider">Category</label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedCat(cat)}
                            className={`px-4 py-2 rounded-xl text-xs font-space font-bold uppercase transition-all border ${
                              selectedCat === cat
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-glass-border text-on-surface-variant hover:border-accent-cyan hover:text-accent-cyan"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-space text-xs font-bold text-foreground uppercase tracking-wider" htmlFor="description">Description</label>
                      <textarea 
                        id="description" 
                        required
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tell the world about your event's mission..."
                        className="w-full bg-surface-lowest/50 border border-glass-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-5 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <label className="font-space text-xs font-bold text-foreground uppercase tracking-wider">Event Poster</label>
                      <div className="glass-panel border-dashed border-2 border-glass-border hover:border-primary rounded-2xl h-56 flex flex-col items-center justify-center p-6 text-center cursor-pointer group transition-all">
                        <Upload className="w-8 h-8 text-primary group-hover:scale-110 transition-transform mb-3" />
                        <p className="font-space text-xs font-bold text-foreground mb-0.5">Click to upload banner</p>
                        <p className="font-sans text-[10px] text-on-surface-variant">PNG, JPG up to 5MB</p>
                      </div>
                    </div>

                    <div className="mt-4 bg-accent-cyan/5 border border-accent-cyan/15 rounded-xl p-4 flex gap-3 text-[11px] leading-relaxed text-on-surface-variant">
                      <Info className="w-5 h-5 text-accent-cyan shrink-0" />
                      <p>Visual assets help increase engagement rates by up to 40%. Recommend uploading a high-resolution banner.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Venues */}
              {step === 2 && (
                <div className="space-y-4 max-w-xl">
                  <div className="space-y-1.5">
                    <label className="font-space text-xs font-bold text-foreground uppercase tracking-wider" htmlFor="venue">Venue Location</label>
                    <input 
                      type="text" 
                      id="venue" 
                      required
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      placeholder="e.g. Main Auditorium, CS Building Room 204"
                      className="w-full bg-surface-lowest/50 border border-glass-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-space text-xs font-bold text-foreground uppercase tracking-wider" htmlFor="date">Date</label>
                      <input 
                        type="date" 
                        id="date" 
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-surface-lowest/50 border border-glass-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-space text-xs font-bold text-foreground uppercase tracking-wider" htmlFor="time">Time</label>
                      <input 
                        type="time" 
                        id="time" 
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-surface-lowest/50 border border-glass-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Tickets */}
              {step === 3 && (
                <div className="space-y-4 max-w-xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-space text-xs font-bold text-foreground uppercase tracking-wider" htmlFor="price">Ticket Price (₹)</label>
                      <input 
                        type="number" 
                        id="price" 
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0 for free"
                        className="w-full bg-surface-lowest/50 border border-glass-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-space text-xs font-bold text-foreground uppercase tracking-wider" htmlFor="capacity">Capacity (tickets)</label>
                      <input 
                        type="number" 
                        id="capacity" 
                        required
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        placeholder="100"
                        className="w-full bg-surface-lowest/50 border border-glass-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="bg-surface-lowest/40 border border-glass-border rounded-2xl p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-sans text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Event Name</p>
                        <p className="font-space text-base font-bold text-foreground mt-1">{eventName || "Untitled Event"}</p>
                      </div>
                      <div>
                        <p className="font-sans text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Category</p>
                        <p className="font-space text-sm font-bold text-primary mt-1">{selectedCat}</p>
                      </div>
                    </div>

                    <div className="border-t border-glass-border/30 pt-4">
                      <p className="font-sans text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Description</p>
                      <p className="font-sans text-xs text-on-surface-variant mt-1 leading-relaxed">{description || "No description provided."}</p>
                    </div>

                    <div className="border-t border-glass-border/30 pt-4 grid grid-cols-3 gap-4">
                      <div>
                        <p className="font-sans text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Venue</p>
                        <p className="font-space text-xs font-bold text-foreground mt-1">{venue || "TBD"}</p>
                      </div>
                      <div>
                        <p className="font-sans text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Date & Time</p>
                        <p className="font-space text-xs font-bold text-foreground mt-1">{date || "TBD"} at {time || "TBD"}</p>
                      </div>
                      <div>
                        <p className="font-sans text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Tickets</p>
                        <p className="font-space text-xs font-bold text-foreground mt-1">
                          {capacity} tickets @ {price === "0" || price === "" ? "Free" : `₹${price}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Action Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-glass-border/30">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-3 rounded-xl border border-glass-border text-on-surface-variant hover:border-primary hover:text-primary font-space text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div></div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="electric-glow-btn bg-gradient-to-r from-primary to-primary-to text-white px-8 py-3 rounded-xl font-space text-xs font-bold flex items-center gap-1.5"
                >
                  {isSubmitting ? (
                    <span>Publishing...</span>
                  ) : step === 4 ? (
                    <>
                      <span>Publish Event</span>
                      <CheckCircle className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Next Step</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </GlassCard>

        {/* Tips Section */}
        <aside className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="border border-glass-border p-6 flex flex-col justify-between">
            <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center mb-4">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="font-space text-sm font-bold text-foreground mb-1">Fast Flow</h4>
            <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
              Our wizard is optimized for speed. Complete this form in under 2 minutes to launch your event draft.
            </p>
          </GlassCard>

          <GlassCard className="border border-glass-border p-6 flex flex-col justify-between">
            <div className="w-9 h-9 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan flex items-center justify-center mb-4">
              <Eye className="w-4 h-4" />
            </div>
            <h4 className="font-space text-sm font-bold text-foreground mb-1">Real-time Preview</h4>
            <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
              What you see is what they get. Your description is automatically formatted for the discovery page.
            </p>
          </GlassCard>

          <GlassCard className="border border-glass-border p-6 flex flex-col justify-between">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-4">
              <CheckCircle className="w-4 h-4" />
            </div>
            <h4 className="font-space text-sm font-bold text-foreground mb-1">Auto-Save</h4>
            <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
              Never lose your work. Changes are saved locally every time you pause typing.
            </p>
          </GlassCard>
        </aside>
      </main>
    </div>
  );
}
