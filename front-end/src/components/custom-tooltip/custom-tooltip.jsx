import React from 'react';
import './custom-tooltip.scss';

function CustomToolTip(props) {
	const { payload, type, dataKey } = props;
	console.log(props);
	if (type === 'map') {
		console.log(props);
		return (
			<div className='custom-tooltip' style={{ borderColor: props.color }}>
				<div className='row w-100 m-0 mb-2'>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--title'>
							REGION ID
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--title-bold regionIdFont'></p>
					</div>
				</div>
				<hr className='separator' />
				<div className='row w-100 m-0'>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							Revenue
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'></p>
					</div>
				</div>
			</div>
		);
	}
	return null;
}

export default CustomToolTip;
