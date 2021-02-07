import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import './donut-chart-container.scss';

export default class DonutChartContainer extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 0,
			donutColors: ['#55cf69', '#cf5555'],
		};
	}

	static propTypes = {};

	renderActiveShape = (props) => {
		const RADIAN = Math.PI / 180;
		const {
			cx,
			cy,
			midAngle,
			innerRadius,
			outerRadius,
			startAngle,
			endAngle,
			fill,
			payload,
			value,
		} = props;
		const sin = Math.sin(-RADIAN * midAngle);
		const cos = Math.cos(-RADIAN * midAngle);
		const sx = cx + (outerRadius + 10) * cos;
		const sy = cy + (outerRadius + 10) * sin;
		const mx = cx + (outerRadius + 30) * cos;
		const my = cy + (outerRadius + 30) * sin;
		const ex = mx + (cos >= 0 ? 1 : -1) * 22;
		const ey = my;
		const textAnchor = cos >= 0 ? 'start' : 'end';

		return (
			<g>
				<text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
					{payload.name}
				</text>
				<Sector
					cx={cx}
					cy={cy}
					innerRadius={innerRadius}
					outerRadius={outerRadius}
					startAngle={startAngle}
					endAngle={endAngle}
					fill={fill}
				/>
				<Sector
					cx={cx}
					cy={cy}
					startAngle={startAngle}
					endAngle={endAngle}
					innerRadius={outerRadius + 6}
					outerRadius={outerRadius + 10}
					fill={fill}
				/>
				<path
					d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
					stroke={fill}
					fill='none'
				/>
				<circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
				<text
					x={ex + (cos >= 0 ? 1 : -1) * 12}
					y={ey}
					dy={3}
					textAnchor={textAnchor}
					fill='#606060'
				>
					{value}%
				</text>
			</g>
		);
	};

	onDonutOver = (data, index) => {
		this.setState({
			activeIndex: index,
		});
	};

	render() {
		const { data } = this.props;
		const { activeIndex, donutColors } = this.state;
		return (
			<ResponsiveContainer>
				<PieChart>
					<Pie
						activeIndex={activeIndex}
						activeShape={this.renderActiveShape}
						data={data}
						innerRadius={50}
						outerRadius={80}
						dataKey='total'
						fill={'#8884d8'}
						onMouseOver={this.onDonutOver}
					>
						{data.map((entry, index) => {
							return (
								<Cell
									key={`cell-${index}`}
									fill={donutColors[index % donutColors.length]}
								/>
							);
						})}
					</Pie>
				</PieChart>
			</ResponsiveContainer>
		);
	}
}
