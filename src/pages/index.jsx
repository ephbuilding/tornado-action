import { PageLayout } from "components";
import { ActiveAlertMap } from "features/active-alert-map";
import { AlertSection } from "features/active-alert-cards/AlertSection";
import { ConvectiveOutlooks } from "features/convective-outlooks";

import {
  TornadoWarningAlert,
  TornadoWatchAlert,
} from "features/active-alert-cards/AlertCards";

const HomeScreen = () => {
  return (
    <PageLayout>
      <ActiveAlertMap />
      <AlertSection
        alertComponent={TornadoWarningAlert}
        event="Tornado Warning"
      />
      <AlertSection alertComponent={TornadoWatchAlert} event="Tornado Watch" />
      <ConvectiveOutlooks />
    </PageLayout>
  );
};

export default HomeScreen;
