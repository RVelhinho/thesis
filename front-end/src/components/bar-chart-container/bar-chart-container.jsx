import React from 'react';
import PropTypes from 'prop-types';
import {
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	Tooltip,
	LabelList,
	ResponsiveContainer,
	CartesianGrid,
	Rectangle,
	Text,
} from 'recharts';
import CustomToolTip from '../custom-tooltip/custom-tooltip';
import './bar-chart-container.scss';

const BarChartContainer = React.memo(
	({ data, tooltipType, gradientColors }) => {
		data = data.splice(0, 8);
		const barColors = [];

		const hex = (x) => {
			x = x.toString(16);
			return x.length === 1 ? '0' + x : x;
		};

		for (let i = data.length; i > 0; i -= 1) {
			let ratio = i * (1 / data.length);
			let r = Math.ceil(
				parseInt(gradientColors[0].substring(0, 2), 16) * ratio +
					parseInt(gradientColors[1].substring(0, 2), 16) * (1 - ratio)
			);
			let g = Math.ceil(
				parseInt(gradientColors[0].substring(2, 4), 16) * ratio +
					parseInt(gradientColors[1].substring(2, 4), 16) * (1 - ratio)
			);
			let b = Math.ceil(
				parseInt(gradientColors[0].substring(4, 6), 16) * ratio +
					parseInt(gradientColors[1].substring(4, 6), 16) * (1 - ratio)
			);
			let newColor = hex(r) + hex(g) + hex(b);
			barColors.push('#' + newColor);
		}

		const CustomLabel = (props) => {
			const { x, y, width, height, value } = props;
			return (
				<text
					x={x + width - 30}
					y={y + height / 2 + 2}
					fill='white'
					textAnchor='middle'
					dominantBaseline='middle'
					className='label-font'
					pointerEvents={'none'}
				>
					{value}
				</text>
			);
		};

		const CustomCursor = (props) => {
			const { x, y, width, height } = props;
			return (
				<Rectangle
					className='custom-cursor-bar-chart'
					x={x - x + 10}
					y={y}
					width={width + x + 10}
					radius={10}
					height={height}
					fill={'#ededed'}
				/>
			);
		};

		const CustomTick = (props) => {
			const { payload } = props;
			return (
				<Text {...props} className='custom-tick'>
					{payload.value.length > 10
						? `${payload.value.slice(0, 10)}...`
						: payload.value}
				</Text>
			);
		};

		let barSize;
		if (data.length < 4) {
			barSize = 50;
		} else if (data.length < 8) {
			barSize = 30;
		} else {
			barSize = 20;
		}

		return (
			<ResponsiveContainer>
				<BarChart
					className='bar-chart-container'
					data={data}
					margin={{
						top: 5,
						right: 20,
						left: 10,
						bottom: 5,
					}}
					layout={'vertical'}
					barSize={barSize}
				>
					<Tooltip
						content={
							<CustomToolTip type={tooltipType} id={0} color={barColors[0]} />
						}
						wrapperStyle={{ zIndex: 1000 }}
						cursor={<CustomCursor />}
					/>
					<CartesianGrid strokeDasharray='5' vertical={false} />
					<XAxis type='number' hide />
					<YAxis
						type='category'
						dataKey={'plane'}
						tickLine={{ strokeDasharray: 2, stroke: 'rgba(120, 115, 137, 0.5' }}
						axisLine={false}
						tick={<CustomTick />}
					/>
					<Bar
						dataKey={'total'}
						radius={[0, 100, 100, 0]}
						minPointSize={50}
						cursor={'pointer'}
					>
						{data.map((entry, index) => (
							<Cell key={index} fill={barColors[index]} />
						))}
						<LabelList dataKey={'total'} content={<CustomLabel />} />
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		);
	}
);

BarChartContainer.propTypes = {};

export default BarChartContainer;
