import { PageLayout } from "components";
import { ActiveAlertMap } from "features/active-alert-map";
import { ActiveAlertCounts } from "features/ActiveAlertCounts";
import { AlertSection } from "features/active-alert-cards";
import { ConvectiveOutlooks } from "features/convective-outlooks";
import {
  alertIsDestructiveStorm,
  alertIsPDS,
  alertIsTornadoEmergency,
  parseAlertDescription,
  useActiveNwsAlertsByType,
  useFakeNwsAlertsByType,
} from "services/nws-api-web-service";

const HomeScreen = () => {
  const fake_tornado_warnings = useFakeNwsAlertsByType("Tornado Warning");
  const fake_tornado_watches = useFakeNwsAlertsByType("Tornado Watch");
  const fake_severe_storm_warnings = useFakeNwsAlertsByType(
    "Severe Thunderstorm Warning"
  );
  const fake_severe_storm_watches = useFakeNwsAlertsByType(
    "Severe Thunderstorm Watch"
  );
  const { data } = useActiveNwsAlertsByType(
    "Tornado Warning,Tornado Watch,Severe Thunderstorm Warning,Severe Thunderstorm Watch"
  );
  let alerts;
  let pdsAlerts;
  let tornadoEmergencyAlerts;
  let destructiveStormAlerts;

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
  if (data) {
    destructiveStormAlerts = data.filter((alert) => {
      const alertDescription = parseAlertDescription(alert);
      return alertIsDestructiveStorm(alertDescription);
    });
    pdsAlerts = data.filter((alert) => {
      const alertDescription = parseAlertDescription(alert);
      return alertIsPDS(alertDescription);
    });
    tornadoEmergencyAlerts = data.filter((alert) => {
      const alertDescription = parseAlertDescription(alert);
      return alertIsTornadoEmergency(alertDescription);
    });
    alerts = filterTornadoAndStormAlerts(data);
  }

  console.log("TORNADO EMERGENCIES: ", tornadoEmergencyAlerts);
  console.log("PDS: ", pdsAlerts);
  console.log("DESTRUCTIVE STORMS: ", destructiveStormAlerts);

  return (
    <PageLayout>
      <ActiveAlertCounts
        tornadoEmergencies={tornadoEmergencyAlerts?.length}
        pds={pdsAlerts?.length}
        tornadoWarnings={alerts?.tornadoWarnings.length}
        tornadoWatches={alerts?.tornadoWatches.length}
        destructiveStorms={destructiveStormAlerts?.length}
        stormWarnings={alerts?.stormWarnings.length}
        stormWatches={alerts?.stormWatches.length}
        // tornadoWarnings={fake_tornado_warnings.length}
        // tornadoWatches={fake_tornado_watches.length}
        // stormWarnings={fake_severe_storm_warnings.length}
        // stormWatches={fake_severe_storm_watches.length}
      />
      {/* <div className="grid grid-cols-2"> */}
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
      {/* <CategoricalMap outlookDay={1} /> */}
      {/* </div> */}
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
