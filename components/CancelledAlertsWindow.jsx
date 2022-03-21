import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
	useCancelledAlerts,
	useCancelledAlertsTest,
} from "../services/NationalWeatherService";

const CancelledAlertsWindow = () => {
	const { isLoading, error, data } = useCancelledAlerts();
	// const { isLoading, error, data } = useCancelledAlertsTest();

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {JSON.stringify(error)}</p>;

	const testData = [
		{
			areaDesc: "Atkinson, GA; Clinch, GA; Ware, GA",
			effective: "2022-03-19T17:29:00-04:00",
			expires: "2022-03-19T18:00:00-04:00",
			severity: "Extreme",
			certainty: "Observed",
			urgency: "Immediate",
			event: "Tornado Warning",
			instruction:
				"TAKE COVER NOW! Move to a basement or an interior room on the lowest\nfloor of a sturdy building. Avoid windows. If you are outdoors, in a\nmobile home, or in a vehicle, move to the closest substantial shelter\nand protect yourself from flying debris.\n\nHeavy rainfall may hide this tornado. Do not wait to see or hear the\ntornado. TAKE COVER NOW!",
		},
	];

	return (
		<>
			<div className='bg-neutral-500 border-4 border-neutral-500 col-12 my-5 rounded-lg'>
				<h2 className='text-3xl'>Cancelled Alerts</h2>
				<div className='card'>
					<DataTable
						value={data}
						responsiveLayout='scroll'
						tableClassName='text-xs'
					>
						<Column field='event' header='Alert Type'></Column>
						<Column field='areaDesc' header='Areas'></Column>
						<Column field='effective' header='Areas'></Column>
						<Column field='description' header='Areas'></Column>
					</DataTable>
				</div>
			</div>
		</>
	);
};

export default CancelledAlertsWindow;
