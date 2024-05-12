import { useQuery } from "@tanstack/react-query";
import { createHTTPClient } from "services/create-http-client";

export const LAYER_IDS = Object.freeze({
  day_1_convective: "0",
  day_1_categorical: "1",
  day_1_significant_tornado: "2",
  day_1_probabilistic_tornado: "3",
  day_1_significant_hail: "4",
  day_1_probabilistic_hail: "5",
  day_1_significant_wind: "6",
  day_1_probabilistic_wind: "7",
  day_2_convective: "8",
  day_2_categorical: "9",
  day_2_significant_tornado: "10",
  day_2_probabilistic_tornado: "11",
  day_2_significant_hail: "12",
  day_2_probabilistic_hail: "13",
  day_2_significant_wind: "14",
  day_2_probabilistic_wind: "15",
  day_3_convective: "16",
  day_3_categorical: "17",
  day_3_probabilistic: "18",
  day_3_significant_severe: "19",
  days_4_thru_8_convective: "20",
  day_4_probabilistic: "21",
  day_5_probabilistic: "22",
  day_6_probabilistic: "23",
  day_7_probabilistic: "24",
  day_8_probabilistic: "25",
});

const AXIOS_CLIENT = createHTTPClient({
  baseURL:
    "https://mapservices.weather.noaa.gov/vector/rest/services/outlooks/SPC_wx_outlks/MapServer",
});

const fetchConvectiveOutlookMapServerLayerById = async (layerId) => {
  try {
    const response = await AXIOS_CLIENT.get(
      `/${layerId}/query?f=geojson&geometry=true&outfields=*`
    );
    return response.data.features;
  } catch (error) {
    // console.log(">> fetchLayerGeoJSON:\n", error);
  }
};

export const useCategoricalOutlookByLayerId = (layerId) => {
  return useQuery(
    ["convective outlooks", "categorical", `layer ${layerId}`],
    () => fetchConvectiveOutlookMapServerLayerById(layerId)
  );
};

export const useProbabilisticOutlookByLayerId = (layerId) => {
  return useQuery(
    ["convective outlooks", "probabilistic", `layer ${layerId}`],
    () => fetchConvectiveOutlookMapServerLayerById(layerId)
  );
};
