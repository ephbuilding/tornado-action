import * as TopoJSONClient from "topojson-client";
import AlbersTopoJSONMap from "json/topojson-albers-map.json";
import CountyWarningAreas from "json/topojson-county-warning-areas.json";
import PublicForecastZones from "json/topojson-public-forecast-zones.json";

// -- ALBERS MAP FEATURES
export const albersNation = TopoJSONClient.feature(AlbersTopoJSONMap, "nation");
export const albersStatesMeshed = TopoJSONClient.mesh(
  AlbersTopoJSONMap,
  AlbersTopoJSONMap.objects.states
);
export const albersCounties = TopoJSONClient.feature(
  AlbersTopoJSONMap,
  "counties"
);
export const albersCountiesMeshed = TopoJSONClient.mesh(
  AlbersTopoJSONMap,
  AlbersTopoJSONMap.objects.counties
);
// -- FROM SHAPEFILES
export const countyWarningAreasMeshed = TopoJSONClient.mesh(
  CountyWarningAreas,
  CountyWarningAreas.objects.w_08mr23
);
export const publicForecastZonesMeshed = TopoJSONClient.mesh(
  PublicForecastZones,
  PublicForecastZones.objects.z_19se23
);
