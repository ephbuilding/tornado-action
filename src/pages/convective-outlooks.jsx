import { useState } from "react";
import { Button, Modal } from "react-daisyui";

import { PageLayout } from "components";
import {
  CategoricalMap,
  DayInfo,
  TextProductModal,
} from "features/convective-outlooks";

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
        <OutlookGridItem dayNumber={1} showOutlookText={showModalHandler} />
        <OutlookGridItem dayNumber={2} showOutlookText={showModalHandler} />
        <OutlookGridItem dayNumber={3} showOutlookText={showModalHandler} />
      </OutlooksGrid>
      <TextProductModal
        isOpen={isOpen}
        outlookDay={outlookDay}
        closeHandler={closeModalHandler}
      />
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
    <CategoricalMap outlookDay={dayNumber} />
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
