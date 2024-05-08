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
        className="bg-purple-600"
        title="TOR EMERGENCY"
      />
      <AlertStatItem count={pds} className="bg-pink-300" title="PDS" />
      <AlertStatItem
        count={tornadoWarnings}
        className="bg-red-600"
        title="TOR WARNINGS"
      />
      <AlertStatItem
        count={tornadoWatches}
        className="bg-yellow-300"
        title="TOR WATCHES"
      />
      <AlertStatItem
        count={destructiveStorms}
        className="bg-blue-600"
        title="DESTRUCTIVE"
      />
      <AlertStatItem
        count={stormWarnings}
        className="bg-orange-500"
        title="STM WARNINGS"
      />
      <AlertStatItem
        count={stormWatches}
        className="bg-green-500"
        title="STM WATCHES"
      />
    </Stats>
  );
};

const AlertStatItem = ({ className, count, title }) => {
  const { Stat } = Stats;
  const classes = twMerge("text-black place-items-center", className);

  return (
    <Stats.Stat className={classes}>
      <Stat.Item variant="title" className="text-black">
        {title}
      </Stat.Item>
      <Stat.Item variant="value">{count}</Stat.Item>
    </Stats.Stat>
  );
};
