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
                return <SignificantFeature key={keyID} feature={feature} />;
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
                return <SignificantFeature key={keyID} feature={feature} />;
              })
            : null}
        </g>
      </USStateMap>
    </div>
  );
};

// SUB-COMPONENTS
const CategoricalFeature = ({ feature }) => {
  const {
    properties: { dn },
  } = feature;
  const color = CAT_OUTLOOK_STYLES[dn].color;

  return (
    <path
      d={reverseAlbersGeoPath(feature)}
      fill={color}
      stroke={color}
      fillOpacity={0.7}
      strokeOpacity={0.9}
      strokeWidth={4}
    />
  );
};
const ProbabilisticTornadoFeature = ({ feature }) => {
  const {
    properties: { dn },
  } = feature;
  const color = PROB_TORNADO_STYLES[dn].color;

  return (
    <path
      d={reverseAlbersGeoPath(feature)}
      fill={color}
      stroke={color}
      fillOpacity={0.7}
      strokeOpacity={0.9}
      strokeWidth={4}
    />
  );
};
const ProbabilisticWindHailFeature = ({ feature }) => {
  const {
    id,
    properties: { dn },
  } = feature;
  console.log(feature.properties.idp_source + "-" + id + " >> DN: ", dn);
  const color = PROB_WIND_HAIL_STYLES[dn].color;

  return (
    <path
      d={reverseAlbersGeoPath(feature)}
      fill={color}
      stroke={color}
      fillOpacity={0.7}
      strokeOpacity={0.9}
      strokeWidth={4}
    />
  );
};
const SignificantFeature = ({ feature }) => {
  const {
    properties: { dn },
  } = feature;
  const color = SIGNIFICANT_STYLES[dn].color;

  return (
    <path
      d={reverseAlbersGeoPath(feature)}
      fill={color}
      stroke={color}
      fillOpacity={0.7}
      strokeOpacity={0.9}
      strokeWidth={4}
    />
  );
};
