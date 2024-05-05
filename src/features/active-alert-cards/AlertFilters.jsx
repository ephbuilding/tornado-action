import { Toggle } from "react-daisyui";

export const AlertFilters = ({ handler, filterState }) => {
	// * [toggleName] matches filterState props

	const toggleNamesAndLabels = [
		{
			toggleName: "showTornadoWarnings",
			label: "Tornado Warnings",
		},
		{
			toggleName: "showTornadoWatches",
			label: "Tornado Watches",
		},
		{
			toggleName: "showStormWarnings",
			label: "Severe Storm Warnings",
		},
		{
			toggleName: "showStormWatches",
			label: "Severe Storm Watches",
		},
	];

	return (
		<div className='flex justify-center'>
			<div className='mb-6 sm:grid sm:grid-cols-2 lg:grid-cols-4'>
				{toggleNamesAndLabels.map(({ toggleName, label }) => {
					return (
						<AlertFilterToggle
							key={toggleName}
							name={toggleName}
							onChangeHandler={handler}
							isToggled={filterState[toggleName]}
							label={label}
						/>
					);
				})}
			</div>
		</div>
	);
};

export const AlertFilterToggle = ({
	name,
	onChangeHandler,
	isToggled,
	label,
}) => {
	return (
		<div className='flex my-2 mx-4'>
			<Toggle
				color='success'
				name={name}
				onChange={onChangeHandler}
				checked={isToggled}
				size='sm'
			/>
			<span className='ml-2 text-sm'>{label}</span>
		</div>
	);
};
