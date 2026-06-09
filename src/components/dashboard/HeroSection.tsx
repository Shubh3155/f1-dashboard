"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { getNextRace } from "@/data/calendar";
import { getCircuitById } from "@/data/circuits";
import { drivers } from "@/data/drivers";
import { getCountdownTo, formatDateRange } from "@/lib/utils";

export default function HeroSection() {
  const nextRace = getNextRace();
  const circuit = nextRace ? getCircuitById(nextRace.circuitId) : null;
  const leader = drivers[0]; // P1 driver

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });

  useEffect(() => {
    if (!nextRace) return;
    const raceTime = nextRace.sessions.race;
    const update = () => setCountdown(getCountdownTo(raceTime));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [nextRace]);

  const completedRaces = 8;
  const totalRaces = 22;
  const progressPercent = (completedRaces / totalRaces) * 100;

  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20"
          style={{ background: "var(--f1-red)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-[100px] opacity-10"
          style={{ background: leader.teamColor }}
        />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left — Championship Leader */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-6 lg:p-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--f1-red)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              2026 FIA Formula One World Championship
            </span>
          </div>

          <h1 className="f1-header text-3xl lg:text-4xl mb-6 leading-tight">
            Championship<br />
            <span className="text-[var(--f1-red)]">Leader</span>
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-black"
              style={{
                background: `linear-gradient(135deg, ${leader.teamColor}22, ${leader.teamColor}44)`,
                border: `2px solid ${leader.teamColor}66`,
                color: leader.teamColor,
              }}
            >
              {leader.number}
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">{leader.firstName}</p>
              <p className="text-2xl font-black uppercase tracking-wide">{leader.lastName}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: leader.teamColor }}
                />
                <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                  {leader.team}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="stat-card !p-3 text-center">
              <p className="text-2xl font-black" style={{ color: "var(--gold)" }}>
                {leader.points}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">
                Points
              </p>
            </div>
            <div className="stat-card !p-3 text-center">
              <p className="text-2xl font-black text-white">{leader.wins}</p>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">
                Wins
              </p>
            </div>
            <div className="stat-card !p-3 text-center">
              <p className="text-2xl font-black text-white">{leader.podiums}</p>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">
                Podiums
              </p>
            </div>
          </div>

          {/* Season Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                Season Progress
              </span>
              <span className="text-xs text-[var(--text-secondary)] font-semibold">
                {completedRaces}/{totalRaces} Races
              </span>
            </div>
            <div className="h-2 rounded-full bg-[var(--surface)] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, var(--f1-red), ${leader.teamColor})`,
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Right — Next Race */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card p-6 lg:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5" 
            style={{ 
              background: `radial-gradient(circle, var(--f1-red), transparent)` 
            }} 
          />

          <div className="flex items-center gap-2 mb-4">
            <div className="status-dot live" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--f1-red)]">
              Next Race
            </span>
          </div>

          {nextRace && (
            <>
              <h2 className="f1-header text-2xl lg:text-3xl mb-1">
                {nextRace.name}
              </h2>
              <div className="flex items-center gap-2 text-[var(--text-secondary)] mb-6">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-sm">
                  {nextRace.locality}, {nextRace.country}
                </span>
                <span className="text-[var(--text-muted)]">•</span>
                <Clock className="w-3.5 h-3.5" />
                <span className="text-sm">
                  {formatDateRange(nextRace.date, nextRace.dateEnd)}
                </span>
              </div>

              {/* Countdown */}
              <div className="flex gap-3 mb-6">
                {[
                  { value: countdown.days, label: "Days" },
                  { value: countdown.hours, label: "Hrs" },
                  { value: countdown.minutes, label: "Min" },
                  { value: countdown.seconds, label: "Sec" },
                ].map((item) => (
                  <div key={item.label} className="countdown-digit flex-1">
                    <div className="value">{String(item.value).padStart(2, "0")}</div>
                    <div className="label">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Circuit Info */}
              {circuit && (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="stat-card !p-3">
                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                      Circuit Length
                    </p>
                    <p className="text-sm font-bold text-white mt-1">{circuit.length}</p>
                  </div>
                  <div className="stat-card !p-3">
                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                      Race Laps
                    </p>
                    <p className="text-sm font-bold text-white mt-1">{circuit.laps} Laps</p>
                  </div>
                  <div className="stat-card !p-3">
                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                      Lap Record
                    </p>
                    <p className="text-sm font-bold text-white mt-1">
                      {circuit.lapRecord || "N/A"}
                    </p>
                  </div>
                  <div className="stat-card !p-3">
                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                      Circuit Type
                    </p>
                    <p className="text-sm font-bold text-white mt-1 capitalize">
                      {circuit.type.replace("-", " ")}
                    </p>
                  </div>
                </div>
              )}

              {/* Round Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                  Round {nextRace.round} of {totalRaces}
                </span>
                <div className="flex items-center gap-1 text-[var(--f1-red)] text-xs font-semibold uppercase tracking-wider cursor-pointer hover:gap-2 transition-all">
                  Race Details <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
