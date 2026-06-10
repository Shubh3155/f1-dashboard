"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn, getPositionSuffix } from "@/lib/utils";

interface StandingsEntry {
  position: number;
  name: string;
  team?: string;
  teamColor: string;
  points: number;
  wins: number;
}

interface StandingsTableProps {
  title: string;
  entries: StandingsEntry[];
  type: "driver" | "constructor";
  showAll?: boolean;
}

export default function StandingsTable({ title, entries, type, showAll = false }: StandingsTableProps) {
  const displayEntries = showAll ? entries : entries.slice(0, 10);

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 lg:p-5 border-b border-[var(--border-subtle)]">
        <h3 className="f1-header f1-header-accent text-base">{title}</h3>
      </div>

      <div className="divide-y divide-[var(--border-subtle)]">
        {displayEntries.map((entry, index) => (
          <motion.div
            key={entry.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03, duration: 0.3 }}
            className="flex items-center gap-3 px-4 lg:px-5 py-3 hover:bg-[var(--surface-hover)] transition-colors group"
          >
            {/* Position */}
            <div
              className={cn(
                "position-badge flex-shrink-0",
                entry.position === 1 ? "p1" :
                entry.position === 2 ? "p2" :
                entry.position === 3 ? "p3" : "default"
              )}
            >
              {entry.position}
            </div>

            {/* Team Color Bar */}
            <div
              className="team-color-bar flex-shrink-0 self-stretch"
              style={{ background: entry.teamColor }}
            />

            {/* Name & Team */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate group-hover:text-[var(--f1-red)] transition-colors">
                {entry.name}
              </p>
              {type === "driver" && entry.team && (
                <p className="text-[11px] text-[var(--text-muted)] truncate">
                  {entry.team}
                </p>
              )}
            </div>

            {/* Wins */}
            {entry.wins > 0 && (
              <div className="flex-shrink-0 text-center">
                <span className="text-xs font-bold text-[var(--gold)]">
                  {entry.wins}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] ml-0.5">
                  W
                </span>
              </div>
            )}

            {/* Points */}
            <div className="flex-shrink-0 text-right min-w-[48px]">
              <span className="text-sm font-black text-white">
                {entry.points}
              </span>
              <span className="text-[10px] text-[var(--text-muted)] ml-1 uppercase">
                pts
              </span>
            </div>

            {/* Points Bar */}
            <div className="hidden sm:block flex-shrink-0 w-20">
              <div className="probability-bar">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(entry.points / (displayEntries[0]?.points || 1)) * 100}%`,
                  }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                  className="probability-bar-fill"
                  style={{ background: entry.teamColor }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {!showAll && entries.length > 10 && (
        <div className="p-3 text-center border-t border-[var(--border-subtle)]">
          <Link href="/standings" className="text-xs text-[var(--text-muted)] uppercase tracking-wider hover:text-[var(--f1-red)] transition-colors">
            View all {entries.length} {type === "driver" ? "drivers" : "constructors"}
          </Link>
        </div>
      )}
    </div>
  );
}
