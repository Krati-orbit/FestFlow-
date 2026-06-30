"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, LogIn, LogOut } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  // Determine user mode from route pathname
  const isStudent = pathname.startsWith("/dashboard/student");
  const isOrganizer = pathname.startsWith("/dashboard/organizer");
  const isAdmin = pathname.startsWith("/dashboard/admin");
  const isVolunteer = pathname.startsWith("/dashboard/volunteer");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-surface-lowest/50 backdrop-blur-xl border-b border-glass-border">
      <div className="flex justify-between items-center w-full px-6 max-w-7xl mx-auto h-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity">
          <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          <span className="font-space text-xl font-bold tracking-tight text-primary">FestFlow</span>
        </Link>

        {/* Dynamic Navigation Links based on active mode */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          {isStudent && (
            <>
              <Link href="/events" className="font-space text-sm font-medium text-on-surface-variant hover:text-primary transition-colors h-full flex items-center">
                Explore Events
              </Link>
              <Link href="/dashboard/student" className="font-space text-sm font-medium text-primary border-b-2 border-primary h-full flex items-center">
                Student Dashboard
              </Link>
            </>
          )}
          
          {isOrganizer && (
            <>
              <Link href="/dashboard/organizer/create" className="font-space text-sm font-medium text-on-surface-variant hover:text-primary transition-colors h-full flex items-center">
                Create Event
              </Link>
              <Link href="/dashboard/organizer" className="font-space text-sm font-medium text-primary border-b-2 border-primary h-full flex items-center">
                Organizer Dashboard
              </Link>
            </>
          )}

          {isAdmin && (
            <Link href="/dashboard/admin" className="font-space text-sm font-medium text-primary border-b-2 border-primary h-full flex items-center">
              Admin Console
            </Link>
          )}

          {isVolunteer && (
            <Link href="/dashboard/volunteer" className="font-space text-sm font-medium text-primary border-b-2 border-primary h-full flex items-center">
              Volunteer Dashboard
            </Link>
          )}

          {!isStudent && !isOrganizer && !isAdmin && !isVolunteer && (
            <Link href="/events" className="font-space text-sm font-medium text-on-surface-variant hover:text-primary transition-colors h-full flex items-center">
              Explore Events
            </Link>
          )}
        </nav>

        {/* Dynamic User Profile / Auth Area */}
        <div className="flex items-center gap-4">
          {isStudent && (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline font-sans text-xs text-on-surface-variant">Alex Mercer (Student)</span>
              <Link href="/auth/signin" className="flex items-center gap-1.5 bg-surface-glass border border-glass-border hover:bg-white/5 text-foreground px-4 py-1.5 rounded-xl font-space text-xs font-bold transition-all">
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </Link>
            </div>
          )}

          {isOrganizer && (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline font-sans text-xs text-on-surface-variant">Sarah Jones (Organizer)</span>
              <Link href="/auth/signin" className="flex items-center gap-1.5 bg-surface-glass border border-glass-border hover:bg-white/5 text-foreground px-4 py-1.5 rounded-xl font-space text-xs font-bold transition-all">
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </Link>
            </div>
          )}

          {isAdmin && (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline font-sans text-xs text-on-surface-variant">Dean Harrison (Admin)</span>
              <Link href="/auth/signin" className="flex items-center gap-1.5 bg-surface-glass border border-glass-border hover:bg-white/5 text-foreground px-4 py-1.5 rounded-xl font-space text-xs font-bold transition-all">
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </Link>
            </div>
          )}

          {isVolunteer && (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline font-sans text-xs text-on-surface-variant">Marcus Brody (Volunteer)</span>
              <Link href="/auth/signin" className="flex items-center gap-1.5 bg-surface-glass border border-glass-border hover:bg-white/5 text-foreground px-4 py-1.5 rounded-xl font-space text-xs font-bold transition-all">
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </Link>
            </div>
          )}

          {!isStudent && !isOrganizer && !isAdmin && !isVolunteer && (
            <Link href="/auth/signin" className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-to text-white px-5 py-2 rounded-xl font-space text-sm font-bold shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] active:scale-95 transition-all">
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
