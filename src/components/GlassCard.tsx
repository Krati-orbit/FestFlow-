import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverGlow?: boolean;
}

export default function GlassCard({ children, hoverGlow = true, className = "", ...props }: GlassCardProps) {
  return (
    <div 
      className={`glass-panel rounded-[20px] p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
