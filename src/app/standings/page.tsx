"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Building2 } from "lucide-react";
import StandingsTable from "@/components/dashboard/StandingsTable";
import { drivers } from "@/data/drivers";
import { constructors } from "@/data/constructors";
import { cn } from "@/lib/utils";

export default function StandingsPage() {
  const [activeTab, setActiveTab] = useState<"drivers" | "constructors">("drivers");

  const driverEntries = drivers.map((d) => ({
    position: d.position,
    name: `${d.firstName} ${d.lastName}`,
    team: d.team,
    teamColor: d.teamColor,
    points: d.points,
    wins: d.wins,
  }));

  const constructorEntries = constructors.map((c) => ({
    position: c.position,
    name: c.fullName,
    teamColor: c.color,
    points: c.points,
    wins: c.wins,
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="f1-header text-2xl lg:text-3xl mb-2">
          Championship <span className="text-[var(--f1-red)]">Standings</span>
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          2026 Season • After Round 6 — Monaco Grand Prix
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--charcoal)] border border-[var(--border-subtle)] w-fit">
        {[
          { key: "drivers" as const, label: "Drivers", icon: Users },
          { key: "constructors" as const, label: "Constructors", icon: Building2 },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all duration-200",
              activeTab === tab.key
                ? "bg-[var(--f1-red)] text-white shadow-lg shadow-[var(--f1-red-glow)]"
                : "text-[var(--text-secondary)] hover:text-white"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "drivers" ? (
          <div className="space-y-6">
            <StandingsTable
              title="World Drivers' Championship"
              entries={driverEntries}
              type="driver"
              showAll
            />

            {/* Team Pairings */}
            <div>
              <h2 className="f1-header f1-header-accent text-base mb-4">
                Teammate Battles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {constructors.map((team) => {
                  const teamDrivers = drivers.filter((d) => d.teamId === team.id);
                  if (teamDrivers.length < 2) return null;
                  const d1 = teamDrivers[0];
                  const d2 = teamDrivers[1];
                  const totalPoints = d1.points + d2.points || 1;

                  return (
                    <motion.div
                      key={team.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="glass-card p-4"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full" style={{ background: team.color }} />
                        <span className="text-xs font-bold uppercase tracking-wider text-white">
                          {team.name}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {[d1, d2].map((driver) => (
                          <div key={driver.id} className="flex items-center gap-3">
                            <span className="text-sm font-bold text-white min-w-[80px]">
                              {driver.code}
                            </span>
                            <div className="flex-1 h-2 rounded-full bg-[var(--surface)] overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                  width: `${(driver.points / totalPoints) * 100}%`,
                                  background: team.color,
                                  opacity: driver === d1 ? 1 : 0.5,
                                }}
                              />
                            </div>
                            <span className="text-xs font-bold text-[var(--text-secondary)] min-w-[40px] text-right">
                              {driver.points} pts
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <StandingsTable
              title="World Constructors' Championship"
              entries={constructorEntries}
              type="constructor"
              showAll
            />

            {/* Power Unit Suppliers */}
            <div>
              <h2 className="f1-header f1-header-accent text-base mb-4">
                Power Unit Performance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {["Mercedes", "Ferrari", "Honda RBPT", "Audi", "Honda"].map((pu) => {
                  const teams = constructors.filter((c) => c.powerUnit === pu);
                  const totalPts = teams.reduce((sum, t) => sum + t.points, 0);
                  return (
                    <div key={pu} className="stat-card">
                      <p className="text-xs font-bold uppercase tracking-wider text-white mb-1">
                        {pu}
                      </p>
                      <p className="text-2xl font-black text-[var(--f1-red)]">{totalPts}</p>
                      <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                        Combined Points
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {teams.map((t) => (
                          <span
                            key={t.id}
                            className="text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider"
                            style={{
                              background: `${t.color}22`,
                              color: t.color,
                            }}
                          >
                            {t.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
