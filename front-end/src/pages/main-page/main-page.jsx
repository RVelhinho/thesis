import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import L from 'leaflet';
import * as turf from '@turf/turf';
import worldPoly from '../../mockData/worldPoly.json';
import CalendarContainer from '../../components/calendar-container/calendar-container';
import MapContainer from '../../components/map-container/map-container';
import DensityPlotContainer from '../../components/density-plot-container/density-plot-container';
import WordCloudContainer from '../../components/word-cloud-container/word-cloud-container';
import BarChartContainer from '../../components/bar-chart-container/bar-chart-container';
import DonutChartContainer from '../../components/donut-chart-container/donut-chart-container';
import OverviewContainer from '../../components/overview-container/overview-container';
import Spinner from '../../components/spinner/spinner';
import crashService from '../../services/crashService';
import './main-page.scss';

export default class MainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			polyPositions: [],
			randomPositions: [],
			loading: false,
			calendarData: {
				data: [],
				hopLegendColors: ['#edc08a', '#eda958', '#db8727', '#ab6b22'],
				tooltipType: 'calendar',
			},
			densityPlotData: {
				lineType: 'monotone',
				dataKey: 'count',
				color: '#283ade',
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
				color: '#de2874',
				tooltipType: 'word',
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
				gradientColors: ['de2874', 'de97b5'],
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
		this.baseOverviewData = {
			open: false,
			location: '',
			date: '',
			aircraft: '',
			operator: '',
			description: '',
		};
		this._isMounted = true;
	}

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

	async componentDidMount() {
		this.createRandomPositions();
		const previousCalendarData = { ...this.state.calendarData };
		const calendarData = { ...this.state.calendarData };
		const previousDensityPlotData = { ...this.state.densityPlotData };
		const densityPlotData = { ...this.state.densityPlotData };
		const previousMapData = { ...this.state.mapData };
		const mapData = { ...this.state.mapData };
		const previousDonutChartData = { ...this.state.donutChartData };
		const donutChartData = { ...this.state.donutChartData };
		const previousWordCloudData = { ...this.state.wordCloudData };
		const wordCloudData = { ...this.state.wordCloudData };
		const previousBarChartData = { ...this.state.barChartData };
		const barChartData = { ...this.state.barChartData };
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const [
				{ data: yearData },
				{ data: yearAuxData },
				{ data: countryData },
				{ data: survivalRateData },
				{ data: keywordData },
				{ data: aircraftData },
			] = await axios.all([
				crashService.getCalendarData(
					undefined,
					undefined,
					undefined,
					undefined,
					undefined
				),
				crashService.getCalendarAuxData(
					undefined,
					undefined,
					undefined,
					undefined,
					undefined
				),
				crashService.getMapData(
					undefined,
					undefined,
					undefined,
					undefined,
					undefined
				),
				crashService.getSurvivalRateData(
					undefined,
					undefined,
					undefined,
					undefined,
					undefined
				),
				crashService.getKeywordData(
					undefined,
					undefined,
					undefined,
					undefined,
					undefined
				),
				crashService.getAircraftData(
					undefined,
					undefined,
					undefined,
					undefined,
					undefined
				),
			]);
			this.cancelTokenSource = null;
			calendarData.data = yearData;
			densityPlotData.data = yearAuxData;
			mapData.data = countryData;
			donutChartData.data = survivalRateData;
			wordCloudData.data = keywordData;
			barChartData.data = aircraftData;
			console.log(yearData);
			console.log(yearAuxData);
			console.log(countryData);
			console.log(survivalRateData);
			console.log(keywordData);
			console.log(aircraftData);
		} catch (error) {
			if (axios.isCancel(error)) {
				//ignore
			} else if (error.response && error.response.status === 404) {
				alert('Data not found');
				this.setState({
					previousCalendarData,
					previousDensityPlotData,
					previousMapData,
					previousDonutChartData,
					previousWordCloudData,
					previousBarChartData,
				});
			}
		}
	}

	componentWillUnmount() {
		this.cancelTokenSource && this.cancelTokenSource.cancel();
	}

	createRandomPositions = () => {
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
	};

	handleClickCircle = (circle) => {
		const overviewData = { ...this.state.overviewData };
		if (overviewData.location === circle.country) {
			return null;
		}
		overviewData.location = circle.country;
		overviewData.date = circle.date;
		overviewData.aircraft = circle.aircraft;
		overviewData.operator = circle.operator;
		overviewData.description = circle.description;
		overviewData.open = !overviewData.open;
		this.setState(() => {
			return { overviewData };
		});
	};

	handleCloseOverviewContainer = () => {
		const overviewData = { ...this.baseOverviewData };
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
			return el.count;
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
								<CalendarContainer
									data={sortedData}
									hopLegendColors={calendarData.hopLegendColors}
									tooltipType={calendarData.tooltipType}
									onClickCalendarCircle={this.handleClickCircle}
								/>
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
							<div className='col-4 h-100 px-0 main-page-container__right-section__bottom-row__chart'>
								<DonutChartContainer
									data={donutChartData.data}
									tooltipType={donutChartData.tooltipType}
								/>
							</div>
							<div className='col-4 h-100 px-0 main-page-container__right-section__bottom-row__chart'>
								<WordCloudContainer
									data={wordCloudData.data}
									tooltipType={wordCloudData.tooltipType}
									color={wordCloudData.color}
									id={'word-cloud-container'}
								/>
							</div>
							<div className='col-4 h-100 px-0 main-page-container__right-section__bottom-row__chart'>
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
							open={overviewData.open}
							onCloseOverviewContainer={this.handleCloseOverviewContainer}
						/>
					)}
				</div>
			</div>
		);
	}
}
