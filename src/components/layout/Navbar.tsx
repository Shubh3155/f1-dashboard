"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Trophy,
  Brain,
  BarChart3,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/standings", label: "Standings", icon: Trophy },
  { href: "/predictions", label: "Predictions", icon: Brain },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-[var(--navbar-height)] border-b border-[var(--border-subtle)]"
        style={{
          background: "linear-gradient(180deg, rgba(21,21,30,0.98) 0%, rgba(21,21,30,0.95) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="max-w-[var(--content-max-width)] mx-auto h-full px-4 lg:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-[var(--f1-red)] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[var(--f1-red-glow)] transition-shadow duration-300">
                <Zap className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider text-white leading-none">
                F1<span className="text-[var(--f1-red)]">-</span>SENTINEL
              </span>
              <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.2em] leading-none mt-0.5">
                2026 Season
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold uppercase tracking-wider transition-all duration-200",
                    isActive
                      ? "text-white bg-[var(--surface)]"
                      : "text-[var(--text-secondary)] hover:text-white hover:bg-[var(--surface)]"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-[var(--f1-red)] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Live Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border-subtle)]">
            <div className="status-dot live" />
            <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
              Season Live
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-[var(--surface)] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-[var(--charcoal)] border-l border-[var(--border-subtle)] lg:hidden"
            >
              <div className="p-6 pt-20 flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all duration-200",
                        isActive
                          ? "text-white bg-[var(--surface)] border-l-[3px] border-[var(--f1-red)]"
                          : "text-[var(--text-secondary)] hover:text-white hover:bg-[var(--surface)]"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
