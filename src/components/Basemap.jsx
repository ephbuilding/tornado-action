import { albersGeoPath } from "utils/geometry";
import {
  albersNation as nation,
  albersStatesMeshed as states,
  albersCountiesMeshed as counties,
  countyWarningAreasMeshed as countyWarningAreas,
  publicForecastZonesMeshed as publicForecastZones,
} from "constants/map-features";

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
