import React from 'react';
import './custom-tooltip.scss';

function CustomToolTip(props) {
	const { payload, type, dataKey } = props;
	if (type === 'map--ring') {
		const { color, country, total } = props;
		return (
			<div className='custom-tooltip' style={{ borderColor: '#107996' }}>
				<div className='custom-tooltip__row'>
					<span className='custom-tooltip__font custom-tooltip__font--title mr-3'>
						PAÍS
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--title-bold regionIdFont'>
						{country}
					</span>
				</div>
				<hr className='separator' />
				<div className='custom-tooltip__row'>
					<span className='custom-tooltip__font custom-tooltip__font--content mr-3'>
						Acidentes
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
	} else if (type === 'map') {
		const { color, loc } = props;
		const keywords = JSON.parse(loc.keywords);
		return (
			<div
				className='custom-tooltip w-auto d-inline-block'
				style={{ borderColor: '#107996' }}
			>
				<div className='custom-tooltip__row'>
					<span className='custom-tooltip__font custom-tooltip__font--title mr-3'>
						PAÍS
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--title-bold regionIdFont'>
						{loc.country_pt}
					</span>
				</div>
				<hr className='separator' />
				<div className='custom-tooltip__row mb-1'>
					<span className='custom-tooltip__font custom-tooltip__font--content mr-3'>
						Data
					</span>
					<span
						className='custom-tooltip__font custom-tooltip__font--content font-weight-bold'
						style={{ color: color }}
					>
						{loc.date}
					</span>
				</div>
				<div className='custom-tooltip__row mb-1'>
					<span className='custom-tooltip__font custom-tooltip__font--content mr-3'>
						Aeronave
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--content font-weight-bold'>
						{loc.aircraft}
					</span>
				</div>
				<div className='custom-tooltip__row w-auto'>
					<span className='custom-tooltip__font custom-tooltip__font--content mr-3'>
						Palavras-Chave
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--content font-weight-bold w-auto d-inline'>
						{keywords.length !== 0 &&
							keywords.map((el, index) => (
								<span className='custom-tooltip__keyword ' key={index}>
									{el.word}{' '}
								</span>
							))}
						{keywords.length === 0 && <span>none</span>}
					</span>
				</div>
			</div>
		);
	} else if (type === 'density' && payload && payload.length !== 0) {
		return (
			<div className='custom-tooltip' style={{ borderColor: '#107996' }}>
				<div className='custom-tooltip__row'>
					<span className='custom-tooltip__font custom-tooltip__font--title mr-3'>
						ANO
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--title-bold regionIdFont'>
						{payload[0].payload.year}
					</span>
				</div>
				<hr className='separator' />
				<div className='custom-tooltip__row '>
					<span className='custom-tooltip__font custom-tooltip__font--content mr-3'>
						Acidentes
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
			<div className='custom-tooltip' style={{ borderColor: '#107996' }}>
				<div className='custom-tooltip__row'>
					<span className='custom-tooltip__font custom-tooltip__font--title mr-3'>
						AERONAVE
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--title-bold regionIdFont'>
						{payload[0].payload.plane}
					</span>
				</div>
				<hr className='separator' />
				<div className='custom-tooltip__row '>
					<span className='custom-tooltip__font custom-tooltip__font--content mr-3'>
						Acidentes
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
				className='custom-tooltip custom-tooltip--calendar w-auto d-inline-block'
				style={{ borderColor: '#107996', top: props.top, left: props.left }}
			>
				<div className='custom-tooltip__row'>
					<span className='custom-tooltip__font custom-tooltip__font--title mr-3'>
						DATA
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--title-bold regionIdFont'>
						{date}
					</span>
				</div>
				<hr className='separator' />
				<div className='custom-tooltip__row mb-1'>
					<span className='custom-tooltip__font custom-tooltip__font--content mr-3'>
						País
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--content font-weight-bold'>
						{country}
					</span>
				</div>
				<div className='custom-tooltip__row mb-1'>
					<span className='custom-tooltip__font custom-tooltip__font--content mr-3'>
						Aeronave
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--content font-weight-bold'>
						{aircraft}
					</span>
				</div>
				<div className='custom-tooltip__row w-auto'>
					<span className='custom-tooltip__font custom-tooltip__font--content mr-3'>
						Palavras-chave
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--content font-weight-bold w-auto d-inline'>
						{keywords.length !== 0 &&
							keywords.map((el, index) => (
								<span className='custom-tooltip__keyword' key={index}>
									{el.word}
								</span>
							))}
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
				style={{ borderColor: '#107996' }}
			>
				<div className='custom-tooltip__row'>
					<span className='custom-tooltip__font custom-tooltip__font--title mr-3'>
						PALAVRA-CHAVE
					</span>
					<span className='custom-tooltip__font custom-tooltip__font--title-bold regionIdFont'>
						{word}
					</span>
				</div>
				<hr className='separator' />
				<div className='custom-tooltip__row '>
					<span className='custom-tooltip__font custom-tooltip__font--content mr-3'>
						Acidentes
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
