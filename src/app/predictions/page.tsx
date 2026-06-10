"use client";

import { motion } from "framer-motion";
import { Brain, Trophy, Building2, Zap, Info } from "lucide-react";
import PredictionCard from "@/components/dashboard/PredictionCard";

const raceWinnerPredictions = [
  { driverName: "K. Antonelli", team: "Mercedes", teamColor: "#27F4D2", probability: 38, change: 3 },
  { driverName: "L. Hamilton", team: "Ferrari", teamColor: "#E8002D", probability: 18, change: -2 },
  { driverName: "G. Russell", team: "Mercedes", teamColor: "#27F4D2", probability: 14, change: 1 },
  { driverName: "C. Leclerc", team: "Ferrari", teamColor: "#E8002D", probability: 12, change: 2 },
  { driverName: "O. Piastri", team: "McLaren", teamColor: "#FF8000", probability: 8, change: 0 },
  { driverName: "L. Norris", team: "McLaren", teamColor: "#FF8000", probability: 5, change: -1 },
  { driverName: "M. Verstappen", team: "Red Bull", teamColor: "#3671C6", probability: 3, change: -2 },
  { driverName: "I. Hadjar", team: "Red Bull", teamColor: "#3671C6", probability: 1.5, change: 0 },
];

const wdcPredictions = [
  { driverName: "K. Antonelli", team: "Mercedes", teamColor: "#27F4D2", probability: 62, change: 5 },
  { driverName: "L. Hamilton", team: "Ferrari", teamColor: "#E8002D", probability: 15, change: -3 },
  { driverName: "G. Russell", team: "Mercedes", teamColor: "#27F4D2", probability: 12, change: 1 },
  { driverName: "C. Leclerc", team: "Ferrari", teamColor: "#E8002D", probability: 7, change: -1 },
  { driverName: "O. Piastri", team: "McLaren", teamColor: "#FF8000", probability: 3, change: 0 },
];

const wccPredictions = [
  { driverName: "Mercedes", team: "Mercedes PU", teamColor: "#27F4D2", probability: 68, change: 4 },
  { driverName: "Ferrari", team: "Ferrari PU", teamColor: "#E8002D", probability: 18, change: -2 },
  { driverName: "McLaren", team: "Mercedes PU", teamColor: "#FF8000", probability: 10, change: 1 },
  { driverName: "Red Bull", team: "Honda RBPT", teamColor: "#3671C6", probability: 3, change: -2 },
  { driverName: "Alpine", team: "Mercedes PU", teamColor: "#FF87BC", probability: 1, change: 0 },
];

const modelFeatures = [
  { name: "Grid Position", importance: 92, description: "Starting grid position from qualifying" },
  { name: "Driver Track History", importance: 85, description: "Past wins/podiums at this specific circuit" },
  { name: "Constructor Form", importance: 78, description: "Average finish position over last 5 races" },
  { name: "Practice Pace Delta", importance: 71, description: "Gap to fastest in FP1/FP2/FP3 sessions" },
  { name: "Season Points %", importance: 65, description: "Percentage of max possible points scored" },
  { name: "Reliability Score", importance: 58, description: "DNF rate and mechanical failure history" },
  { name: "Circuit Type Match", importance: 52, description: "Driver/car affinity for circuit characteristics" },
  { name: "Weather Impact", importance: 40, description: "Historical performance in wet/dry conditions" },
];

export default function PredictionsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="f1-header text-2xl lg:text-3xl mb-2">
          ML <span className="text-[var(--f1-red)]">Predictions</span>
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Ensemble XGBoost model trained on 75+ years of F1 data (1950–2026)
        </p>
      </div>

      {/* Model Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5"
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-[var(--f1-red)]" />
            <span className="text-sm font-bold uppercase tracking-wider text-white">
              Prediction Engine
            </span>
          </div>
          <div className="flex items-center gap-6">
            {[
              { label: "Model", value: "XGBoost Ensemble" },
              { label: "Training Data", value: "25,940 race results" },
              { label: "Accuracy", value: "73.2% top-3" },
              { label: "Last Updated", value: "Post-Monaco GP" },
            ].map((item) => (
              <div key={item.label} className="hidden sm:block">
                <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                  {item.label}
                </span>
                <p className="text-xs font-bold text-[var(--text-secondary)]">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-green-500 uppercase tracking-wider font-bold">
              Online
            </span>
          </div>
        </div>
      </motion.div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <PredictionCard
            title="Spanish GP Winner"
            subtitle="Round 7 • Barcelona-Catalunya • Jun 14, 2026"
            predictions={raceWinnerPredictions}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <PredictionCard
            title="2026 WDC Prediction"
            subtitle="Season-end World Drivers' Championship probability"
            predictions={wdcPredictions}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <PredictionCard
          title="2026 WCC Prediction"
          subtitle="Season-end World Constructors' Championship probability"
          predictions={wccPredictions}
        />
      </motion.div>

      {/* Feature Importance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card overflow-hidden"
      >
        <div className="p-4 lg:p-5 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[var(--f1-red)]" />
            <h3 className="f1-header text-base">Model Feature Importance</h3>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] mt-1">
            How much each variable contributes to the prediction
          </p>
        </div>

        <div className="p-4 lg:p-5 space-y-3">
          {modelFeatures.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">{feature.name}</span>
                  <span className="text-[10px] text-[var(--text-muted)] hidden sm:inline">
                    {feature.description}
                  </span>
                </div>
                <span className="text-xs font-bold text-[var(--f1-red)]">
                  {feature.importance}%
                </span>
              </div>
              <div className="probability-bar">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${feature.importance}%` }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.05 }}
                  className="probability-bar-fill"
                  style={{
                    background: `linear-gradient(90deg, var(--f1-red), rgba(225,6,0,0.4))`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
