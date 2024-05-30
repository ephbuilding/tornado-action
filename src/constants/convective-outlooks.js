export const LAYER_IDS = Object.freeze({
  day_1_convective: "0",
  day_1_categorical: "1",
  day_1_sig_tornado: "2",
  day_1_prob_tornado: "3",
  day_1_sig_hail: "4",
  day_1_prob_hail: "5",
  day_1_sig_wind: "6",
  day_1_prob_wind: "7",
  day_2_convective: "8",
  day_2_categorical: "9",
  day_2_sig_tornado: "10",
  day_2_prob_tornado: "11",
  day_2_sig_hail: "12",
  day_2_prob_hail: "13",
  day_2_sig_wind: "14",
  day_2_prob_wind: "15",
  day_3_convective: "16",
  day_3_categorical: "17",
  day_3_sig_severe: "18",
  day_3_prob: "19",
  days_4_thru_8_convective: "20",
  day_4_prob: "21",
  day_5_prob: "22",
  day_6_prob: "23",
  day_7_prob: "24",
  day_8_prob: "25",
});
export const MAPSERVER_LAYERS = Object.freeze({
  day_1_convective: { id: "0", name: "Day 1 Convective Outlook" },
  day_1_categorical: { id: "1", name: "Day 1 Categorical Outlook" },
  day_1_sig_tornado: { id: "2", name: "Day 1 Significant Tornado Outlook" },
  day_1_prob_tornado: { id: "3", name: "Day 1 Probabilistic Tornado Outlook" },
  day_1_sig_hail: { id: "4", name: "Day 1 Significant Hail Outlook" },
  day_1_prob_hail: { id: "5", name: "Day 1 Probabilistic Hail Outlook" },
  day_1_sig_wind: { id: "6", name: "Day 1 Significant Wind Outlook" },
  day_1_prob_wind: { id: "7", name: "Day 1 Probabilistic Wind Outlook" },
  day_2_convective: { id: "8", name: "Day 2 Convective Outlook" },
  day_2_categorical: { id: "9", name: "Day 2 Categorical Outlook" },
  day_2_sig_tornado: { id: "10", name: "Day 2 Significant Tornado Outlook" },
  day_2_prob_tornado: { id: "11", name: "Day 2 Probabilistic Tornado Outlook" },
  day_2_sig_hail: { id: "12", name: "Day 2 Significant Hail Outlook" },
  day_2_prob_hail: { id: "13", name: "Day 2 Probabilistic Hail Outlook" },
  day_2_sig_wind: { id: "14", name: "Day 2 Significant Wind Outlook" },
  day_2_prob_wind: { id: "15", name: "Day 2 Probabilistic Wind Outlook" },
  day_3_convective: { id: "16", name: "Day 3 Convective Outlook" },
  day_3_categorical: { id: "17", name: "Day 3 Categorical Outlook" },
  day_3_sig_severe: { id: "18", name: "Day 3 Significant Severe Outlook" },
  day_3_prob: { id: "19", name: "Day 3 Probabilistic Outlook" },
  days_4_thru_8_convective: { id: "20", name: "Day 4 - 8 Convective Outlook" },
  day_4_prob: { id: "21", name: "Day 4 Probabilistic Outlook" },
  day_5_prob: { id: "22", name: "Day 5 Probabilistic Outlook" },
  day_6_prob: { id: "23", name: "Day 6 Probabilistic Outlook" },
  day_7_prob: { id: "24", name: "Day 7 Probabilistic Outlook" },
  day_8_prob: { id: "25", name: "Day 8 Probabilistic Outlook" },
});
export const CAT_OUTLOOK_STYLES = Object.freeze({
  2: {
    label: "Thunderstorm",
    color: "rgb(189, 255, 189)",
  },
  3: {
    label: "Marginal",
    color: "rgb(115, 178, 115)",
  },
  4: {
    label: "Slight",
    color: "rgb(247, 247, 143)",
  },
  5: {
    label: "Enhanced",
    color: "rgb(230, 152, 0)",
  },
  6: {
    label: "Moderate",
    color: "rgb(255, 0, 0)",
  },
  8: {
    label: "High",
    color: "rgb(255, 0, 197)",
  },
});
export const PROB_TORNADO_STYLES = Object.freeze({
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
export const PROB_WIND_HAIL_STYLES = Object.freeze({
  5: {
    label: "5%",
    color: "rgb(198, 162, 148)",
  },
  // created clear significant style for any probabilistic [dn: 10] value that gets returned from MapServer
  10: {
    label: "Significant",
    color: "rgba(212, 208, 200,0)",
  },
  15: {
    label: "15%",
    color: "rgb(255, 255, 0)",
  },
  30: {
    label: "30%",
    color: "rgb(255, 0, 0)",
  },
  45: {
    label: "45%",
    color: "rgb(255, 0, 197)",
  },
  60: {
    label: "60%",
    color: "rgb(168, 0, 132)",
  },
});
export const PROB_DAYS_4_8_STYLES = Object.freeze({
  15: {
    label: "15%",
    color: "rgb(255, 255, 0)",
  },
  30: {
    label: "30%",
    color: "rgb(230, 152, 0)",
  },
});
export const SIGNIFICANT_STYLES = Object.freeze({
  10: {
    label: "Significant",
    color: "rgb(212, 208, 200)",
  },
});
