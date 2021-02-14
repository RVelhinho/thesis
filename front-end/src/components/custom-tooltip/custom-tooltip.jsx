import React from 'react';
import './custom-tooltip.scss';

function CustomToolTip(props) {
	const { payload, type, dataKey } = props;
	if (type === 'map') {
		return (
			<div className='custom-tooltip' style={{ borderColor: props.color }}>
				<div className='row w-100 m-0 '>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--title'>
							CRASH
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
							Country
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'></p>
					</div>
				</div>
				<div className='row w-100 m-0'>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							Date
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'></p>
					</div>
				</div>
				<div className='row w-100 m-0'>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							Keywords
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'></p>
					</div>
				</div>
			</div>
		);
	} else if (type === 'map--ring') {
		return (
			<div className='custom-tooltip' style={{ borderColor: props.color }}>
				<div className='row w-100 m-0 '>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--title'>
							COUNTRY
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
							Total crashes
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'></p>
					</div>
				</div>
			</div>
		);
	} else if (type === 'density' && payload && payload.length !== 0) {
		return (
			<div className='custom-tooltip' style={{ borderColor: props.color }}>
				<div className='row w-100 m-0'>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--title'>
							YEAR
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--title-bold regionIdFont'>
							{payload[0].payload.year}
						</p>
					</div>
				</div>
				<hr className='separator' />
				<div className='row w-100 m-0'>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							Total crashes
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p
							className='custom-tooltip__font custom-tooltip__font--content'
							style={{ color: props.color }}
						>
							{payload[0].payload.value}
						</p>
					</div>
				</div>
			</div>
		);
	} else if (type === 'bar' && payload && payload.length !== 0) {
		return (
			<div className='custom-tooltip' style={{ borderColor: props.color }}>
				<div className='row w-100 m-0 '>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--title'>
							AIRCRAFT
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
							Total crashes
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'></p>
					</div>
				</div>
			</div>
		);
	} else if (type === 'calendar') {
		return (
			<div
				className='custom-tooltip custom-tooltip--calendar'
				style={{ borderColor: props.color, top: props.top, left: props.left }}
			>
				<div className='row w-100 m-0 '>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--title'>
							CRASH
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
							Date
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'></p>
					</div>
				</div>
				<div className='row w-100 m-0'>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							Country
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'></p>
					</div>
				</div>
				<div className='row w-100 m-0'>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							Keywords
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'></p>
					</div>
				</div>
			</div>
		);
	} else if (type === 'word') {
		return (
			<div
				className='custom-tooltip custom-tooltip--word'
				style={{ borderColor: props.color }}
			>
				<div className='row w-100 m-0 '>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--title'>
							KEYWORD
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
							Total crashes
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
