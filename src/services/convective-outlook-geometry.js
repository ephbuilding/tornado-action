import { useQuery } from "@tanstack/react-query";
import { createHTTPClient } from "services/create-http-client";

const AXIOS_CLIENT = createHTTPClient({
  baseURL:
    "https://mapservices.weather.noaa.gov/vector/rest/services/outlooks/SPC_wx_outlks/MapServer",
});
const fetchOutlookMapServerLayerById = async (layerId) => {
  try {
    const response = await AXIOS_CLIENT.get(
      `/${layerId}/query?f=geojson&geometry=true&outfields=*`
    );
    return response.data.features;
  } catch (error) {
    // console.log(">> fetchLayerGeoJSON:\n", error);
  }
};
export const useOutlookLayerById = (layerId) => {
  return useQuery(["convective outlooks", `layer ${layerId}`], () =>
    fetchOutlookMapServerLayerById(layerId)
  );
};
export const useCategoricalOutlookByLayerId = (layerId) => {
  return useQuery(
    ["convective outlooks", "categorical", `layer ${layerId}`],
    () => fetchOutlookMapServerLayerById(layerId)
  );
};
export const useProbabilisticOutlookByLayerId = (layerId) => {
  return useQuery(
    ["convective outlooks", "probabilistic", `layer ${layerId}`],
    () => fetchOutlookMapServerLayerById(layerId)
  );
};
