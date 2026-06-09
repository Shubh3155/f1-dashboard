import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "F1 Analytics Dashboard | 2026 Season",
  description:
    "Real-time Formula 1 2026 analytics dashboard with ML-powered race predictions, live standings, interactive telemetry charts, and championship projections. Featuring all 11 teams and 22 drivers.",
  keywords: [
    "Formula 1",
    "F1 2026",
    "race predictions",
    "analytics",
    "machine learning",
    "standings",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Sidebar />

        <main
          className="pt-[var(--navbar-height)] xl:pr-[var(--sidebar-width)] min-h-screen"
        >
          <div className="max-w-[var(--content-max-width)] mx-auto p-4 lg:p-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
