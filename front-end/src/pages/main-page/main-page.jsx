import React, { Component } from 'react';
import _ from 'lodash';
import L from 'leaflet';
import * as turf from '@turf/turf';
import worldPoly from '../../mockData/worldPoly.json';
import './main-page.scss';
import CalendarContainer from '../../components/calendar-container/calendar-container';
import MapContainer from '../../components/map-container/map-container';
import DensityPlotContainer from '../../components/density-plot-container/density-plot-container';
import WordCloudContainer from '../../components/word-cloud-container/word-cloud-container';
import BarChartContainer from '../../components/bar-chart-container/bar-chart-container';
import DonutChartContainer from '../../components/donut-chart-container/donut-chart-container';
import OverviewContainer from '../../components/overview-container/overview-container';
import { getRandomValue } from '../../utils/mathUtils';

export default class MainPage extends Component {
	state = {
		polyPositions: [],
		randomPositions: [],
		calendarData: {
			data: [
				{
					year: 1908,
					value: getRandomValue(0, 15, 0),
				},
				{
					year: 1909,
					value: getRandomValue(0, 15, 0),
				},
				{
					year: 1910,
					value: getRandomValue(0, 15, 0),
				},
				{
					year: 1911,
					value: getRandomValue(0, 15, 0),
				},
				{
					year: 1912,
					value: getRandomValue(0, 15, 0),
				},
				{
					year: 1913,
					value: getRandomValue(0, 15, 0),
				},
				{
					year: 1914,
					value: getRandomValue(0, 15, 0),
				},
				{
					year: 1915,
					value: getRandomValue(0, 15, 0),
				},
				{
					year: 1916,
					value: getRandomValue(0, 15, 0),
				},
				{
					year: 1917,
					value: getRandomValue(0, 15, 0),
				},
				{
					year: 1918,
					value: getRandomValue(0, 15, 0),
				},
			],
			tooltipType: 'calendar',
		},
		densityPlotData: {
			lineType: 'monotone',
			dataKey: 'value',
			color: '#ed8c15',
			categoryAxis: 'year',
			dateGrouper: 'year',
			timeAttr: 'year',
			tooltipType: 'density',
		},
		mapData: {
			data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			tooltipType: 'map',
		},
		donutChartData: {
			data: [
				{
					name: 'Survival Rate',
					total: 46,
				},
				{
					name: 'Fatality Rate',
					total: 54,
				},
			],
			tooltipType: 'donut',
		},
		wordCloudData: {
			data: [
				{
					text: 'storm',
					value: 40,
				},
				{
					text: 'fire',
					value: 20,
				},
				{
					text: 'acident',
					value: 80,
				},
				{
					text: 'war',
					value: 10,
				},
				{
					text: 'engine',
					value: 80,
				},
				{
					text: 'weather',
					value: 102,
				},
				{
					text: 'failure',
					value: 17,
				},
				{
					text: 'fatal',
					value: 65,
				},
			],
			callbacks: {
				getWordColor: (word) =>
					this.getWordColorAux(word.value, 325, word.weight),
				getWordTooltip: (word) =>
					`${word.text} (${word.value}) [${word.value > 50 ? 'good' : 'bad'}]`,
			},
			options: {
				rotations: 0,
				fontSizes: [14, 36],
				fontFamily: 'OpenSans-Regular',
				padding: 5,
				fontWeight: 400,
			},
			size: undefined,
			tooltipType: 'wordCloud',
		},
		barChartData: {
			data: [
				{
					plane: 'planeA',
					total: 105,
				},
				{
					plane: 'planeB',
					total: 87,
				},
				{
					plane: 'planeC',
					total: 45,
				},
				{
					plane: 'planeD',
					total: 32,
				},
				{
					plane: 'planeE',
					total: 24,
				},
				{
					plane: 'planeF',
					total: 21,
				},
				{
					plane: 'planeG',
					total: 15,
				},
				{
					plane: 'planeH',
					total: 17,
				},
				{
					plane: 'planeI',
					total: 18,
				},
				{
					plane: 'planeJ',
					total: 15,
				},
				{
					plane: 'planeK',
					total: 13,
				},
			],
			gradientColors: ['ed8c15', 'e6cbaa'],
			tooltipType: 'bar',
		},
		overviewData: {
			open: false,
			location: '',
			date: '',
			aircraft: '',
			operator: '',
			description: '',
		},
	};

	_isMounted = true;

	randomPointInPoly = (polygon) => {
		let bounds = polygon.getBounds();
		let x_min = bounds.getEast();
		let x_max = bounds.getWest();
		let y_min = bounds.getSouth();
		let y_max = bounds.getNorth();

		let lat = y_min + Math.random() * (y_max - y_min);
		let lng = x_min + Math.random() * (x_max - x_min);
		let point = turf.point([lng, lat]);
		let poly = polygon.toGeoJSON();
		let inside = turf.inside(point, poly);

		if (inside) {
			return point;
		} else {
			return this.randomPointInPoly(polygon);
		}
	};

	getWordColorAux(value, totalValue, weight) {
		if (weight >= 500) {
			return '#000000';
		} else {
			const rate = value / totalValue;
			if (rate < 0.1) {
				return '#ed8c15';
			} else if (rate < 0.2) {
				return '#ec7c15';
			} else if (rate < 0.3) {
				return '#eb6c15';
			} else if (rate < 0.4) {
				return '#ea5c15';
			} else if (rate < 0.5) {
				return '#e94c15';
			} else if (rate < 0.6) {
				return '#e83c15';
			} else if (rate < 0.7) {
				return '#e72c15';
			} else if (rate < 0.8) {
				return '#e61c15';
			} else if (rate < 0.9) {
				return '#e50c15';
			} else if (rate < 1) {
				return '#e4Dc15';
			}
		}
	}

	componentDidMount() {
		const polyPositions = [...this.state.polyPositions];
		const randomPositions = [...this.state.randomPositions];
		const mapData = { ...this.state.mapData };
		for (let coord of worldPoly) {
			polyPositions.push([coord.lon, coord.lat]);
		}
		let polygon = L.polygon(polyPositions);
		for (let i = 0; i < mapData.data.length; i++) {
			let found = false;
			const randomPoint = this.randomPointInPoly(polygon);
			for (let j = 0; j < randomPositions.length; j++) {
				if (
					randomPoint.geometry.coordinates[1] ===
					randomPositions[j].geometry.coordinates[1]
				) {
					found = true;
					break;
				}
			}
			if (found) {
				i--;
				continue;
			} else randomPositions.push(randomPoint);
		}
		this.setState(() => {
			return { polyPositions, randomPositions };
		});
	}

	handleClickCircle = (location, date, aircraft, operator, description) => {
		const overviewData = { ...this.state.overviewData };
		overviewData.location = location;
		overviewData.date = date;
		overviewData.aircraft = aircraft;
		overviewData.operator = operator;
		overviewData.description = description;
		overviewData.open = !overviewData.open;
		console.log(overviewData);
		this.setState(() => {
			return { overviewData };
		});
	};

	render() {
		const {
			calendarData,
			densityPlotData,
			mapData,
			donutChartData,
			wordCloudData,
			barChartData,
			overviewData,
			randomPositions,
		} = this.state;
		const sortedData = _.sortBy(calendarData.data, 'year', 'asc');
		const densityPlotValues = sortedData.map((el) => {
			return el.value;
		});
		const minValue = Math.min(...densityPlotValues);
		const maxValue = Math.max(...densityPlotValues);
		return (
			<div className='main-page-container'>
				<div className='row mx-0 w-100 h-100'>
					<div
						className={
							overviewData.open
								? 'col-3 px-0 main-page-container__left-section'
								: 'col-4 px-0 main-page-container__left-section'
						}
					>
						<div className='row mx-0 main-page-container__left-section__top-row'>
							<div className='col px-0 h-100'>
								<div className='row main-page-container__left-section__top-row__content'>
									<div className='col px-0'>
										<CalendarContainer
											data={sortedData}
											onClickCalendarCircle={this.handleClickCircle}
										/>
									</div>
								</div>
								<div className='row mx-0 main-page-container__left-section__top-bottom-row__content flex-grow-1'>
									<div className='col px-0'>
										<div className='row mx-0 h-50'>
											<div className='col px-0 d-flex justify-content-center align-items-center'>
												<div className='main-page-container__left-section__top-bottom-row__content__geo-legend-top'></div>
											</div>
										</div>
										<div className='row mx-0 h-50'>
											<div className='col px-0 d-flex justify-content-center align-items-center'>
												{_.range(1, 5).map((el, index) => {
													return (
														<div
															key={index}
															className='main-page-container__left-section__top-bottom-row__content__geo-legend-bottom'
														>
															{index + 1}
														</div>
													);
												})}
											</div>
										</div>
									</div>
									<div className='col px-0'>
										<div className='row mx-0 h-50'>
											<div className='col px-0 d-flex justify-content-center align-items-center'>
												<div className='main-page-container__left-section__top-bottom-row__content__keyword-legend-top'></div>
											</div>
										</div>
										<div className='row mx-0 h-50'>
											<div className='col px-0 d-flex justify-content-center align-items-center'>
												{_.range(1, 5).map((el, index) => {
													return (
														<div
															key={index}
															className='main-page-container__left-section__top-bottom-row__content__keyword-legend-bottom'
														>
															{index + 1}
														</div>
													);
												})}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='row mx-0 main-page-container__left-section__bottom-row'>
							<div className='col px-0'>
								<DensityPlotContainer
									data={sortedData}
									dateGrouper={densityPlotData.dateGrouper}
									categoryAxis={densityPlotData.categoryAxis}
									timeAttr={densityPlotData.timeAttr}
									lineType={densityPlotData.lineType}
									dataKey={densityPlotData.dataKey}
									color={densityPlotData.color}
									tooltipType={densityPlotData.tooltipType}
									minValue={minValue}
									maxValue={maxValue}
								/>
							</div>
						</div>
					</div>
					<div className='col px-0'>
						<div className='row mx-0 main-page-container__right-section__top-row'>
							<div className='col px-0'>
								<MapContainer
									data={mapData.data}
									tooltipType={mapData.tooltipType}
									randomPositions={randomPositions}
									onClickMapCircle={this.handleClickCircle}
								/>
							</div>
						</div>
						<div className='row mx-0 main-page-container__right-section__bottom-row'>
							<div className='col-4 px-0 main-page-container__right-section__bottom-row__chart'>
								<DonutChartContainer
									data={donutChartData.data}
									tooltipType={donutChartData.tooltipType}
								/>
							</div>
							<div className='col-4 px-0 main-page-container__right-section__bottom-row__chart'>
								<WordCloudContainer
									words={wordCloudData.data}
									callbacks={wordCloudData.callbacks}
									options={wordCloudData.options}
									size={wordCloudData.size}
								/>
							</div>
							<div className='col-4 px-0 main-page-container__right-section__bottom-row__chart'>
								<BarChartContainer
									data={barChartData.data}
									gradientColors={barChartData.gradientColors}
									tooltipType={barChartData.tooltipType}
								/>
							</div>
						</div>
					</div>
					{overviewData.open && (
						<OverviewContainer
							location={overviewData.location}
							date={overviewData.date}
							aircraft={overviewData.aircraft}
							operator={overviewData.operator}
							description={overviewData.description}
						/>
					)}
				</div>
			</div>
		);
	}
}