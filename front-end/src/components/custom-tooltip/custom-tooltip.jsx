import React from 'react';
import './custom-tooltip.scss';

function CustomToolTip(props) {
	const { payload, type, dataKey } = props;
	if (type === 'map--ring') {
		const { color, country, total } = props;
		return (
			<div className='custom-tooltip' style={{ borderColor: color }}>
				<div className='custom-tooltip__row'>
					<span className='custom-tooltip__font custom-tooltip__font--title mr-3'>
						COUNTRY
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--title-bold regionIdFont'>
						{country}
					</span>
				</div>
				<hr className='separator' />
				<div className='custom-tooltip__row'>
					<span className='custom-tooltip__font custom-tooltip__font--content mr-3'>
						Total
					</span>
					<span
						className='custom-tooltip__font custom-tooltip__font--content font-weight-bold'
						style={{ color: color }}
					>
						{total}
					</span>
				</div>
			</div>
		);
	} else if (type === 'map--circle') {
		const { color, country, date, aircraft, keywords } = props;
		return (
			<div className='custom-tooltip' style={{ borderColor: color }}>
				<div className='custom-tooltip__row'>
					<span className='custom-tooltip__font custom-tooltip__font--title mr-3'>
						COUNTRY
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--title-bold regionIdFont'>
						{country}
					</span>
				</div>
				<hr className='separator' />
				<div className='custom-tooltip__row mb-1'>
					<span className='custom-tooltip__font custom-tooltip__font--content mr-3'>
						Date
					</span>
					<span
						className='custom-tooltip__font custom-tooltip__font--content font-weight-bold'
						style={{ color: color }}
					>
						{date}
					</span>
				</div>
				<div className='custom-tooltip__row mb-1'>
					<span className='custom-tooltip__font custom-tooltip__font--content mr-3'>
						Aircraft
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--content font-weight-bold'>
						{aircraft}
					</span>
				</div>
				<div className='custom-tooltip__row'>
					<span className='custom-tooltip__font custom-tooltip__font--content mr-3'>
						Keywords
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--content font-weight-bold'>
						{keywords.length !== 0 &&
							keywords.map((el, index) => <span key={index}>{el.word} </span>)}
						{keywords.length === 0 && <span>none</span>}
					</span>
				</div>
			</div>
		);
	} else if (type === 'density' && payload && payload.length !== 0) {
		return (
			<div className='custom-tooltip' style={{ borderColor: props.color }}>
				<div className='custom-tooltip__row'>
					<span className='custom-tooltip__font custom-tooltip__font--title mr-3'>
						YEAR
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--title-bold regionIdFont'>
						{payload[0].payload.year}
					</span>
				</div>
				<hr className='separator' />
				<div className='custom-tooltip__row '>
					<span className='custom-tooltip__font custom-tooltip__font--content mr-3'>
						Total
					</span>
					<span
						className='custom-tooltip__font custom-tooltip__font--content font-weight-bold'
						style={{ color: props.color }}
					>
						{payload[0].payload.count}
					</span>
				</div>
			</div>
		);
	} else if (type === 'aircraft' && payload && payload.length !== 0) {
		const { color } = props;
		return (
			<div className='custom-tooltip' style={{ borderColor: color }}>
				<div className='custom-tooltip__row'>
					<span className='custom-tooltip__font custom-tooltip__font--title mr-3'>
						AIRCRAFT
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--title-bold regionIdFont'>
						{payload[0].payload.plane}
					</span>
				</div>
				<hr className='separator' />
				<div className='custom-tooltip__row '>
					<span className='custom-tooltip__font custom-tooltip__font--content mr-3'>
						Total
					</span>
					<span
						className='custom-tooltip__font custom-tooltip__font--content font-weight-bold'
						style={{ color: color }}
					>
						{payload[0].payload.total}
					</span>
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
				<div className='custom-tooltip__row'>
					<span className='custom-tooltip__font custom-tooltip__font--title mr-3'>
						DATE
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--title-bold regionIdFont'>
						{date}
					</span>
				</div>
				<hr className='separator' />
				<div className='custom-tooltip__row mb-1'>
					<span className='custom-tooltip__font custom-tooltip__font--content mr-3'>
						Country
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--content font-weight-bold'>
						{country}
					</span>
				</div>
				<div className='custom-tooltip__row mb-1'>
					<span className='custom-tooltip__font custom-tooltip__font--content mr-3'>
						Aircraft
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--content font-weight-bold'>
						{aircraft}
					</span>
				</div>
				<div className='custom-tooltip__row '>
					<span className='custom-tooltip__font custom-tooltip__font--content mr-3'>
						Keywords
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--content font-weight-bold'>
						{keywords.length !== 0 &&
							keywords.map((el, index) => <span key={index}>{el.word}</span>)}
						{keywords.length === 0 && <span>none</span>}
					</span>
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
				<div className='custom-tooltip__row'>
					<span className='custom-tooltip__font custom-tooltip__font--title mr-3'>
						KEYWORD
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--title-bold regionIdFont'>
						{word}
					</span>
				</div>
				<hr className='separator' />
				<div className='custom-tooltip__row '>
					<span className='custom-tooltip__font custom-tooltip__font--content mr-3'>
						Total
					</span>
					<span
						className='custom-tooltip__font custom-tooltip__font--content font-weight-bold'
						id='word-count'
						style={{ color: color }}
					>
						{count}
					</span>
				</div>
			</div>
		);
	}
	return null;
}

export default CustomToolTip;
