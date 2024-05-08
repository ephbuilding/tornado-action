import { useState } from "react";
import rewind from "@turf/rewind";
import * as topojson from "topojson-client";
import { Button, Modal } from "react-daisyui";
import { geoAlbers, geoPath, geoTransform } from "d3";

import AlbersTopo from "components/_constants/albers-map.topo.json";
import { USStateMap } from "components";
import {
  TornadoWarningAlert,
  SevereStormWarningAlert,
  TornadoWatchAlert,
  SevereStormWatchAlert,
} from "./AlertModal";
import {
  alertIsDestructiveStorm,
  alertIsPDS,
  alertIsTornadoEmergency,
  useNwsActiveTornadoWarnings,
  useNwsActiveTornadoWatches,
  useNwsActiveSevereStormWarnings,
  useNwsActiveSevereStormWatches,
  useFakeAlertsByEvent,
  NWS_STORM_SITUATIONS,
} from "services/nws-api-web-service";

import { FaTornado } from "react-icons/fa6";
import { IoThunderstorm } from "react-icons/io5";

const projection = geoAlbers();
const d3GeoPath = geoPath(projection);

export const ActiveAlertMap = () =>
  //   {
  //   tornadoWarnings,
  //   tornadoWatches,
  //   stormWarnings,
  //   stormWatches,
  // }
  {
    const { data: tornado_warnings } = useNwsActiveTornadoWarnings();
    const { data: tornado_watches } = useNwsActiveTornadoWatches();
    const { data: severe_storm_warnings } = useNwsActiveSevereStormWarnings();
    const { data: severe_storm_watches } = useNwsActiveSevereStormWatches();

    const fake_tornado_warnings = useFakeAlertsByEvent("Tornado Warning");
    const fake_tornado_watches = useFakeAlertsByEvent("Tornado Watch");
    const fake_severe_storm_warnings = useFakeAlertsByEvent(
      "Severe Thunderstorm Warning"
    );
    const fake_severe_storm_watches = useFakeAlertsByEvent(
      "Severe Thunderstorm Watch"
    );

    const [isOpen, setIsOpen] = useState(false);
    const [alertInfo, setAlertInfo] = useState(null);

    const handleShowAlertModal = (alert) => {
      setAlertInfo(alert);
      setIsOpen((isOpen) => !isOpen);
    };

    const handleCloseModal = () => {
      setIsOpen(false);
    };

    return (
      <>
        {/* <AlertMapLegend /> */}
        <USStateMap>
          <WatchPolygons
            alerts={tornado_watches}
            // alerts={fake_tornado_watches}
            color="yellow"
            callback={handleShowAlertModal}
          />
          <WatchPolygons
            alerts={severe_storm_watches}
            // alerts={fake_severe_storm_watches}
            color="limegreen"
            callback={handleShowAlertModal}
          />
          <WarningPolygons
            alerts={severe_storm_warnings}
            // alerts={fake_severe_storm_warnings}
            color="orange"
            icon={IoThunderstorm}
            callback={handleShowAlertModal}
          />
          <WarningPolygons
            alerts={tornado_warnings}
            // alerts={fake_tornado_warnings}
            color="red"
            icon={FaTornado}
            callback={handleShowAlertModal}
          />
        </USStateMap>

        <AlertModal
          isOpen={isOpen}
          alertInfo={alertInfo}
          closeModalHandler={handleCloseModal}
        />
      </>
    );
  };

// ------------
// --- WARNINGS
// ------------
const WarningPolygons = ({ alerts, color, icon, callback }) => {
  return (
    <>
      {alerts && alerts.length > 0 ? (
        <g>
          {alerts.map((alert) => {
            const { description } = alert.properties;
            const [centX, centY] = d3GeoPath.centroid(alert.geometry);
            const isTornadoEmergency = alertIsTornadoEmergency(description);
            const isPDS = alertIsPDS(description);
            const polygonColor = isTornadoEmergency
              ? "#651fff"
              : isPDS
              ? "#f0f"
              : color;

            const Icon = icon;

            // return (
            // 	<circle
            // 		cx={centX}
            // 		cy={centY}
            // 		key={alert.id}
            // 		fill={polygonColor}
            // 		r='5'
            // 	/>
            // );

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
    <path
      // TODO: create new geoJsonPath(geometry)
      d={d3GeoPath(rewind(feature.geometry, { reverse: true }))}
      fill={color}
      fillOpacity={0.65}
      // stroke={color}
      stroke={color}
      strokeOpacity={0.85}
      strokeWidth={1}
      onClick={() => onClick(feature)}
    />
  );
};

// ------------
// --- WATCHES
// ------------

const WatchPolygons = ({ alerts, color, callback }) => {
  const isValidFeatures = alerts && alerts.length > 0;

  return (
    <>
      {isValidFeatures
        ? alerts.map((alert) => {
            // TODO: move watch poly creation logic to util func
            const affectedCountyIds = alert.properties.geocode.SAME;
            const { description } = alert.properties;
            const isPDS = alertIsPDS(description);
            const fillColor = isPDS ? "#f0f" : color;

            const watchFeature = topojson.merge(
              AlbersTopo,
              AlbersTopo.objects.counties.geometries.filter((geometry) => {
                const id = `0${geometry.id}`;
                return affectedCountyIds.includes(id);
              })
            );

            return (
              <WatchPolygon
                key={alert.id}
                alert={alert}
                color={fillColor}
                feature={watchFeature}
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

const AlertModal = ({ isOpen, closeModalHandler, alertInfo }) => {
  const ALERT_TYPE = {
    "Tornado Warning": TornadoWarningAlert,
    "Severe Thunderstorm Warning": SevereStormWarningAlert,
    "Tornado Watch": TornadoWatchAlert,
    "Severe Thunderstorm Watch": SevereStormWatchAlert,
  };

  const CurrentAlertModal = ALERT_TYPE[alertInfo?.properties?.event];

  return (
    <>
      {alertInfo !== null ? (
        <Modal open={isOpen} className="overflow-auto">
          <Button
            size="sm"
            color="ghost"
            shape="circle"
            className="absolute right-2 top-2"
            onClick={closeModalHandler}
          >
            x
          </Button>
          <CurrentAlertModal alert={alertInfo} />
        </Modal>
      ) : null}
    </>
  );
};
