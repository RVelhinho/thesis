import React, { PureComponent } from 'react';
import { Marker } from 'react-map-gl';
import './map-marker.scss';

class MapMarker extends PureComponent {
	render() {
		const {
			data,
			onMouseOverMarker,
			onMouseOutMarker,
			onClickMapCircle,
			interactionDisabled,
			scale,
			randomPositions,
		} = this.props;
		return data.map((loc, index) => (
			<Marker
				key={index}
				latitude={
					randomPositions
						? randomPositions[index].geometry.coordinates[1]
						: loc.lat
				}
				longitude={
					randomPositions
						? randomPositions[index].geometry.coordinates[0]
						: loc.lon
				}
			>
				<div
					onMouseOver={() => onMouseOverMarker(loc)}
					onMouseOut={() => onMouseOutMarker()}
					onClick={() => onClickMapCircle(loc)}
					className={
						interactionDisabled
							? 'map-container-new__marker-outer-icon disabled'
							: 'map-container-new__marker-outer-icon'
					}
					style={{
						backgroundColor: loc.outerColor,
						width: loc.outerRadius / (scale / 3),
						height: loc.outerRadius / (scale / 3),
					}}
				></div>
				<div
					className='map-container-new__marker-inner-icon'
					style={{
						backgroundColor: loc.innerColor,
						width: loc.innerRadius / (scale / 3),
						height: loc.innerRadius / (scale / 3),
					}}
				></div>
			</Marker>
		));
	}
}

export { MapMarker };
