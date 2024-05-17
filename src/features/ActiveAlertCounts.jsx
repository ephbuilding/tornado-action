import { Stats } from "react-daisyui";
import { twMerge } from "tailwind-merge";

export const ActiveAlertCounts = ({
  tornadoEmergencies,
  pds,
  tornadoWarnings,
  tornadoWatches,
  destructiveStorms,
  stormWarnings,
  stormWatches,
}) => {
  return (
    <Stats className="flex">
      <AlertStatItem
        count={tornadoEmergencies}
        color="purple"
        title="TOR EMERGENCY"
      />
      <AlertStatItem count={pds} color="pink" title="PDS" />
      <AlertStatItem
        count={destructiveStorms}
        color="blue"
        title="DESTRUCTIVE"
      />
      <AlertStatItem count={tornadoWarnings} color="red" title="TOR WARNINGS" />
      <AlertStatItem
        count={tornadoWatches}
        color="yellow"
        title="TOR WATCHES"
      />
      <AlertStatItem
        count={stormWarnings}
        color="orange"
        title="STM WARNINGS"
      />
      <AlertStatItem
        count={stormWatches}
        color="limegreen"
        title="STM WATCHES"
      />
    </Stats>
  );
};

const AlertStatItem = ({ color, count, title }) => {
  const { Stat } = Stats;
  const bgColor = count > 0 ? color : "grey";

  return (
    <Stats.Stat
      style={{ backgroundColor: bgColor }}
      className="text-black place-items-center"
    >
      <Stat.Item variant="title" className="text-black">
        {title}
      </Stat.Item>
      <Stat.Item variant="value">{count}</Stat.Item>
    </Stats.Stat>
  );
};
