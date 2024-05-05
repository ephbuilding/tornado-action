import { Stats } from "react-daisyui";

export const ActiveAlertCounts = ({ tornadoWarnings, tornadoWatches }) => {
  const { Stat } = Stats;

  return (
    <div className="flex justify-center my-auto">
      <Stats>
        <Stats.Stat className="bg-red-500 text-black place-items-center">
          <Stat.Item variant="title" className="text-black">
            {" "}
            WARNINGS
          </Stat.Item>
          <Stat.Item variant="value">{tornadoWarnings?.length ?? 0}</Stat.Item>
        </Stats.Stat>
        <Stats.Stat className="bg-yellow-300 text-black place-items-center">
          <Stat.Item variant="title" className="text-black">
            WATCHES
          </Stat.Item>
          <Stat.Item variant="value">{tornadoWatches?.length ?? 0}</Stat.Item>
        </Stats.Stat>
      </Stats>
    </div>
  );
};
