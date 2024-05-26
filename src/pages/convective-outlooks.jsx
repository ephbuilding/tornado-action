import { useState } from "react";
import { Button, Modal } from "react-daisyui";
import { PageLayout } from "components";
import {
  CategoricalMap,
  DayInfo,
  TextProductModal,
} from "features/convective-outlooks";
import { useOutlookLayerById } from "services/convective-outlook-geometry";

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
  const LAYER_IDS = Object.freeze({
    day_1_convective: "0",
    day_1_categorical: "1",
    day_1_sig_tornado: "2",
    day_1_prob_tornado: "3",
    day_1_sig_hail: "4",
    day_1_prob_hail: "5",
    day_1_sig_wind: "6",
    day_1_prob_wind: "7",
    day_2_convective: "8",
    day_2_categorical: "9",
    day_2_sig_tornado: "10",
    day_2_prob_tornado: "11",
    day_2_sig_hail: "12",
    day_2_prob_hail: "13",
    day_2_sig_wind: "14",
    day_2_prob_wind: "15",
    day_3_convective: "16",
    day_3_categorical: "17",
    day_3_prob: "18",
    day_3_sig_severe: "19",
    days_4_thru_8_convective: "20",
    day_4_prob: "21",
    day_5_prob: "22",
    day_6_prob: "23",
    day_7_prob: "24",
    day_8_prob: "25",
  });

  return (
    <PageLayout>
      <h1 className="text-3xl uppercase font-bold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-br from-primary to-base-content">
        Convective Outlooks
      </h1>

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

const OutlooksGrid = ({ children }) => (
  <div className="md:grid md:grid-cols-2 xl:grid-cols-3">{children}</div>
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
