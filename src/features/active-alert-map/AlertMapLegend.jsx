import { Card } from "react-daisyui";
import { FaTornado } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import { TbPolygon } from "react-icons/tb";

const events = [
	{
		title: "Tornado Emergency",
		description:
			"Confirmed, life-threatening tornado causing catastrophic damage.",
		from_color: "from-fuchsia-400",
	},
	{
		title: "Particularly Dangerous Situation",
		description:
			"Probable long-track tornadoes or wide-spread severe events such as intense derechos.",
		from_color: "from-purple-700",
	},
	{
		title: "Tornado Warning",
		description:
			"Radar-indicated or confirmed tornado on the ground.  Imminent danger to life and property.",
		from_color: "from-red-700",
	},
	{
		title: "Severe Thunderstorm Warning",
		description:
			"Confirmed severe weather in the form of damaging winds and/or hail. Like a tornado warning, there is imminent danger to life and property.",
		from_color: "from-orange-500",
	},
	{
		title: "Tornado Watch",
		description:
			"Tornadoes possible in and close to the watch area. Stay weather-aware if a warning is issued.",
		from_color: "from-yellow-300",
	},
	{
		title: "Severe Thunderstorm Watch",
		description:
			"Severe weather is possible in and close to the watch area. Be ready in case a severe thunderstorm warning is issued.",
		from_color: "from-green-300",
	},
];

export const AlertMapLegend = () => {
	return (
		<div className='px-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3'>
			{events.map(({ description, from_color, title }) => (
				<Card
					key={title}
					className={`p-3 bg-gradient-to-br ${from_color} to-black`}
				>
					<Card.Body className='bg-black rounded-lg'>
						<Card.Title className='uppercase text-sm'>{title}</Card.Title>
						<p className='text-xs'>{description}</p>
					</Card.Body>
				</Card>
			))}
		</div>
	);
};
