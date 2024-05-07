import React from "react";
import { Button } from "react-daisyui";
import { PageLayout } from "components";

import { ENDPOINTS } from "services/spc-rss-feeds";
import { useSpcRssFeedsQuery } from "services/spc-rss-feeds";

const SpcRssScreen = () => {
  const [feedToDisplay, setFeedToDisplay] = React.useState("");
  const { data: severeWxFeed } = useSpcRssFeedsQuery(ENDPOINTS.severe_storm);
  const { data: pdsFeed } = useSpcRssFeedsQuery(ENDPOINTS.pds);
  const { data: mesoDiscFeed } = useSpcRssFeedsQuery(ENDPOINTS.meso_disc);
  const { data: convOtlkFeed } = useSpcRssFeedsQuery(ENDPOINTS.conv_otlk);

  const FEED_MAP = Object.freeze({
    severeWxFeed,
    pdsFeed,
    mesoDiscFeed,
    convOtlkFeed,
  });

  // if (severeWxFeed) {
  // 	console.log(">> SEVERE WX RSS FEED >>\n", severeWxFeed?.[0].title);
  // 	console.log(severeWxFeed?.[0].title.slice(4, 5));
  // }
  // if (pdsFeed) console.log(">> PDS RSS FEED >>\n", pdsFeed);
  // if (mesoDiscFeed)
  // 	console.log(">> MESO DISC RSS FEED >>\n", mesoDiscFeed?.[0].title);
  // if (convOtlkFeed)
  // 	console.log(">> CONVECTIVE OUTLOOK RSS FEED >>\n", convOtlkFeed?.[0].title);

  React.useEffect(() => {
    // console.log(">> FEED TO DISPLAY >>\n", feedToDisplay);
  });

  return (
    <PageLayout>
      <div className="flex justify-around">
        <Button
          color="accent"
          size="xs"
          disabled={pdsFeed?.[0].title.slice(4, 5) === "-"}
          onClick={() => setFeedToDisplay("pdsFeed")}
        >
          Particularly Dangerous Situations
        </Button>
        <Button
          color="accent"
          size="xs"
          disabled={severeWxFeed?.[0].title.slice(4, 5) === "-"}
          onClick={() => setFeedToDisplay("severeWxFeed")}
        >
          Severe Storms
        </Button>
        <Button
          color="accent"
          size="xs"
          disabled={mesoDiscFeed?.[0].title.slice(4, 5) === "-"}
          onClick={() => setFeedToDisplay("mesoDiscFeed")}
        >
          Meso Discussions
        </Button>
        <Button
          color="accent"
          size="xs"
          disabled={convOtlkFeed?.[0].title.slice(4, 5) === "-"}
          onClick={() => setFeedToDisplay("convOtlkFeed")}
        >
          Convective Outlooks
        </Button>
      </div>

      <div>
        {FEED_MAP[feedToDisplay]
          ? FEED_MAP[feedToDisplay].map((object) => {
              const { title, guid, pubDate, content, isoDate } = object;

              return (
                <div key={guid}>
                  <h2 className="h2">{title}</h2>
                  <h3>{pubDate}</h3>
                  <pre>{content}</pre>
                </div>
              );
            })
          : null}
      </div>
    </PageLayout>
  );
};

export default SpcRssScreen;
