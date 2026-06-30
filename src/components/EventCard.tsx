import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import GlassCard from "./GlassCard";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  bannerUrl?: string;
  category: string;
  date: string;
  venue: string;
  price: number;
}

export default function EventCard({
  id,
  title,
  description,
  bannerUrl,
  category,
  date,
  venue,
  price,
}: EventCardProps) {
  // Format date
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = dateObj.getDate();

  return (
    <GlassCard className="group overflow-hidden flex flex-col h-full border border-glass-border hover:shadow-[0_0_24px_rgba(139,92,246,0.1)] p-0">
      {/* Banner */}
      <div className="relative h-48 w-full overflow-hidden bg-surface-lowest">
        {bannerUrl ? (
          <img 
            src={bannerUrl} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent-cyan/10 flex items-center justify-center">
            <span className="font-space text-lg font-bold text-primary opacity-50">FestFlow Event</span>
          </div>
        )}
        {/* Date Overlay */}
        <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex flex-col items-center">
          <span className="font-space text-xs font-bold text-primary">{month}</span>
          <span className="font-space text-lg font-bold text-foreground leading-none mt-0.5">{day}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex gap-2 mb-3">
          <span className="text-[10px] font-space font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full">
            {category}
          </span>
          <span className="text-[10px] font-space font-bold uppercase tracking-wider bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 px-2.5 py-0.5 rounded-full">
            {price === 0 ? "Free" : `₹${price}`}
          </span>
        </div>

        <h4 className="font-space text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {title}
        </h4>
        <p className="font-sans text-sm text-on-surface-variant mb-6 line-clamp-2">
          {description}
        </p>

        {/* Footer info */}
        <div className="mt-auto pt-4 border-t border-glass-border flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-on-surface-variant font-sans text-xs">
            <MapPin className="w-3.5 h-3.5 text-accent-cyan" />
            <span className="line-clamp-1">{venue}</span>
          </div>
          
          <Link href={`/events/${id}`} className="flex items-center gap-1 text-xs font-space font-bold text-primary hover:text-accent-cyan transition-colors group/btn">
            <span>Register</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </GlassCard>
  );
}
