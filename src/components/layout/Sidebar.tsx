"use client";

import { motion } from "framer-motion";
import { Newspaper, Bell, AlertTriangle, Flag, Wrench } from "lucide-react";

interface NewsItem {
  id: string;
  category: "urgent" | "race_control" | "news" | "technical";
  title: string;
  time: string;
  isNew: boolean;
}

const newsItems: NewsItem[] = [
  {
    id: "1",
    category: "race_control",
    title: "FIA confirms DRS zones for Spanish GP — 2 detection points on main straight",
    time: "2h ago",
    isNew: true,
  },
  {
    id: "2",
    category: "urgent",
    title: "Mercedes brings significant floor upgrade package to Barcelona",
    time: "3h ago",
    isNew: true,
  },
  {
    id: "3",
    category: "news",
    title: "Antonelli extends championship lead to 66 points after Monaco masterclass",
    time: "2d ago",
    isNew: false,
  },
  {
    id: "4",
    category: "technical",
    title: "Ferrari testing new active aero configuration in private Fiorano session",
    time: "2d ago",
    isNew: false,
  },
  {
    id: "5",
    category: "race_control",
    title: "Revised track limits protocol issued for Turn 5 at Catalunya",
    time: "3d ago",
    isNew: false,
  },
  {
    id: "6",
    category: "news",
    title: "Cadillac targeting first points finish at Spanish Grand Prix",
    time: "3d ago",
    isNew: false,
  },
  {
    id: "7",
    category: "urgent",
    title: "Red Bull confirms power unit upgrade for Verstappen's RB22",
    time: "4d ago",
    isNew: false,
  },
  {
    id: "8",
    category: "technical",
    title: "New 2026 active aero regulations showing 55% drag reduction in boost mode",
    time: "5d ago",
    isNew: false,
  },
];

const categoryConfig = {
  urgent: {
    icon: AlertTriangle,
    label: "URGENT",
    color: "#E10600",
    bg: "rgba(225, 6, 0, 0.1)",
  },
  race_control: {
    icon: Flag,
    label: "RACE CONTROL",
    color: "#FFD700",
    bg: "rgba(255, 215, 0, 0.1)",
  },
  news: {
    icon: Newspaper,
    label: "NEWS",
    color: "#27F4D2",
    bg: "rgba(39, 244, 210, 0.1)",
  },
  technical: {
    icon: Wrench,
    label: "TECHNICAL",
    color: "#6692FF",
    bg: "rgba(102, 146, 255, 0.1)",
  },
};

export default function Sidebar() {
  return (
    <aside className="hidden xl:block fixed right-0 top-[var(--navbar-height)] bottom-0 w-[var(--sidebar-width)] border-l border-[var(--border-subtle)] overflow-y-auto"
      style={{
        background: "linear-gradient(180deg, var(--charcoal) 0%, var(--carbon-black) 100%)",
      }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 p-4 border-b border-[var(--border-subtle)]"
        style={{ background: "rgba(31,31,39,0.95)", backdropFilter: "blur(10px)" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[var(--f1-red)]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Race Control
            </h2>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="status-dot live" />
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
              Live
            </span>
          </div>
        </div>
      </div>

      {/* News Items */}
      <div className="p-3 flex flex-col gap-2">
        {newsItems.map((item, index) => {
          const config = categoryConfig[item.category];
          const Icon = config.icon;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="p-3 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--border-color)] transition-all duration-200 cursor-pointer group"
              style={{ background: "var(--surface)" }}
            >
              <div className="flex items-start gap-2.5">
                {item.isNew && (
                  <div className="mt-1.5 status-dot live flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider mb-1.5"
                    style={{ background: config.bg, color: config.color }}
                  >
                    <Icon className="w-2.5 h-2.5" />
                    {config.label}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] group-hover:text-white leading-relaxed transition-colors">
                    {item.title}
                  </p>
                  <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
                    {item.time}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </aside>
  );
}
