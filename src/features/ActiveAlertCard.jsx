import { Button, Toggle } from "react-daisyui";
import {
  alertIsDestructiveStorm,
  alertIsPDS,
  alertIsTornadoEmergency,
} from "utils/nws-alerts";
import { NWS_ALERT_COLORS, NWS_STORM_SITUATIONS } from "constants/nws-alerts";
import {
  AlertPolygon,
  WarningPolygon,
  WatchPolygon,
} from "components/AlertPolygons";
import { USCountyMap, USStateMap } from "components/D3Maps";
import { geoAlbers, geoPath } from "d3";
import { createWatchAlertGeometry } from "utils/geometry";

// TODO: add "Tornado Possible" and "Considerable" tags to Severe Thunderstorm Warning alerts based on [tornadoDetecion, thunderstormDamageThreat] alert props

export const ActiveAlertCard = ({ alert, showAlertModalFunc }) => {
  const {
    areaDesc,
    description,
    effective,
    event,
    expires,
    instruction,
    senderName,
    parameters: {
      maxHailSize,
      maxWindGust,
      tornadoDetection,
      thunderstormDamageThreat,
    },
  } = alert?.properties;

  let situation = null;
  let situationColor = null;

  const isTornadoEmergency = alertIsTornadoEmergency(alert);
  const isPDS = alertIsPDS(alert);
  const isDestructiveStorm = alertIsDestructiveStorm(alert);

  if (isTornadoEmergency) {
    situation = NWS_STORM_SITUATIONS.tornado_emergency;
    situationColor = NWS_ALERT_COLORS.tornado_emergency;
  }
  if (isPDS) {
    situation = NWS_STORM_SITUATIONS.particularly_dangerous_situation;
    situationColor = NWS_ALERT_COLORS.particularly_dangerous_situation;
  }
  if (isDestructiveStorm) {
    situation = NWS_STORM_SITUATIONS.destructive_storm;
    situationColor = NWS_ALERT_COLORS.destructive_storm;
  }

  const alertColorMap = {
    "Tornado Warning": NWS_ALERT_COLORS.tornado_warning,
    "Tornado Watch": NWS_ALERT_COLORS.tornado_watch,
    "Severe Thunderstorm Warning": NWS_ALERT_COLORS.severe_storm_warning,
    "Severe Thunderstorm Watch": NWS_ALERT_COLORS.severe_storm_watch,
  };
  const alertColor = alertColorMap[event];

  const alertGeometry = isWarningEvent(event)
    ? alert.geometry
    : createWatchAlertGeometry(alert);

  const albersFitExtent = geoAlbers().fitExtent(
    // 975 x 610
    [
      [350, 160],
      [625, 450],
    ],
    alertGeometry
  );
  const extentPathGen = geoPath(albersFitExtent);
  const geometryColor = situationColor ?? alertColor;

  return (
    <Component color={alertColor}>
      <SituationTag situation={situation} color={situationColor} />
      <div className="flex justify-between">
        <SenderName senderName={senderName} />
        <Button
          size="sm"
          onClick={() =>
            showAlertModalFunc({
              alert: alert,
              color: situationColor ?? alertColor,
            })
          }
          style={{ backgroundColor: situationColor }}
        >
          Details
        </Button>
      </div>
      <div className="h-full w-full">
        {isWarningEvent(event) ? (
          <WarningViewbox
            color={geometryColor}
            geometry={alertGeometry}
            pathGen={extentPathGen}
          />
        ) : (
          <WatchViewbox
            color={geometryColor}
            geometry={alertGeometry}
            pathGen={extentPathGen}
          />
        )}
      </div>
      <div>
        {/* {thunderstormDamageThreat ? <p>{thunderstormDamageThreat}</p> : null}
        {tornadoDetection ? <p>{tornadoDetection}</p> : null} */}
      </div>
    </Component>
  );
};

// SUB-COMPONENTS
const Component = ({ color, children }) => (
  <div
    style={{
      borderColor: color,
      borderWidth: 5,
    }}
    className="p-2 rounded"
  >
    {children}
  </div>
);
const SituationTag = ({ situation, color }) => {
  return (
    <>
      {situation && (
        <div
          style={{ backgroundColor: color }}
          className="text-center font-bold uppercase p-2 rounded"
        >
          {situation}
        </div>
      )}
    </>
  );
};
const SenderName = ({ senderName }) => (
  <div>
    <span className="font-bold text-sm">{senderName.slice(4)}</span>
  </div>
);
const MaxHailSize = ({ maxHailSize }) => {};
const ThunderstormDamageThreat = ({ thunderstormDamageThreat }) => {};
const TornadoDetection = ({ tornadoDetection }) => {};
const WarningViewbox = ({ color, geometry, pathGen }) => {
  return (
    <USCountyMap pathGen={pathGen}>
      <AlertPolygon color={color} geometry={geometry} pathGen={pathGen} />
    </USCountyMap>
  );
};
const WarningZoomedViewbox = () => {};
const WatchViewbox = ({ color, geometry, pathGen }) => {
  return (
    <USStateMap pathGen={pathGen}>
      <AlertPolygon color={color} geometry={geometry} pathGen={pathGen} />
    </USStateMap>
  );
};
const WatchZoomedViewbox = () => {};

// UTILS
const isWarningEvent = (event) => {
  return event.toLowerCase().includes("warning");
};
