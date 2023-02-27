import React from "react";
import { Form, Radio } from "react-daisyui";
import { Basemap } from "_shared/components/maps";

import rewind from "@turf/rewind";
import { geoAlbers, geoPath } from "d3-geo";

import {
  useActiveAlerts,
  useActiveTornadoWarnings,
  useActiveTornadoWatches,
  usePrev2WeeksAlerts,
} from "./service";
import { logTornadoAlertError } from "./utils/log-tornado-alert-error";

import { ALERT_NAME } from "./constants";

import dayjs from "dayjs";
import LF from "dayjs/plugin/localizedFormat";
dayjs.extend(LF);

const alertColorMap = {
  2: {
    label: "storm",
    description: "> 10% chance of thunderstorms",
    abbr: "tstm",
    activeColor: "bg-[hsl(120,60%,30%)]",
    fill: "hsl(120,60%,30%)",
    stroke: "hsl(120,70%,30%)",
  },
  3: {
    label: "marginal",
    description: "scattered severe storms",
    abbr: "mrgl",
    activeColor: "bg-[hsl(120,100%,50%)]",
    fill: "hsl(120,100%,50%)",
    stroke: "hsl(120,100%,50%)",
  },
  4: {
    label: "slight",
    description: "organized severe storms expected",
    abbr: "slgt",
    activeColor: "bg-[hsl(60,100%,50%)]",
    fill: "hsl(60,100%,30%)",
    stroke: "hsl(60,100%,50%)",
  },
  5: {
    label: "enhanced",
    description: "concentrated, severe storms.",
    abbr: "enh",
    activeColor: "bg-[hsl(30,100%,50%)]",
    fill: "hsl(30,100%,30%)",
    stroke: "hsl(30,100%,50%)",
  },
  6: {
    label: "moderate",
    description:
      "widespread severe weather with multiple tornadoes and/or intense storms.",
    abbr: "mdt",
    activeColor: "bg-[hsl(0,100%,50%)]",
    fill: "hsl(0,100%,30%)",
    stroke: "hsl(0,100%,50%)",
  },
  8: {
    label: "high",
    description:
      "severe weather outbreak with intense tornadoes or a long-lived derecho system.",
    abbr: "high",
    activeColor: "bg-[hsl(300,100%,30%)]",
    fill: "hsl(300,100%,30%)",
    stroke: "hsl(300,100%,50%)",
  },
  10: {
    label: "significant",
    description:
      "severe weather outbreak with intense tornadoes or a long-lived derecho system.",
    abbr: "high",
    activeColor: "bg-[hsl(300,100%,30%)]",
    fill: "hsl(300,100%,30%)",
    stroke: "hsl(300,100%,50%)",
  },
};
const projection = geoAlbers();
const pathGen = geoPath(projection);

export const TornadoAlertMap = () => {
  const { data: warnings, error } = usePrev2WeeksAlerts(
    ALERT_NAME.tornadoWarning
  );

  console.log("PREV WARNINGS\n", warnings);

  return (
    <div className="grid gap-4">
      <Basemap>
        {warnings && <AlertPolygons featureCollection={warnings} />}
      </Basemap>
    </div>
  );
};

// -- COMPONENTS
const AlertPolygons = ({ featureCollection }) => {
  const colorMap = {
    ["Tornado Warning"]: "#f0f",
    // ["Tornado Watch"]: "#f90",  // NWS Web API returns empty []
    ["Severe Thunderstorm Warning"]: "#fff",
    // ["Severe Thunderstorm Watch"]: "#fff",  // NWS Web API returns empty []
  };

  return (
    <g>
      {featureCollection.features.map((feature, index) => {
        const properties = feature.properties;
        const event = properties.event;

        return (
          <g id={properties.id} key={properties.id}>
            <path
              d={pathGen(rewind(feature, { reverse: true }))}
              fillOpacity={0.8}
              fill={colorMap[`${event}`]}
              stroke="limegreen"
              strokeWidth={0.5}
            />
          </g>
        );
      })}
    </g>
  );
};

const NoActiveAlertsText = () => (
  <text className="text-3xl fill-white">No Active Alerts</text>
);