import React, { PureComponent } from 'react';
import { Map, TileLayer, Popup, Circle } from 'react-leaflet';
import CustomToolTip from '../custom-tooltip/custom-tooltip';
import './map-graph.scss';

export default class MapGraph extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			startPosition: {
				lat: 39.23449743795502,
				lon: -8.302584862719087,
				zoom: 3,
			},
		};
	}

	getNewValue = (value, oldMax, oldMin, newMax, newMin) => {
		const oldRange = oldMax - oldMin;
		const newRange = newMax - newMin;
		const newValue = ((value - oldMin) * newRange) / oldRange + newMin;
		return newValue;
	};

	getRadius = (value, oldMax, newMax) => {
		const newValue = this.getNewValue(value, oldMax, 0, newMax, 0);
		return newValue;
	};

	getInnerRadius = (value, oldMax, newMax) => {
		const newValue = this.getNewValue(value, oldMax, 0, newMax, 0);
		return newValue;
	};

	getInnerColor = (value) => {
		if (value > 75) {
			return '#42834b';
		} else if (value < 75 && value > 50) {
			return '#58af64';
		} else if (value < 50 && value > 25) {
			return '#69cf76';
		} else if (value < 25) {
			return '#8be297';
		}
	};

	render() {
		const { data, tooltipType, onClickMapCircle, randomPositions } = this.props;
		const { startPosition } = this.state;
		console.log(randomPositions);
		if (randomPositions && randomPositions.length !== 0) {
			return (
				<Map
					center={[startPosition.lat, startPosition.lon]}
					zoom={startPosition.zoom}
					scrollWheelZoom={false}
					attributionControl={false}
				>
					<TileLayer
						attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
						url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
					/>
					{data.map((loc, index) => {
						return (
							<React.Fragment key={index}>
								<Circle
									center={[
										randomPositions[index].geometry.coordinates[1],
										randomPositions[index].geometry.coordinates[0],
									]}
									fillColor={'green'}
									radius={this.getRadius(loc, 1, 10000 * 5)}
									weight={0}
									onMouseOver={(e) => e.target.openPopup()}
									onMouseOut={(e) => e.target.closePopup()}
									onClick={() => onClickMapCircle(index)}
								>
									<Circle
										center={[
											randomPositions[index].geometry.coordinates[1],
											randomPositions[index].geometry.coordinates[0],
										]}
										fillColor={this.getInnerColor(loc)}
										fillOpacity={1}
										radius={this.getInnerRadius(loc, 1, 1000 * 5)}
										weight={0}
									></Circle>
									<Popup>
										<CustomToolTip
											type={tooltipType}
											color={this.getInnerColor(loc)}
										/>
									</Popup>
								</Circle>
							</React.Fragment>
						);
					})}
				</Map>
			);
		}
		return null;
	}
}
