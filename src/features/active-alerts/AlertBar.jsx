import { Alert, Button, Card } from "react-daisyui";
import {
  AlertMessageButtons,
  AlertCardModal,
  AlertPolygonMap,
  Body,
  Description,
  Instruction,
  ExpirationTime,
  ImpactedAreas,
  MaxHailSize,
  SenderName,
  CardTitle,
  TornadoDetection,
} from "./AlertModalSubComponents";
import {
  alertIsDestructiveStorm,
  alertIsPDS,
  alertIsTornadoEmergency,
  NWS_STORM_SITUATIONS,
} from "services/nws-api-web-service";

export const TornadoWarningAlert = ({ alert }) => {
  const { id, type, geometry, properties } = alert;
  const alertFeature = { id, type, geometry };
  const {
    areaDesc,
    description,
    effective,
    expires,
    instruction,
    senderName,

    // ! all parameter values in []
    parameters: { maxHailSize, tornadoDetection },
  } = properties;

  const isTornadoEmergency = alertIsTornadoEmergency(description);
  const isPDS = alertIsPDS(description);
  const isDestructiveStorm = alertIsDestructiveStorm(description);

  const bgColor = isTornadoEmergency
    ? "#651fff"
    : isPDS
    ? "#f0f"
    : isDestructiveStorm
    ? "#00f"
    : "red";

  return (
    <Card
      style={{ backgroundColor: `${bgColor}` }}
      className="p-2"
      // className="bg-gradient-to-br from-red-500 to-red-800 p-2"
    >
      <CardTitle>
        <SenderName senderName={senderName} />
      </CardTitle>

      <Body>
        <div className="flex justify-between">
          <TornadoDetection tornadoDetection={tornadoDetection} />
          <div className="mx-2" />
          <ExpirationTime expiresTime={expires} />
        </div>
        {/* <MaxHailSize maxHailSize={maxHailSize} /> */}
        {/* <AlertPolygonMap alertFeature={alert} /> */}
        <ImpactedAreas areaDesc={areaDesc} />
        <AlertMessageButtons
          description={description}
          instruction={instruction}
        />
      </Body>
    </Card>
  );
};

export const TornadoWatchAlert = ({ alert }) => {
  const { areaDesc, effective, expires, senderName, description, instruction } =
    alert?.properties;
  const isPDS = alertIsPDS(description);
  const bgColor = isPDS ? "#f0f" : "yellow";

  return (
    <Card style={{ backgroundColor: `${bgColor}` }} className="p-2">
      {/* className="bg-gradient-to-br from-yellow-300 to-yellow-600 p-2"> */}
      <CardTitle>
        <SenderName senderName={senderName} />
      </CardTitle>

      <Body>
        <ExpirationTime expiresTime={expires} />
        <ImpactedAreas areaDesc={areaDesc} />
        <AlertMessageButtons
          description={description}
          instruction={instruction}
        />
      </Body>
    </Card>
  );
};

export const SevereStormWarningAlert = ({ alert }) => {
  const { areaDesc, effective, expires, senderName, description, instruction } =
    alert?.properties;
  const isPDS = alertIsPDS(description);
  const isDestructiveStorm = alertIsDestructiveStorm(description);
  const bgColor = isPDS ? "#f0f" : isDestructiveStorm ? "#00f" : "orange";

  return (
    <Card
      style={{ backgroundColor: `${bgColor}` }}
      className="p-2"
      // className="bg-gradient-to-br from-orange-400 to-orange-600 p-2"
    >
      <CardTitle>
        <SenderName senderName={senderName} />
      </CardTitle>

      <Body>
        <ExpirationTime expiresTime={expires} />
        <ImpactedAreas areaDesc={areaDesc} />
        {/* <AlertPolygonMap alertFeature={alert} /> */}
        <AlertMessageButtons
          description={description}
          instruction={instruction}
        />
      </Body>
    </Card>
  );
};

export const SevereStormWatchAlert = ({ alert }) => {
  const { areaDesc, effective, expires, senderName, description, instruction } =
    alert?.properties;
  const isPDS = alertIsPDS(description);
  const isDestructiveStorm = alertIsDestructiveStorm(description);
  const bgColor = isPDS ? "#f0f" : isDestructiveStorm ? "#00f" : "lightgreen";

  return (
    // <div style={{ backgroundColor: bgColor }} className="p-2 flex rounded">
    //   <SenderName senderName={senderName} />
    //   <ExpirationTime expiresTime={expires} />
    // </div>
    <Card style={{ backgroundColor: bgColor }} className="p-2">
      <CardTitle>
        <SenderName senderName={senderName} />
      </CardTitle>

      <Body>
        <ExpirationTime expiresTime={expires} />
        <ImpactedAreas areaDesc={areaDesc} />
        {/* <p>{instruction}</p> */}
        <AlertMessageButtons
          description={description}
          instruction={instruction}
        />
      </Body>
    </Card>
  );
};
export const AlertBar = ({ alert }) => {
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
  const isTornadoEmergency = alertIsTornadoEmergency(description);
  const isPDS = alertIsPDS(description);
  const isDestructiveStorm = alertIsDestructiveStorm(description);

  let alertLabel = isTornadoEmergency
    ? "This is a TORNADO EMERGENCY!"
    : isPDS
    ? "This is a PARTICULARLY DANGEROUS SITUATION!"
    : isDestructiveStorm
    ? "This is a DESTRUCTIVE STORM!"
    : null;

  const alertColorMap = {
    "Tornado Warning": "red",
    "Tornado Watch": "yellow",
    "Severe Thunderstorm Warning": "orange",
    "Severe Thunderstorm Watch": "lightgreen",
  };

  const bgColor = isTornadoEmergency
    ? "#651fff"
    : isPDS
    ? "#f0f"
    : isDestructiveStorm
    ? "#00f"
    : alertColorMap[event];

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="flex justify-between p-2 rounded text-black"
    >
      <div>
        <span className="font-bold text-sm">{senderName}</span>
        {alertLabel && <div className="text-xs">{alertLabel}</div>}
      </div>
      <Button size="sm">Details</Button>
    </div>
  );
};
