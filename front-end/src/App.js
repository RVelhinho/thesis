import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import L from 'leaflet';
import * as turf from '@turf/turf';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './pages/main-page/main-page';
import InitialPage from './pages/initial-page/initial-page';
import ResultsPage from './pages/results-page/results-page.jsx';
import crashService from './services/crashService';
import worldPoly from './utils/world-poly.json';
import './App.scss';
import './assets/scss/index.scss';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageState: 'initial',
			polyPositions: [],
			randomPositions: [],
			countryPositions: {},
			loading: false,
			selected: {
				year: undefined,
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
			filter: {
				yearData: false,
				keywordData: false,
				aircraftData: false,
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
	handleClickContinentCircle = (continent) => {
		this.cancelTokenSource && this.cancelTokenSource.cancel();
		const selected = _.cloneDeep(this.state.selected);
		const filter = _.cloneDeep(this.state.filter);
		if (continent === selected.continent) {
			selected.continent = undefined;
		} else {
			selected.continent = continent;
		}
		this.handleDataInteraction(
			selected.year,
			selected.minDate,
			selected.maxDate,
			selected.country,
			selected.continent,
			selected.keyword,
			selected.aircraft,
			filter,
			''
		);
		this.setState(() => {
			return { selected };
		});
	};

	handleClickMapRing = (country) => {
		this.cancelTokenSource && this.cancelTokenSource.cancel();
		const selected = _.cloneDeep(this.state.selected);
		const filter = _.cloneDeep(this.state.filter);
		selected.country = country;
		this.handleDataInteraction(
			selected.year,
			selected.minDate,
			selected.maxDate,
			selected.country,
			selected.continent,
			selected.keyword,
			selected.aircraft,
			filter,
			''
		);
		this.setState(() => {
			return { selected };
		});
	};

	handleClickTimeRing = (minDate, maxDate) => {
		this.cancelTokenSource && this.cancelTokenSource.cancel();
		const filter = _.cloneDeep(this.state.filter);
		const selected = _.cloneDeep(this.state.selected);
		if (selected.minDate === minDate && selected.maxDate === maxDate) {
			selected.minDate = undefined;
			selected.maxDate = undefined;
		} else {
			selected.minDate = minDate;
			selected.maxDate = maxDate;
		}
		this.handleDataInteraction(
			selected.year,
			selected.minDate,
			selected.maxDate,
			selected.country,
			selected.continent,
			selected.keyword,
			selected.aircraft,
			filter,
			''
		);
		this.setState(() => {
			return { selected };
		});
	};

	handleClickYear = (year) => {
		const filter = _.cloneDeep(this.state.filter);
		const selected = _.cloneDeep(this.state.selected);
		this.cancelTokenSource && this.cancelTokenSource.cancel();
		if (selected.year === year) {
			selected.year = undefined;
			filter.yearData = false;
			this.handleDataInteraction(
				selected.year,
				selected.minDate,
				selected.maxDate,
				selected.country,
				selected.continent,
				selected.keyword,
				selected.aircraft,
				filter,
				''
			);
		} else {
			selected.year = year;
			filter.yearData = true;
			this.handleDataInteraction(
				selected.year,
				selected.minDate,
				selected.maxDate,
				selected.country,
				selected.continent,
				selected.keyword,
				selected.aircraft,
				filter,
				''
			);
		}
		this.setState(() => {
			return { selected, filter };
		});
	};

	handleZoomOut = () => {
		this.cancelTokenSource && this.cancelTokenSource.cancel();
		const selected = _.cloneDeep(this.state.selected);
		const filter = _.cloneDeep(this.state.filter);
		this.handleDataInteraction(
			selected.year,
			selected.minDate,
			selected.maxDate,
			undefined,
			selected.continent,
			selected.keyword,
			selected.aircraft,
			filter,
			''
		);
		selected.country = undefined;
		this.setState(() => {
			return { selected };
		});
	};

	handleClickWord = (keyword) => {
		this.cancelTokenSource && this.cancelTokenSource.cancel();
		const filter = _.cloneDeep(this.state.filter);
		const selected = _.cloneDeep(this.state.selected);
		if (keyword === selected.keyword) {
			selected.keyword = undefined;
			filter.keywordData = false;
			this.handleDataInteraction(
				selected.year,
				selected.minDate,
				selected.maxDate,
				selected.country,
				selected.continent,
				selected.keyword,
				selected.aircraft,
				filter,
				''
			);
		} else {
			selected.keyword = keyword;
			filter.keywordData = true;
			this.handleDataInteraction(
				selected.year,
				selected.minDate,
				selected.maxDate,
				selected.country,
				selected.continent,
				selected.keyword,
				selected.aircraft,
				filter,
				''
			);
		}
		this.setState(() => {
			return { selected, filter };
		});
	};

	handleClickBar = ({ plane: aircraft }) => {
		this.cancelTokenSource && this.cancelTokenSource.cancel();
		const filter = _.cloneDeep(this.state.filter);
		const selected = _.cloneDeep(this.state.selected);
		if (aircraft === selected.aircraft) {
			selected.aircraft = undefined;
			filter.aircraftData = false;
			this.handleDataInteraction(
				selected.year,
				selected.minDate,
				selected.maxDate,
				selected.country,
				selected.continent,
				selected.keyword,
				selected.aircraft,
				filter,
				''
			);
		} else {
			selected.aircraft = aircraft;
			filter.aircraftData = true;
			this.handleDataInteraction(
				selected.year,
				selected.minDate,
				selected.maxDate,
				selected.country,
				selected.continent,
				selected.keyword,
				selected.aircraft,
				filter,
				''
			);
		}
		this.setState(() => {
			return { selected, filter };
		});
	};

	handleDataInteraction = async (
		year,
		minDate,
		maxDate,
		country,
		continent,
		keyword,
		aircraft,
		filterView,
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
		if (year && !minDate && !maxDate) {
			minDate = year;
			maxDate = year;
		} else if (year && (minDate || maxDate)) {
			if (year < minDate || year > maxDate) {
				minDate = 100000;
				maxDate = -1;
			} else {
				minDate = year;
				maxDate = year;
			}
		}
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
			if (filterView && !filterView.yearData) {
				calendarData.data = yearData;
			}
			densityPlotData.data = yearAuxData;
			mapData.data = countryData;
			donutChartData.data = survivalRateData;
			let max = -1;
			_.forEach(keywordData, (el) => {
				if (el.value > max) max = el.value;
			});
			wordCloudData.max = max;
			if (filterView && !filterView.keywordData) {
				wordCloudData.data = keywordData;
			}
			if (filterView && !filterView.aircraftData) {
				barChartData.data = aircraftData;
			}
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
			undefined,
			this.state.filter,
			'initial'
		);
	}

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
		return (
			<div className='container-fluid app-container px-0'>
				<Switch>
					<Route
						path='/visualization'
						render={(props) => (
							<MainPage
								calendarData={calendarData}
								densityPlotData={densityPlotData}
								mapData={mapData}
								donutChartData={donutChartData}
								wordCloudData={wordCloudData}
								barChartData={barChartData}
								overviewData={overviewData}
								randomPositions={randomPositions}
								onClickYear={this.handleClickYear}
								onClickMapCircle={this.handleClickCircle}
								onClickMapRing={this.handleClickMapRing}
								onClickTimeRing={this.handleClickTimeRing}
								onZoomOut={this.handleZoomOut}
								onClickWord={this.handleClickWord}
								onClickBar={this.handleClickBar}
								onClickContinentCircle={this.handleClickContinentCircle}
								{...props}
							/>
						)}
					/>
					<Route
						path='/results'
						render={(props) => <ResultsPage {...props} />}
					/>
					<Route path='/' render={(props) => <InitialPage {...props} />} />
					<Redirect to='/not-found' />
				</Switch>
			</div>
		);
	}
}
