import { useQuery } from "@tanstack/react-query";
import { createHTTPClient } from "services/create-http-client";

const SPC_RSS_BASE_URL = "http://www.spc.noaa.gov/products";
const ERROR_TITLE = "/// ERROR: Storm Prediction Center RSS Feed Service ///";
const AXIOS_CLIENT = createHTTPClient({ baseURL: "/api" });

export const ENDPOINTS = {
  severe_storm: `${SPC_RSS_BASE_URL}/spcwwrss.xml`,
  pds: `${SPC_RSS_BASE_URL}/spcpdswwrss.xml`,
  meso_disc: `${SPC_RSS_BASE_URL}/spcmdrss.xml`,
  conv_otlk: `${SPC_RSS_BASE_URL}/spcacrss.xml`,
};

const getSpcRssFeedByEndpoint = async (endpoint) => {
  try {
    const { data } = await AXIOS_CLIENT.post("/spc-rss-feeds", {
      spc_rss_feed_url: endpoint,
    });

    return data;
  } catch (error) {
    // console.log(`${ERROR_TITLE}\n`, error);
  }
};

export const useSpcRssFeedsQuery = (endpoint) => {
  return useQuery(["SPC", "RSS", endpoint], () =>
    getSpcRssFeedByEndpoint(endpoint)
  );
};
