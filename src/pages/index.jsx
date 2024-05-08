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

import { useActiveNwsAlertsByType } from "services/nws-api-web-service";

const HomeScreen = () => {
  // TODO: call NWS API Web Service funcs once & distribute to Sub-Components
  // TODO: handle Sub-Component-specific functionality in the Sub-Component
  // TODO: [?] simpler service functions vs. less API calls
  // TODO: make [1] API call then data.filter(alert.properties.event)

  // const { data: tornado_warnings } = useNwsActiveTornadoWarnings();
  // const { data: tornado_watches } = useNwsActiveTornadoWatches();
  // const { data: severe_storm_warnings } = useNwsActiveSevereStormWarnings();
  // const { data: severe_storm_watches } = useNwsActiveSevereStormWatches();

  // reduces API calls from 20/min to 4/min
  const { data } = useActiveNwsAlertsByType(
    "Tornado Warning,Tornado Watch,Severe Thunderstorm Warning,Severe Thunderstorm Watch"
  );

  const filterTornadoAndStormAlerts = (activeAlerts) => {
    let alerts = {
      tornadoWarnings: [],
      tornadoWatches: [],
      stormWarnings: [],
      stormWatches: [],
    };

    activeAlerts.forEach((alert) => {
      switch (alert.properties.event) {
        case "Tornado Warning":
          alerts.tornadoWarnings = [...alerts.tornadoWarnings, alert];
          break;
        case "Tornado Watch":
          alerts.tornadoWatches = [...alerts.tornadoWatches, alert];
          break;
        case "Severe Thunderstorm Warning":
          alerts.stormWarnings = [...alerts.stormWarnings, alert];
          break;
        case "Severe Thunderstorm Watch":
          alerts.stormWatches = [...alerts.stormWatches, alert];
          break;
      }
    });

    return alerts;
  };

  let alerts;

  if (data) alerts = filterTornadoAndStormAlerts(data);

  return (
    <PageLayout>
      <div className="grid grid-cols-2">
        <ActiveAlertCounts
          tornadoWarnings={alerts?.tornadoWarnings.length}
          tornadoWatches={alerts?.tornadoWatches.length}
          stormWarnings={alerts?.stormWarnings.length}
          stormWatches={alerts?.stormWatches.length}
        />
        <ActiveAlertMap />
      </div>
      <ConvectiveOutlooks />
      {/* TODO: eliminate AlertCard sections (only display detailed/highly visual AlertCard when user clicks on alert map) */}
      {/* TODO: create similar "Cards" for when user clicks on Convective Outlook Map areas */}
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
