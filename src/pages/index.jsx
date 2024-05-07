import { PageLayout } from "components";
import { ActiveAlertMap } from "features/active-alert-map";
import { ActiveAlertCounts, AlertSection } from "features/active-alert-cards";
import { ConvectiveOutlooks } from "features/convective-outlooks";

import {
  TornadoWarningAlert,
  TornadoWatchAlert,
  SevereStormWarningAlert,
  SevereStormWatchAlert,
} from "features/active-alert-cards/AlertCards";

const HomeScreen = () => {
  return (
    <PageLayout>
      <div className="grid grid-cols-2">
        <ActiveAlertCounts />
        <ActiveAlertMap />
      </div>
      <ConvectiveOutlooks />
      <AlertSection
        alertComponent={TornadoWarningAlert}
        event="Tornado Warning"
      />
      <AlertSection alertComponent={TornadoWatchAlert} event="Tornado Watch" />
      <AlertSection
        alertComponent={SevereStormWarningAlert}
        event="Severe Thunderstorm Warning"
      />
      <AlertSection
        alertComponent={SevereStormWatchAlert}
        event="Severe Thunderstorm Watch"
      />
    </PageLayout>
  );
};

export default HomeScreen;
