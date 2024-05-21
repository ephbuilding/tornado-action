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
