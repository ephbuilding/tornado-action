import { checkStringForPhrase } from "utils";
import { NWS_STORM_SITUATIONS } from "../_constants/nws-alerts";

// ex: 'NWS Charlotte NC' --> 'Charlotte, NC'
export const changeWfoToCityState = (senderName) => {
  return senderName
    .slice(4)
    .split(/\s(?=[A-Z]{2})/)
    .join(", ");
};
export const createImpactedAreasMap = (areaDesc) => {
  const impactedAreasArr = createImpactedAreasArray(areaDesc);
  const impactedAreasMap = new Map();

  impactedAreasArr.forEach((areaState) => {
    const [area, state] = areaState.split(/\,\s/);
    assignToMapStateKey({ map: impactedAreasMap, area, state });
  });

  return impactedAreasMap;
};
const createImpactedAreasArray = (areaDesc) => {
  return areaDesc.split(/(?:;\s)/gm);
};
const assignToMapStateKey = ({ map, area, state }) => {
  if (map.get(state) === undefined) {
    map.set(state, new Array(area));
  } else {
    map.set(state, [...map.get(state), area]);
  }
};
// ? --- NWS STORM SITUATIONS
export const alertIsDestructiveStorm = (alertDescription) => {
  return checkStringForPhrase(
    alertDescription,
    NWS_STORM_SITUATIONS.destructive_storm
  );
};
export const alertIsPDS = (alertDescription) => {
  return checkStringForPhrase(
    alertDescription,
    NWS_STORM_SITUATIONS.particularly_dangerous_situation
  );
};
export const alertIsTornadoEmergency = (alertDescription) => {
  return checkStringForPhrase(
    alertDescription,
    NWS_STORM_SITUATIONS.tornado_emergency
  );
};
export const parseAlertDescription = (alert) => {
  return alert.properties.description.toLowerCase();
};
