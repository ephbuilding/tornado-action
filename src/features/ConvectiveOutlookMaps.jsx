import {
  CAT_OUTLOOK_STYLES,
  PROB_TORNADO_STYLES,
  PROB_WIND_HAIL_STYLES,
  PROB_DAYS_4_8_STYLES,
  SIGNIFICANT_STYLES,
} from "constants/convective-outlooks";
import { USStateMap } from "components/D3Maps";
import { reverseAlbersGeoPath } from "utils/geometry";
import { useOutlookLayerById } from "services/convective-outlook-geometry";

export const CategoricalMap = ({ layerID }) => {
  let hasFeatures = false;
  const { data: features } = useOutlookLayerById(layerID);

  if (features) hasFeatures = features[0].properties.dn > 0;

  console.log("hasFeatures: ", hasFeatures);

  return (
    <div className="w-full h-full">
      <USStateMap>
        <g>
          {hasFeatures
            ? features.map((feature) => (
                <ConvectiveFeature key={feature.id} feature={feature} />
              ))
            : null}
        </g>
      </USStateMap>
    </div>
  );
};
export const ProbabilisticMap = ({ probabilisticLayerID, sigLayerID }) => {};

// SUB-COMPONENTS
const ConvectiveFeature = ({ feature }) => {
  const {
    id,
    properties: { dn, idp_source },
  } = feature;
  const color = CAT_OUTLOOK_STYLES[dn].color;

  return (
    <path
      key={`${idp_source}-${id}`}
      d={reverseAlbersGeoPath(feature)}
      fill={color}
      stroke={color}
      fillOpacity={0.7}
      strokeOpacity={0.9}
      strokeWidth={4}
    />
  );
};
