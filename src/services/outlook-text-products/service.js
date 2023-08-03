import { useQuery } from "@tanstack/react-query";
import { createHTTPClient } from "services/create-http-client";

const appApiClient = createHTTPClient({
	baseURL: "/api",
});

const DAY_ENDPOINTS = Object.freeze({
	1: "/acus01.kwns.swo.dy1.txt",
	2: "/acus02.kwns.swo.dy2.txt",
	3: "/acus03.kwns.swo.dy3.txt",
	48: "/acus48.kwns.swo.d48.txt",
});

const ERROR_TITLE =
	"/// ERROR: Storm Prediction Center Convective Outlook Text Products Service ///";

// https://tgftp.nws.noaa.gov/data/raw/ac/acus01.kwns.swo.dy1.txt

const getOutlookTextProductByDay = async (day) => {
	const path = DAY_ENDPOINTS[day];
	const endpoint = `https://tgftp.nws.noaa.gov/data/raw/ac${path}`;

	try {
		const { data } = await appApiClient.post(
			"/convective-outlook-text-products",
			{
				textProductUrl: endpoint,
			}
		);

		return data;
	} catch (error) {
		throw new Error(`${ERROR_TITLE}\n`, error);
	}
};

export const useOutlookTextProductByDayQuery = (day) => {
	return useQuery(["SPC", "Convective Outlooks", "Text Product", day], () =>
		getOutlookTextProductByDay(day)
	);
};
