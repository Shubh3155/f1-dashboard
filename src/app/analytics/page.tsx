"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area,
} from "recharts";
import { BarChart3, TrendingUp, Target } from "lucide-react";
import { drivers } from "@/data/drivers";
import { constructors } from "@/data/constructors";
import { cn } from "@/lib/utils";

// Points progression data (cumulative after each round)
const pointsProgressionData = [
  { race: "AUS", round: 1, ANT: 18, HAM: 12, RUS: 25, LEC: 15, PIA: 10, NOR: 8, VER: 6 },
  { race: "CHN", round: 2, ANT: 43, HAM: 22, RUS: 43, LEC: 27, PIA: 22, NOR: 16, VER: 14 },
  { race: "JPN", round: 3, ANT: 68, HAM: 36, RUS: 55, LEC: 39, PIA: 30, NOR: 26, VER: 20 },
  { race: "MIA", round: 4, ANT: 101, HAM: 52, RUS: 67, LEC: 51, PIA: 42, NOR: 38, VER: 28 },
  { race: "CAN", round: 5, ANT: 126, HAM: 70, RUS: 76, LEC: 62, PIA: 52, NOR: 48, VER: 36 },
  { race: "MON", round: 6, ANT: 156, HAM: 90, RUS: 88, LEC: 75, PIA: 60, NOR: 58, VER: 43 },
];

// WDC prediction trend data
const wdcTrendData = [
  { race: "Pre", ANT: 15, HAM: 22, RUS: 12, LEC: 18, NOR: 20, VER: 25 },
  { race: "R1", ANT: 22, HAM: 18, RUS: 18, LEC: 15, NOR: 15, VER: 20 },
  { race: "R2", ANT: 32, HAM: 15, RUS: 18, LEC: 12, NOR: 12, VER: 15 },
  { race: "R3", ANT: 40, HAM: 14, RUS: 16, LEC: 10, NOR: 10, VER: 10 },
  { race: "R4", ANT: 50, HAM: 13, RUS: 14, LEC: 9, NOR: 7, VER: 7 },
  { race: "R5", ANT: 56, HAM: 14, RUS: 13, LEC: 8, NOR: 5, VER: 4 },
  { race: "R6", ANT: 62, HAM: 15, RUS: 12, LEC: 7, NOR: 3, VER: 2 },
];

// Constructor radar data
const constructorRadarData = [
  { metric: "Race Pace", Mercedes: 95, Ferrari: 82, McLaren: 78, RedBull: 65 },
  { metric: "Qualifying", Mercedes: 92, Ferrari: 85, McLaren: 75, RedBull: 60 },
  { metric: "Reliability", Mercedes: 90, Ferrari: 78, McLaren: 88, RedBull: 70 },
  { metric: "Pit Stops", Mercedes: 85, Ferrari: 80, McLaren: 92, RedBull: 82 },
  { metric: "Tire Mgmt", Mercedes: 88, Ferrari: 86, McLaren: 80, RedBull: 75 },
  { metric: "Overtaking", Mercedes: 90, Ferrari: 78, McLaren: 82, RedBull: 68 },
];

const driverColorMap: Record<string, string> = {
  ANT: "#27F4D2",
  HAM: "#E8002D",
  RUS: "#27F4D2",
  LEC: "#E8002D",
  PIA: "#FF8000",
  NOR: "#FF8000",
  VER: "#3671C6",
};

const selectedDriverCodes = ["ANT", "HAM", "RUS", "LEC", "PIA", "NOR", "VER"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const sorted = [...payload].sort((a: any, b: any) => b.value - a.value);
    return (
      <div className="glass-card !rounded-lg p-3 border border-[var(--border-color)]"
        style={{ background: "rgba(31,31,39,0.95)", backdropFilter: "blur(10px)" }}
      >
        <p className="text-xs font-bold text-white mb-2 uppercase tracking-wider">{label}</p>
        {sorted.map((entry: any) => (
          <div key={entry.dataKey} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-[var(--text-secondary)]">{entry.dataKey}:</span>
            <span className="font-bold text-white">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const [activeChart, setActiveChart] = useState<"points" | "prediction" | "radar">("points");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="f1-header text-2xl lg:text-3xl mb-2">
          Telemetry & <span className="text-[var(--f1-red)]">Analytics</span>
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Driver comparisons, constructor performance, and prediction trends
        </p>
      </div>

      {/* Chart Selector */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--charcoal)] border border-[var(--border-subtle)] w-fit">
        {[
          { key: "points" as const, label: "Points Progression", icon: BarChart3 },
          { key: "prediction" as const, label: "WDC Probability", icon: TrendingUp },
          { key: "radar" as const, label: "Constructor Radar", icon: Target },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveChart(tab.key)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200",
              activeChart === tab.key
                ? "bg-[var(--f1-red)] text-white shadow-lg shadow-[var(--f1-red-glow)]"
                : "text-[var(--text-secondary)] hover:text-white"
            )}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Charts */}
      <motion.div
        key={activeChart}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeChart === "points" && (
          <div className="glass-card p-4 lg:p-6">
            <h3 className="f1-header f1-header-accent text-base mb-6">
              Driver Points Progression — 2026 Season
            </h3>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mb-6">
              {selectedDriverCodes.map((code) => {
                const driver = drivers.find((d) => d.code === code);
                return driver ? (
                  <div key={code} className="flex items-center gap-1.5">
                    <div className="w-3 h-1.5 rounded-full" style={{ background: driverColorMap[code] }} />
                    <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider font-semibold">
                      {driver.lastName}
                    </span>
                  </div>
                ) : null;
              })}
            </div>

            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pointsProgressionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                  <XAxis
                    dataKey="race"
                    stroke="var(--text-muted)"
                    tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                  />
                  <YAxis
                    stroke="var(--text-muted)"
                    tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  {selectedDriverCodes.map((code) => (
                    <Line
                      key={code}
                      type="monotone"
                      dataKey={code}
                      stroke={driverColorMap[code]}
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: driverColorMap[code] }}
                      activeDot={{ r: 5, stroke: "white", strokeWidth: 2 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeChart === "prediction" && (
          <div className="glass-card p-4 lg:p-6">
            <h3 className="f1-header f1-header-accent text-base mb-6">
              WDC Win Probability Trend — How predictions shifted race-by-race
            </h3>

            <div className="flex flex-wrap gap-3 mb-6">
              {["ANT", "HAM", "RUS", "LEC", "NOR", "VER"].map((code) => {
                const driver = drivers.find((d) => d.code === code);
                return driver ? (
                  <div key={code} className="flex items-center gap-1.5">
                    <div className="w-3 h-1.5 rounded-full" style={{ background: driverColorMap[code] }} />
                    <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider font-semibold">
                      {driver.lastName}
                    </span>
                  </div>
                ) : null;
              })}
            </div>

            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={wdcTrendData}>
                  <defs>
                    {["ANT", "HAM", "RUS", "LEC", "NOR", "VER"].map((code) => (
                      <linearGradient key={code} id={`grad-${code}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={driverColorMap[code]} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={driverColorMap[code]} stopOpacity={0} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                  <XAxis
                    dataKey="race"
                    stroke="var(--text-muted)"
                    tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                  />
                  <YAxis
                    stroke="var(--text-muted)"
                    tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                    unit="%"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  {["ANT", "HAM", "RUS", "LEC", "NOR", "VER"].map((code) => (
                    <Area
                      key={code}
                      type="monotone"
                      dataKey={code}
                      stroke={driverColorMap[code]}
                      fill={`url(#grad-${code})`}
                      strokeWidth={2}
                      dot={{ r: 2.5, fill: driverColorMap[code] }}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeChart === "radar" && (
          <div className="glass-card p-4 lg:p-6">
            <h3 className="f1-header f1-header-accent text-base mb-6">
              Constructor Performance Domains — Top 4 Teams
            </h3>

            <div className="flex flex-wrap gap-4 mb-6">
              {[
                { name: "Mercedes", color: "#27F4D2" },
                { name: "Ferrari", color: "#E8002D" },
                { name: "McLaren", color: "#FF8000" },
                { name: "Red Bull", color: "#3671C6" },
              ].map((team) => (
                <div key={team.name} className="flex items-center gap-1.5">
                  <div className="w-3 h-1.5 rounded-full" style={{ background: team.color }} />
                  <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider font-semibold">
                    {team.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-[450px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={constructorRadarData}>
                  <PolarGrid stroke="var(--border-subtle)" />
                  <PolarAngleAxis
                    dataKey="metric"
                    tick={{ fontSize: 11, fill: "var(--text-secondary)" }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fontSize: 9, fill: "var(--text-muted)" }}
                  />
                  <Radar name="Mercedes" dataKey="Mercedes" stroke="#27F4D2" fill="#27F4D2" fillOpacity={0.15} strokeWidth={2} />
                  <Radar name="Ferrari" dataKey="Ferrari" stroke="#E8002D" fill="#E8002D" fillOpacity={0.1} strokeWidth={2} />
                  <Radar name="McLaren" dataKey="McLaren" stroke="#FF8000" fill="#FF8000" fillOpacity={0.1} strokeWidth={2} />
                  <Radar name="Red Bull" dataKey="RedBull" stroke="#3671C6" fill="#3671C6" fillOpacity={0.1} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Races Analyzed", value: "25,940", color: "var(--f1-red)" },
          { label: "Qualifying Records", value: "11,037", color: "#27F4D2" },
          { label: "Seasons Covered", value: "76", color: "#FFD700" },
          { label: "Prediction Model", value: "XGBoost", color: "#FF8000" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="stat-card text-center"
          >
            <p className="text-2xl font-black" style={{ color: stat.color }}>
              {stat.value}
            </p>
            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
