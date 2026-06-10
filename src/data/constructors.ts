export interface Constructor {
  id: string;
  name: string;
  fullName: string;
  color: string;
  secondaryColor: string;
  nationality: string;
  powerUnit: string;
  points: number;
  position: number;
  wins: number;
  drivers: string[];
}

export const constructors: Constructor[] = [
  {
    id: "mercedes",
    name: "Mercedes",
    fullName: "Mercedes-AMG Petronas F1 Team",
    color: "#27F4D2",
    secondaryColor: "#00A19C",
    nationality: "German",
    powerUnit: "Mercedes",
    points: 244,
    position: 1,
    wins: 6,
    drivers: ["antonelli", "russell"],
  },
  {
    id: "ferrari",
    name: "Ferrari",
    fullName: "Scuderia Ferrari HP",
    color: "#E8002D",
    secondaryColor: "#FF2800",
    nationality: "Italian",
    powerUnit: "Ferrari",
    points: 165,
    position: 2,
    wins: 0,
    drivers: ["hamilton", "leclerc"],
  },
  {
    id: "mclaren",
    name: "McLaren",
    fullName: "McLaren F1 Team",
    color: "#FF8000",
    secondaryColor: "#FFB347",
    nationality: "British",
    powerUnit: "Mercedes",
    points: 118,
    position: 3,
    wins: 0,
    drivers: ["norris", "piastri"],
  },
  {
    id: "red_bull",
    name: "Red Bull",
    fullName: "Oracle Red Bull Racing",
    color: "#3671C6",
    secondaryColor: "#1B3C73",
    nationality: "Austrian",
    powerUnit: "Honda RBPT",
    points: 72,
    position: 4,
    wins: 0,
    drivers: ["verstappen", "hadjar"],
  },
  {
    id: "alpine",
    name: "Alpine",
    fullName: "BWT Alpine F1 Team",
    color: "#FF87BC",
    secondaryColor: "#0093CC",
    nationality: "French",
    powerUnit: "Mercedes",
    points: 41,
    position: 5,
    wins: 0,
    drivers: ["gasly", "colapinto"],
  },
  {
    id: "racing_bulls",
    name: "Racing Bulls",
    fullName: "Visa Cash App Racing Bulls",
    color: "#6692FF",
    secondaryColor: "#2B4562",
    nationality: "Italian",
    powerUnit: "Honda RBPT",
    points: 39,
    position: 6,
    wins: 0,
    drivers: ["lawson", "lindblad"],
  },
  {
    id: "haas",
    name: "Haas",
    fullName: "MoneyGram Haas F1 Team",
    color: "#B6BABD",
    secondaryColor: "#787878",
    nationality: "American",
    powerUnit: "Ferrari",
    points: 21,
    position: 7,
    wins: 0,
    drivers: ["ocon", "bearman"],
  },
  {
    id: "williams",
    name: "Williams",
    fullName: "Williams Racing",
    color: "#1868DB",
    secondaryColor: "#00A3E0",
    nationality: "British",
    powerUnit: "Mercedes",
    points: 11,
    position: 8,
    wins: 0,
    drivers: ["sainz", "albon"],
  },
  {
    id: "audi",
    name: "Audi",
    fullName: "Audi F1 Team",
    color: "#00E701",
    secondaryColor: "#006F39",
    nationality: "Swiss",
    powerUnit: "Audi",
    points: 2,
    position: 9,
    wins: 0,
    drivers: ["hulkenberg", "bortoleto"],
  },
  {
    id: "aston_martin",
    name: "Aston Martin",
    fullName: "Aston Martin Aramco F1 Team",
    color: "#229971",
    secondaryColor: "#006F4E",
    nationality: "British",
    powerUnit: "Honda",
    points: 1,
    position: 10,
    wins: 0,
    drivers: ["alonso", "stroll"],
  },
  {
    id: "cadillac",
    name: "Cadillac",
    fullName: "Cadillac F1 Team",
    color: "#FFD700",
    secondaryColor: "#C5A200",
    nationality: "American",
    powerUnit: "Ferrari",
    points: 0,
    position: 11,
    wins: 0,
    drivers: ["perez", "bottas"],
  },
];

export const getConstructorById = (id: string) =>
  constructors.find((c) => c.id === id);
export const getTopConstructors = (n: number = 11) =>
  [...constructors].sort((a, b) => a.position - b.position).slice(0, n);
