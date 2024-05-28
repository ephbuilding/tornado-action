import * as TopoJSONClient from "topojson-client";
import AlbersTopoJSONMap from "json/topojson-albers-map.json";
import { albersGeoPath } from "utils/geometry";

const meshedCountyFeatures = TopoJSONClient.mesh(
  AlbersTopoJSONMap,
  AlbersTopoJSONMap.objects.counties
  // (a, b) => a !== b
);
// TODO: replace 3 US maps with this single file
// console.log(">> MESHED COUNTY FEATURES >>\n", meshedCountyFeatures);

export const USCountyMap = ({ children, pathGen }) => {
  return (
    <svg viewBox="0 0 975 610" xmlns="http://www.w3.org/2000/svg">
      <CountyFeatures pathGen={pathGen} />

      {children}
    </svg>
  );
};
export const USMapLoading = ({ loadingMessage }) => {
  return (
    <USStateMap>
      <text x={350} y={250} fill="red" className="text-3xl font-bold">
        {loadingMessage}
      </text>
    </USStateMap>
  );
};
export const USStateMap = ({ children }) => {
  const states = TopoJSONClient.feature(AlbersTopoJSONMap, "states");

  // if (states) console.log("states >>\n", states);

  return (
    <svg viewBox="0 -60 975 610" xmlns="http://www.w3.org/2000/svg">
      <path d={albersGeoPath(states)} stroke="white" fill="grey" />

      {children}
    </svg>
  );
};

// SUB-COMPONENTS
const CountyFeatures = ({ pathGen }) => {
  const { features: countyFeatures } = TopoJSONClient.feature(
    AlbersTopoJSONMap,
    "counties"
  );

  return (
    <path
      d={pathGen({ type: "FeatureCollection", features: countyFeatures })}
      stroke="white"
      fill="grey"
    />
  );
};
