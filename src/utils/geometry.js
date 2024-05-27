import turfRewind from "@turf/rewind";
import { geoAlbers, geoPath } from "d3";
import * as topojsonClient from "topojson-client";
import AlbersMapTopoJSON from "components/_constants/albers-map.topo.json";

const albersProjection = geoAlbers();
const albersGeoPath = geoPath(albersProjection);

export const createNWSWatchGeometry = (alert) => {
  const affectedCountyIds = alert.properties.geocode.SAME;
  const watchGeometry = topojsonClient.merge(
    AlbersMapTopoJSON,
    // prepend '0' to D3 topoJSON county ids to match NWS county IDs
    AlbersMapTopoJSON.objects.counties.geometries.filter((geometry) => {
      const countyID = `0${geometry.id}`;
      return affectedCountyIds.includes(countyID);
    })
  );
  return watchGeometry;
};

export const reverseAlbersGeoPath = (geometry) => {
  return albersGeoPath(turfRewind(geometry, { reverse: true }));
};
