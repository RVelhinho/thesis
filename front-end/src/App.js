import React, { Component } from 'react';
import _, { findIndex } from 'lodash';
import axios from 'axios';
import L from 'leaflet';
import * as turf from '@turf/turf';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './pages/main-page/main-page';
import InitialPage from './pages/initial-page/initial-page';
import ResultsPage from './pages/results-page/results-page.jsx';
import crashService from './services/crashService';
import interactionService from './services/interactionService';
import participantService from './services/participantService';
import worldPoly from './utils/world-poly.json';
import './App.scss';
import './assets/scss/index.scss';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			calendarTooltip: {
				date: '',
				country: '',
				aircraft: '',
				description: '',
				open: false,
				cx: '',
				cy: '',
				id: '',
				color: '#3b8194',
			},
			inputMaxDate: {
				value: 2009,
				error: '',
			},
			inputMinDate: {
				value: 1913,
				error: '',
			},
			pageState: 'initial',
			participantId: 0,
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
				color: '#107996',
				categoryAxis: 'year',
				dateGrouper: 'year',
				timeAttr: 'year',
				tooltipType: 'density',
			},
			mapData: {
				data: {
					type: 'FeatureCollection',
					features: [],
				},
				dataSelected: {
					type: 'FeatureCollection',
					features: [],
				},
				lastSelectedIndex: -1,
				startingPosition: {
					lat: 38.712458,
					lon: -9.140459,
					zoom: 0,
				},
				selectedEl: {},
				showPopup: {},
				minScale: 1,
				scale: 1,
				minZoom: 2,
				interactionDisabled: false,
				tooltipType: 'map',
			},
			donutChartData: {
				data: [],
				tooltipType: 'donut',
			},
			wordCloudData: {
				data: [],
				color: '#107996',
				tooltipType: 'word',
				max: -1,
			},
			barChartData: {
				data: [],
				gradientColors: ['3b8194', '578591'],
				tooltipType: 'aircraft',
				categoryAxis: 'plane',
			},
			overviewData: {
				open: true,
				data: [],
			},
			filter: {
				yearData: false,
				keywordData: false,
				aircraftData: false,
			},
			selectedCircles: [],
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

	handleSubmitIdentifier = async (id) => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await participantService.submitParticipantId(
				this.cancelTokenSource.token,
				id
			);
			this.cancelTokenSource = null;
			this.setState(() => {
				return { participantId: id };
			});
		} catch (error) {
			if (axios.isCancel(error)) {
				//Do nothing
			} else if (error.response && error.response.status === 400) {
				alert('Error occured');
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

	createRandomPositions = (calendarData, data, run) => {
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
						_.forEach(calendarData.data, (year) => {
							_.forEach(year, (yearCircle) => {
								if (yearCircle.id === row.id) {
									yearCircle.lat = row.lat;
									yearCircle.lon = row.lon;
								}
							});
						});
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

	async componentDidMount() {
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
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await participantService.getParticipantId(
				this.cancelTokenSource.token
			);
			this.cancelTokenSource = null;
			this.setState(() => {
				return { participantId: parseInt(result) };
			});
		} catch (error) {
			if (axios.isCancel(error)) {
				//Do nothing
			} else if (error.response && error.response.status === 400) {
				alert('Error occured');
			}
		}
	}

	componentWillUnmount() {
		this.cancelTokenSource && this.cancelTokenSource.cancel();
	}

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
			const { data: yearData } = await crashService.getCalendarData(
				this.cancelTokenSource.token,
				minDate,
				maxDate,
				country,
				continent,
				keyword,
				aircraft
			);
			this.cancelTokenSource = null;
			this.cancelTokenSource = axios.CancelToken.source();
			const [
				{ data: yearAuxData },
				{ data: countryData },
				{ data: survivalRateData },
				{ data: keywordData },
				{ data: aircraftData },
			] = await axios.all([
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
			if (filterView && !filterView.yearData) {
				calendarData.data = yearData;
			}
			this.createRandomPositions(calendarData, countryData, run);
			densityPlotData.data = yearAuxData;
			countryData.map((el) => {
				el.total.map((el2) => {
					const newEl = {
						lat: el2.lat,
						lon: el2.lon,
						innerColor: '#3b8194',
						index: mapData.data.features.length,
						...el2,
					};
					mapData.data.features.push({
						type: 'Feature',
						properties: {
							...newEl,
						},
						geometry: { type: 'Point', coordinates: [el2.lon, el2.lat] },
					});
					return el2;
				});
				return el;
			});
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
			mapData.disabled = false;
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

	handleClickCircle = async (type, circle) => {
		if (_.isEmpty(circle)) {
			return;
		}
		const calendarTooltip = _.cloneDeep(this.state.calendarTooltip);
		const overviewData = _.cloneDeep(this.state.overviewData);
		const selectedCircles = _.cloneDeep(this.state.selectedCircles);
		const mapData = _.cloneDeep(this.state.mapData);
		const overviewIndex = overviewData.data.findIndex(
			(el) => el.id === circle.id
		);
		const mapIndex = mapData.data.features.findIndex(
			(el) => el.properties.id === circle.id
		);
		if (overviewIndex !== -1) {
			overviewData.data.splice(overviewIndex, 1);
			selectedCircles.splice(overviewIndex, 1);
			mapData.dataSelected.features.splice(overviewIndex, 1);
			const newEl = {
				type: 'Feature',
				properties: {
					...circle,
					innerColor: '#3b8194',
				},
				geometry: { type: 'Point', coordinates: [circle.lon, circle.lat] },
			};
			mapData.data.features.push(newEl);
			if (type === 'map') {
				try {
					this.cancelTokenSource = axios.CancelToken.source();
					const { data: result } = await interactionService.addInteractionLog(
						new Date(),
						'Map',
						'Map Circle Click Remove',
						'Unselected a circle on the Map view',
						this.cancelTokenSource.token
					);
					this.cancelTokenSource = null;
				} catch (error) {
					if (axios.isCancel(error)) {
						//Do nothing
					} else if (error.response && error.response.status === 400) {
						alert('Error occured');
					}
				}
			} else if (type === 'calendar') {
				try {
					this.cancelTokenSource = axios.CancelToken.source();
					const { data: result } = await interactionService.addInteractionLog(
						new Date(),
						'Calendar',
						'Calendar Circle Click Remove',
						'Unselected a circle on the Calendar view',
						this.cancelTokenSource.token
					);
					this.cancelTokenSource = null;
				} catch (error) {
					if (axios.isCancel(error)) {
						//Do nothing
					} else if (error.response && error.response.status === 400) {
						alert('Error occured');
					}
				}
			}
		} else {
			mapData.data.features.splice(mapIndex, 1);
			const newEl = {
				type: 'Feature',
				properties: {
					...circle,
					innerColor: '#d1784b',
				},
				geometry: { type: 'Point', coordinates: [circle.lon, circle.lat] },
			};
			mapData.dataSelected.features.push(newEl);
			overviewData.data.push(circle);
			selectedCircles.push(circle);
			if (type === 'map') {
				try {
					this.cancelTokenSource = axios.CancelToken.source();
					const { data: result } = await interactionService.addInteractionLog(
						new Date(),
						'Map',
						'Map Circle Click Add',
						'Selected a circle on the Map view',
						this.cancelTokenSource.token
					);
					this.cancelTokenSource = null;
				} catch (error) {
					if (axios.isCancel(error)) {
						//Do nothing
					} else if (error.response && error.response.status === 400) {
						alert('Error occured');
					}
				}
			} else if (type === 'calendar') {
				try {
					this.cancelTokenSource = axios.CancelToken.source();
					const { data: result } = await interactionService.addInteractionLog(
						new Date(),
						'Calendar',
						'Calendar Circle Click Add',
						'Selected a circle on the Calendar view',
						this.cancelTokenSource.token
					);
					this.cancelTokenSource = null;
				} catch (error) {
					if (axios.isCancel(error)) {
						//Do nothing
					} else if (error.response && error.response.status === 400) {
						alert('Error occured');
					}
				}
			}
		}
		if (overviewData.data.length !== 0) {
			calendarTooltip.color = '#d1784b';
		} else {
			calendarTooltip.color = '#3b8194';
		}
		overviewData.open = true;
		this.setState(() => {
			return { overviewData, selectedCircles, mapData, calendarTooltip };
		});
	};

	handleMouseEnterCalendar = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Calendar',
				'Calendar Enter View',
				'Entered the Calendar view',
				this.cancelTokenSource.token
			);
			this.cancelTokenSource = null;
		} catch (error) {
			if (axios.isCancel(error)) {
				//Do nothing
			} else if (error.response && error.response.status === 400) {
				alert('Error occured');
			}
		}
	};

	handleMouseEnterMap = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Map',
				'Map Enter View',
				'Entered the Map view',
				this.cancelTokenSource.token
			);
			this.cancelTokenSource = null;
		} catch (error) {
			if (axios.isCancel(error)) {
				//Do nothing
			} else if (error.response && error.response.status === 400) {
				alert('Error occured');
			}
		}
	};

	handleMouseEnterOverview = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Overview',
				'Overview Enter View',
				'Entered the Overview tab',
				this.cancelTokenSource.token
			);
			this.cancelTokenSource = null;
		} catch (error) {
			if (axios.isCancel(error)) {
				//Do nothing
			} else if (error.response && error.response.status === 400) {
				alert('Error occured');
			}
		}
	};

	handleMouseEnterCalendarCircle = async (e, circle) => {
		const calendarTooltip = { ...this.state.calendarTooltip };
		calendarTooltip.cx = e.clientX - e.target.offsetLeft;
		if (circle.year <= 1994) {
			calendarTooltip.cy = e.clientY;
		} else {
			calendarTooltip.cy = e.clientY - 150;
		}
		calendarTooltip.date = circle.date;
		calendarTooltip.country = circle.country_pt;
		calendarTooltip.aircraft = circle.aircraft;
		calendarTooltip.keywords = circle.keywords;
		calendarTooltip.id = circle.id;
		calendarTooltip.open = true;
		this.setState(() => {
			return {
				calendarTooltip,
			};
		});
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Calendar',
				'Calendar Circle Enter',
				'Hovered the cursor into a circle on the Calendar view',
				this.cancelTokenSource.token
			);
			this.cancelTokenSource = null;
		} catch (error) {
			if (axios.isCancel(error)) {
				//Do nothing
			} else if (error.response && error.response.status === 400) {
				alert('Error occured');
			}
		}
	};

	handleMouseLeaveCalendarCircle = async () => {
		const calendarTooltip = { ...this.state.calendarTooltip };
		calendarTooltip.date = '';
		calendarTooltip.cx = '';
		calendarTooltip.cy = '';
		calendarTooltip.open = true;
		calendarTooltip.country = '';
		calendarTooltip.aircraft = '';
		calendarTooltip.description = '';
		calendarTooltip.id = '';
		this.setState(() => {
			return { calendarTooltip };
		});
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Calendar',
				'Calendar Circle Leave',
				'Hovered the cursor out of a circle on the Calendar view',
				this.cancelTokenSource.token
			);
			this.cancelTokenSource = null;
		} catch (error) {
			if (axios.isCancel(error)) {
				//Do nothing
			} else if (error.response && error.response.status === 400) {
				alert('Error occured');
			}
		}
	};

	handleClickCalendarCircle = async (circle) => {
		this.handleClickCircle('calendar', circle);
	};

	handleClickRemoveCrash = async (circle) => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Overview',
				'Overview Remove Button Click',
				'Click the Overview Remove Button',
				this.cancelTokenSource.token
			);
			this.cancelTokenSource = null;
		} catch (error) {
			if (axios.isCancel(error)) {
				//Do nothing
			} else if (error.response && error.response.status === 400) {
				alert('Error occured');
			}
		}
		const overviewData = { ...this.state.overviewData };
		const selectedCircles = _.cloneDeep(this.state.selectedCircles);
		const mapData = _.cloneDeep(this.state.mapData);
		_.forEach(overviewData.data, (el, index) => {
			if (el.id == circle.id) {
				overviewData.data.splice(index, 1);
				selectedCircles.splice(index, 1);
				mapData.dataSelected.features.splice(index, 1);
				const newEl = {
					type: 'Feature',
					properties: {
						...circle,
						innerColor: '#3b8194',
					},
					geometry: { type: 'Point', coordinates: [circle.lon, circle.lat] },
				};
				mapData.data.features.push(newEl);
				return false;
			}
		});
		if (overviewData.data.length > 0) {
			overviewData.open = true;
		} else {
			overviewData.open = false;
		}
		this.setState(() => {
			return { overviewData, selectedCircles, mapData };
		});
	};

	handleClickRemoveAllCrashes = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Overview',
				'Overview Remove All Button Click',
				'Click the Overview Remove All Button',
				this.cancelTokenSource.token
			);
			this.cancelTokenSource = null;
		} catch (error) {
			if (axios.isCancel(error)) {
				//Do nothing
			} else if (error.response && error.response.status === 400) {
				alert('Error occured');
			}
		}
		const overviewData = { ...this.state.overviewData };
		const selectedCircles = _.cloneDeep(this.state.selectedCircles);
		const mapData = _.cloneDeep(this.state.mapData);
		overviewData.data.length = 0;
		selectedCircles.length = 0;
		_.forEach(mapData.dataSelected.features, (el, index) => {
			el.properties.innerColor = '#3b8194';
			mapData.data.features.push(el);
		});
		mapData.dataSelected.features.length = 0;
		overviewData.open = false;
		this.setState(() => {
			return { overviewData, selectedCircles, mapData };
		});
	};

	handleCloseOverviewContainer = () => {
		const overviewData = { ...this.baseOverviewData };
		this.setState(() => {
			return { overviewData };
		});
	};

	handleMouseOverMap = async (loc) => {};

	handleMouseLeaveMapCircle = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Map',
				'Map Circle Leave',
				'Hovered the cursor out of a circle on the Map view',
				this.cancelTokenSource.token
			);
			this.cancelTokenSource = null;
		} catch (error) {
			if (axios.isCancel(error)) {
				//Do nothing
			} else if (error.response && error.response.status === 400) {
				alert('Error occured');
			}
		}
	};

	handleMouseEnterMapCircle = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Map',
				'Map Circle Enter',
				'Hovered the cursor into a circle on the Map view',
				this.cancelTokenSource.token
			);
			this.cancelTokenSource = null;
		} catch (error) {
			if (axios.isCancel(error)) {
				//Do nothing
			} else if (error.response && error.response.status === 400) {
				alert('Error occured');
			}
		}
	};

	handleMouseClickMap = async (loc) => {
		this.handleClickCircle('map', loc);
	};

	handleStartInteraction = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Visualization',
				'Visualization Start Interaction',
				'The user entered the visualization through the main menu',
				this.cancelTokenSource.token
			);
			this.cancelTokenSource = null;
		} catch (error) {
			if (axios.isCancel(error)) {
				//Do nothing
			} else if (error.response && error.response.status === 400) {
				alert('Error occured');
			}
		}
	};

	render() {
		const {
			calendarData,
			mapData,
			overviewData,
			selectedCircles,
			participantId,
			calendarTooltip,
		} = this.state;
		return (
			<div className='container-fluid app-container px-0'>
				<Switch>
					<Route
						path='/visualization'
						render={(props) => (
							<MainPage
								calendarData={calendarData}
								calendarTooltip={calendarTooltip}
								selectedCircles={selectedCircles}
								onMouseEnterCalendar={this.handleMouseEnterCalendar}
								onMouseEnterCalendarCircle={this.handleMouseEnterCalendarCircle}
								onMouseLeaveCalendarCircle={this.handleMouseLeaveCalendarCircle}
								onClickCalendarCircle={this.handleClickCalendarCircle}
								mapData={mapData}
								onMouseEnterMap={this.handleMouseEnterMap}
								onMouseEnterMapCircle={this.handleMouseEnterMapCircle}
								onMouseOverMap={this.handleMouseOverMap}
								onMouseLeaveMapCircle={this.handleMouseLeaveMapCircle}
								onMouseClickMap={this.handleMouseClickMap}
								overviewData={overviewData}
								onMouseEnterOverview={this.handleMouseEnterOverview}
								onClickRemoveCrash={this.handleClickRemoveCrash}
								onClickRemoveAllCrashes={this.handleClickRemoveAllCrashes}
								{...props}
							/>
						)}
					/>
					<Route
						path='/results'
						render={(props) => (
							<ResultsPage participantId={participantId} {...props} />
						)}
					/>
					<Route
						path='/'
						render={(props) => (
							<InitialPage
								participantId={participantId}
								onStartInteraction={this.handleStartInteraction}
								onSubmitIdentifier={this.handleSubmitIdentifier}
								{...props}
							/>
						)}
					/>
					<Redirect to='/not-found' />
				</Switch>
			</div>
		);
	}
}
