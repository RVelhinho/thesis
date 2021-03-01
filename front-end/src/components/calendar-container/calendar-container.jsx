import React, { PureComponent } from 'react';
import _ from 'lodash';
import CalendarRow from '../../components/calendar-row/calendar-row';
import './calendar-container.scss';

import PropTypes from 'prop-types';
import { circle } from '@turf/turf';
import CustomToolTip from '../custom-tooltip/custom-tooltip';

export default class CalendarContainer extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			tooltip: {
				open: false,
				color: '',
				cx: '',
				cy: '',
				date: '',
				country: '',
				aircraft: '',
				description: '',
			},
			currentCircle: '',
			selectedContinent: '',
		};
	}

	static propTypes = {};

	handleMouseOverCalendarCircle = (e, circle, index) => {
		const tooltip = { ...this.state.tooltip };
		tooltip.cx = e.clientX - e.target.offsetLeft;
		tooltip.cy = e.clientY - e.target.offsetTop;
		tooltip.date = circle.date;
		tooltip.country = circle.country;
		tooltip.aircraft = circle.aircraft;
		tooltip.keywords = circle.keywords;
		tooltip.open = true;
		if (parseInt(circle.year) >= 1985) {
			tooltip.color = '#283ade';
		} else if (parseInt(circle.year) < 1985 && parseInt(circle.year) >= 1960) {
			tooltip.color = '#4e5cde';
		} else if (parseInt(circle.year) < 1960 && parseInt(circle.year) >= 1935) {
			tooltip.color = '#7983e0';
		} else if (parseInt(circle.year) < 1935) {
			tooltip.color = '#9da4e3';
		}
		this.setState(() => {
			return {
				tooltip,
				currentCircle: circle.year + '-' + index,
			};
		});
	};

	handleMouseOutCalendarCircle = () => {
		const tooltip = { ...this.state.tooltip };
		tooltip.cx = '';
		tooltip.cy = '';
		tooltip.date = '';
		tooltip.country = '';
		tooltip.aircraft = '';
		tooltip.description = '';
		tooltip.open = false;
		this.setState(() => {
			return { tooltip, currentCircle: '' };
		});
	};

	handleClickContinentCircle = (continent) => {
		const selectedContinent = this.state.selectedContinent;
		if (selectedContinent === continent) {
			this.props.onClickContinentCircle(undefined);
			this.setState(() => {
				return { selectedContinent: '' };
			});
		} else {
			this.props.onClickContinentCircle(continent);
			this.setState(() => {
				return { selectedContinent: continent };
			});
		}
	};

	render() {
		const {
			data,
			hopLegendColors,
			tooltipStyle,
			onClickCalendarCircle,
			onClickContinentCircle,
		} = this.props;
		const { tooltip, currentCircle, selectedContinent } = this.state;
		return (
			<div className='calendar-container'>
				<React.Fragment>
					<div className='row calendar-container__content'>
						<div className='col px-0'>
							{_.entries(data).map((el, index) => {
								return (
									<CalendarRow
										key={`calendar-row-${index}`}
										year={el[0]}
										data={el[1]}
										currentCircle={currentCircle}
										tooltipStyle={tooltipStyle}
										onClickCalendarCircle={onClickCalendarCircle}
										onMouseOverCalendarCircle={
											this.handleMouseOverCalendarCircle
										}
										onMouseOutCalendarCircle={this.handleMouseOutCalendarCircle}
									/>
								);
							})}
						</div>
						{tooltip.open && tooltip.cx !== '' && tooltip.cy !== '' && (
							<CustomToolTip
								type={'calendar'}
								date={tooltip.date}
								country={tooltip.country}
								keywords={tooltip.keywords}
								aircraft={tooltip.aircraft}
								left={tooltip.cx}
								top={tooltip.cy}
								color={tooltip.color}
							/>
						)}
					</div>
					<div className='row mx-0 calendar-container__bottom-row'>
						<div className='col px-0 h-100 d-flex flex-column justify-content-center'>
							<div className='row mx-0 w-100 d-flex flex-wrap justify-content-center align-items-center mb-4'>
								<div className='calendar-container__bottom-row__circle-container'>
									<div
										className='calendar-container__bottom-row__circle-container__circle'
										style={
											selectedContinent !== 'North America' &&
											selectedContinent !== ''
												? { backgroundColor: '#456dc4', opacity: 0.3 }
												: { backgroundColor: '#456dc4' }
										}
										onClick={() =>
											this.handleClickContinentCircle('North America')
										}
									></div>
								</div>
								<div className='calendar-container__bottom-row__text-container'>
									<span className='calendar-container__bottom-row__text-container__text'>
										North America
									</span>
								</div>
							</div>
							<div className='row mx-0 w-100 d-flex flex-wrap justify-content-center align-items-center'>
								<div className='calendar-container__bottom-row__circle-container'>
									<div
										className='calendar-container__bottom-row__circle-container__circle'
										style={
											selectedContinent !== 'South America' &&
											selectedContinent !== ''
												? { backgroundColor: '#45c449', opacity: 0.3 }
												: { backgroundColor: '#45c449' }
										}
										onClick={() =>
											this.handleClickContinentCircle('South America')
										}
									></div>
								</div>
								<div className='calendar-container__bottom-row__text-container'>
									<span className='calendar-container__bottom-row__text-container__text'>
										South America
									</span>
								</div>
							</div>
						</div>
						<div className='col px-0 h-100 d-flex flex-column justify-content-center'>
							<div className='row mx-0 w-100 d-flex flex-wrap justify-content-center align-items-center mb-4'>
								<div className='calendar-container__bottom-row__circle-container'>
									<div
										className='calendar-container__bottom-row__circle-container__circle'
										style={
											selectedContinent !== 'Europe' && selectedContinent !== ''
												? { backgroundColor: '#c2c445', opacity: 0.3 }
												: { backgroundColor: '#c2c445' }
										}
										onClick={() => this.handleClickContinentCircle('Europe')}
									></div>
								</div>
								<div className='calendar-container__bottom-row__text-container'>
									<span className='calendar-container__bottom-row__text-container__text'>
										Europe
									</span>
								</div>
							</div>
							<div className='row mx-0 w-100 d-flex flex-wrap justify-content-center align-items-center '>
								<div className='calendar-container__bottom-row__circle-container'>
									<div
										className='calendar-container__bottom-row__circle-container__circle'
										style={
											selectedContinent !== 'Africa' && selectedContinent !== ''
												? { backgroundColor: '#c48b45', opacity: 0.3 }
												: { backgroundColor: '#c48b45' }
										}
										onClick={() => this.handleClickContinentCircle('Africa')}
									></div>
								</div>
								<div className='calendar-container__bottom-row__text-container'>
									<span className='calendar-container__bottom-row__text-container__text'>
										Africa
									</span>
								</div>
							</div>
						</div>
						<div className='col px-0 h-100 d-flex flex-column justify-content-center'>
							<div className='row mx-0 w-100 d-flex flex-wrap justify-content-center align-items-center mb-4'>
								<div className='calendar-container__bottom-row__circle-container'>
									<div
										className='calendar-container__bottom-row__circle-container__circle'
										style={
											selectedContinent !== 'Asia' && selectedContinent !== ''
												? { backgroundColor: '#c445ad', opacity: 0.3 }
												: { backgroundColor: '#c445ad' }
										}
										onClick={() => this.handleClickContinentCircle('Asia')}
									></div>
								</div>
								<div className='calendar-container__bottom-row__text-container'>
									<span className='calendar-container__bottom-row__text-container__text'>
										Asia
									</span>
								</div>
							</div>
							<div className='row mx-0 w-100 d-flex flex-wrap justify-content-center align-items-center'>
								<div className='calendar-container__bottom-row__circle-container'>
									<div
										className='calendar-container__bottom-row__circle-container__circle'
										style={
											selectedContinent !== 'Oceania' &&
											selectedContinent !== ''
												? { backgroundColor: '#a645c4', opacity: 0.3 }
												: { backgroundColor: '#a645c4' }
										}
										onClick={() => this.handleClickContinentCircle('Oceania')}
									></div>
								</div>
								<div className='calendar-container__bottom-row__text-container'>
									<span className='calendar-container__bottom-row__text-container__text'>
										Oceania
									</span>
								</div>
							</div>
						</div>
					</div>
				</React.Fragment>
			</div>
		);
	}
}
