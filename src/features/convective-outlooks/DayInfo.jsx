import { DayJSDateTime } from "components";

import { useCategoricalOutlookByLayerId } from "services/convective-outlook-geometry.js";

// TODO: refactor --> only pass valid,expire to component
export const DayInfo = ({ day }) => {
  let valid, expire;

  const CATEGORICAL_DAY_TO_LAYER = Object.freeze({
    1: 1,
    2: 9,
    3: 17,
  });

  const { data } = useCategoricalOutlookByLayerId(
    CATEGORICAL_DAY_TO_LAYER[day]
  );

  if (data) {
    valid = data[0]?.properties.valid;
    expire = data[0]?.properties.expire;
  }

  return (
    <div>
      <DayHeading day={day} />
      <div className="text-center">
        <p className="text-xs">
          <OutlookDate date={valid} />
          &nbsp;&#45;&nbsp;
          <OutlookDate date={expire} />
        </p>
      </div>
    </div>
  );
};

const DayHeading = ({ day }) => (
  <h3 className="text-center font-bold uppercase mb-3">{`Day ${day}`}</h3>
);

const OutlookDate = ({ date }) => (
  <DayJSDateTime
    utcDate={date ? date : "N/A"}
    format="ddd MMM D, LT"
    className="text-xs sm:text-sm"
  />
);
