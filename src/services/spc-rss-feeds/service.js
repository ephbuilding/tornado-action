import { useQuery } from "@tanstack/react-query";

import { createHTTPClient } from "services/create-http-client";

const ERROR_TITLE = "/// ERROR: Storm Prediction Center RSS Feed Service ///";

const axiosClient = createHTTPClient({ baseURL: "/api" });

const getSpcRssFeedByEndpoint = async (endpoint) => {
  try {
    const { data } = await axiosClient.post("/spc-rss-feeds", {
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
