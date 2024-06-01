import { useState } from "react";
import { Button } from "react-daisyui";
import { PageLayout } from "components";
import { MAPSERVER_LAYERS } from "constants/convective-outlooks";
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
        <CategoricalMap catLayer={MAPSERVER_LAYERS.day_1_categorical} />
        <ProbabilisticTornadoMap
          probLayer={MAPSERVER_LAYERS.day_1_prob_tornado}
          sigLayer={MAPSERVER_LAYERS.day_1_sig_tornado}
        />
        <ProbabilisticWindHailMap
          probLayer={MAPSERVER_LAYERS.day_1_prob_wind}
          sigLayer={MAPSERVER_LAYERS.day_1_sig_wind}
        />
        <ProbabilisticWindHailMap
          probLayer={MAPSERVER_LAYERS.day_1_prob_hail}
          sigLayer={MAPSERVER_LAYERS.day_1_sig_hail}
        />
        {/* --- DAY 2 --- */}
        <CategoricalMap catLayer={MAPSERVER_LAYERS.day_2_categorical} />
        <ProbabilisticTornadoMap
          probLayer={MAPSERVER_LAYERS.day_2_prob_tornado}
          sigLayer={MAPSERVER_LAYERS.day_2_sig_tornado}
        />
        <ProbabilisticWindHailMap
          probLayer={MAPSERVER_LAYERS.day_2_prob_wind}
          sigLayer={MAPSERVER_LAYERS.day_2_sig_wind}
        />
        <ProbabilisticWindHailMap
          probLayer={MAPSERVER_LAYERS.day_2_prob_hail}
          sigLayer={MAPSERVER_LAYERS.day_2_sig_hail}
        />
        {/* --- DAY 3 --- */}
        <CategoricalMap catLayer={MAPSERVER_LAYERS.day_3_categorical} />
        <ProbabilisticWindHailMap
          probLayer={MAPSERVER_LAYERS.day_3_prob}
          sigLayer={MAPSERVER_LAYERS.day_3_sig_severe}
        />
        {/* --- DAYS 4-8 --- */}
        <Days4_8_ProbabilisticMap probLayer={MAPSERVER_LAYERS.day_4_prob} />
        <Days4_8_ProbabilisticMap probLayer={MAPSERVER_LAYERS.day_5_prob} />
        <Days4_8_ProbabilisticMap probLayer={MAPSERVER_LAYERS.day_6_prob} />
        <Days4_8_ProbabilisticMap probLayer={MAPSERVER_LAYERS.day_7_prob} />
        <Days4_8_ProbabilisticMap probLayer={MAPSERVER_LAYERS.day_8_prob} />
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
  <div className="md:grid md:grid-cols-2 lg:grid-cols-3">{children}</div>
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
// const OutlookGridItem = ({ dayNumber, showOutlookText }) => (
//   <div className="flex flex-col items-center md:flex-1 mb-5">
//     <DayInfo day={dayNumber} />
//     {/* <CategoricalMap outlookDay={dayNumber} /> */}
//     <OutlookTextModalBtn openHandler={showOutlookText} outlookDay={dayNumber} />
//   </div>
// );
// const OutlookTextModalBtn = ({ openHandler, outlookDay }) => (
//   <Button
//     variant="outline"
//     color="accent"
//     className="w-25"
//     size="xs"
//     onClick={() => openHandler(outlookDay)}
//   >
//     {`Day ${outlookDay} Details`}
//   </Button>
// );
