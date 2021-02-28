import React from 'react';
import './custom-tooltip.scss';

function CustomToolTip(props) {
	const { payload, type, dataKey } = props;
	if (type === 'map--ring') {
		console.log(props);
		const { color, country, total } = props;
		return (
			<div className='custom-tooltip' style={{ borderColor: color }}>
				<div className='row w-100 m-0'>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							Country
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							{country}
						</p>
					</div>
				</div>
				<div className='row w-100 m-0'>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							Total
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							{total}
						</p>
					</div>
				</div>
			</div>
		);
	} else if (type === 'map--circle') {
		const { color, country, date, aircraft, keywords } = props;
		return (
			<div className='custom-tooltip' style={{ borderColor: color }}>
				<div className='row w-100 m-0'>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							Country
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							{country}
						</p>
					</div>
				</div>
				<div className='row w-100 m-0'>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							Date
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							{date}
						</p>
					</div>
				</div>
				<div className='row w-100 m-0'>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							Aircraft
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							{aircraft.length > 10 ? `${aircraft.slice(0, 10)}...` : aircraft}
						</p>
					</div>
				</div>
				<div className='row w-100 m-0'>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							Keywords
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							{keywords.length !== 0 &&
								keywords.map((el, index) => (
									<span key={index}>{el.word} </span>
								))}
							{keywords.length === 0 && <span>none</span>}
						</p>
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
							{payload[0].payload.count}
						</p>
					</div>
				</div>
			</div>
		);
	} else if (type === 'aircraft' && payload && payload.length !== 0) {
		return (
			<div className='custom-tooltip' style={{ borderColor: props.color }}>
				<div className='row w-100 m-0 '>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--title'>
							AIRCRAFT
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--title-bold regionIdFont'>
							{payload[0].payload.plane.length > 10
								? `${payload[0].payload.plane.slice(0, 10)}...`
								: payload[0].payload.plane}
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
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							{payload[0].payload.total}
						</p>
					</div>
				</div>
			</div>
		);
	} else if (type === 'calendar') {
		const { date, country, keywords, aircraft } = props;
		return (
			<div
				className='custom-tooltip custom-tooltip--calendar'
				style={{ borderColor: props.color, top: props.top, left: props.left }}
			>
				<div className='row w-100 m-0'>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							Date
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							{date}
						</p>
					</div>
				</div>
				<div className='row w-100 m-0'>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							Country
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							{country}
						</p>
					</div>
				</div>
				<div className='row w-100 m-0'>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							Aircraft
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							{aircraft.length > 10 ? `${aircraft.slice(0, 10)}...` : aircraft}
						</p>
					</div>
				</div>
				<div className='row w-100 m-0'>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							Keywords
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							{keywords.length !== 0 &&
								keywords.map((el, index) => <span key={index}>{el.word}</span>)}
							{keywords.length === 0 && <span>none</span>}
						</p>
					</div>
				</div>
			</div>
		);
	} else if (type === 'word') {
		const { color, count, word } = props;
		return (
			<div
				className='custom-tooltip custom-tooltip--word'
				style={{ borderColor: color }}
			>
				<div className='row w-100 m-0 '>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--title'>
							KEYWORD
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--title-bold regionIdFont'>
							{word}
						</p>
					</div>
				</div>
				<hr className='separator' />
				<div className='row w-100 m-0'>
					<div className='col p-0 d-flex justify-content-start align-items-center'>
						<p className='custom-tooltip__font custom-tooltip__font--content'>
							Total
						</p>
					</div>
					<div className='col p-0 d-flex justify-content-end align-items-center'>
						<p
							className='custom-tooltip__font custom-tooltip__font--content'
							id='word-count'
							style={{ color: color }}
						>
							{count}
						</p>
					</div>
				</div>
			</div>
		);
	}
	return null;
}

export default CustomToolTip;
