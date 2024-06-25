import { Button, Toggle } from "react-daisyui";
import {
  alertIsDestructiveStorm,
  alertIsPDS,
  alertIsTornadoEmergency,
} from "utils/nws-alerts";
import { NWS_ALERT_COLORS, NWS_STORM_SITUATIONS } from "constants/nws-alerts";
import { WarningPolygon, WatchPolygon } from "components/AlertPolygons";
import { USCountyMap, USStateMap } from "components/D3Maps";
import { geoAlbers, geoPath } from "d3";

export const ActiveAlertCard = ({ alert, showAlertModalFunc }) => {
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

  const albersFitExtent = geoAlbers().fitExtent(
    // 975 x 610
    [
      [350, 160],
      [625, 450],
    ],
    alert
  );
  const extentPathGen = geoPath(albersFitExtent);

  return (
    <div
      style={{
        backgroundColor: alertColor,
      }}
      className="p-2 rounded text-black"
    >
      <div className="flex justify-between ">
        <div>
          <span className="font-bold text-sm">{senderName.slice(4)}</span>
          {/* {situation && (
          <div
            style={{ backgroundColor: situationColor }}
            className="text-xs p-2 rounded"
          >
            {situation}
          </div>
        )} */}
        </div>
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
        {event.toLowerCase().includes("warning") ? (
          <USCountyMap pathGen={extentPathGen}>
            <WarningPolygon
              alert={alert}
              color={situationColor}
              pathGen={extentPathGen}
            />
          </USCountyMap>
        ) : (
          <USStateMap>
            <WatchPolygon
              alert={alert}
              color={situationColor}
              // pathGen={extentPathGen}
            />
          </USStateMap>
        )}
      </div>
    </div>
  );
};
export const AlertFilters = ({ handler, filterState }) => {
  // * [toggleName] matches filterState props

  const toggleNamesAndLabels = [
    {
      toggleName: "showTornadoWarnings",
      label: "Tornado Warnings",
    },
    {
      toggleName: "showTornadoWatches",
      label: "Tornado Watches",
    },
    {
      toggleName: "showStormWarnings",
      label: "Severe Storm Warnings",
    },
    {
      toggleName: "showStormWatches",
      label: "Severe Storm Watches",
    },
  ];

  return (
    <div className="flex justify-center">
      <div className="mb-6 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {toggleNamesAndLabels.map(({ toggleName, label }) => {
          return (
            <AlertFilterToggle
              key={toggleName}
              name={toggleName}
              onChangeHandler={handler}
              isToggled={filterState[toggleName]}
              label={label}
            />
          );
        })}
      </div>
    </div>
  );
};
export const AlertFilterToggle = ({
  name,
  onChangeHandler,
  isToggled,
  label,
}) => {
  return (
    <div className="flex my-2 mx-4">
      <Toggle
        color="success"
        name={name}
        onChange={onChangeHandler}
        checked={isToggled}
        size="sm"
      />
      <span className="ml-2 text-sm">{label}</span>
    </div>
  );
};
