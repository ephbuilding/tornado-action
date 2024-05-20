import { Alert } from "react-daisyui";
import { useFakeNwsAlertsByType } from "services/nws-api-web-service";
import {
  TornadoWarningAlert,
  TornadoWatchAlert,
  SevereStormWarningAlert,
  SevereStormWatchAlert,
} from "features/active-alerts/AlertBar";

export const AlertSection = ({ alerts, alertType }) => {
  const fakeAlerts = useFakeNwsAlertsByType(alertType);
  const ComponentMap = {
    "Tornado Warning": TornadoWarningAlert,
    "Tornado Watch": TornadoWatchAlert,
    "Severe Thunderstorm Warning": SevereStormWarningAlert,
    "Severe Thunderstorm Watch": SevereStormWatchAlert,
  };
  const AlertComponent = ComponentMap[alertType];

  return (
    <section className="p-2">
      <AlertSectionTitle title={alertType} />
      <AlertGridLayout>
        {alerts
          ? alerts.map((alert) => (
              <AlertComponent key={alert.id} alert={alert} />
            ))
          : null}
        {/* TODO: create "no active alerts" component */}
        {/* {fakeAlerts
          ? fakeAlerts.map((alert) => (
              <AlertComponent key={alert.id} alert={alert} />
            ))
          : null} */}
      </AlertGridLayout>
    </section>
  );
};

const AlertSectionTitle = ({ title }) => {
  return (
    <>
      <h2 className="font-display uppercase text-3xl mb-4 bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-600">
        {title}
      </h2>
    </>
  );
};

const AlertGridLayout = ({ children }) => {
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
      {children}
    </div>
  );
};
