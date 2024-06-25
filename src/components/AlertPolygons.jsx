import {
  alertIsDestructiveStorm,
  alertIsPDS,
  alertIsTornadoEmergency,
} from "utils/nws-alerts";
import { reverseAlbersGeoPath } from "utils/geometry";
import { NWS_ALERT_COLORS } from "constants/nws-alerts";
import { createWatchAlertGeometry } from "utils/geometry";

// TODO: refactor to single AlertPolygon that only takes ({color, geometry, pathGen, onClickCallback}) args

export const WarningPolygon = ({
  alert,
  color,
  pathGen = reverseAlbersGeoPath,
  onClickCallback = undefined,
}) => {
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

  console.log("alert.geomertry >> : ", alert.geometry);
  console.log("warning polygonColor >> : ", color);

  return (
    alert?.geometry && (
      <path
        d={pathGen(alert.geometry)}
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

export const WatchPolygon = ({
  alert,
  color,
  pathGen = reverseAlbersGeoPath,
  onClickCallback = undefined,
}) => {
  const isPDS = alertIsPDS(alert);
  const isDestructiveStorm = alertIsDestructiveStorm(alert);
  const polygonColor = isPDS
    ? NWS_ALERT_COLORS.particularly_dangerous_situation
    : isDestructiveStorm
    ? NWS_ALERT_COLORS.destructive_storm
    : color;
  const watchGeometry = createWatchAlertGeometry(alert);

  console.log("watchGeometry >> : ", watchGeometry);
  console.log("watch polygonColor >> : ", polygonColor);

  return (
    <path
      d={pathGen(watchGeometry)}
      fill={polygonColor}
      stroke={polygonColor}
      fillOpacity={0.5}
      strokeOpacity={0.75}
      strokeWidth={0.5}
      onClick={() => onClickCallback({ alert, color: polygonColor })}
    />
  );
};
