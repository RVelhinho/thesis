import React, { PureComponent } from 'react';
import _ from 'lodash';
import ReactMapGL, {
	NavigationControl,
	Source,
	Layer,
	Popup,
} from 'react-map-gl';
import CustomToolTip from '../custom-tooltip/custom-tooltip';
import './map-container-new.scss';
import { select } from 'd3-selection';

class MapContainerNew extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			viewport: {},
			showPopup: false,
			selectedEl: {},
		};
	}
	getCursor({ isHovering, isDragging }) {
		return isDragging ? 'grabbing' : isHovering ? 'pointer' : 'default';
	}
	handleChangeViewport = (nextViewport) => {
		this.setState(() => {
			return { viewport: nextViewport };
		});
	};
	handleMouseOverMap = (e) => {
		let showPopup = _.cloneDeep(this.state.showPopup);
		let selectedEl = _.cloneDeep(this.state.selectedEl);
		if (e.features && e.features.length !== 0) {
			let newSelectedEl = {};
			if (e.features.length > 1) {
				let numArray = [];
				_.forEach(e.features, (el) => numArray.push(el.properties.id));
				newSelectedEl = e.features.find(
					(el) => el.properties.id === _.max(numArray)
				).properties;
			} else {
				newSelectedEl = _.cloneDeep(e.features[0].properties);
			}
			if (selectedEl.id !== newSelectedEl.id) {
				this.props.onMouseOverMap(newSelectedEl, 'enter');
			}
			selectedEl = { ...newSelectedEl };
			showPopup = true;
			this.setState(() => {
				return { showPopup, selectedEl };
			});
			//}
		} else {
			if (!_.isEmpty(selectedEl)) {
				this.props.onMouseOverMap(selectedEl, 'leave');
			}
			selectedEl = {};
			showPopup = false;
			this.setState(() => {
				return { showPopup, selectedEl };
			});
		}
	};

	render() {
		const {
			data,
			dataProxy,
			dataSelected,
			dataHovered,
			minScale,
			minZoom,
			language,
			tooltipType,
			startingPosition,
			scale,
			onMouseClickMap,
			selectedCircles,
			hoveredCircles,
		} = this.props;
		const { viewport, showPopup, selectedEl } = this.state;
		let newScale = minScale;
		let zoom = !_.isEmpty(viewport) ? viewport.zoom : startingPosition.zoom;
		if (zoom > minZoom) {
			newScale = zoom - minZoom + 1;
			newScale = scale ? newScale * scale : newScale;
		} else {
			newScale = minScale;
		}
		const dataProxyLayerStyleLarge = {
			id: 'data-proxy-style-large',
			type: 'circle',
			paint: {
				'circle-radius': 5 * newScale,
				'circle-color': 'transparent',
				'circle-opacity': 0.3,
			},
		};
		const dataProxyLayerStyleSmall = {
			id: 'data-proxy-style-small',
			type: 'circle',
			paint: {
				'circle-radius': 2 * newScale,
				'circle-color': 'transparent',
				'circle-opacity': 1,
			},
		};
		const dataLayerStyleLarge = {
			id: 'data-style-large',
			type: 'circle',
			paint: {
				'circle-radius': 5 * newScale,
				'circle-color': '#3b8194',
				'circle-opacity': 0.3,
			},
		};
		const dataLayerStyleSmall = {
			id: 'data-style-small',
			type: 'circle',
			paint: {
				'circle-radius': 2 * newScale,
				'circle-color': '#3b8194',
				'circle-opacity': 1,
			},
		};
		const dataHoveredLayerStyleLarge = {
			id: 'data-hovered-style-large',
			type: 'circle',
			paint: {
				'circle-radius': 5 * newScale,
				'circle-color': '#dba78a',
				'circle-opacity': 0.3,
			},
		};
		const dataHoveredLayerStyleSmall = {
			id: 'data-hovered-style-small',
			type: 'circle',
			paint: {
				'circle-radius': 2 * newScale,
				'circle-color': '#dba78a',
				'circle-opacity': 1,
			},
		};
		const dataSelectedLayerStyleLarge = {
			id: 'data-selected-style-large',
			type: 'circle',
			paint: {
				'circle-radius': 5 * newScale,
				'circle-color': '#d1784b',
				'circle-opacity': 0.3,
			},
		};
		const dataSelectedLayerStyleSmall = {
			id: 'data-selected-style-small',
			type: 'circle',
			paint: {
				'circle-radius': 2 * newScale,
				'circle-color': '#d1784b',
				'circle-opacity': 1,
			},
		};
		const layerList = [];
		if (dataProxy && dataProxy.features && dataProxy.features.length !== 0) {
			layerList.push('data-proxy-style-large');
			layerList.push('data-proxy-style-small');
		}
		return (
			<React.Fragment>
				<div className='map-title'>
					<span className='map-title__text'>
						Mapa
						<span className='d-block map-title__text__desc'>
							Através do mapa poderá explorar os detalhes dos acidentes de avião
							de acordo com o país em que ocorreram.
						</span>
					</span>
				</div>
				<ReactMapGL
					latitude={startingPosition.lat}
					longitude={startingPosition.lon}
					zoom={startingPosition.zoom}
					{...viewport}
					width={'100%'}
					height={'100%'}
					minZoom={1}
					maxZoom={18}
					className={'map-container-new'}
					mapStyle='mapbox://styles/rvelhinho/cko63h5332slv17muc66hozni?optimize=true'
					mapboxApiAccessToken='pk.eyJ1IjoicnZlbGhpbmhvIiwiYSI6ImNrbnp5eDF3bzBhb3Uyd29iMWM4bG1uM2sifQ.X_7epF1k9Lydwp9ivSNGAQ'
					attributionControl={false}
					onViewportChange={(nextViewport) =>
						this.handleChangeViewport(nextViewport)
					}
					onHover={(e) => this.handleMouseOverMap(e)}
					onNativeClick={() => onMouseClickMap(selectedEl)}
					getCursor={this.getCursor}
					interactiveLayerIds={[...layerList]}
				>
					<Source id='data-source-proxy' type='geojson' data={dataProxy}>
						<Layer {...dataProxyLayerStyleLarge}></Layer>
						<Layer {...dataProxyLayerStyleSmall}></Layer>
					</Source>
					<Source id='data-source' type='geojson' data={data}>
						<Layer {...dataLayerStyleLarge}></Layer>
						<Layer {...dataLayerStyleSmall}></Layer>
					</Source>
					<Source id='data-source-hovered' type='geojson' data={dataHovered}>
						<Layer {...dataHoveredLayerStyleLarge}></Layer>
						<Layer {...dataHoveredLayerStyleSmall}></Layer>
					</Source>
					<Source id='data-source-selected' type='geojson' data={dataSelected}>
						<Layer {...dataSelectedLayerStyleLarge}></Layer>
						<Layer {...dataSelectedLayerStyleSmall}></Layer>
					</Source>
					<NavigationControl
						style={{ left: '10px', top: '10px' }}
						showCompass={false}
					></NavigationControl>
					{showPopup && (
						<Popup
							latitude={selectedEl.lat}
							longitude={selectedEl.lon}
							captureClick={false}
							captureDrag={false}
							anchor='bottom'
							closeButton={false}
						>
							<CustomToolTip
								type={tooltipType}
								language={language}
								loc={selectedEl}
								color={
									_.find(selectedCircles, (el) => el.id === selectedEl.id)
										? '#d1784b'
										: _.find(hoveredCircles, (el) => el.id === selectedEl.id)
										? '#dba78a'
										: '#3b8194'
								}
							/>
						</Popup>
					)}
				</ReactMapGL>
			</React.Fragment>
		);
	}
}

MapContainerNew.propTypes = {};

export default MapContainerNew;
