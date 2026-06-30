import type { Metadata } from "next";
import "./globals.css";
import RoleSwitcher from "@/components/RoleSwitcher";

export const metadata: Metadata = {
  title: "FestFlow | Premium College Event Management Platform",
  description: "Ignite your campus life. Streamline registration, check-ins, and certificate distribution with Electric Aurora precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-full font-sans bg-background text-foreground antialiased selection:bg-primary/30 selection:text-accent-cyan">
        {/* Ambient Glows */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-cyan/5 blur-[150px] animate-pulse-slow" style={{ animationDelay: '-4s' }}></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
          <RoleSwitcher />
        </div>
      </body>
    </html>
  );
}
