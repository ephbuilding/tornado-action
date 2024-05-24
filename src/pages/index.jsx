import { useState } from "react";
import { PageLayout } from "components";
import { CategoricalMap } from "features/convective-outlooks";
import { ActiveAlertMap } from "features/ActiveAlertMap";
import { ActiveAlertCard } from "features/ActiveAlertCard";
import { ActiveAlertModal } from "features/ActiveAlertModal";
import { ActiveAlertCounts } from "features/ActiveAlertCounts";
import {
  alertIsDestructiveStorm,
  alertIsPDS,
  alertIsTornadoEmergency,
  parseAlertDescription,
  useActiveNwsAlertsByType,
  useFakeNwsAlertsByType,
} from "services/nws-alerts";

const HomeScreen = () => {
  const [alertModalIsOpen, setAlertModalIsOpen] = useState(false);
  const [alertModalData, setAlertModalData] = useState(null);
  const showAlertModal = (alert) => {
    setAlertModalData(alert);
    setAlertModalIsOpen((isOpen) => !isOpen);
  };
  const closeAlertModal = () => {
    setAlertModalIsOpen(false);
  };

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
  let alerts = {
    tornadoWarnings: [],
    tornadoWatches: [],
    stormWarnings: [],
    stormWatches: [],
  };
  let pdsAlerts;
  let tornadoEmergencyAlerts;
  let destructiveStormAlerts;

  const filterTornadoAndStormAlerts = (activeAlerts) => {
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

  return (
    <PageLayout>
      <ActiveAlertModal
        alert={alertModalData}
        isOpen={alertModalIsOpen}
        closeFunc={closeAlertModal}
      />
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
      <div className="grid grid-cols-2">
        <ActiveAlertMap
          tornadoWarnings={alerts?.tornadoWarnings}
          tornadoWatches={alerts?.tornadoWatches}
          stormWarnings={alerts?.stormWarnings}
          stormWatches={alerts?.stormWatches}
          showAlertModalFunc={showAlertModal}
          // tornadoWarnings={fake_tornado_warnings}
          // tornadoWatches={fake_tornado_watches}
          // stormWarnings={fake_severe_storm_warnings}
          // stormWatches={fake_severe_storm_watches}
        />
        <CategoricalMap outlookDay={1} />
      </div>
      {/* <ConvectiveOutlooks /> */}

      <div className="my-2 grid gap-4 xl:grid-cols-4">
        {alerts?.tornadoWarnings.map((alert) => (
          <ActiveAlertCard
            key={alert.id}
            alert={alert}
            showAlertModalFunc={showAlertModal}
          />
        ))}
      </div>
      <div className="my-2 grid gap-4 xl:grid-cols-4">
        {alerts?.tornadoWatches.map((alert) => (
          <ActiveAlertCard
            key={alert.id}
            alert={alert}
            showAlertModalFunc={showAlertModal}
          />
        ))}
      </div>
      <div className="my-2 grid gap-4 xl:grid-cols-4">
        {alerts?.stormWarnings.map((alert) => (
          <ActiveAlertCard
            key={alert.id}
            alert={alert}
            showAlertModalFunc={showAlertModal}
          />
        ))}
      </div>
      <div className="my-2 grid gap-4 xl:grid-cols-4">
        {alerts?.stormWatches.map((alert) => (
          <ActiveAlertCard
            key={alert.id}
            alert={alert}
            showAlertModalFunc={showAlertModal}
          />
        ))}
      </div>

      {/* <AlertSection
        alerts={alerts?.tornadoWarnings}
        alertType="Tornado Warning"
        alerts={fake_tornado_warnings}
      />
      <AlertSection
        alerts={alerts?.tornadoWatches}
        alertType="Tornado Watch"
        alerts={fake_tornado_watches}
      />
      <AlertSection
        alerts={alerts?.stormWarnings}
        alertType="Severe Thunderstorm Warning"
        alerts={fake_severe_storm_warnings}
      />
      <AlertSection
        alerts={alerts?.stormWatches}
        alertType="Severe Thunderstorm Watch"
        alerts={fake_severe_storm_watches}
      /> */}
    </PageLayout>
  );
};

export default HomeScreen;
