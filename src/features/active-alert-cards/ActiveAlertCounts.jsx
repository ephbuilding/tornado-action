import { Stats } from "react-daisyui";

import { useNwsAlertsByEvent } from "services/nws-api-web-service";
import { EVENTS } from "services/nws-api-web-service";

export const ActiveAlertCounts = () =>
  //   {
  //   tornadoWarnings,
  //   tornadoWatches,
  //   stormWarnings,
  //   stormWatches,
  // }
  {
    const { Stat } = Stats;

    const { data: tornado_warnings } = useNwsAlertsByEvent(
      EVENTS.tornado_warning
    );
    const { data: tornado_watches } = useNwsAlertsByEvent(EVENTS.tornado_watch);
    const { data: storm_warnings } = useNwsAlertsByEvent(
      EVENTS.severe_storm_warning
    );
    const { data: storm_watches } = useNwsAlertsByEvent(
      EVENTS.severe_storm_watch
    );

    return (
      <div className="flex justify-center my-auto">
        <Stats>
          <Stats.Stat className="bg-red-600 text-black place-items-center">
            <Stat.Item variant="title" className="text-black text">
              TOR WARNINGS
            </Stat.Item>
            <Stat.Item variant="value">
              {tornado_warnings?.length ?? 0}
            </Stat.Item>
          </Stats.Stat>
          <Stats.Stat className="bg-yellow-300 text-black place-items-center">
            <Stat.Item variant="title" className="text-black">
              TOR WATCHES
            </Stat.Item>
            <Stat.Item variant="value">
              {tornado_watches?.length ?? 0}
            </Stat.Item>
          </Stats.Stat>
          <Stats.Stat className="bg-orange-500 text-black place-items-center">
            <Stat.Item variant="title" className="text-black">
              STM WARNINGS
            </Stat.Item>
            <Stat.Item variant="value">{storm_warnings?.length ?? 0}</Stat.Item>
          </Stats.Stat>
          <Stats.Stat className="bg-green-500 text-black place-items-center">
            <Stat.Item variant="title" className="text-black">
              STM WATCHES
            </Stat.Item>
            <Stat.Item variant="value">{storm_watches?.length ?? 0}</Stat.Item>
          </Stats.Stat>
        </Stats>
      </div>
    );
  };
