import $ from 'jquery';
import React, { PureComponent } from 'react';
import { Map, TileLayer, Popup, CircleMarker } from 'react-leaflet';
import CustomToolTip from '../custom-tooltip/custom-tooltip';
import './map-container.scss';
import _ from 'lodash';

export default class MapContainer extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			zoomLevel: 'low',
			position: {
				lat: 39.23449743795502,
				lon: -8.302584862719087,
				zoom: 3,
			},
			selectedCountry: '',
			selectedTimeFrame: -1,
		};
		this.startingPosition = {
			lat: 39.23449743795502,
			lon: -8.302584862719087,
			zoom: 3,
		};
	}

	getContinentColor = (continent) => {
		if (continent === 'América') {
			return '#db3535';
		} else if (continent === 'Europa') {
			return '#347aeb';
		} else if (continent === 'África') {
			return '#c48b45';
		} else if (continent === 'Ásia') {
			return '#aabf0a';
		} else if (continent === 'Oceânia') {
			return '#35db45';
		}
	};

	getNewValue = (value, oldMax, oldMin, newMax, newMin) => {
		const oldRange = oldMax - oldMin;
		const newRange = newMax - newMin;
		const newValue = ((value - oldMin) * newRange) / oldRange + newMin;
		return newValue;
	};

	getRadius = (value, oldMax, newMax) => {
		if (value < 25) {
			value = 25;
		}
		const newValue = this.getNewValue(value, oldMax, 0, newMax, 0);
		return newValue;
	};

	getInnerRadius = (value, oldMax, newMax) => {
		const newValue = this.getNewValue(value, oldMax, 0, newMax, 0);
		return newValue;
	};

	getInnerColor = (value) => {
		if (value > 75) {
			return '#ea5c15';
		} else if (value < 75 && value > 50) {
			return '#e83c15';
		} else if (value < 50 && value > 25) {
			return '#e61c15';
		} else if (value < 25) {
			return '#ed8c15';
		}
	};

	handleChangeZoom = (zoom) => {
		const position = { ...this.state.position };
		position.zoom = zoom;
		if (zoom >= 5) {
			this.setState(() => {
				return { position, zoomLevel: 'high' };
			});
		} else {
			this.setState(() => {
				return { position, zoomLevel: 'low', selectedCountry: '' };
			});
			this.props.onZoomOut();
		}
	};

	handleResetZoom = () => {
		const position = { ...this.state.position };
		position.zoom = this.startingPosition.zoom;
		this.setState(() => {
			return { position, zoomLevel: 'low', selectedCountry: '' };
		});
		this.props.onZoomOut();
		this.props.onClickResetButton();
	};

	handleClickMapRing = (e, country) => {
		const position = { ...this.state.position };
		position.lat = e.latlng.lat;
		position.lon = e.latlng.lng;
		position.zoom = 5;
		this.setState(() => {
			return { position, selectedCountry: country };
		});
		this.props.onClickMapRing(country);
	};

	handleClickTimeRing = (timeFrameIndex) => {
		const selectedTimeFrame = this.state.selectedTimeFrame;
		if (timeFrameIndex === selectedTimeFrame) {
			this.props.onClickTimeRing(undefined, undefined);
			this.setState(() => {
				return { selectedTimeFrame: -1 };
			});
		} else {
			if (timeFrameIndex === 0) {
				this.props.onClickTimeRing(undefined, 1935);
			} else if (timeFrameIndex === 1) {
				this.props.onClickTimeRing(1935, 1960);
			} else if (timeFrameIndex === 2) {
				this.props.onClickTimeRing(1960, 1985);
			} else if (timeFrameIndex === 3) {
				this.props.onClickTimeRing(1985, undefined);
			}
			this.setState(() => {
				return { selectedTimeFrame: timeFrameIndex };
			});
		}
	};

	render() {
		const {
			data,
			tooltipType,
			onMouseOverMapCircle,
			onClickMapCircle,
			onMouseOverMapRing,
			onMouseOverTimeRing,
			onMouseOverResetButton,
			onMouseOverZoom,
			onClickZoom,
			randomPositions,
			selectedCircles,
			disabled,
		} = this.props;
		const {
			position,
			zoomLevel,
			selectedCountry,
			selectedTimeFrame,
		} = this.state;
		return (
			<React.Fragment>
				<div className='map-title'>
					<span className='map-title__text'>
						Mapa
						<span className='d-block map-title__text__desc'>
							Através do mapa poderá explorar todas as localizações onde
							ocorreram acidentes de avião e como varia a quantitade total de
							casos nos diversos cantos do mundo.
						</span>
					</span>
				</div>
				<Map
					center={[position.lat, position.lon]}
					zoom={position.zoom}
					scrollWheelZoom={true}
					attributionControl={false}
					preferCanvas
					maxZoom={10}
					minZoom={3}
					onzoomend={(e) => this.handleChangeZoom(e.target._zoom)}
					whenReady={() => {
						$('.leaflet-control-zoom').on('mouseenter', function () {
							onMouseOverZoom();
						});

						$('.leaflet-control-zoom-in').on('click', function (e) {
							onClickZoom();
						});
						$('.leaflet-control-zoom-out').on('click', function (e) {
							onClickZoom();
						});
					}}
					doubleClickZoom={false}
				>
					<TileLayer
						attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>'
						url='https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?lang=&access-token=xvznkI6fJOyMEKW1KCrQciEbK0Yvip6Je5Z6vmFz96xIPExT9T07LIDzHuoDFK15'
					/>

					{data.length !== 0 &&
						data.map((loc, index) => {
							return (
								<React.Fragment key={index}>
									{loc.total.map((el, index2) => {
										if (el.lat) {
											let selected = false;
											_.forEach(selectedCircles, (circle, index) => {
												if (circle.id === el.id) {
													selected = true;
													return false;
												}
											});
											return (
												<CircleMarker
													key={index2}
													center={[el.lat, el.lon]}
													fillColor={selected ? '#de2874' : '#107996'}
													radius={10}
													weight={0}
													onMouseOver={(e) => {
														onMouseOverMapCircle();
														e.target.openPopup();
													}}
													onMouseOut={(e) => e.target.closePopup()}
													onClick={() => onClickMapCircle(el)}
												>
													<CircleMarker
														center={[el.lat, el.lon]}
														fillColor={selected ? '#de2874' : '#107996'}
														fillOpacity={1}
														radius={3}
														weight={0}
													></CircleMarker>
													<Popup>
														<CustomToolTip
															type={tooltipType + '--circle'}
															country={el.country_pt}
															date={el.date}
															aircraft={el.aircraft}
															keywords={el.keywords}
															color={selected ? '#de2874' : '#107996'}
														/>
													</Popup>
												</CircleMarker>
											);
										}
										return null;
									})}
								</React.Fragment>
							);
						})}
				</Map>
			</React.Fragment>
		);
	}
}
