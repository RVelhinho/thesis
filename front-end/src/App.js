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
import interactionService from './services/interactionService';
import participantService from './services/participantService';
import worldPoly from './utils/world-poly.json';
import './App.scss';
import './assets/scss/index.scss';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
				disabled: true,
				data: [],
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
				gradientColors: ['107996', '578591'],
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

	handleMouseEnterCalendar = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Calendar',
				'Calendar Enter',
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
				'Map Enter',
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

	handleMouseEnterDonutChart = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'DonutChart',
				'DonutChart Enter',
				'Entered the DonutChart view',
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

	handleMouseEnterWordCloud = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'WordCloud',
				'WordCloud Enter',
				'Entered the WordCloud view',
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

	handleMouseEnterBarChart = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'BarChart',
				'BarChart Enter',
				'Entered the BarChart view',
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
				'Overview Enter',
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

	handleMouseOverCalendarCircle = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Calendar',
				'Calendar Circle Hover',
				'Hovered a circle on the Calendar view',
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
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Calendar',
				'Calendar Circle Click',
				'Clicked a circle on the Calendar view',
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
		this.handleClickCircle(circle);
	};

	handleMouseOverYear = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Calendar',
				'Calendar Year Hover',
				'Hovered a year on the Calendar view',
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

	handleClickYear = async (year) => {
		this.cancelTokenSource && this.cancelTokenSource.cancel();
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Calendar',
				'Calendar Year Click',
				'Clicked a year on the Calendar view',
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
		const filter = _.cloneDeep(this.state.filter);
		const selected = _.cloneDeep(this.state.selected);
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

	handleMouseOverContinentCircle = async () => {
		this.cancelTokenSource && this.cancelTokenSource.cancel();
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Calendar',
				'Calendar Continent Hover',
				'Hovered a continent on the Calendar view',
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

	handleClickContinentCircle = async (continent) => {
		this.cancelTokenSource && this.cancelTokenSource.cancel();
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Calendar',
				'Calendar Continent Click',
				'Clicked a continent on the Calendar view',
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

	handleMouseOverDensityPlot = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Density Plot',
				'Density Plot Hover',
				'Hovered the Density Plot view',
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

	handleMouseOverMapRing = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Map',
				'Map Ring Hover',
				'Hovered a ring on the Map view',
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

	handleClickMapRing = async (country) => {
		this.cancelTokenSource && this.cancelTokenSource.cancel();
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Map',
				'Map Ring Click',
				'Clicked a ring on the Map view',
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

	handleMouseOverTimeRing = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Map',
				'Map Time Ring Hover',
				'Hovered a time ring on the Map view',
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

	handleClickTimeRing = async (minDate, maxDate) => {
		this.cancelTokenSource && this.cancelTokenSource.cancel();
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Map',
				'Map Time Ring Click',
				'Clicked a time ring on the Map view',
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
		const filter = _.cloneDeep(this.state.filter);
		const selected = _.cloneDeep(this.state.selected);
		if (
			(selected.year &&
				minDate &&
				selected.year >= minDate &&
				maxDate &&
				selected.year <= maxDate) ||
			(selected.year && !minDate && maxDate && selected.year <= maxDate) ||
			(selected.year && minDate && selected.year >= minDate && !maxDate)
		) {
			selected.minDate = minDate;
			selected.maxDate = maxDate;
		} else if (
			selected.year &&
			(selected.year < minDate || selected.year > maxDate)
		) {
			selected.minDate = 10000;
			selected.maxDate = -1;
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

	handleMouseOverResetButton = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Map',
				'Map Reset Zoom Hover',
				'Hovered the reset zoom button option on the Map view',
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

	handleClickResetButton = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Map',
				'Map Reset Zoom Click',
				'Clicked the reset zoom button option on the Map view',
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

	handleMouseOverMapCircle = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Map',
				'Map Circle Hover',
				'Hovered a map circle on the Map view',
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

	handleClickMapCircle = async (circle) => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Map',
				'Map Circle Click',
				'Clicked a circle on the Map view',
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
		this.handleClickCircle(circle);
	};

	handleClickCircle = (circle) => {
		const overviewData = _.cloneDeep(this.state.overviewData);
		const selectedCircles = _.cloneDeep(this.state.selectedCircles);
		if (overviewData.location === circle.country) {
			return null;
		}
		let found = false;
		_.forEach(overviewData.data, (el, index) => {
			if (el.id == circle.id) {
				found = index;
			}
		});
		if (typeof found === 'number') {
			overviewData.data.splice(found, 1);
			selectedCircles.splice(found, 1);
		} else {
			overviewData.data.push(circle);
			selectedCircles.push(circle);
		}
		overviewData.open = true;
		this.setState(() => {
			return { overviewData, selectedCircles };
		});
	};

	handleClickMinimize = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Overview',
				'Overview Minimize',
				'Minimized the Overview Tab',
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
		const overviewData = _.cloneDeep(this.state.overviewData);
		overviewData.open = false;
		this.setState(() => {
			return { overviewData };
		});
	};

	handleClickMaximize = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Overview',
				'Overview Maximize',
				'Maximized the Overview Tab',
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
		const overviewData = _.cloneDeep(this.state.overviewData);
		overviewData.open = true;
		this.setState(() => {
			return { overviewData };
		});
	};

	handleMouseOverZoom = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Map',
				'Map Zoom Hover',
				'Hovered the zoom options on the Map view',
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

	handleClickZoom = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Map',
				'Map Zoom Click',
				'Clicked the zoom options on the Map view',
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

	handleZoomOut = () => {
		this.cancelTokenSource && this.cancelTokenSource.cancel();
		const selected = _.cloneDeep(this.state.selected);
		const filter = _.cloneDeep(this.state.filter);
		selected.country = undefined;
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

	handleMouseOverRemoveButton = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Overview',
				'Overview Hover Remove Button',
				'Hovered the Overview Remove Button',
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

	handleClickRemoveCrash = async (circle) => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Overview',
				'Overview Click Remove Button',
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
		_.forEach(overviewData.data, (el, index) => {
			if (el.id == circle.id) {
				overviewData.data.splice(index, 1);
				selectedCircles.splice(index, 1);
				return false;
			}
		});
		if (overviewData.data.length > 0) {
			overviewData.open = true;
		} else {
			overviewData.open = false;
		}
		this.setState(() => {
			return { overviewData, selectedCircles };
		});
	};

	handleCloseOverviewContainer = () => {
		const overviewData = { ...this.baseOverviewData };
		this.setState(() => {
			return { overviewData };
		});
	};

	handleMouseOverDonutChart = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Donut Chart',
				'Donut Chart Hover',
				'Hovered the Donut Chart view',
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

	handleMouseOverWordCloud = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Word Cloud',
				'Word Cloud Hover',
				'Hovered a word on the Word Cloud view',
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

	handleClickWordCloud = async (keyword) => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Word Cloud',
				'Word Cloud Click',
				'Cliked a word on the Word Cloud view',
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
		this.handleClickWord(keyword);
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

	handleMouseOverBarChart = async () => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Bar Chart',
				'Bar Chart Hover',
				'Hovered a bar on the Bar Chart view',
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

	handleClickBarChart = async ({ plane: aircraft }) => {
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: result } = await interactionService.addInteractionLog(
				new Date(),
				'Bar Chart',
				'Bar Chart Click',
				'Clicked a bar on the Bar Chart view',
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
		this.handleClickBar(aircraft);
	};

	handleClickBar = (aircraft) => {
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
			selectedCircles,
			participantId,
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
								onMouseEnterCalendar={this.handleMouseEnterCalendar}
								onMouseEnterMap={this.handleMouseEnterMap}
								onMouseEnterDonutChart={this.handleMouseEnterDonutChart}
								onMouseEnterWordCloud={this.handleMouseEnterWordCloud}
								onMouseEnterBarChart={this.handleMouseEnterBarChart}
								onMouseEnterOverview={this.handleMouseEnterOverview}
								onMouseOverCalendarCircle={this.handleMouseOverCalendarCircle}
								onClickCalendarCircle={this.handleClickCalendarCircle}
								onMouseOverYear={this.handleMouseOverYear}
								onClickYear={this.handleClickYear}
								onMouseOverContinentCircle={this.handleMouseOverContinentCircle}
								onClickContinentCircle={this.handleClickContinentCircle}
								onMouseOverDensityPlot={this.handleMouseOverDensityPlot}
								onMouseOverMapRing={this.handleMouseOverMapRing}
								onClickMapRing={this.handleClickMapRing}
								onMouseOverTimeRing={this.handleMouseOverTimeRing}
								onClickTimeRing={this.handleClickTimeRing}
								onMouseOverResetButton={this.handleMouseOverResetButton}
								onClickResetButton={this.handleClickResetButton}
								onMouseOverMapCircle={this.handleMouseOverMapCircle}
								onClickMapCircle={this.handleClickMapCircle}
								onMouseOverZoom={this.handleMouseOverZoom}
								onClickZoom={this.handleClickZoom}
								onZoomOut={this.handleZoomOut}
								onMouseOverDonutChart={this.handleMouseOverDonutChart}
								onMouseOverWordCloud={this.handleMouseOverWordCloud}
								onClickWordCloud={this.handleClickWordCloud}
								onMouseOverBarChart={this.handleMouseOverBarChart}
								onClickBarChart={this.handleClickBarChart}
								onMouseOverRemoveButton={this.handleMouseOverRemoveButton}
								onClickRemoveCrash={this.handleClickRemoveCrash}
								selectedCircles={selectedCircles}
								onClickMinimize={this.handleClickMinimize}
								onClickMaximize={this.handleClickMaximize}
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
