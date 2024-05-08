import { PageLayout } from "components";
import { ActiveAlertMap } from "features/active-alert-map";
import { ActiveAlertCounts, AlertSection } from "features/active-alert-cards";
import { ConvectiveOutlooks } from "features/convective-outlooks";
import {
  useActiveNwsAlertsByType,
  useFakeNwsAlertsByType,
} from "services/nws-api-web-service";
import { CategoricalMap } from "features/convective-outlooks";

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
      <ActiveAlertCounts
        tornadoWarnings={alerts?.tornadoWarnings.length}
        tornadoWatches={alerts?.tornadoWatches.length}
        stormWarnings={alerts?.stormWarnings.length}
        stormWatches={alerts?.stormWatches.length}
        // tornadoWarnings={fake_tornado_warnings.length}
        // tornadoWatches={fake_tornado_watches.length}
        // stormWarnings={fake_severe_storm_warnings.length}
        // stormWatches={fake_severe_storm_watches.length}
      />
      <div className="grid grid-cols-2">
        <ActiveAlertMap
          tornadoWarnings={alerts?.tornadoWarnings}
          tornadoWatches={alerts?.tornadoWatches}
          stormWarnings={alerts?.stormWarnings}
          stormWatches={alerts?.stormWatches}
          // tornadoWarnings={fake_tornado_warnings}
          // tornadoWatches={fake_tornado_watches}
          // stormWarnings={fake_severe_storm_warnings}
          // stormWatches={fake_severe_storm_watches}
        />
        <CategoricalMap outlookDay={1} />
      </div>
      <ConvectiveOutlooks />
      <AlertSection
        alerts={alerts?.tornadoWarnings}
        alertType="Tornado Warning"
        // alerts={fake_tornado_warnings}
      />
      <AlertSection
        alerts={alerts?.tornadoWatches}
        alertType="Tornado Watch"
        // alerts={fake_tornado_watches}
      />
      <AlertSection
        alerts={alerts?.stormWarnings}
        alertType="Severe Thunderstorm Warning"
        // alerts={fake_severe_storm_warnings}
      />
      <AlertSection
        alerts={alerts?.stormWatches}
        alertType="Severe Thunderstorm Watch"
        // alerts={fake_severe_storm_watches}
      />
    </PageLayout>
  );
};

export default HomeScreen;
