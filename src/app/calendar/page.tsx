"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Trophy, Flag, Zap } from "lucide-react";
import { calendar } from "@/data/calendar";
import { getCircuitById } from "@/data/circuits";
import { getDriverById } from "@/data/drivers";
import { formatDateRange, getSessionLocalTime } from "@/lib/utils";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function CalendarPage() {
  const [selectedRound, setSelectedRound] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="f1-header text-2xl lg:text-3xl mb-2">
          Race <span className="text-[var(--f1-red)]">Calendar</span>
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          2026 FIA Formula One World Championship • 22 Rounds
        </p>
      </div>

      {/* Season Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Races", value: "22", icon: Flag },
          { label: "Completed", value: `${calendar.filter(r => r.status === "completed").length}`, icon: Trophy },
          { label: "Sprint Races", value: `${calendar.filter(r => r.isSprint).length}`, icon: Zap },
          { label: "Countries", value: "20", icon: MapPin },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="stat-card flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-[var(--surface)] flex items-center justify-center">
              <stat.icon className="w-5 h-5 text-[var(--f1-red)]" />
            </div>
            <div>
              <p className="text-xl font-black text-white">{stat.value}</p>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        {calendar.map((race, index) => {
          const circuit = getCircuitById(race.circuitId);
          const isSelected = selectedRound === race.round;
          const isNext = race.status === "next";
          const isCompleted = race.status === "completed";
          const winner = race.winnerDriverId ? getDriverById(race.winnerDriverId) : null;

          return (
            <motion.div
              key={race.round}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
            >
              <div
                onClick={() => setSelectedRound(isSelected ? null : race.round)}
                className={cn(
                  "glass-card p-4 lg:p-5 cursor-pointer",
                  isNext && "animate-border-glow !border-[var(--f1-red)] !border-opacity-50",
                  isSelected && "!border-[var(--border-color)]"
                )}
              >
                <div className="flex items-center gap-4">
                  {/* Round Number */}
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0",
                    isNext ? "bg-[var(--f1-red)] text-white" :
                    isCompleted ? "bg-[var(--surface)] text-white" :
                    "bg-[var(--surface)] text-[var(--text-muted)]"
                  )}>
                    R{String(race.round).padStart(2, "0")}
                  </div>

                  {/* Race Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {isNext && <div className="status-dot live" />}
                      {isCompleted && <div className="status-dot completed" />}
                      {race.status === "upcoming" && <div className="status-dot upcoming" />}
                      <h3 className="text-sm lg:text-base font-bold text-white truncate">
                        {race.officialName}
                      </h3>
                      {race.isSprint && (
                        <span className="flex-shrink-0 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[var(--f1-red)]/10 text-[var(--f1-red)]">
                          Sprint
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-[var(--text-muted)]">
                      <span className="flex items-center gap-1 text-xs">
                        <MapPin className="w-3 h-3" />
                        {race.locality}, {race.country}
                      </span>
                      <span className="flex items-center gap-1 text-xs">
                        <Clock className="w-3 h-3" />
                        {formatDateRange(race.date, race.dateEnd)}
                      </span>
                    </div>
                  </div>

                  {/* Winner or Status */}
                  <div className="hidden sm:block flex-shrink-0 text-right">
                    {winner ? (
                      <div className="flex items-center gap-2">
                        <Trophy className="w-3.5 h-3.5 text-[var(--gold)]" />
                        <div>
                          <p className="text-sm font-bold text-white">
                            {winner.firstName} {winner.lastName}
                          </p>
                          <p className="text-[10px] uppercase tracking-wider" style={{ color: winner.teamColor }}>
                            {winner.team}
                          </p>
                        </div>
                      </div>
                    ) : isNext ? (
                      <span className="text-xs font-bold text-[var(--f1-red)] uppercase tracking-wider">
                        Next Race →
                      </span>
                    ) : (
                      <span className="text-xs text-[var(--text-muted)]">
                        TBC
                      </span>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isSelected && circuit && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-[var(--border-subtle)]"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <div className="stat-card !p-3">
                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Length</p>
                        <p className="text-sm font-bold text-white mt-1">{circuit.length}</p>
                      </div>
                      <div className="stat-card !p-3">
                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Laps</p>
                        <p className="text-sm font-bold text-white mt-1">{circuit.laps}</p>
                      </div>
                      <div className="stat-card !p-3">
                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Lap Record</p>
                        <p className="text-sm font-bold text-white mt-1">{circuit.lapRecord || "N/A"}</p>
                      </div>
                      <div className="stat-card !p-3">
                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Type</p>
                        <p className="text-sm font-bold text-white mt-1 capitalize">{circuit.type.replace("-", " ")}</p>
                      </div>
                    </div>

                    {/* Sessions */}
                    <div>
                      <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-2">
                        Session Schedule (Your Local Time)
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                        {Object.entries(race.sessions).map(([key, time]) => (
                          <div key={key} className="px-3 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border-subtle)]">
                            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                              {key === "fp1" ? "Practice 1" :
                               key === "fp2" ? "Practice 2" :
                               key === "fp3" ? "Practice 3" :
                               key === "qualifying" ? "Qualifying" :
                               key === "sprint" ? "Sprint" : "Race"}
                            </p>
                            <p className="text-xs font-bold text-white mt-0.5">
                              {getSessionLocalTime(time)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Characteristics */}
                    {circuit.characteristics && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {circuit.characteristics.map((char) => (
                          <span
                            key={char}
                            className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                          >
                            {char}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
