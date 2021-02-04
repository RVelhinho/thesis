import React, { Component } from 'react';
import L from 'leaflet';
import * as turf from '@turf/turf';
import worldPoly from '../../mockData/worldPoly.json';
import MapGraph from '../../components/map-graph/map-graph';
import './main-page.scss';

export default class MainPage extends Component {
	state = {
		polyPositions: [],
		randomPositions: [],
		calendarData: {
			data: [],
			tooltipType: 'calendar',
		},
		mapData: {
			data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			tooltipType: 'map',
		},
		crashOverviewData: {
			data: [],
			tooltipType: 'overview',
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

	handleClickMapCircle = () => {
		console.log('Map Circle Clicked');
	};

	render() {
		const { mapData, randomPositions } = this.state;
		return (
			<div className='main-page-container'>
				<div className='row mx-0 main-page-container__top-row'>
					<div className='col-3 px-0 main-page-container__calendar-container'>
						Yp
					</div>
					<div className='col px-0 main-page-container__calendar-container'>
						<MapGraph
							data={mapData.data}
							tooltipType={mapData.tooltipType}
							randomPositions={randomPositions}
							onClickMapCircle={this.handleClickMapCircle}
						/>
					</div>
				</div>
				<div className='row mx-0 h-25 main-page-container__bottom-row'>
					<div className='col px-0'></div>
					<div className='col px-0'></div>
					<div className='col px-0'></div>
				</div>
			</div>
		);
	}
}
