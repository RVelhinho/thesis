import React, { PureComponent } from 'react';
import _ from 'lodash';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Rectangle,
	Text,
	ResponsiveContainer,
	Dot,
	Brush,
	Label,
} from 'recharts';
import CustomToolTip from '../custom-tooltip/custom-tooltip';
import { getRoundedValue } from '../../utils/math';
import './density-plot-container.scss';

class DensityPlotContainer extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			animationEnded: '',
			pointsCoordinates: [],
			cx: '',
			cy: '',
		};
	}

	handleMouseOverDensityAreaDot = ({ cx, cy }) => {
		this.setState(() => {
			return { cx, cy };
		});
	};

	handleMouseOverDensityArea = ({ points }) => {
		const pointsCoordinates = [...this.state.pointsCoordinates];
		if (!_.isEqual(pointsCoordinates.sort(), points.sort())) {
			this.setState(() => {
				return { pointsCoordinates: points };
			});
		}
	};

	handleMouseLeaveAreaDot = () => {
		this.setState(() => {
			return { cx: '', cy: '' };
		});
	};

	handleAnimationStart = () => {
		this.setState({ animationEnded: false });
	};

	handleAnimationEnd = () => {
		setTimeout(() => {
			this.setState({ animationEnded: true });
		}, 500);
	};

	CustomCursor = (props) => {
		const { height, color, payloadIndex } = props;
		const { animationEnded, pointsCoordinates, cx, cy } = this.state;
		if (
			(pointsCoordinates.length !== 0 &&
				typeof payloadIndex === 'number' &&
				pointsCoordinates[payloadIndex] &&
				animationEnded) ||
			(cx && cy && animationEnded)
		) {
			let x;
			let y;
			if (
				pointsCoordinates.length !== 0 &&
				typeof payloadIndex === 'number' &&
				pointsCoordinates[payloadIndex]
			) {
				x = pointsCoordinates[payloadIndex].x;
				y = pointsCoordinates[payloadIndex].y;
			} else if (cx && cy) {
				x = cx;
				y = cy;
			}
			return (
				<React.Fragment>
					<Rectangle
						className='custom-cursor-area-chart'
						x={x - 25}
						width={50}
						radius={10}
						height={height + 50}
					/>
					<Rectangle
						x={x}
						width={1}
						y={14}
						height={height + 5}
						stroke={color}
					/>
					<line
						x1={props.left}
						y1={y}
						x2={x}
						y2={y + 1}
						stroke={color}
						strokeWidth={1}
						strokeDasharray='5 5'
					/>
				</React.Fragment>
			);
		} else {
			return null;
		}
	};

	CustomTickXAxis = (props) => {
		const { payload } = props;
		return (
			<Text {...props} className='custom-tick'>
				{payload.value}
			</Text>
		);
	};

	CustomTickYAxis = (props) => {
		const { payload } = props;
		const valueToShow = getRoundedValue(payload.value, 'units');
		return (
			<Text {...props} className='custom-tick'>
				{valueToShow}
			</Text>
		);
	};

	CustomDot = (props) => {
		const { cx, cy, stroke, index } = props;
		return (
			<svg key={index}>
				<Dot
					cx={cx}
					cy={cy}
					r={10}
					fill='transparent'
					onMouseOver={() => this.handleMouseOverDensityAreaDot(cx, cy)}
				/>
				;
				<Dot cx={cx} cy={cy} r={4} fill={stroke} />
				<Dot cx={cx} cy={cy} r={1} fill='#ffffff' />;
			</svg>
		);
	};

	CustomActiveDot = (props) => {
		const { cx, cy, fill, index } = props;
		if (this.state.animationEnded) {
			return (
				<svg key={index}>
					<Dot
						cx={cx}
						cy={cy}
						r={8}
						fill='#ffffff'
						className='area-active-outer-dot'
						onMouseOut={() => this.handleMouseLeaveAreaDot}
					/>
					<Dot cx={cx} cy={cy} r={2} fill={fill} />;
				</svg>
			);
		}
		return null;
	};

	render() {
		const {
			data,
			categoryAxis,
			timeAttr,
			tooltipType,
			lineType,
			dataKey,
			color,
			minValue,
			maxValue,
			onMouseOverDensityPlot,
		} = this.props;
		let tick1 = minValue * 0.85 + (maxValue * 1.15 - minValue * 0.85) * (1 / 4);
		let tick2 = minValue * 0.85 + (maxValue * 1.15 - minValue * 0.85) * (2 / 4);
		let tick3 = minValue * 0.85 + (maxValue * 1.15 - minValue * 0.85) * (3 / 4);
		return (
			<div
				onMouseEnter={() => onMouseOverDensityPlot()}
				style={{ width: '100%', height: '100%' }}
			>
				<div className='density-title'>
					<span className='density-title__text'>Filtros</span>
					<span className='density-title__text__desc'>
						Aqui poderá explorar como variou a ocorrência de acidentes de avião
						e filtrar por país ou ano.
					</span>
				</div>
				<div style={{ width: '100%', height: '80%' }}>
					<ResponsiveContainer>
						<AreaChart
							className='density-plot-container'
							data={data}
							margin={{
								top: 20,
								right: 30,
								left: 0,
								bottom: 0,
							}}
						>
							<svg height={0} width={0}>
								<linearGradient
									id={'density-plot-gradient'}
									x1='0'
									y1='0'
									x2='1'
									y2='0'
								>
									<stop offset={'0%'} stopColor={'#34ebc0'} stopOpacity={1} />
									<stop offset={'33%'} stopColor={'#34ebc0'} stopOpacity={1} />
									<stop offset={'66%'} stopColor={'#34ebc0'} stopOpacity={1} />
									<stop offset={'99%'} stopColor={'#34ebc0'} stopOpacity={1} />
								</linearGradient>
							</svg>

							<CartesianGrid strokeDasharray='5' />
							<XAxis
								type='category'
								domain={['auto', 'auto']}
								tickLine={false}
								dataKey={categoryAxis}
								tickSize={10}
								height={55}
								axisLine={false}
								tick={<this.CustomTickXAxis />}
							>
								<Label
									value='Ano'
									offset={100}
									position='inside'
									dy={10}
									stroke={'#606060'}
									strokeWidth={0}
								/>
							</XAxis>
							<YAxis
								type='number'
								domain={[0, maxValue * 1.15]}
								allowDataOverflow={false}
								ticks={[
									0,
									Math.floor(minValue * 0.85),
									Math.floor(tick1),
									Math.floor(tick2),
									Math.floor(tick3),
									Math.floor(maxValue * 1.15),
								]}
								tickLine={false}
								axisLine={false}
								tick={<this.CustomTickYAxis />}
							>
								<Label
									value='Total de acidentes de avião'
									angle={-90}
									offset={0}
									position='inside'
									dx={-10}
									stroke={'#606060'}
									strokeWidth={0}
								/>
							</YAxis>
							<Tooltip
								content={<CustomToolTip type={tooltipType} color={color} />}
								wrapperStyle={{ zIndex: 1000 }}
								cursor={<this.CustomCursor color={color} />}
							/>
							<Area
								type={lineType}
								dataKey={dataKey}
								stroke={color}
								fill={color}
								fillOpacity={0.5}
								dot={<this.CustomDot />}
								activeDot={<this.CustomActiveDot />}
								animationDuration={300}
								onMouseOver={this.handleMouseOverDensityArea}
								onAnimationStart={this.handleAnimationStart}
								onAnimationEnd={this.handleAnimationEnd}
							/>
							<Brush dataKey={categoryAxis} height={20} />
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>
		);
	}
}

DensityPlotContainer.propTypes = {};

export default DensityPlotContainer;
