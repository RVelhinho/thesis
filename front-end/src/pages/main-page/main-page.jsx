import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import L from 'leaflet';
import * as turf from '@turf/turf';
import worldPoly from '../../utils/world-poly.json';
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
			countryPositions: {},
			loading: false,
			selected: {
				minDate: undefined,
				maxDate: undefined,
				country: undefined,
				continent: undefined,
				keyword: undefined,
				aircraft: undefined,
			},
			calendarData: {
				data: [],
				hopLegendColors: ['#edc08a', '#eda958', '#db8727', '#ab6b22'],
				tooltipType: 'calendar',
			},
			densityPlotData: {
				data: [],
				lineType: 'monotone',
				dataKey: 'count',
				color: '#de2874',
				categoryAxis: 'year',
				dateGrouper: 'year',
				timeAttr: 'year',
				tooltipType: 'density',
			},
			mapData: {
				data: [],
				tooltipType: 'map',
			},
			donutChartData: {
				data: [],
				tooltipType: 'donut',
			},
			wordCloudData: {
				data: [],
				color: '#de2874',
				tooltipType: 'word',
				max: -1,
			},
			barChartData: {
				data: [],
				gradientColors: ['de2874', 'de97b5'],
				tooltipType: 'aircraft',
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

	componentDidMount() {
		this.handleDataInteraction(
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			'initial'
		);
	}

	handleClickContinentCircle = (continent) => {
		const selected = _.cloneDeep(this.state.selected);
		this.cancelTokenSource && this.cancelTokenSource.cancel();
		if (continent === selected.continent) {
			selected.continent = undefined;
		} else {
			selected.continent = continent;
		}
		this.handleDataInteraction(
			selected.minDate,
			selected.maxDate,
			selected.country,
			selected.continent,
			selected.keyword,
			selected.aircraft,
			''
		);
		this.setState(() => {
			return { selected };
		});
	};

	handleClickMapRing = (country) => {
		const selected = _.cloneDeep(this.state.selected);
		this.cancelTokenSource && this.cancelTokenSource.cancel();
		selected.country = country;
		this.handleDataInteraction(
			selected.minDate,
			selected.maxDate,
			selected.country,
			selected.continent,
			selected.keyword,
			selected.aircraft,
			''
		);
		this.setState(() => {
			return { selected };
		});
	};

	handleClickTimeRing = (minDate, maxDate) => {
		const selected = _.cloneDeep(this.state.selected);
		this.cancelTokenSource && this.cancelTokenSource.cancel();
		selected.minDate = minDate;
		selected.maxDate = maxDate;
		this.handleDataInteraction(
			selected.minDate,
			selected.maxDate,
			selected.country,
			selected.continent,
			selected.keyword,
			selected.aircraft,
			''
		);
		this.setState(() => {
			return { selected };
		});
	};

	handleClickYear = (year) => {
		const selected = _.cloneDeep(this.state.selected);
		this.cancelTokenSource && this.cancelTokenSource.cancel();
		selected.minDate = year;
		selected.maxDate = year;
		this.handleDataInteraction(
			selected.minDate,
			selected.maxDate,
			selected.country,
			selected.continent,
			selected.keyword,
			selected.aircraft,
			''
		);
		this.setState(() => {
			return { selected };
		});
	};

	handleZoomOut = () => {
		const selected = _.cloneDeep(this.state.selected);
		this.cancelTokenSource && this.cancelTokenSource.cancel();
		this.handleDataInteraction(
			selected.minDate,
			selected.maxDate,
			undefined,
			selected.continent,
			selected.keyword,
			selected.aircraft,
			''
		);
		selected.country = undefined;
		this.setState(() => {
			return { selected };
		});
	};

	handleClickWord = (keyword) => {
		const selected = _.cloneDeep(this.state.selected);
		if (keyword === selected.keyword) {
			selected.keyword = undefined;
		} else {
			selected.keyword = keyword;
		}
		this.cancelTokenSource && this.cancelTokenSource.cancel();
		this.handleDataInteraction(
			selected.minDate,
			selected.maxDate,
			selected.country,
			selected.continent,
			selected.keyword,
			selected.aircraft,
			''
		);
		this.setState(() => {
			return { selected };
		});
	};

	handleClickBar = ({ plane: aircraft }) => {
		const selected = _.cloneDeep(this.state.selected);
		if (aircraft === selected.aircraft) {
			selected.aircraft = undefined;
		} else {
			selected.aircraft = aircraft;
		}
		this.cancelTokenSource && this.cancelTokenSource.cancel();
		this.handleDataInteraction(
			selected.minDate,
			selected.maxDate,
			selected.country,
			selected.continent,
			selected.keyword,
			selected.aircraft,
			''
		);
		this.setState(() => {
			return { selected };
		});
	};

	handleDataInteraction = async (
		minDate,
		maxDate,
		country,
		continent,
		keyword,
		aircraft,
		run
	) => {
		const calendarData = _.cloneDeep(this.state.calendarData);
		const densityPlotData = _.cloneDeep(this.state.densityPlotData);
		const mapData = _.cloneDeep(this.state.mapData);
		const donutChartData = _.cloneDeep(this.state.donutChartData);
		const wordCloudData = _.cloneDeep(this.state.wordCloudData);
		const barChartData = _.cloneDeep(this.state.barChartData);
		const previousCalendarData = _.cloneDeep(this.state.calendarData);
		const previousDensityPlotData = _.cloneDeep(this.state.densityPlotData);
		const previousMapData = _.cloneDeep(this.state.mapData);
		const previousDonutChartData = _.cloneDeep(this.state.donutChartData);
		const previousWordCloudData = _.cloneDeep(this.state.wordCloudData);
		const previousBarChartData = _.cloneDeep(this.state.barChartData);
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
					this.cancelTokenSource.token,
					minDate,
					maxDate,
					country,
					continent,
					keyword,
					aircraft
				),
				crashService.getCalendarAuxData(
					this.cancelTokenSource.token,
					minDate,
					maxDate,
					country,
					continent,
					keyword,
					aircraft
				),
				crashService.getMapData(
					this.cancelTokenSource.token,
					minDate,
					maxDate,
					country,
					continent,
					keyword,
					aircraft
				),
				crashService.getSurvivalRateData(
					this.cancelTokenSource.token,
					minDate,
					maxDate,
					country,
					continent,
					keyword,
					aircraft
				),
				crashService.getKeywordData(
					this.cancelTokenSource.token,
					minDate,
					maxDate,
					country,
					continent,
					keyword,
					aircraft
				),
				crashService.getAircraftData(
					this.cancelTokenSource.token,
					minDate,
					maxDate,
					country,
					continent,
					keyword,
					aircraft
				),
			]);
			this.cancelTokenSource = null;
			this.createRandomPositions(countryData, run);
			calendarData.data = yearData;
			densityPlotData.data = yearAuxData;
			mapData.data = countryData;
			donutChartData.data = survivalRateData;
			let max = -1;
			_.forEach(keywordData, (el) => {
				if (el.value > max) max = el.value;
			});
			wordCloudData.max = max;
			wordCloudData.data = keywordData;
			barChartData.data = aircraftData;
			this.setState(() => {
				return {
					calendarData,
					densityPlotData,
					mapData,
					donutChartData,
					wordCloudData,
					barChartData,
				};
			});
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
	};

	componentWillUnmount() {
		this.cancelTokenSource && this.cancelTokenSource.cancel();
	}

	createRandomPositions = (data, run) => {
		const randomPositions = [...this.state.randomPositions];
		const countryPositions = { ...this.state.countryPositions };
		if (run === 'initial') {
			_.forEach(data, (country) => {
				const polyPositions = [...this.state.polyPositions];
				countryPositions[country.country] = { lat: [], lon: [] };
				let foundCountry = false;
				for (let coord of worldPoly) {
					if (coord.country === country.country) {
						foundCountry = true;
						polyPositions.push([coord.lon, coord.lat]);
					}
				}
				if (!foundCountry) return;
				let polygon = L.polygon(polyPositions);
				_.forEach(country.total, (row) => {
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
						return;
					} else {
						row.lat = randomPoint.geometry.coordinates[0];
						row.lon = randomPoint.geometry.coordinates[1];
						countryPositions[row.country].lat.push(
							randomPoint.geometry.coordinates[0]
						);
						countryPositions[row.country].lon.push(
							randomPoint.geometry.coordinates[1]
						);
						randomPositions.push(randomPoint);
					}
				});
			});
			this.setState(() => {
				return { countryPositions };
			});
		} else {
			_.forEach(data, (country) => {
				_.forEach(country.total, (row, index) => {
					row.lat = countryPositions[row.country].lat[index];
					row.lon = countryPositions[row.country].lon[index];
				});
			});
		}
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
		const densityPlotValues = _.map(densityPlotData.data, (el) => el.count);
		const minValue = Math.min(...densityPlotValues);
		const maxValue = Math.max(...densityPlotValues);
		console.log(wordCloudData.max);
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
									data={calendarData.data}
									hopLegendColors={calendarData.hopLegendColors}
									tooltipType={calendarData.tooltipType}
									onClickCalendarCircle={this.handleClickCircle}
									onClickContinentCircle={this.handleClickContinentCircle}
									onClickYear={this.handleClickYear}
								/>
							</div>
						</div>
						<div className='row mx-0 main-page-container__left-section__bottom-row'>
							<div className='col px-0'>
								<DensityPlotContainer
									data={densityPlotData.data}
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
									onClickMapRing={this.handleClickMapRing}
									onClickTimeRing={this.handleClickTimeRing}
									onZoomOut={this.handleZoomOut}
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
									max={wordCloudData.max}
									id={'word-cloud-container'}
									onClickWord={this.handleClickWord}
								/>
							</div>
							<div className='col-4 h-100 px-0 main-page-container__right-section__bottom-row__chart'>
								<BarChartContainer
									data={barChartData.data}
									gradientColors={barChartData.gradientColors}
									tooltipType={barChartData.tooltipType}
									onClickBar={this.handleClickBar}
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
