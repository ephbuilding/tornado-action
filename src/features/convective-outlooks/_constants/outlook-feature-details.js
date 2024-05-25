import {
  IoRainy,
  IoSkull,
  IoThunderstorm,
  IoWarningOutline,
} from "react-icons/io5";
import { GiDamagedHouse } from "react-icons/gi";
import { GiTornado } from "react-icons/gi";
import { IoUmbrellaOutline } from "react-icons/io5";

export const CATEGORICAL = Object.freeze({
  2: {
    bgColor: "#007600",
    textColor: "#ffffff",
    icon: IoUmbrellaOutline,
    label: "Thunderstorms",
    stroke: "#003b00",
    description: "non-severe storms with rain",
  },
  3: {
    bgColor: "#00ff00",
    textColor: "#000000",
    icon: IoThunderstorm,
    label: "Marginal",
    stroke: "#00b100",
    description: "potentially organized severe storms with marginal intensity",
  },
  4: {
    bgColor: "#ffff00",
    textColor: "#000000",
    icon: IoWarningOutline,
    label: "Slight",
    stroke: "#c4c400",
    description: "isolated, organized severe storms with variable intensity",
  },
  5: {
    bgColor: "#ffa500",
    textColor: "#000000",
    icon: GiDamagedHouse,
    label: "Enhanced",
    stroke: "#c47f00",
    description: "widespread severe storms with variable instensity",
  },
  6: {
    bgColor: "#9d0000",
    textColor: "#ffffff",
    icon: GiTornado,
    label: "Moderate",
    stroke: "#620000",
    description:
      "widespread severe weather with several tornadoes and large hail",
  },
  8: {
    bgColor: "#ff00ff",
    textColor: "#000000",
    icon: IoSkull,
    label: "High",
    stroke: "#b300b3",
    description:
      "severe weather outbreak anticipated with tornadoes and/or derechoes.  expect widespread damage and hurricane force winds.",
  },
});

export const PROBABILISTIC = Object.freeze({
  2: {
    label: "2%",
    color: "rgba(56, 168, 0, 255)",
  },
  5: {
    label: "5%",
    color: "rgba(111, 25, 3, 255)",
  },
  10: {
    label: "10%",
    color: "rgba(255, 198, 0, 255)",
  },
  15: {
    label: "15%",
    color: "rgba(230, 0, 0, 255)",
  },
  30: {
    label: "30%",
    color: "rgba(250, 0, 255, 255)",
  },
  45: {
    label: "45%",
    color: "rgba(119, 6, 244, 255)",
  },
  60: {
    label: "60%",
    color: "rgba(0, 77, 168, 255)",
  },
});

export const SIGNIFICANT = Object.freeze({
  10: {
    label: "Significant",
    color: "rgba(212, 208, 200, 0)",
  },
});

// STYLE CONSTANTS COPIED FROM OUTLOOK MAPSERVER
// KEYS BASED ON "dn" VALUE
const CAT_OUTLOOK = Object.freeze({
  2: {
    label: "Thunderstorm",
    fill: rgba(189, 255, 189, 255),
  },
  3: {
    label: "Marginal",
    fill: rgba(115, 178, 115, 255),
  },
  4: {
    label: "Slight",
    fill: rgba(247, 247, 143, 255),
  },
  5: {
    label: "Enhanced",
    fill: rgba(230, 152, 0, 255),
  },
  6: {
    label: "Moderate",
    fill: rgba(255, 0, 0, 255),
  },
  8: {
    label: "High",
    fill: rgba(255, 0, 197, 255),
  },
});
const PROB_TORNADO = Object.freeze({
  2: {
    label: "2%",
    fill: rgba(56, 168, 0, 255),
  },
  5: {
    label: "5%",
    fill: rgba(111, 25, 3, 255),
  },
  10: {
    label: "10%",
    fill: rgba(255, 198, 0, 255),
  },
  15: {
    label: "15%",
    fill: rgba(230, 0, 0, 255),
  },
  30: {
    label: "30%",
    fill: rgba(250, 0, 255, 255),
  },
  45: {
    label: "45%",
    fill: rgba(119, 6, 244, 255),
  },
  60: {
    label: "60%",
    fill: rgba(0, 77, 168, 255),
  },
});
const PROB_WIND_HAIL = Object.freeze({
  5: {
    label: "5%",
    fill: rgba(198, 162, 148, 255),
  },
  15: {
    label: "15%",
    fill: rgba(255, 255, 0, 255),
  },
  30: {
    label: "30%",
    fill: rgba(255, 0, 0, 255),
  },
  45: {
    label: "45%",
    fill: rgba(255, 0, 197, 255),
  },
  60: {
    label: "60%",
    fill: rgba(168, 0, 132, 255),
  },
});
