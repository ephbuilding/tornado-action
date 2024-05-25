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
    color: "rgb(56, 168, 0)",
  },
  5: {
    label: "5%",
    color: "rgb(111, 25, 3)",
  },
  10: {
    label: "10%",
    color: "rgb(255, 198, 0)",
  },
  15: {
    label: "15%",
    color: "rgb(230, 0, 0)",
  },
  30: {
    label: "30%",
    color: "rgb(250, 0, 255)",
  },
  45: {
    label: "45%",
    color: "rgb(119, 6, 244)",
  },
  60: {
    label: "60%",
    color: "rgb(0, 77, 168)",
  },
});

export const SIGNIFICANT = Object.freeze({
  10: {
    label: "Significant",
    color: "rgb(212, 208, 200)",
  },
});

// STYLE CONSTANTS COPIED FROM OUTLOOK MAPSERVER
// KEYS BASED ON "dn" VALUE
const CAT_OUTLOOK = Object.freeze({
  2: {
    label: "Thunderstorm",
    fill: "rgb(189, 255, 189)",
  },
  3: {
    label: "Marginal",
    fill: "rgb(115, 178, 115)",
  },
  4: {
    label: "Slight",
    fill: "rgb(247, 247, 143)",
  },
  5: {
    label: "Enhanced",
    fill: "rgb(230, 152, 0)",
  },
  6: {
    label: "Moderate",
    fill: "rgb(255, 0, 0)",
  },
  8: {
    label: "High",
    fill: "rgb(255, 0, 197)",
  },
});
const PROB_TORNADO = Object.freeze({
  2: {
    label: "2%",
    fill: "rgb(56, 168, 0)",
  },
  5: {
    label: "5%",
    fill: "rgb(111, 25, 3)",
  },
  10: {
    label: "10%",
    fill: "rgb(255, 198, 0)",
  },
  15: {
    label: "15%",
    fill: "rgb(230, 0, 0)",
  },
  30: {
    label: "30%",
    fill: "rgb(250, 0, 255)",
  },
  45: {
    label: "45%",
    fill: "rgb(119, 6, 244)",
  },
  60: {
    label: "60%",
    fill: "rgb(0, 77, 168)",
  },
});
const PROB_WIND_HAIL = Object.freeze({
  5: {
    label: "5%",
    fill: "rgb(198, 162, 148)",
  },
  15: {
    label: "15%",
    fill: "rgb(255, 255, 0)",
  },
  30: {
    label: "30%",
    fill: "rgb(255, 0, 0)",
  },
  45: {
    label: "45%",
    fill: "rgb(255, 0, 197)",
  },
  60: {
    label: "60%",
    fill: "rgb(168, 0, 132)",
  },
});
