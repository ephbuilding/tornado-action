import { useState } from "react";
import { PageLayout } from "components";
import { Button, Modal } from "react-daisyui";
import { DayInfo, TextProductModal } from "features/convective-outlooks";
import { LAYER_IDS, MAPSERVER_LAYERS } from "constants/convective-outlooks";
import {
  CategoricalMap,
  ProbabilisticTornadoMap,
  ProbabilisticWindHailMap,
  Days4_8_ProbabilisticMap,
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
      <OutlooksGrid>
        {/* --- DAY 1 --- */}
        <CategoricalMap mapserverLayer={MAPSERVER_LAYERS.day_1_categorical} />
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
        {/* --- DAY 2 --- */}
        <CategoricalMap mapserverLayer={MAPSERVER_LAYERS.day_2_categorical} />
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
        {/* --- DAY 3 --- */}
        <CategoricalMap mapserverLayer={MAPSERVER_LAYERS.day_3_categorical} />
        <ProbabilisticWindHailMap
          probLayerId={LAYER_IDS.day_3_prob}
          sigLayerId={LAYER_IDS.day_3_sig_severe}
        />
        {/* --- DAYS 4-8 --- */}
        <Days4_8_ProbabilisticMap probLayerId={LAYER_IDS.day_4_prob} />
        <Days4_8_ProbabilisticMap probLayerId={LAYER_IDS.day_5_prob} />
        <Days4_8_ProbabilisticMap probLayerId={LAYER_IDS.day_6_prob} />
        <Days4_8_ProbabilisticMap probLayerId={LAYER_IDS.day_7_prob} />
        <Days4_8_ProbabilisticMap probLayerId={LAYER_IDS.day_8_prob} />
      </OutlooksGrid>
      {/* 
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
