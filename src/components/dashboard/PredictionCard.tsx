"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface PredictionEntry {
  driverName: string;
  team: string;
  teamColor: string;
  probability: number;
  change?: number;
}

interface PredictionCardProps {
  title: string;
  subtitle: string;
  predictions: PredictionEntry[];
}

export default function PredictionCard({ title, subtitle, predictions }: PredictionCardProps) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 lg:p-5 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-4 h-4 text-[var(--f1-red)]" />
          <h3 className="f1-header text-base">{title}</h3>
        </div>
        <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
          {subtitle}
        </p>
      </div>

      <div className="p-4 lg:p-5 space-y-4">
        {predictions.map((pred, index) => (
          <motion.div
            key={pred.driverName}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: pred.teamColor }}
                />
                <span className="text-sm font-bold text-white">
                  {pred.driverName}
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">
                  {pred.team}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black" style={{ color: pred.teamColor }}>
                  {pred.probability}%
                </span>
                {pred.change !== undefined && pred.change !== 0 && (
                  <span
                    className="text-[10px] font-bold"
                    style={{
                      color: pred.change > 0 ? "#22c55e" : "#ef4444",
                    }}
                  >
                    {pred.change > 0 ? "+" : ""}
                    {pred.change}%
                  </span>
                )}
              </div>
            </div>
            <div className="probability-bar">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pred.probability}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                className="probability-bar-fill"
                style={{
                  background: `linear-gradient(90deg, ${pred.teamColor}, ${pred.teamColor}88)`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="px-4 lg:px-5 pb-4 lg:pb-5">
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border-subtle)]">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--f1-red)] animate-pulse" />
          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
            ML Model • Updated after each session • Ensemble XGBoost
          </span>
        </div>
      </div>
    </div>
  );
}
