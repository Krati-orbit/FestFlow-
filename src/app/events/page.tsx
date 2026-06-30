"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import EventCard from "@/components/EventCard";
import GlassCard from "@/components/GlassCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { fetchEventsAction } from "../actions";

const categories = ["All", "Tech", "Cultural", "Sports", "Business"];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchEventsAction().then(setEvents);
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex-grow min-h-screen">
        <header className="mb-12">
          <h1 className="font-space text-3xl md:text-5xl font-bold text-foreground mb-3">
            Explore Events
          </h1>
          <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-lg">
            Find and register for the most exciting hackathons, sports fests, and cultural events happening in campus.
          </p>
        </header>

        {/* Filter and Search Panel */}
        <GlassCard className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-glass-border">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search fests, hackathons, seminars..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-surface-lowest/50 border border-glass-border rounded-xl text-foreground font-sans text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 text-xs font-space font-bold text-on-surface-variant uppercase tracking-wider mr-2">
              <SlidersHorizontal className="w-4 h-4 text-accent-cyan" />
              <span>Filters:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-space font-bold uppercase transition-all duration-200 border ${
                  selectedCategory === cat
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-glass-border text-on-surface-variant hover:border-accent-cyan hover:text-accent-cyan"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                category={event.category}
                date={event.date}
                venue={event.venue}
                price={event.price}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-space text-lg text-on-surface-variant">No events match your criteria.</p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-4 text-sm font-space font-bold text-primary hover:text-accent-cyan underline transition-colors"
            >
              Reset Search & Filters
            </button>
          </div>
        )}
      </main>
    </>
  );
}
