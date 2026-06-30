import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import GlassCard from "@/components/GlassCard";
import EventCard from "@/components/EventCard";
import { Sparkles, ArrowRight, PlayCircle, QrCode, Shield, Zap, BarChart2, User } from "lucide-react";
import { fetchEventsAction } from "./actions";

export default async function Home() {
  const fests = await fetchEventsAction();
  const upcomingFests = fests.slice(0, 3);

  return (
    <>
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="z-10">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-3.5 py-1 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="font-space text-xs font-bold uppercase tracking-wider">Trusted by 50+ Universities</span>
              </div>
              <h1 className="font-space text-4xl md:text-5xl lg:text-6xl text-foreground font-bold mb-6 leading-tight">
                Manage College Fests <br />
                <span className="bg-gradient-to-r from-primary to-primary-to bg-clip-text text-transparent italic">
                  The Easy Way
                </span>
              </h1>
              <p className="font-sans text-base md:text-lg text-on-surface-variant mb-10 max-w-lg">
                The all-in-one platform for student organizers to streamline registration, track attendance with QR codes, and automate certificate distribution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/dashboard/organizer/create" 
                  className="electric-glow-btn bg-gradient-to-r from-primary to-primary-to text-white px-8 py-4 rounded-xl font-space font-bold flex items-center justify-center gap-2"
                >
                  Create Your Fest
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/events" 
                  className="bg-surface-glass border border-glass-border hover:bg-surface-bright/20 text-foreground px-8 py-4 rounded-xl font-space font-bold flex items-center justify-center gap-2 transition-all"
                >
                  Watch Demo
                  <PlayCircle className="w-4 h-4 text-accent-cyan" />
                </Link>
              </div>
            </div>
            
            <div className="relative">
              {/* Radial Ambient Glows specifically for hero */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/15 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent-cyan/10 rounded-full blur-3xl animate-pulse-slow"></div>
              
              <div className="relative z-10 glass-panel rounded-[24px] p-6 shadow-2xl rotate-2">
                <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-surface-lowest to-surface-low border border-glass-border p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-glass-border pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="font-space text-xs text-on-surface-variant font-medium">festflow.co/dashboard</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center relative">
                    <span className="font-space text-sm font-bold text-primary tracking-widest opacity-80 animate-pulse">
                      HIGH-VELOCITY DASHBOARD
                    </span>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-surface-lowest/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-glass-border flex items-center gap-3 animate-bounce" style={{ animationDuration: "3s" }}>
                  <div className="w-10 h-10 bg-accent-cyan/15 rounded-xl flex items-center justify-center text-accent-cyan border border-accent-cyan/20">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] text-on-surface-variant font-medium">Scanning active</p>
                    <p className="font-space text-xs font-bold text-foreground">1.2k Check-ins</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Features Section */}
        <section className="py-24 bg-surface-lowest/20" id="features">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-space text-3xl md:text-4xl mb-4 font-bold text-foreground">
                Designed for High-Octane Events
              </h2>
              <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-2xl mx-auto">
                Skip the spreadsheets. FestFlow provides the infrastructure so you can focus on the vibe.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Large Feature: Easy Registration */}
              <GlassCard className="md:col-span-8 flex flex-col justify-between overflow-hidden relative group p-8">
                <div>
                  <span className="bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full font-space text-[10px] font-bold uppercase tracking-wider">
                    Streamlined
                  </span>
                  <h3 className="font-space text-2xl font-bold mt-4 mb-2">Easy Registration</h3>
                  <p className="font-sans text-sm text-on-surface-variant max-w-sm">
                    Custom forms, integrated payment gateways (Razorpay), and instant ticket generation for your attendees.
                  </p>
                </div>
                <div className="mt-8 h-48 w-full bg-gradient-to-b from-surface-lowest to-surface-low border border-glass-border rounded-t-xl p-4 translate-y-6 group-hover:translate-y-2 transition-transform duration-500">
                  <div className="flex items-center justify-between border-b border-glass-border pb-2 mb-4">
                    <span className="font-space text-xs font-bold text-accent-cyan">Registration Form</span>
                    <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
                  </div>
                  <div className="space-y-2.5">
                    <div className="h-8 bg-surface-lowest border border-glass-border rounded-lg w-full flex items-center px-3 text-xs text-on-surface-variant">Full Name</div>
                    <div className="h-8 bg-surface-lowest border border-glass-border rounded-lg w-full flex items-center px-3 text-xs text-on-surface-variant">University Email</div>
                  </div>
                </div>
              </GlassCard>

              {/* Small Feature: QR Attendance */}
              <div className="md:col-span-4 bg-gradient-to-b from-primary to-primary-to rounded-[20px] p-8 flex flex-col justify-between items-center text-center shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                  <QrCode className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-space text-xl font-bold text-white mb-2">QR Attendance</h3>
                  <p className="font-sans text-xs text-white/80 leading-relaxed">
                    Speed up entry with lightning-fast scanning via html5-qrcode. No more paper lists or long queues.
                  </p>
                </div>
                <div className="mt-8 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="bg-accent-cyan h-full w-4/5 animate-pulse"></div>
                </div>
              </div>

              {/* Medium Feature: Auto Certificates */}
              <GlassCard className="md:col-span-4 flex flex-col justify-between p-8">
                <div className="w-12 h-12 bg-accent-cyan/10 border border-accent-cyan/20 rounded-xl flex items-center justify-center text-accent-cyan mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-space text-lg font-bold mb-2">Auto Certificates</h3>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                    Generate and mail personalized participation certificates automatically after the event.
                  </p>
                </div>
              </GlassCard>

              {/* Dynamic Metric: Data Visualization */}
              <GlassCard className="md:col-span-8 flex items-center gap-8 overflow-hidden p-8">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary mb-4">
                    <BarChart2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-space text-lg font-bold mb-2">Real-time Analytics</h3>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                    Track sales, department participation, and peak attendance hours in one centralized dashboard.
                  </p>
                </div>
                <div className="flex-1 flex gap-2 items-end h-32 border-b border-glass-border">
                  <div className="bg-primary/20 hover:bg-primary border border-primary/30 w-full rounded-t-lg transition-colors" style={{ height: "40%" }}></div>
                  <div className="bg-primary/25 hover:bg-primary border border-primary/30 w-full rounded-t-lg transition-colors" style={{ height: "70%" }}></div>
                  <div className="bg-primary/20 hover:bg-primary border border-primary/30 w-full rounded-t-lg transition-colors" style={{ height: "50%" }}></div>
                  <div className="bg-gradient-to-t from-primary to-primary-to w-full rounded-t-lg shadow-[0_0_15px_rgba(139,92,246,0.5)]" style={{ height: "90%" }}></div>
                  <div className="bg-primary/25 hover:bg-primary border border-primary/30 w-full rounded-t-lg transition-colors" style={{ height: "60%" }}></div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Upcoming Events Preview */}
        <section className="py-24" id="events">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h2 className="font-space text-3xl font-bold text-foreground">Upcoming Fests</h2>
                <p className="font-sans text-sm text-on-surface-variant mt-1">Discover what's happening in campuses around you.</p>
              </div>
              <Link 
                href="/events" 
                className="font-space text-sm font-bold text-primary flex items-center gap-1 group"
              >
                Explore All Events
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingFests.map((fest) => (
                <EventCard 
                  key={fest.id}
                  id={fest.id}
                  title={fest.title}
                  description={fest.description}
                  category={fest.category}
                  date={fest.date}
                  venue={fest.venue}
                  price={fest.price}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-br from-surface-low to-surface-lowest border border-glass-border rounded-[40px] p-12 md:p-24 overflow-hidden text-center flex flex-col items-center shadow-[0_0_50px_rgba(139,92,246,0.15)]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-cyan/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
            
            <h2 className="font-space text-3xl md:text-5xl text-foreground font-bold mb-6 relative z-10">
              Ready to level up your campus life?
            </h2>
            <p className="font-sans text-sm md:text-base text-on-surface-variant mb-10 max-w-xl relative z-10">
              Join thousands of student organizers building better experiences with FestFlow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <Link 
                href="/dashboard/organizer/create" 
                className="electric-glow-btn bg-gradient-to-r from-primary to-primary-to text-white px-10 py-5 rounded-2xl font-space font-bold hover:scale-105 transition-transform"
              >
                Get Started for Free
              </Link>
              <Link 
                href="/events" 
                className="bg-surface-glass border border-glass-border text-foreground px-10 py-5 rounded-2xl font-space font-bold hover:bg-white/5 transition-colors"
              >
                Browse Fests
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-glass-border bg-surface-lowest/80 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="font-space text-lg font-bold text-primary">FestFlow</span>
              </div>
              <p className="font-sans text-xs text-on-surface-variant max-w-xs leading-relaxed">
                Empowering the next generation of campus leaders with modern tools for event management, ticketing, and verification.
              </p>
            </div>
            <div>
              <h5 className="font-space text-xs font-bold text-foreground uppercase tracking-widest mb-4">Product</h5>
              <ul className="space-y-2 text-xs text-on-surface-variant">
                <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="/events" className="hover:text-primary transition-colors">Events</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-space text-xs font-bold text-foreground uppercase tracking-widest mb-4">Support</h5>
              <ul className="space-y-2 text-xs text-on-surface-variant">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-space text-xs font-bold text-foreground uppercase tracking-widest mb-4">Company</h5>
              <ul className="space-y-2 text-xs text-on-surface-variant">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans text-xs text-on-surface-variant">© 2026 FestFlow Platform. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-on-surface-variant">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 py-2 bg-surface-lowest/90 backdrop-blur-xl border-t border-glass-border rounded-t-2xl shadow-2xl">
        <Link href="/" className="flex flex-col items-center justify-center text-primary px-3 py-1 font-space text-[10px] font-bold">
          <Sparkles className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </Link>
        <Link href="/events" className="flex flex-col items-center justify-center text-on-surface-variant px-3 py-1 font-space text-[10px] font-bold">
          <Zap className="w-5 h-5 mb-0.5" />
          <span>Explore</span>
        </Link>
        <Link href="/dashboard/student" className="flex flex-col items-center justify-center text-on-surface-variant px-3 py-1 font-space text-[10px] font-bold">
          <User className="w-5 h-5 mb-0.5" />
          <span>Tickets</span>
        </Link>
      </nav>
    </>
  );
}
