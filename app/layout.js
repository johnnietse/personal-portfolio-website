import Navigation from "@/components/Navigation";
import AOSSetup from "@/components/AOSSetup";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollPhysics from "@/components/ScrollPhysics";
import BlackHoleCursor from "@/components/BlackHoleCursor";
import PerformanceHUD from "@/components/PerformanceHUD";
import IronManHUD from "@/components/IronManHUD";
import { PerformanceProvider } from "@/components/PerformanceManager";
import "./globals.css";
import "aos/dist/aos.css";

export const metadata = {
  title: "Johnnie Tse | Software Engineer",
  description: "Portfolio of Johnnie Tse, Computer Engineering student at Queen's University.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <PerformanceProvider>
          <AOSSetup />
          <Navigation />
          <ParticleBackground />
          <ScrollPhysics />
          <BlackHoleCursor />
          <PerformanceHUD />
          <IronManHUD />
          {children}
        </PerformanceProvider>
      </body>
    </html>
  );
}
