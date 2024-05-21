import { Button } from "react-daisyui";
import {
  alertIsDestructiveStorm,
  alertIsPDS,
  alertIsTornadoEmergency,
} from "./_utils/nws-alerts";
import {
  NWS_ALERT_COLORS,
  NWS_STORM_SITUATIONS,
} from "./_constants/nws-alerts";

export const ActiveAlertCard = ({ alert }) => {
  const {
    areaDesc,
    description,
    effective,
    event,
    expires,
    instruction,
    senderName,
    parameters: { maxHailSize, tornadoDetection },
  } = alert?.properties;
  const alertColorMap = {
    "Tornado Warning": NWS_ALERT_COLORS.tornado_warning,
    "Tornado Watch": NWS_ALERT_COLORS.tornado_watch,
    "Severe Thunderstorm Warning": NWS_ALERT_COLORS.severe_storm_warning,
    "Severe Thunderstorm Watch": NWS_ALERT_COLORS.severe_storm_watch,
  };

  let situation = null;
  // let situationColor = null;
  const isTornadoEmergency = alertIsTornadoEmergency(description);
  const isPDS = alertIsPDS(description);
  const isDestructiveStorm = alertIsDestructiveStorm(description);

  if (isTornadoEmergency) situation = NWS_STORM_SITUATIONS.tornado_emergency;
  if (isPDS) situation = NWS_STORM_SITUATIONS.particularly_dangerous_situation;
  if (isDestructiveStorm) situation = NWS_STORM_SITUATIONS.destructive_storm;

  const situationColor = isTornadoEmergency
    ? NWS_ALERT_COLORS.tornado_emergency
    : isPDS
    ? NWS_ALERT_COLORS.particularly_dangerous_situation
    : isDestructiveStorm
    ? NWS_ALERT_COLORS.destructive_storm
    : alertColorMap[event];

  return (
    <div
      style={{ backgroundColor: alertColorMap[event] }}
      className="flex justify-between p-2 rounded text-black"
    >
      <div>
        <span className="font-bold text-sm">{senderName}</span>
        {situation && (
          <div
            style={{ backgroundColor: situationColor }}
            className="text-xs p-2 rounded"
          >
            {situation}
          </div>
        )}
      </div>
      <Button size="sm">Details</Button>
    </div>
  );
};
