import { useState } from "react";
import { Modal } from "react-daisyui";
import { AiOutlineCloseCircle as CloseIcon } from "react-icons/ai";

import { USStateMap, USMapLoading } from "components";
import { useOutlookByLayerId } from "services/convective-outlook-geometry";
import { reverseAlbersGeoPath } from "utils/geometry";
import { CATEGORICAL } from "features/convective-outlooks/_constants/outlook-feature-details";

// TODO: refactor --> pass SPC Outlook MapServer layer ID instead of converting day to layer
const CAT_OUTLOOK = Object.freeze({
  2: {
    label: "Thunderstorm",
    color: "rgb(189, 255, 189)",
  },
  3: {
    label: "Marginal",
    color: "rgb(115, 178, 115)",
  },
  4: {
    label: "Slight",
    color: "rgb(247, 247, 143)",
  },
  5: {
    label: "Enhanced",
    color: "rgb(230, 152, 0)",
  },
  6: {
    label: "Moderate",
    color: "rgb(255, 0, 0)",
  },
  8: {
    label: "High",
    color: "rgb(255, 0, 197)",
  },
});
const PROB_TORNADO = Object.freeze({
  2: {
    label: "2%",
    color: "rgb(56, 168, 0)",
  },
  5: {
    label: "5%",
    color: "rgb(111, 25, 3)",
  },
  10: {
    label: "10%",
    color: "rgb(255, 198, 0)",
  },
  15: {
    label: "15%",
    color: "rgb(230, 0, 0)",
  },
  30: {
    label: "30%",
    color: "rgb(250, 0, 255)",
  },
  45: {
    label: "45%",
    color: "rgb(119, 6, 244)",
  },
  60: {
    label: "60%",
    color: "rgb(0, 77, 168)",
  },
});
const PROB_WIND_HAIL = Object.freeze({
  5: {
    label: "5%",
    color: "rgb(198, 162, 148)",
  },
  15: {
    label: "15%",
    color: "rgb(255, 255, 0)",
  },
  30: {
    label: "30%",
    color: "rgb(255, 0, 0)",
  },
  45: {
    label: "45%",
    color: "rgb(255, 0, 197)",
  },
  60: {
    label: "60%",
    color: "rgb(168, 0, 132)",
  },
});
const DAYS_4_8_PROB = Object.freeze({
  15: {
    label: "15%",
    color: "rgb(255, 255, 0)",
  },
  30: {
    label: "30%",
    color: "rgb(230, 152, 0)",
  },
});
export const CategoricalMap = ({ features, colorMap }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const openModalHandler = (category) => {
    setCategory(category);
    setIsOpen(true);
  };
  const closeModalHandler = () => setIsOpen(false);

  return (
    <>
      <div className="w-full h-full">
        <USStateMap>
          <g>
            {features
              ? features.map((feature) => (
                  <ConvectiveFeature
                    key={feature.id}
                    feature={feature}
                    openModalHandler={openModalHandler}
                  />
                ))
              : null}
          </g>
        </USStateMap>
        <FeatureDescriptionModal
          isOpen={isOpen}
          category={category}
          closeHandler={closeModalHandler}
        />
      </div>
    </>
  );
};

const ConvectiveFeature = ({ feature, openModalHandler }) => {
  const {
    id,
    properties: { dn, idp_source },
  } = feature;

  let category;

  if (dn != 0) category = CATEGORICAL[dn];

  return dn === 0 ? null : (
    <path
      key={`${idp_source}-${id}`}
      d={reverseAlbersGeoPath(feature)}
      fill={category.bgColor}
      opacity={0.7}
      stroke={category.stroke}
      strokeWidth={4}
      onClick={() => openModalHandler(category)}
    />
  );
};

export const Day1CategoricalOutlook = ({}) => {
  const { data: features } = useOutlookByLayerId(1);
  const isValidOutlook = features[0]?.properties?.dn > 0;

  return (
    <div className="w-full h-full">
      <USStateMap>
        <g>
          {isValidOutlook
            ? features.map((feature) => (
                <CategoricalFeature
                  key={feature.id}
                  feature={feature}
                  openModalHandler={openModalHandler}
                />
              ))
            : null}
        </g>
      </USStateMap>
      <FeatureDescriptionModal
        isOpen={isOpen}
        category={category}
        closeHandler={closeModalHandler}
      />
    </div>
  );
};
export const Day1TornadoProbSigOutlook = ({}) => {};
export const Day1HailProbSigOutlook = ({}) => {};
export const Day1WindProbSigOutlook = ({}) => {};

export const Day2CategoricalOutlook = ({}) => {};
export const Day2TornadoProbSigOutlook = ({}) => {};
export const Day2HailProbSigOutlook = ({}) => {};
export const Day2WindProbSigOutlook = ({}) => {};

export const Day3CategoricalOutlook = ({}) => {};
export const Day3ProbSigOutlook = ({}) => {};

const CategoricalFeature = ({ feature, showModal }) => {
  const {
    id,
    properties: { dn, idp_source },
  } = feature;

  let category;

  if (dn != 0) category = CATEGORICAL[dn];

  return dn === 0 ? null : (
    <path
      key={`${idp_source}-${id}`}
      d={reverseAlbersGeoPath(feature)}
      fill={category.bgColor}
      opacity={0.7}
      stroke={category.stroke}
      strokeWidth={4}
      onClick={() => openModalHandler(category)}
    />
  );
};
const ProbablisticTornadoFeature = ({}) => {};
const ProbablisticHailWindFeature = ({}) => {};
const SignificantFeature = ({}) => {};
const ConvectiveFeatureSVGPath = ({}) => {};

const FeatureDescriptionModal = ({ isOpen, category, closeHandler }) => {
  const { bgColor, description, label } = category;

  return (
    <Modal
      style={{ backgroundColor: bgColor }}
      open={isOpen}
      onClickBackdrop={closeHandler}
    >
      <div className="bg-base-100 rounded-md p-4">
        <div className="flex items-center mb-4">
          <CloseIcon
            onClick={closeHandler}
            size={30}
            className="mr-2 hover:fill-red-600"
          />
          <span>CLOSE</span>
        </div>
        <Modal.Header>{label}</Modal.Header>
        <Modal.Body>
          <pre className="whitespace-break-spaces">{description}</pre>
        </Modal.Body>
      </div>
    </Modal>
  );
};
