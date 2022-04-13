export const FeaturesSection = () => {
	return (
		<div className='surface-0 text-center'>
			<div className='mb-3 font-bold text-2xl'>
				<span className='text-900'>One Product, </span>
				<span className='text-blue-600'>Many Solutions</span>
			</div>
			<div className='text-700 text-sm mb-6'>
				Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.
			</div>
			<div className='grid'>
				<div className='col-12 md:col-4 mb-4 px-5'>
					<span
						className='p-3 shadow-2 mb-3 inline-block'
						style={{ borderRadius: "10px" }}
					>
						<i className='pi pi-desktop text-4xl text-blue-500'></i>
					</span>
					<div className='text-900 mb-3 font-medium'>Built for Developers</div>
					<span className='text-700 text-sm line-height-3'>
						Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur.
					</span>
				</div>
				<div className='col-12 md:col-4 mb-4 px-5'>
					<span
						className='p-3 shadow-2 mb-3 inline-block'
						style={{ borderRadius: "10px" }}
					>
						<i className='pi pi-lock text-4xl text-blue-500'></i>
					</span>
					<div className='text-900 mb-3 font-medium'>End-to-End Encryption</div>
					<span className='text-700 text-sm line-height-3'>
						Risus nec feugiat in fermentum posuere urna nec. Posuere
						sollicitudin aliquam ultrices sagittis.
					</span>
				</div>
				<div className='col-12 md:col-4 mb-4 px-5'>
					<span
						className='p-3 shadow-2 mb-3 inline-block'
						style={{ borderRadius: "10px" }}
					>
						<i className='pi pi-check-circle text-4xl text-blue-500'></i>
					</span>
					<div className='text-900 mb-3 font-medium'>Easy to Use</div>
					<span className='text-700 text-sm line-height-3'>
						Ornare suspendisse sed nisi lacus sed viverra tellus. Neque volutpat
						ac tincidunt vitae semper.
					</span>
				</div>
			</div>
		</div>
	);
};
