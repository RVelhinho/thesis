import L, { svg } from 'leaflet';
import React, { PureComponent } from 'react';
import { Map, TileLayer, Popup, Circle, Tooltip } from 'react-leaflet';
import Button from '../button/button';
import CustomToolTip from '../custom-tooltip/custom-tooltip';
import { getTimeColor } from '../../utils/time';
import './map-container.scss';

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
		};
		this.startingPosition = {
			lat: 39.23449743795502,
			lon: -8.302584862719087,
			zoom: 3,
		};
	}

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
		if (zoom >= 5) {
			this.setState(() => {
				return { zoomLevel: 'high' };
			});
		} else {
			this.setState(() => {
				return { zoomLevel: 'low' };
			});
		}
	};

	handleResetZoom = () => {
		const position = { ...this.state.position };
		position.lat = this.startingPosition.lat;
		position.lon = this.startingPosition.lon;
		position.zoom = this.startingPosition.zoom;
		this.setState(() => {
			return { position };
		});
	};

	handleClickMapRing = (e) => {
		const position = { ...this.state.position };
		position.lat = e.latlng.lat;
		position.lon = e.latlng.lng;
		position.zoom = 5;
		this.setState(() => {
			return { position };
		});
	};

	render() {
		const { data, tooltipType, onClickMapCircle, randomPositions } = this.props;
		const { position, zoomLevel } = this.state;
		if (randomPositions && randomPositions.length !== 0) {
			return (
				<Map
					center={[position.lat, position.lon]}
					zoom={position.zoom}
					scrollWheelZoom={false}
					attributionControl={false}
					maxZoom={10}
					minZoom={3}
					onzoomend={(e) => this.handleChangeZoom(e.target._zoom)}
					doubleClickZoom={false}
				>
					<TileLayer
						attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
						url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
					/>

					<svg height={0} width={0}>
						<defs>
							{data.map((loc, index) => {
								return (
									<linearGradient
										key={index}
										id={`ring-gradient-${index}`}
										x1='0'
										y1='0'
										x2='0'
										y2='1'
									>
										<stop offset={'5%'} stopColor={'#9da4e3'} stopOpacity={1} />
										<stop
											offset={'100%'}
											stopColor={getTimeColor(2000)}
											stopOpacity={1}
										/>
									</linearGradient>
								);
							})}
						</defs>
					</svg>

					{zoomLevel === 'high' &&
						data.map((loc, index) => {
							return (
								<React.Fragment key={index}>
									<Circle
										center={[
											randomPositions[index].geometry.coordinates[1],
											randomPositions[index].geometry.coordinates[0],
										]}
										fillColor={getTimeColor(loc)}
										radius={10000 * 5}
										weight={0}
										onMouseOver={(e) => e.target.openPopup()}
										onMouseOut={(e) => e.target.closePopup()}
										onClick={() => {
											onClickMapCircle(index);
										}}
									>
										<Circle
											center={[
												randomPositions[index].geometry.coordinates[1],
												randomPositions[index].geometry.coordinates[0],
											]}
											fillColor={getTimeColor(loc)}
											fillOpacity={1}
											radius={10000}
											weight={0}
										></Circle>
										<Popup>
											<CustomToolTip
												type={tooltipType}
												color={getTimeColor(loc)}
											/>
										</Popup>
									</Circle>
								</React.Fragment>
							);
						})}
					{zoomLevel === 'low' &&
						data.map((loc, index) => {
							return (
								<React.Fragment key={index}>
									<Circle
										center={[
											randomPositions[index].geometry.coordinates[1],
											randomPositions[index].geometry.coordinates[0],
										]}
										color={`url(#ring-gradient-${index})`}
										fillOpacity={0}
										radius={this.getRadius(loc, 1, 10000 * 2)}
										weight={5}
										onMouseOver={(e) => e.target.openPopup()}
										onMouseOut={(e) => e.target.closePopup()}
										onClick={(e) => this.handleClickMapRing(e)}
									>
										<Tooltip
											direction='bottom'
											offset={[0, -22.5]}
											opacity={1}
											permanent
										>
											160
										</Tooltip>
										<Popup>
											<CustomToolTip
												type={tooltipType}
												color={getTimeColor(loc)}
											/>
										</Popup>
									</Circle>
								</React.Fragment>
							);
						})}
					<div className='map-container__legend'>
						<div className='row mx-0 map-container__legend__row'>
							<div className='col px-0'>
								<Button
									text={'Reset Zoom'}
									color={'grey'}
									onResetZoom={this.handleResetZoom}
								/>
							</div>
						</div>
						<div className='row mx-0 map-container__legend__row'>
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
						<div className='row mx-0 map-container__legend__row'>
							<div className='col-auto px-0 mr-2'>
								<div className='circle'></div>
							</div>
							<div className='col px-0 d-flex justify-content-start align-items-center'>
								<span className='text'> 1935 - 1960</span>
							</div>
						</div>
						<div className='row mx-0 map-container__legend__row'>
							<div className='col-auto px-0 mr-2'>
								<div className='circle'></div>
							</div>
							<div className='col px-0 d-flex justify-content-start align-items-center'>
								<span className='text'> 1960 - 1985</span>
							</div>
						</div>
						<div className='row mx-0 map-container__legend__row'>
							<div className='col-auto px-0 mr-2'>
								<div className='circle'></div>
							</div>
							<div className='col px-0 d-flex justify-content-start align-items-center'>
								<span className='text'> &gt;= 1985</span>
							</div>
						</div>
					</div>
				</Map>
			);
		}
		return null;
	}
}
