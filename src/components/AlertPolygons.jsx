import {
  alertIsDestructiveStorm,
  alertIsPDS,
  alertIsTornadoEmergency,
} from "utils/nws-alerts";
import { reverseAlbersGeoPath } from "utils/geometry";
import { NWS_ALERT_COLORS } from "constants/nws-alerts";
import { createWatchAlertGeometry } from "utils/geometry";

// TODO: refactor to single AlertPolygon that only takes [color, geometry] args

export const WarningPolygon = ({ alert, color, onClickCallback }) => {
  const isDestructiveStorm = alertIsDestructiveStorm(alert);
  const isPDS = alertIsPDS(alert);
  const isTornadoEmergency = alertIsTornadoEmergency(alert);
  const polygonColor = isTornadoEmergency
    ? NWS_ALERT_COLORS.tornado_emergency
    : isPDS
    ? NWS_ALERT_COLORS.particularly_dangerous_situation
    : isDestructiveStorm
    ? NWS_ALERT_COLORS.destructive_storm
    : color;

  return (
    alert?.geometry && (
      <path
        d={reverseAlbersGeoPath(alert.geometry)}
        fill={polygonColor}
        stroke={polygonColor}
        fillOpacity={0.65}
        strokeOpacity={0.85}
        strokeWidth={1}
        onClick={() => onClickCallback({ alert, color: polygonColor })}
      />
    )
  );
};

export const WatchPolygon = ({ alert, color, onClickCallback }) => {
  const isPDS = alertIsPDS(alert);
  const isDestructiveStorm = alertIsDestructiveStorm(alert);
  const polygonColor = isPDS
    ? NWS_ALERT_COLORS.particularly_dangerous_situation
    : isDestructiveStorm
    ? NWS_ALERT_COLORS.destructive_storm
    : color;
  const watchGeometry = createWatchAlertGeometry(alert);

  return (
    <path
      d={reverseAlbersGeoPath(watchGeometry)}
      fill={polygonColor}
      stroke={polygonColor}
      fillOpacity={0.5}
      strokeOpacity={0.75}
      strokeWidth={0.5}
      onClick={() => onClickCallback({ alert, color: polygonColor })}
    />
  );
};
