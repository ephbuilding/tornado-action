import { useQuery } from "@tanstack/react-query";

import { createHTTPClient } from "services/create-http-client";

const convectiveOutlookHTTPClient = createHTTPClient({
  baseURL:
    "https://mapservices.weather.noaa.gov/vector/rest/services/outlooks/SPC_wx_outlks/MapServer",
});

const fetchOutlookLayerById = async (layerId) => {
  try {
    const response = await convectiveOutlookHTTPClient.get(
      `/${layerId}/query?f=geojson&geometry=true&outfields=*`
    );
    return response.data.features;
  } catch (error) {
    console.log(">> fetchLayerGeoJSON:\n", error);
  }
};

export const useCategoricalOutlookByLayerId = (layerId) => {
  return useQuery(
    ["convective outlooks", "categorical", `layer ${layerId}`],
    () => fetchOutlookLayerById(layerId)
  );
};

export const useProbabilisticOutlookByLayerId = (layerId) => {
  return useQuery(
    ["convective outlooks", "probabilistic", `layer ${layerId}`],
    () => fetchOutlookLayerById(layerId)
  );
};
