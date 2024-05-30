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

  return (
    <div className="w-full h-full">
      <USStateMap>
        <g>
          {hasFeatures
            ? features.map((feature) => {
                const keyID = `${feature.properties.idp_source}-${feature.id}`;
                return <CategoricalFeature key={keyID} feature={feature} />;
              })
            : null}
        </g>
      </USStateMap>
    </div>
  );
};
export const ProbabilisticTornadoMap = ({ probLayerId, sigLayerId }) => {
  let hasProbFeatures = false;
  let hasSigFeatures = false;
  const { data: probFeatures } = useOutlookLayerById(probLayerId);
  const { data: sigFeatures } = useOutlookLayerById(sigLayerId);

  if (probFeatures) hasProbFeatures = probFeatures[0].properties.dn > 0;
  if (sigFeatures) hasSigFeatures = sigFeatures[0].properties.dn > 0;

  return (
    <div className="w-full h-full">
      <USStateMap>
        <g>
          {hasProbFeatures
            ? probFeatures.map((feature) => {
                const keyID = `${feature.properties.idp_source}-${feature.id}`;
                return (
                  <ProbabilisticTornadoFeature key={keyID} feature={feature} />
                );
              })
            : null}
          {hasSigFeatures
            ? sigFeatures.map((feature) => {
                const keyID = `${feature.properties.idp_source}-${feature.id}`;
                return (
                  <HatchedSignificantFeature key={keyID} feature={feature} />
                );
              })
            : null}
        </g>
      </USStateMap>
    </div>
  );
};
export const ProbabilisticWindHailMap = ({ probLayerId, sigLayerId }) => {
  let hasProbFeatures = false;
  let hasSigFeatures = false;
  const { data: probFeatures } = useOutlookLayerById(probLayerId);
  const { data: sigFeatures } = useOutlookLayerById(sigLayerId);

  if (probFeatures) hasProbFeatures = probFeatures[0].properties.dn > 0;
  if (sigFeatures) hasSigFeatures = sigFeatures[0].properties.dn > 0;

  return (
    <div className="w-full h-full">
      <USStateMap>
        <g>
          {hasProbFeatures
            ? probFeatures.map((feature) => {
                const keyID = `${feature.properties.idp_source}-${feature.id}`;
                return (
                  <ProbabilisticWindHailFeature key={keyID} feature={feature} />
                );
              })
            : null}
          {hasSigFeatures
            ? sigFeatures.map((feature) => {
                const keyID = `${feature.properties.idp_source}-${feature.id}`;
                return (
                  <HatchedSignificantFeature key={keyID} feature={feature} />
                );
              })
            : null}
        </g>
      </USStateMap>
    </div>
  );
};

// SUB-COMPONENTS
const CategoricalFeature = ({ feature }) => {
  const color = CAT_OUTLOOK_STYLES[feature.properties.dn].color;
  return <ConvectiveFeaturePath feature={feature} color={color} />;
};
const ProbabilisticTornadoFeature = ({ feature }) => {
  const color = PROB_TORNADO_STYLES[feature.properties.dn].color;
  return <ConvectiveFeaturePath feature={feature} color={color} />;
};
const ProbabilisticWindHailFeature = ({ feature }) => {
  const color = PROB_WIND_HAIL_STYLES[feature.properties.dn].color;
  return <ConvectiveFeaturePath feature={feature} color={color} />;
};
const HatchedSignificantFeature = ({ feature }) => {
  return (
    <>
      <defs>
        <pattern
          id="hatchPattern"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-1,1 l2,-2 M0,8 l8,-8 M7,9 l2,-2"
            stroke="#f00"
            strokeWidth={1}
          />
        </pattern>
      </defs>
      <path
        d={reverseAlbersGeoPath(feature)}
        fill="url(#hatchPattern)"
        stroke="#f00"
        fillOpacity={0.7}
        strokeOpacity={0.9}
        strokeWidth={1}
      />
    </>
  );
};
const ConvectiveFeaturePath = ({ feature, color }) => (
  <path
    d={reverseAlbersGeoPath(feature)}
    fill={color}
    stroke={color}
    fillOpacity={0.6}
    strokeWidth={3}
  />
);
