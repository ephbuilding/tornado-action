import { PageLayout } from "components";
import { ActiveAlertMap } from "features/active-alert-map";
import { ActiveAlertCounts, AlertSection } from "features/active-alert-cards";
import { ConvectiveOutlooks } from "features/convective-outlooks";

import {
  useActiveNwsAlertsByType,
  useFakeNwsAlertsByType,
} from "services/nws-api-web-service";

const HomeScreen = () => {
  let alerts;
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
  if (data) alerts = filterTornadoAndStormAlerts(data);

  const fake_tornado_warnings = useFakeNwsAlertsByType("Tornado Warning");
  const fake_tornado_watches = useFakeNwsAlertsByType("Tornado Watch");
  const fake_severe_storm_warnings = useFakeNwsAlertsByType(
    "Severe Thunderstorm Warning"
  );
  const fake_severe_storm_watches = useFakeNwsAlertsByType(
    "Severe Thunderstorm Watch"
  );

  return (
    <PageLayout>
      <div className="grid grid-cols-2">
        <ActiveAlertCounts
          tornadoWarnings={alerts?.tornadoWarnings.length}
          tornadoWatches={alerts?.tornadoWatches.length}
          stormWarnings={alerts?.stormWarnings.length}
          stormWatches={alerts?.stormWatches.length}
        />
        <ActiveAlertMap
          tornadoWarnings={alerts?.tornadoWarnings}
          tornadoWatches={alerts?.tornadoWatches}
          stormWarnings={alerts?.stormWarnings}
          stormWatches={alerts?.stormWatches}
        />
      </div>
      <ConvectiveOutlooks />
      {/* TODO: eliminate AlertCard sections (only display detailed/highly visual AlertCard when user clicks on alert map) */}
      {/* TODO: create similar "Cards" for when user clicks on Convective Outlook Map areas */}
      <AlertSection
        alerts={alerts?.tornadoWarnings}
        alertType="Tornado Warning"
      />
      <AlertSection alerts={alerts?.tornadoWatches} alertType="Tornado Watch" />
      <AlertSection
        alerts={alerts?.stormWarnings}
        alertType="Severe Thunderstorm Warning"
      />
      <AlertSection
        alerts={alerts?.stormWatches}
        alertType="Severe Thunderstorm Watch"
      />
    </PageLayout>
  );
};

export default HomeScreen;
