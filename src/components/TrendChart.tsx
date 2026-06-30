import React from "react";

export default function TrendChart() {
  return (
    <div className="relative w-full h-64 overflow-hidden">
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 200">
        <defs>
          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3"></stop>
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"></stop>
          </linearGradient>
        </defs>
        {/* Grid Lines */}
        <line stroke="#222a3d" strokeWidth="0.5" x1="0" x2="800" y1="50" y2="50"></line>
        <line stroke="#222a3d" strokeWidth="0.5" x1="0" x2="800" y1="100" y2="100"></line>
        <line stroke="#222a3d" strokeWidth="0.5" x1="0" x2="800" y1="150" y2="150"></line>
        {/* Area */}
        <path d="M0,180 L50,160 L100,170 L150,130 L200,140 L250,90 L300,100 L350,60 L400,80 L450,40 L500,70 L550,50 L600,80 L650,40 L700,60 L750,30 L800,50 L800,200 L0,200 Z" fill="url(#chartGradient)"></path>
        {/* Line */}
        <path d="M0,180 L50,160 L100,170 L150,130 L200,140 L250,90 L300,100 L350,60 L400,80 L450,40 L500,70 L550,50 L600,80 L650,40 L700,60 L750,30 L800,50" fill="none" stroke="#8b5cf6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
        {/* Points */}
        <circle cx="450" cy="40" fill="white" r="4" stroke="#8b5cf6" strokeWidth="2"></circle>
        <circle cx="750" cy="30" fill="white" r="4" stroke="#8b5cf6" strokeWidth="2"></circle>
      </svg>
      {/* Tooltip Marker */}
      <div className="absolute left-[56%] top-[12%] bg-primary text-white text-[10px] px-2 py-1 rounded shadow-lg pointer-events-none border border-white/10 backdrop-blur-sm">
        Day 18: +42 Registrations
      </div>
    </div>
  );
}
