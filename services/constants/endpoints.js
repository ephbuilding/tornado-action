const NATIONAL_WEATHER_SERVICE = Object.freeze({
	active_alert_count: "/alerts/active/count",
	active_alerts: "/alerts/active",
	alert_types: "/alerts/types",
	alerts: "/alerts",
	base_url: "https://api.weather.gov",
	glossary: "/glossary",
	products: "/products",
	radar_servers: "/radar/servers",
	radar_stations: "/radar/stations",
	stations: "/stations",
	zones: "/zones",
	active_tornado_alerts:
		"/alerts/active?event=Tornado%20Warning%2CTornado%20Watch",
	active_tornado_warnings:
		"/alerts/active?event=Tornado%20Warning&message_type=alert",
	active_tornado_watches:
		"/alerts/active?event=Tornado%20Watch&message_type=alert",
});
const SEVERE_WEATHER_DATA_INVENTORY = Object.freeze({
	base_url: "https://www.ncdc.noaa.gov/swdiws",
	tornado_vortx_signatures_json: "/json/nx3tvs",
	mesocyclone_signatures_json: "/json/nx3meso",
	hail_signatures_json: "/json/nx3hail",
	storm_cell_structure_information_json: "/json/nx3structure",
});
const STORM_PREDICTION_CENTER = Object.freeze({
	spcrss: "/spcrss.xml",
	spcwwrss: "/spcwwrss.xml",
	spcpdswwrss: "/spcpdswwrss.xml",
	spcmdrss: "/spcmdrss.xml",
	spcacrss: "/spcacrss.xml",
	spcmbrss: "/spcmbrss.xml",
});

export {
	NATIONAL_WEATHER_SERVICE,
	SEVERE_WEATHER_DATA_INVENTORY,
	STORM_PREDICTION_CENTER,
};
