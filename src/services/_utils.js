export const countPropertyValueOccurrences = (objArr, property) => {
  let uniqueValues = new Map();

  // get value of objArr[property]
  objArr.forEach((curObject) => {
    const thisValue = curObject[property];
    // IF: value is already in countValues[]
    if (uniqueValues.has(thisValue)) {
      // THEN: valueCount++
      uniqueValues.set(thisValue, uniqueValues.get(thisValue) + 1);
    } else {
      // ELSE: push value to countValues[] with countValues[value].count = 1
      propValueCounts[property].count = 1;
    }
  });
};
export const createMonthRangeDates = (year, month, day = "01") => {
  // SWDI has max date range of 1 month
  // ** Date() months are indexed from 0
  // to account for that: date range = user's selected month (-1) + 1 month (passed month value)
  if (year !== undefined && month !== undefined) {
    let ogStartDate, formattedStartDate, ogEndDate, formattedEndDate;

    ogStartDate = new Date(year, month - 1, day);
    ogEndDate = new Date(year, month, day);

    formattedStartDate = formatToYYYYMMDD(ogStartDate);
    formattedEndDate = formatToYYYYMMDD(ogEndDate);

    const DATE_RANGE = {
      start: formattedStartDate,
      end: formattedEndDate,
    };

    return DATE_RANGE;
  } else {
    throw new Error("Missing year/month value.");
  }
};
export const createUniqueAlertArraysObject = (alertObjectArray) => {
  const uniqueAlertArraysObject = Object.create({});

  alertObjectArray.forEach((alertObject) => {
    const event = alertObject.properties.event;

    if (!uniqueAlertArraysObject.hasOwnProperty(event)) {
      uniqueAlertArraysObject[event] = [];
      uniqueAlertArraysObject[event].push(alertObject);
    }
    uniqueAlertArraysObject[event].push(alertObject);
  });

  return uniqueAlertArraysObject;
};
export const formatYYYYMMDD = (date) => {
  return date.toISOString().slice(0, 10).split("-").join("");
};
export const handleSelectOnChange = (
  selectOnChangeEvent,
  currentState,
  setState
) => {
  const property = selectOnChangeEvent.target.name;
  const value = selectOnChangeEvent.target.value;

  setState({
    ...currentState,
    [property]: value,
  });
};
export const parseGeoJsonCoords = (arrWithGeoJson) => {
  const geoJsonCoordsArr = arrWithGeoJson.map((tvs) => {
    return tvs.geometry.coordinates;
  });

  return geoJsonCoordsArr;
};
export const parseLocation = (WMOidentifier) => {
  const splitWmoId = WMOidentifier.split(" ");
  const station = splitWmoId.slice(1, 2)[0];
  return station.slice(1);
};
// TODO: refactor this to RECURSIVELY find key BEFORE sorting
export const sortArrByKey = (unsortedArr, key) => {
  const sortASC = (curObj, nexObj) => {
    const currentValue = curObj.properties[key];
    const nextValue = nexObj.properties[key];

    if (currentValue < nextValue) return 1;
    if (currentValue === nextValue) return 0;
    if (currentValue > nextValue) return -1;
  };
  return unsortedArr.sort(sortASC);
};
// ///////////////////////// NOTE: ////////////////////////////////
//        - SWDI returns multiple coord-unique TVS for each tornado
//        - outside of rendering a tornado's path, I only need 1
//        - uniqueSignatures() returns 1 TVS/tornado
// ///////////////////////// NOTE: ////////////////////////////////
// TODO: reference FCC algo for filtering objects from array based on matching entries
export const uniqueTornadoVortexSignatures = (sortedTVS) => {
  let uniqueTVS = [];

  for (let i = 0; i < sortedTVS.length - 1; i++) {
    const curCELL_ID = sortedTVS[i].properties.CELL_ID;
    const curWSR_ID = sortedTVS[i].properties.WSR_ID;
    const nextCELL_ID = sortedTVS[i + 1].properties.CELL_ID;
    const nextWSR_ID = sortedTVS[i + 1].properties.WSR_ID;
    if (curCELL_ID === nextCELL_ID && nextWSR_ID !== curWSR_ID) {
      uniqueTVS.push(sortedTVS[i]);
    }
  }

  return uniqueTVS;
};
