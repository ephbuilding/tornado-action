import { useState } from "react";
import { Button, Modal } from "react-daisyui";
import { PageLayout } from "components";
import { DayInfo, TextProductModal } from "features/convective-outlooks";
import { LAYER_IDS } from "constants/convective-outlooks";
import {
  CategoricalMap,
  ProbabilisticTornadoMap,
  ProbabilisticWindHailMap,
} from "features/ConvectiveOutlookMaps";

const ConvectiveOutlookScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [outlookDay, setOutlookDay] = useState(1);
  const showModalHandler = (outlookDay) => {
    setOutlookDay(outlookDay);
    setIsOpen(true);
  };
  const closeModalHandler = () => {
    setIsOpen(false);
  };

  return (
    <PageLayout>
      <h1 className="text-3xl uppercase font-bold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-br from-primary to-base-content">
        Convective Outlooks
      </h1>

      <OutlooksGrid>
        <CategoricalMap layerID={LAYER_IDS.day_1_categorical} />
        <ProbabilisticTornadoMap
          probLayerId={LAYER_IDS.day_1_prob_tornado}
          sigLayerId={LAYER_IDS.day_1_sig_tornado}
        />
        <ProbabilisticWindHailMap
          probLayerId={LAYER_IDS.day_1_prob_wind}
          sigLayerId={LAYER_IDS.day_1_sig_wind}
        />
        <ProbabilisticWindHailMap
          probLayerId={LAYER_IDS.day_1_prob_hail}
          sigLayerId={LAYER_IDS.day_1_sig_hail}
        />
      </OutlooksGrid>
      <OutlooksGrid>
        <CategoricalMap layerID={LAYER_IDS.day_2_categorical} />
        <ProbabilisticTornadoMap
          probLayerId={LAYER_IDS.day_2_prob_tornado}
          sigLayerId={LAYER_IDS.day_2_sig_tornado}
        />
        <ProbabilisticWindHailMap
          probLayerId={LAYER_IDS.day_2_prob_wind}
          sigLayerId={LAYER_IDS.day_2_sig_wind}
        />
        <ProbabilisticWindHailMap
          probLayerId={LAYER_IDS.day_2_prob_hail}
          sigLayerId={LAYER_IDS.day_2_sig_hail}
        />
      </OutlooksGrid>
      <OutlooksGrid>
        <CategoricalMap layerID={LAYER_IDS.day_3_categorical} />
      </OutlooksGrid>
      {/* <OutlooksGrid>
        <OutlookGridItem dayNumber={1} showOutlookText={showModalHandler} />
        <OutlookGridItem dayNumber={2} showOutlookText={showModalHandler} />
        <OutlookGridItem dayNumber={3} showOutlookText={showModalHandler} />
      </OutlooksGrid>
      <TextProductModal
        isOpen={isOpen}
        outlookDay={outlookDay}
        closeHandler={closeModalHandler}
      /> */}
    </PageLayout>
  );
};

export default ConvectiveOutlookScreen;

// SUB-COMPONENTS
const OutlooksGrid = ({ children }) => (
  <div className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {children}
  </div>
);

const OutlookGridItem = ({ dayNumber, showOutlookText }) => (
  <div className="flex flex-col items-center md:flex-1 mb-5">
    <DayInfo day={dayNumber} />
    {/* <CategoricalMap outlookDay={dayNumber} /> */}
    <OutlookTextModalBtn openHandler={showOutlookText} outlookDay={dayNumber} />
  </div>
);

const OutlookTextModalBtn = ({ openHandler, outlookDay }) => (
  <Button
    variant="outline"
    color="accent"
    className="w-25"
    size="xs"
    onClick={() => openHandler(outlookDay)}
  >
    {`Day ${outlookDay} Details`}
  </Button>
);
