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
			showPopup = true;
			selectedEl = _.cloneDeep(e.features[0].properties);
			this.setState(() => {
				return { showPopup, selectedEl };
			});
			this.props.onMouseOverMap(selectedEl);
			//}
		} else {
			showPopup = false;
			selectedEl = {};
			this.setState(() => {
				return { showPopup, selectedEl };
			});
		}
	};

	handleMouseEnterMapCircle = (e) => {
		if (e.features && e.features.length !== 0) {
			this.props.onMouseEnterMapCircle();
		}
	};
	render() {
		const {
			data,
			dataSelected,
			minScale,
			minZoom,
			language,
			tooltipType,
			startingPosition,
			scale,
			onMouseClickMap,
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
		const dataLayerStyleLarge = {
			id: 'data-style-large',
			type: 'circle',
			paint: {
				'circle-radius': 5 * newScale,
				'circle-color': '#107996',
				'circle-opacity': 0.3,
			},
		};
		const dataLayerStyleSmall = {
			id: 'data-style-small',
			type: 'circle',
			paint: {
				'circle-radius': 2 * newScale,
				'circle-color': '#107996',
				'circle-opacity': 1,
			},
		};
		const dataSelectedLayerStyleLarge = {
			id: 'data-selected-style-large',
			type: 'circle',
			paint: {
				'circle-radius': 5 * newScale,
				'circle-color': '#de2874',
				'circle-opacity': 0.3,
			},
		};
		const dataSelectedLayerStyleSmall = {
			id: 'data-selected-style-small',
			type: 'circle',
			paint: {
				'circle-radius': 2 * newScale,
				'circle-color': '#de2874',
				'circle-opacity': 1,
			},
		};
		const layerList = [];
		if (data && data.features && data.features.length !== 0) {
			layerList.push('data-style-large');
			layerList.push('data-style-small');
		}
		if (
			dataSelected &&
			dataSelected.features &&
			dataSelected.features.length !== 0
		) {
			layerList.push('data-selected-style-large');
			layerList.push('data-selected-style-small');
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
					onMouseEnter={(e) => this.handleMouseEnterMapCircle(e)}
					onMouseDown={() => onMouseClickMap(selectedEl)}
					getCursor={this.getCursor}
					interactiveLayerIds={[...layerList]}
				>
					{data && data.features && data.features.length !== 0 && (
						<Source id='data-source' type='geojson' data={data}>
							<Layer {...dataLayerStyleLarge}></Layer>
							<Layer {...dataLayerStyleSmall}></Layer>
						</Source>
					)}
					{dataSelected &&
						dataSelected.features &&
						dataSelected.features.length !== 0 && (
							<Source
								id='data-source-selected'
								type='geojson'
								data={dataSelected}
							>
								<Layer {...dataSelectedLayerStyleLarge}></Layer>
								<Layer {...dataSelectedLayerStyleSmall}></Layer>
							</Source>
						)}
					<NavigationControl
						style={{ left: '10px', top: '10px' }}
						showCompass={false}
					></NavigationControl>
					{showPopup && (
						<Popup
							latitude={selectedEl.lat}
							longitude={selectedEl.lon}
							anchor='bottom'
							closeButton={false}
						>
							<CustomToolTip
								type={tooltipType}
								language={language}
								loc={selectedEl}
								color={selectedEl.innerColor}
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
