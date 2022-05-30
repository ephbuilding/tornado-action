import dynamic from "next/dynamic";
import { useQuery } from "react-query";
import { app_features } from "site_data";
import { PageWrapper } from "components/common";
import { SPCOutlookMap } from "components/feature";
import {
	HomePageFeatureSection,
	HomePageHero,
	AlertsPageTornadoAlertSection,
} from "components/view";

import { Clock } from "components/common";

const HomeScreen = () => {
	return (
		<PageWrapper>
			<HomePageHero />
			{app_features &&
				app_features.map((feature) => {
					return (
						<HomePageFeatureSection featureOBJ={feature} key={feature.name} />
					);
				})}
		</PageWrapper>
	);
};

export default HomeScreen;
