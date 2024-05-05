import {
	GiAwareness,
	GiDamagedHouse,
	GiDeathSkull,
	GiModernCity,
} from "react-icons/gi";
import { BiMapAlt, BiTargetLock } from "react-icons/bi";
import { RiNumbersLine, RiTornadoLine } from "react-icons/ri";
import { TiWeatherStormy } from "react-icons/ti";
import { ImWarning } from "react-icons/im";

export const APP_FEATURES = [
	{
		name: "Tornado Alerts",
		tagline:
			"Tornado warnings and watches straight from the National Weather Service.",
		benefits: [
			{
				name: "Particulary Dangerous Situation",
				description:
					"Visually confirmed, life-threatening tornado on the ground.  Get to a basement or storm shelter NOW.  Your life depends on it.",
				icon: GiDeathSkull,
			},
			{
				name: "Tornado Warning",
				description:
					"Visually or radar-confirmed storm rotation.  Get to the center-most room on the lowest floor A.S.A.P.",
				icon: RiTornadoLine,
			},
			{
				name: "Tornado Watch",
				description:
					'Conditions are right to produce a tornado.  Double check your safety list and "keep your head on a swivel."',
				icon: GiAwareness,
			},
		],
	},
	{
		name: "Severe Weather Outlooks",
		tagline:
			"Never get caught off-guard.  Be proactive and stay aware of building storm systems.",
		benefits: [
			{
				name: "Severe Thunderstorm Outlooks",
				description:
					"Maps displaying areas at increased risk of severe weather over the next 8 days.",
				icon: TiWeatherStormy,
			},
			{
				name: "Elevated Risk Levels",
				description: "Specific risk probablities for high-risk locations.",
				icon: ImWarning,
			},
			{
				name: "Major Cities",
				description:
					"Largely populated areas likely to be impacted by severe weather.",
				icon: GiModernCity,
			},
		],
	},
];
