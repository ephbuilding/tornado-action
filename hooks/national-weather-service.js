import { useQuery } from "react-query";
import { NATIONAL_WEATHER_SERVICE as KEYS } from "./react-query-keys";
import {
	fetchActiveTornadoAlerts,
	fetchActiveTornadoWarnings,
	fetchTornadoWatches,
	fetchPublicInformationStatements,
} from "services/national-weather-service/requests";

export const useActiveTornadoAlerts = () => {
	return useQuery(KEYS.active_tornado_alerts, fetchActiveTornadoAlerts);
};
export const useActiveTornadoWarnings = () => {
	return useQuery(KEYS.active_tornado_warnings, fetchActiveTornadoWarnings);
};
export const useActiveTornadoWatches = () => {
	return useQuery(KEYS.active_tornado_watches, fetchTornadoWatches);
};
export const usePublicInformationStatements = () => {
	return useQuery(
		KEYS.public_information_statements,
		fetchPublicInformationStatements
	);
};