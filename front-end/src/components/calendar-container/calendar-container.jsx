import React, { PureComponent } from 'react';
import _ from 'lodash';
import CalendarRow from '../../components/calendar-row/calendar-row';
import './calendar-container.scss';
import Button from '../button/button';
import PropTypes from 'prop-types';
import { circle } from '@turf/turf';
import CustomToolTip from '../custom-tooltip/custom-tooltip';
import BarChartContainer from '../../components/bar-chart-container/bar-chart-container';

export default class CalendarContainer extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			activeButtonIndex: 0,
			currentCircle: '',
			selectedContinent: '',
			selectedYear: -1,
		};
	}

	static propTypes = {};

	handleMouseOverCalendarCircle = (e, circle, index, selected) => {
		this.props.onMouseOverCalendarCircle(e, circle);
		this.setState(() => {
			return {
				currentCircle: circle.year + '-' + index,
			};
		});
	};

	// handleClickContinentCircle = (continent) => {
	// 	const selectedContinent = this.state.selectedContinent;
	// 	if (selectedContinent === continent) {
	// 		this.props.onClickContinentCircle(undefined);
	// 		this.setState(() => {
	// 			return { selectedContinent: '' };
	// 		});
	// 	} else {
	// 		this.props.onClickContinentCircle(continent);
	// 		this.setState(() => {
	// 			return { selectedContinent: continent };
	// 		});
	// 	}
	// };

	handleClickYear = (year) => {
		const selectedYear = this.state.selectedYear;
		if (selectedYear === year) {
			this.setState(() => {
				return { selectedYear: -1 };
			});
			this.props.onClickYear(year);
		} else {
			this.setState(() => {
				return { selectedYear: year };
			});
			this.props.onClickYear(year);
		}
	};

	handleMouseClickDetailedView = () => {
		//this.props.onMouseClickDetailedView();
		this.setState(() => {
			return { activeButtonIndex: 1 };
		});
	};

	handleMouseClickGeneralView = () => {
		//this.props.onMouseClickDetailedView();
		this.setState(() => {
			return { activeButtonIndex: 0 };
		});
	};

	render() {
		const {
			data,
			hopLegendColors,
			tooltipStyle,
			onClickCalendarCircle,
			onClickContinentCircle,
			onClickYear,
			onMouseOverYear,
			onMouseOverContinentCircle,
			selectedCircles,
			onMouseEnterGeneralView,
			onMouseEnterDetailedView,
			onMouseOutCalendarCircle,
		} = this.props;
		const {
			tooltip,
			currentCircle,
			selectedContinent,
			selectedYear,
			activeButtonIndex,
		} = this.state;
		const entriesMapped = _.entries(data).map((el) => {
			return { year: el[0], total: el[1].length };
		});
		return (
			<div className='calendar-container'>
				<React.Fragment>
					<div className='row calendar-container__title w-100 mx-0 my-2 mb-4'>
						<div className='col px-0'>
							<span className='calendar-container__title__text d-flex justify-content-start align-items-end'>
								Calendário
								<span className='ml-2 d-inline-block calendar-container__title__text__desc'>
									Através do calendário poderá explorar em que ano ocorreram os
									acidentes de avião especificados e como varia a quantidade
									total de casos ao longo do tempo.
								</span>
							</span>
						</div>
					</div>
					{/* <div className='row calendar-container__buttons mx-0'>
						<div className='col px-0 d-flex justify-content-center align-items-center'>
							<Button
								color={activeButtonIndex === 0 ? 'default-selected' : 'default'}
								text={'Visão Geral'}
								onMouseEnter={onMouseEnterGeneralView}
								onClick={this.handleMouseClickGeneralView}
							/>
						</div>
						<div className='col px-0 d-flex justify-content-center align-items-center'>
							<Button
								color={activeButtonIndex === 1 ? 'default-selected' : 'default'}
								text={'Visão Detalhada'}
								onMouseEnter={onMouseEnterDetailedView}
								onClick={this.handleMouseClickDetailedView}
							/>
						</div>
					</div> */}
					<div className='row calendar-container__content'>
						<div className='col px-2 calendar-container__content__circles'>
							{/* {activeButtonIndex === 1 && */}
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
										onMouseOverYear={onMouseOverYear}
										onMouseOutCalendarCircle={() => onMouseOutCalendarCircle()}
										selectedYear={selectedYear}
										onClickYear={this.handleClickYear}
										selectedCircles={selectedCircles}
									/>
								);
							})}
							{/* {activeButtonIndex === 0 && (
								<BarChartContainer
									data={entriesMapped}
									gradientColors={['107996', '578591']}
									tooltipType={'year'}
									categoryAxis={'year'}
									onMouseOverBarChart={() => {}}
									onClickBarChart={() => {}}
								/>
							)} */}
						</div>
						<div className='calendar-container__content__shadow'></div>
					</div>
					{/* <div className='row mx-0 calendar-container__bottom-row'>
						<div className='col px-0 h-100 d-flex flex-column justify-content-center'>
							<div className='row mx-0 w-100 d-flex flex-wrap justify-content-center align-items-center mb-4'>
								<div className='calendar-container__bottom-row__circle-container'>
									<div
										className='calendar-container__bottom-row__circle-container__circle'
										style={
											selectedContinent !== 'Europa' && selectedContinent !== ''
												? { backgroundColor: '#347aeb', opacity: 0.3 }
												: { backgroundColor: '#347aeb' }
										}
										onMouseOver={() => onMouseOverContinentCircle()}
										onClick={() => this.handleClickContinentCircle('Europa')}
									></div>
								</div>
								<div className='calendar-container__bottom-row__text-container'>
									<span className='calendar-container__bottom-row__text-container__text'>
										Europa
									</span>
								</div>
							</div>
							<div className='row mx-0 w-100 d-flex flex-wrap justify-content-center align-items-center '>
								<div className='calendar-container__bottom-row__circle-container'>
									<div
										className='calendar-container__bottom-row__circle-container__circle'
										style={
											selectedContinent !== 'África' && selectedContinent !== ''
												? { backgroundColor: '#c48b45', opacity: 0.3 }
												: { backgroundColor: '#c48b45' }
										}
										onMouseOver={() => onMouseOverContinentCircle()}
										onClick={() => this.handleClickContinentCircle('África')}
									></div>
								</div>
								<div className='calendar-container__bottom-row__text-container'>
									<span className='calendar-container__bottom-row__text-container__text'>
										África
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
											selectedContinent !== 'Ásia' && selectedContinent !== ''
												? { backgroundColor: '#aabf0a', opacity: 0.3 }
												: { backgroundColor: '#aabf0a' }
										}
										onMouseOver={() => onMouseOverContinentCircle()}
										onClick={() => this.handleClickContinentCircle('Ásia')}
									></div>
								</div>
								<div className='calendar-container__bottom-row__text-container'>
									<span className='calendar-container__bottom-row__text-container__text'>
										Ásia
									</span>
								</div>
							</div>
							<div className='row mx-0 w-100 d-flex flex-wrap justify-content-center align-items-center'>
								<div className='calendar-container__bottom-row__circle-container'>
									<div
										className='calendar-container__bottom-row__circle-container__circle'
										style={
											selectedContinent !== 'Oceânia' &&
											selectedContinent !== ''
												? { backgroundColor: '#35db45', opacity: 0.3 }
												: { backgroundColor: '#35db45' }
										}
										onMouseOver={() => onMouseOverContinentCircle()}
										onClick={() => this.handleClickContinentCircle('Oceânia')}
									></div>
								</div>
								<div className='calendar-container__bottom-row__text-container'>
									<span className='calendar-container__bottom-row__text-container__text'>
										Oceânia
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
											selectedContinent !== 'América' &&
											selectedContinent !== ''
												? { backgroundColor: '#db3535', opacity: 0.3 }
												: { backgroundColor: '#db3535' }
										}
										onMouseOver={() => onMouseOverContinentCircle()}
										onClick={() => this.handleClickContinentCircle('América')}
									></div>
								</div>
								<div className='calendar-container__bottom-row__text-container'>
									<span className='calendar-container__bottom-row__text-container__text'>
										América
									</span>
								</div>
							</div>
							<div className='row mx-0 w-100 d-flex flex-wrap justify-content-center align-items-center mb-4'>
								<div className='calendar-container__bottom-row__circle-container'></div>
								<div className='calendar-container__bottom-row__text-container'></div>
							</div>
						</div>
					</div> */}
				</React.Fragment>
			</div>
		);
	}
}
