import { useState } from "react";
import { Modal } from "react-daisyui";
import { reverseAlbersGeoPath } from "utils/geometry";
import { USStateMap, USMapLoading } from "components";
import { AiOutlineCloseCircle as CloseIcon } from "react-icons/ai";
import { useOutlookByLayerId } from "services/convective-outlook-geometry";
import { CAT_OUTLOOK_STYLES } from "constants/convective-outlooks";

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

  if (dn != 0) category = CAT_OUTLOOK_STYLES[dn];

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
