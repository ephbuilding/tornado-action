import { useState } from "react";
import rewind from "@turf/rewind";
import * as topojson from "topojson-client";
import { Button, Card, Modal } from "react-daisyui";
import { geoAlbers, geoPath } from "d3";
import { NWS_ALERT_COLORS } from "./_constants/nws-alerts";
import AlbersTopo from "components/_constants/albers-map.topo.json";
import { USStateMap } from "components";
import {
  alertIsDestructiveStorm,
  alertIsPDS,
  alertIsTornadoEmergency,
} from "features/_utils/nws-alerts";
import { reverseAlbersGeoPath } from "utils/geometry";

const projection = geoAlbers();
const d3GeoPath = geoPath(projection);

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
          color="yellow"
          callback={showAlertModalFunc}
        />
        <WatchPolygons
          alerts={stormWatches}
          color="limegreen"
          callback={showAlertModalFunc}
        />
        <WarningPolygons
          alerts={stormWarnings}
          color="orange"
          callback={showAlertModalFunc}
        />
        <WarningPolygons
          alerts={tornadoWarnings}
          color="red"
          callback={showAlertModalFunc}
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

const WarningPolygons = ({ alerts, color, callback }) => {
  return (
    <>
      {alerts && alerts.length > 0 ? (
        <g>
          {alerts.map((alert) => {
            const { description } = alert.properties;
            {
              /* const [centX, centY] = d3GeoPath.centroid(alert.geometry); */
            }
            const isTornadoEmergency = alertIsTornadoEmergency(alert);
            const isPDS = alertIsPDS(alert);
            const isDestructiveStorm = alertIsDestructiveStorm(alert);
            const polygonColor = isTornadoEmergency
              ? NWS_ALERT_COLORS.tornado_emergency
              : isPDS
              ? NWS_ALERT_COLORS.particularly_dangerous_situation
              : isDestructiveStorm
              ? NWS_ALERT_COLORS.destructive_storm
              : color;

            return (
              <WarningPolygon
                key={alert.id}
                feature={alert}
                color={polygonColor}
                onClick={callback}
              />
            );
          })}
        </g>
      ) : null}
    </>
  );
};
const WarningPolygon = ({ color, feature, onClick }) => {
  // const polygonGeometry = geoJsonPath(feature.geometry);

  return (
    feature?.geometry && (
      <path
        d={reverseAlbersGeoPath(feature.geometry)}
        fill={color}
        fillOpacity={0.65}
        stroke={color}
        strokeOpacity={0.85}
        strokeWidth={1}
        onClick={() => onClick(feature)}
      />
    )
  );
};
const WatchPolygons = ({ alerts, color, callback }) => {
  const isValidFeatures = alerts && alerts.length > 0;

  return (
    <>
      {isValidFeatures
        ? alerts.map((alert) => {
            const watchGeometry = createWatchPolygonGeometry({
              alert,
              topoJsonClient: topojson,
            });
            const isPDS = alertIsPDS(alert);
            const fillColor = isPDS
              ? NWS_ALERT_COLORS.particularly_dangerous_situation
              : color;

            return (
              <WatchPolygon
                key={alert.id}
                alert={alert}
                color={fillColor}
                feature={watchGeometry}
                onClick={callback}
              />
            );
          })
        : null}
    </>
  );
};
const WatchPolygon = ({ alert, color, feature, onClick }) => {
  return (
    <path
      d={d3GeoPath(rewind(feature, { reverse: true }))}
      fill={color}
      onClick={() => onClick(alert)}
      fillOpacity={0.5}
      stroke={color}
      strokeOpacity={0.75}
      strokeWidth={0.5}
    />
  );
};
// TODO: move to utils/nws-alerts.js
const createWatchPolygonGeometry = ({ alert, topoJsonClient }) => {
  const affectedCountyIds = alert.properties.geocode.SAME;
  const watchGeometry = topoJsonClient.merge(
    AlbersTopo,
    AlbersTopo.objects.counties.geometries.filter((geometry) => {
      const countyID = `0${geometry.id}`;
      return affectedCountyIds.includes(countyID);
    })
  );
  return watchGeometry;
};
