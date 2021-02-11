import React, { PureComponent } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
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
} from 'recharts';
import CustomToolTip from '../custom-tooltip/custom-tooltip';
import { getRoundedValue } from '../../utils/mathUtils';
import './density-plot-container.scss';
import { points } from '@turf/turf';

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
			(cx !== '' && cy !== '' && animationEnded)
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
			} else if (cx !== '' && cy !== '') {
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
						y={10}
						height={height + 10}
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
		} = this.props;
		let tick1 = minValue * 0.85 + (maxValue * 1.15 - minValue * 0.85) * (1 / 4);
		let tick2 = minValue * 0.85 + (maxValue * 1.15 - minValue * 0.85) * (2 / 4);
		let tick3 = minValue * 0.85 + (maxValue * 1.15 - minValue * 0.85) * (3 / 4);

		return (
			<ResponsiveContainer>
				<AreaChart
					className='density-plot-container'
					data={data}
					margin={{
						top: 20,
						right: 70,
						left: 5,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray='5' />
					<XAxis
						type='category'
						domain={['auto', 'auto']}
						tickLine={false}
						dataKey={categoryAxis}
						tickSize={10}
						height={40}
						axisLine={false}
						tick={<this.CustomTickXAxis />}
						dy={5}
					/>
					<YAxis
						type='number'
						domain={[minValue * 0.85, maxValue * 1.15]}
						allowDataOverflow={true}
						tickLine={false}
						ticks={[
							Math.floor(minValue * 0.85),
							Math.floor(tick1),
							Math.floor(tick2),
							Math.floor(tick3),
							Math.floor(maxValue * 1.15),
						]}
						tickLine={false}
						axisLine={false}
						tick={<this.CustomTickYAxis />}
						dx={-5}
					/>
					<Tooltip
						content={<CustomToolTip type={tooltipType} color={color} />}
						wrapperStyle={{ zIndex: 1000 }}
						cursor={<this.CustomCursor color={color} />}
					/>
					<Area
						type={lineType}
						dataKey={dataKey}
						stroke={color}
						height={100}
						fill={color}
						fillOpacity={0.3}
						dot={<this.CustomDot />}
						activeDot={<this.CustomActiveDot />}
						animationDuration={1000}
						onMouseOver={this.handleMouseOverDensityArea}
						onAnimationStart={this.handleAnimationStart}
						onAnimationEnd={this.handleAnimationEnd}
					/>
					<Brush dataKey={timeAttr} height={20} dy={10} />
				</AreaChart>
			</ResponsiveContainer>
		);
	}
}

DensityPlotContainer.propTypes = {};

export default DensityPlotContainer;
