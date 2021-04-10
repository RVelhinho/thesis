import L, { svg } from 'leaflet';
import $ from 'jquery';
import React, { PureComponent } from 'react';
import { Map, TileLayer, Popup, CircleMarker, Tooltip } from 'react-leaflet';
import Button from '../button/button';
import CustomToolTip from '../custom-tooltip/custom-tooltip';
import { getTimeColor } from '../../utils/time';
import './map-container.scss';
import { random } from '@turf/turf';
import _, { result } from 'lodash';

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
			<Map
				center={[position.lat, position.lon]}
				zoom={position.zoom}
				scrollWheelZoom={false}
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
					attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
					url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
				/>

				{/* <svg height={0} width={0}>
					<defs>
						{data.length !== 0 &&
							data.map((loc, index) => {
								return (
									<linearGradient
										key={index}
										id={`ring-gradient-${index}`}
										x1='0'
										y1='0'
										x2='0'
										y2='1'
									>
										<stop
											offset={'5%'}
											stopColor={getTimeColor(loc.minDate)}
											stopOpacity={1}
										/>
										<stop
											offset={'100%'}
											stopColor={getTimeColor(loc.maxDate)}
											stopOpacity={1}
										/>
									</linearGradient>
								);
							})}
					</defs>
				</svg> */}
				{zoomLevel === 'high' &&
					selectedCountry === '' &&
					data.length !== 0 &&
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
												fillColor={
													selected
														? '#de2874'
														: this.getContinentColor(el.continent)
												}
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
													fillColor={
														selected
															? '#de2874'
															: this.getContinentColor(el.continent)
													}
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
														color={
															selected
																? '#de2874'
																: this.getContinentColor(el.continent)
														}
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
				{zoomLevel === 'high' &&
					selectedCountry !== '' &&
					data.length !== 0 &&
					data.map((loc, index) => {
						if (loc.country === selectedCountry) {
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
													fillColor={
														selected
															? '#de2874'
															: this.getContinentColor(el.continent)
													}
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
														fillColor={
															selected
																? '#de2874'
																: this.getContinentColor(el.continent)
														}
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
															color={
																selected
																	? '#de2874'
																	: this.getContinentColor(el.continent)
															}
														/>
													</Popup>
												</CircleMarker>
											);
										}
										return null;
									})}
								</React.Fragment>
							);
						}
					})}
				{zoomLevel === 'low' &&
					data.map((loc, index) => {
						return (
							<React.Fragment key={index}>
								<CircleMarker
									center={[loc.lat, loc.lon]}
									color={this.getContinentColor(loc.continent)}
									opacity={0.6}
									fillOpacity={0.7}
									radius={this.getRadius(
										loc.total.length,
										30,
										15 + loc.total.length * 0.3
									)}
									weight={0}
									onMouseOver={(e) => {
										onMouseOverMapRing();
										e.target.openPopup();
									}}
									onMouseOut={(e) => e.target.closePopup()}
									onClick={(e) => this.handleClickMapRing(e, loc.country)}
								>
									<Tooltip
										direction='bottom'
										offset={[0, -22.5]}
										opacity={1}
										permanent
									>
										{
											<span style={{ color: '#e6e6e6' }}>
												{loc.total.length}
											</span>
										}
									</Tooltip>
									<Popup>
										<CustomToolTip
											type={tooltipType + '--ring'}
											country={loc.country_pt}
											total={loc.total.length}
											color={this.getContinentColor(loc.continent)}
										/>
									</Popup>
								</CircleMarker>
							</React.Fragment>
						);
					})}
				<div
					className={
						!disabled
							? 'map-container__legend'
							: 'map-container__legend map-container__legend--hidden'
					}
				>
					<div className='row mx-0 map-container__legend__row'>
						<div className='col px-0'>
							<Button
								text={'Redefinir Zoom'}
								color={'grey'}
								onMouseEnter={onMouseOverResetButton}
								onClick={this.handleResetZoom}
							/>
						</div>
					</div>
					<div
						className='row mx-0 map-container__legend__row'
						style={
							selectedTimeFrame !== 0 && selectedTimeFrame !== -1
								? { opacity: 0.3 }
								: { opacity: 1 }
						}
						onMouseEnter={() => onMouseOverTimeRing()}
						onClick={() => this.handleClickTimeRing(0)}
					>
						<div className='col-auto px-0 mr-2'>
							<div
								className='circle'
								style={{ backgroundColor: 'urlf(#ring-gradient)' }}
							></div>
						</div>
						<div className='col px-0 d-flex justify-content-start align-items-center'>
							<span className='text'> &lt; 1935</span>
						</div>
					</div>
					<div
						className='row mx-0 map-container__legend__row'
						style={
							selectedTimeFrame !== 1 && selectedTimeFrame !== -1
								? { opacity: 0.3 }
								: { opacity: 1 }
						}
						onMouseEnter={() => onMouseOverTimeRing()}
						onClick={() => this.handleClickTimeRing(1)}
					>
						<div className='col-auto px-0 mr-2'>
							<div className='circle'></div>
						</div>
						<div className='col px-0 d-flex justify-content-start align-items-center'>
							<span className='text'> 1935 - 1960</span>
						</div>
					</div>
					<div
						className='row mx-0 map-container__legend__row'
						style={
							selectedTimeFrame !== 2 && selectedTimeFrame !== -1
								? { opacity: 0.3 }
								: { opacity: 1 }
						}
						onMouseEnter={() => onMouseOverTimeRing()}
						onClick={() => this.handleClickTimeRing(2)}
					>
						<div className='col-auto px-0 mr-2'>
							<div className='circle'></div>
						</div>
						<div className='col px-0 d-flex justify-content-start align-items-center'>
							<span className='text'> 1960 - 1985</span>
						</div>
					</div>
					<div
						className='row mx-0 map-container__legend__row'
						style={
							selectedTimeFrame !== 3 && selectedTimeFrame !== -1
								? { opacity: 0.3 }
								: { opacity: 1 }
						}
						onMouseEnter={() => onMouseOverTimeRing()}
						onClick={() => this.handleClickTimeRing(3)}
					>
						<div className='col-auto px-0 mr-2'>
							<div className='circle'></div>
						</div>
						<div className='col px-0 d-flex justify-content-start align-items-center'>
							<span className='text'> &gt; 1985</span>
						</div>
					</div>
				</div>
			</Map>
		);
	}
}
