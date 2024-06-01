import { albersGeoPath } from "utils/geometry";
import * as TopoJSONClient from "topojson-client";
import AlbersTopoJSONMap from "json/topojson-albers-map.json";
import {
  albersNation as nation,
  albersStatesMeshed as states,
  albersCountiesMeshed as counties,
  countyWarningAreasMeshed as countyWarningAreas,
  publicForecastZonesMeshed as publicForecastZones,
} from "constants/map-features";

const meshedCountyFeatures = TopoJSONClient.mesh(
  AlbersTopoJSONMap,
  AlbersTopoJSONMap.objects.counties
  // (a, b) => a !== b
);
// console.log(">> MESHED COUNTY FEATURES >>\n", meshedCountyFeatures);
export const Basemap = ({
  pathGen = pathGenerator,
  showStates = true,
  showCounties = false,
  showCWAs = false,
  showPFZs = false,
  children,
}) => {
  return (
    <svg viewBox="0 -60 975 610" xmlns="http://www.w3.org/2000/svg">
      <path
        d={albersGeoPath(nation)}
        strokeWidth={0.5}
        stroke="white"
        fill="black"
      />
      <MapFeatures
        isVisible={showStates}
        pathGen={pathGen}
        features={states}
        strokeWidth={0.25}
      />
      <MapFeatures
        isVisible={showCounties}
        pathGen={pathGen}
        features={counties}
        strokeWidth={0.25}
      />
      <MapFeatures
        isVisible={showCWAs}
        pathGen={pathGen}
        features={countyWarningAreas}
        strokeWidth={0.5}
      />
      <MapFeatures
        isVisible={showPFZs}
        pathGen={pathGen}
        features={publicForecastZones}
        strokeWidth={0.5}
      />
      {children}
    </svg>
  );
};
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
const MapFeatures = ({ pathGen, features, isVisible, ...pathArgs }) => {
  return (
    <>
      {isVisible && (
        <path
          d={albersGeoPath(features)}
          {...pathArgs}
          stroke="white"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
      )}
    </>
  );
};
