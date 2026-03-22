import Navigation from "@/components/Navigation";
import AOSSetup from "@/components/AOSSetup";
import "./globals.css";
import "aos/dist/aos.css";

export const metadata = {
  title: "Johnnie Tse | Software Engineer",
  description: "Portfolio of Johnnie Tse, Computer Engineering student at Queen's University.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AOSSetup />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
