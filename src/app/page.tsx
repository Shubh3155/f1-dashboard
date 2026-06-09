"use client";

import HeroSection from "@/components/dashboard/HeroSection";
import StandingsTable from "@/components/dashboard/StandingsTable";
import PredictionCard from "@/components/dashboard/PredictionCard";
import { drivers } from "@/data/drivers";
import { constructors } from "@/data/constructors";
import { motion } from "framer-motion";

const driverStandings = drivers.map((d) => ({
  position: d.position,
  name: `${d.firstName} ${d.lastName}`,
  team: d.team,
  teamColor: d.teamColor,
  points: d.points,
  wins: d.wins,
}));

const constructorStandings = constructors.map((c) => ({
  position: c.position,
  name: c.name,
  teamColor: c.color,
  points: c.points,
  wins: c.wins,
}));

const spanishGPPredictions = [
  { driverName: "K. Antonelli", team: "Mercedes", teamColor: "#27F4D2", probability: 38, change: 3 },
  { driverName: "L. Hamilton", team: "Ferrari", teamColor: "#E8002D", probability: 18, change: -2 },
  { driverName: "G. Russell", team: "Mercedes", teamColor: "#27F4D2", probability: 14, change: 1 },
  { driverName: "C. Leclerc", team: "Ferrari", teamColor: "#E8002D", probability: 12, change: 2 },
  { driverName: "O. Piastri", team: "McLaren", teamColor: "#FF8000", probability: 8, change: 0 },
  { driverName: "L. Norris", team: "McLaren", teamColor: "#FF8000", probability: 5, change: -1 },
];

const wdcPredictions = [
  { driverName: "K. Antonelli", team: "Mercedes", teamColor: "#27F4D2", probability: 62, change: 5 },
  { driverName: "L. Hamilton", team: "Ferrari", teamColor: "#E8002D", probability: 15, change: -3 },
  { driverName: "G. Russell", team: "Mercedes", teamColor: "#27F4D2", probability: 12, change: 1 },
  { driverName: "C. Leclerc", team: "Ferrari", teamColor: "#E8002D", probability: 7, change: -1 },
  { driverName: "O. Piastri", team: "McLaren", teamColor: "#FF8000", probability: 3, change: 0 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <HeroSection />

      {/* Predictions Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <PredictionCard
          title="Spanish GP Winner"
          subtitle="Round 9 • Barcelona-Catalunya • Jun 14"
          predictions={spanishGPPredictions}
        />
        <PredictionCard
          title="WDC Prediction"
          subtitle="Season-end championship probability"
          predictions={wdcPredictions}
        />
      </motion.div>

      {/* Standings Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <StandingsTable
          title="Driver Standings"
          entries={driverStandings}
          type="driver"
        />
        <StandingsTable
          title="Constructor Standings"
          entries={constructorStandings}
          type="constructor"
        />
      </motion.div>
    </div>
  );
}
