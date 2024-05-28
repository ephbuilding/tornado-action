import {
  alertIsDestructiveStorm,
  alertIsPDS,
  alertIsTornadoEmergency,
} from "utils/nws-alerts";
import { Card } from "react-daisyui";
import { USStateMap } from "components";
import { NWS_ALERT_COLORS } from "constants/nws-alerts";
import { WarningPolygon, WatchPolygon } from "components/AlertPolygons";
import { createWatchAlertGeometry, reverseAlbersGeoPath } from "utils/geometry";

const EVENTS = [
  {
    title: "Tornado Emergency",
    description:
      "Confirmed, life-threatening tornado causing catastrophic damage.",
    from_color: "from-fuchsia-400",
  },
  {
    title: "Particularly Dangerous Situation",
    description:
      "Probable long-track tornadoes or wide-spread severe events such as intense derechos.",
    from_color: "from-purple-700",
  },
  {
    title: "Tornado Warning",
    description:
      "Radar-indicated or confirmed tornado on the ground.  Imminent danger to life and property.",
    from_color: "from-red-700",
  },
  {
    title: "Severe Thunderstorm Warning",
    description:
      "Confirmed severe weather in the form of damaging winds and/or hail. Like a tornado warning, there is imminent danger to life and property.",
    from_color: "from-orange-500",
  },
  {
    title: "Tornado Watch",
    description:
      "Tornadoes possible in and close to the watch area. Stay weather-aware if a warning is issued.",
    from_color: "from-yellow-300",
  },
  {
    title: "Severe Thunderstorm Watch",
    description:
      "Severe weather is possible in and close to the watch area. Be ready in case a severe thunderstorm warning is issued.",
    from_color: "from-green-300",
  },
];

export const ActiveAlertMap = ({
  tornadoWarnings,
  tornadoWatches,
  stormWarnings,
  stormWatches,
  showAlertModalFunc,
}) => {
  return (
    <div>
      <USStateMap>
        <WatchPolygons
          alerts={tornadoWatches}
          color={NWS_ALERT_COLORS.tornado_watch}
          onClickCallback={showAlertModalFunc}
        />
        <WatchPolygons
          alerts={stormWatches}
          color={NWS_ALERT_COLORS.severe_storm_watch}
          onClickCallback={showAlertModalFunc}
        />
        <WarningPolygons
          alerts={stormWarnings}
          color={NWS_ALERT_COLORS.severe_storm_warning}
          onClickCallback={showAlertModalFunc}
        />
        <WarningPolygons
          alerts={tornadoWarnings}
          color={NWS_ALERT_COLORS.tornado_warning}
          onClickCallback={showAlertModalFunc}
        />
      </USStateMap>

      {/* <AlertModal
        isOpen={isOpen}
        alertInfo={alertInfo}
        closeModalHandler={handleCloseModal}
      /> */}
    </div>
  );
};
export const ActiveAlertMapLegend = () => {
  return (
    <div className="px-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {EVENTS.map(({ description, from_color, title }) => (
        <Card
          key={title}
          className={`p-3 bg-gradient-to-br ${from_color} to-black`}
        >
          <Card.Body className="bg-black rounded-lg">
            <Card.Title className="uppercase text-sm">{title}</Card.Title>
            <p className="text-xs">{description}</p>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

// D3 CENTROID --> const [centX, centY] = d3GeoPath.centroid(alert.geometry);

const WarningPolygons = ({ alerts, color, onClickCallback }) => {
  return (
    <>
      {alerts && alerts.length > 0 ? (
        <g>
          {alerts.map((alert) => {
            return (
              <WarningPolygon
                key={alert.id}
                alert={alert}
                color={color}
                onClickCallback={onClickCallback}
              />
            );
          })}
        </g>
      ) : null}
    </>
  );
};

const WatchPolygons = ({ alerts, color, onClickCallback }) => {
  const isValidFeatures = alerts?.length > 0;

  return (
    <>
      {isValidFeatures
        ? alerts.map((alert) => {
            return (
              <WatchPolygon
                key={alert.id}
                alert={alert}
                color={color}
                onClickCallback={onClickCallback}
              />
            );
          })
        : null}
    </>
  );
};
