// NOAA SEVERE WX DATA INVENTORY
// https://www.ncdc.noaa.gov/swdiws
// Endpoint --> https://www.ncdc.noaa.gov/swdiws/{outputFormat}/{dataset}/{dateRange}
import { createHTTPClient } from "./_utils";
import { useQuery } from "@tanstack/react-query";

const ERROR_TITLE = "/// ERROR: Severe Weather Data Inventory ///";
const AXIOS_CLIENT = createHTTPClient({
  baseURL: "https://www.ncdc.noaa.gov/swdiws",
});

export const fetchTornadoSigJsonByDateRange = async (daterange) => {
  const encodedDateRange = encodeURIComponent(daterange);
  const endpoint = `/json/nx3tvs/${encodedDateRange}`;

  try {
    const response = await AXIOS_CLIENT.get(endpoint);
    const { result } = response?.data;
    return result;
  } catch (error) {
    throw new Error(`${ERROR_TITLE}\n`, error);
  }
};

export const useTornadoSigJsonByDateRange = (daterange) => {
  return useQuery({
    queryKey: ["SWDI", "Tornado Vortex Signatures", daterange],
    queryFn: () => fetchTornadoSigJsonByDateRange(daterange),
  });
};
