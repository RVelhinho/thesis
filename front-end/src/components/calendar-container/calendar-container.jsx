import React, { PureComponent } from 'react';
import _ from 'lodash';
import CalendarRow from '../../components/calendar-row/calendar-row';
import './calendar-container.scss';

import PropTypes from 'prop-types';
import { circle } from '@turf/turf';
import CustomToolTip from '../custom-tooltip/custom-tooltip';

export default class CalendarContainer extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			tooltip: {
				open: false,
				color: '',
				cx: '',
				cy: '',
				date: '',
				country: '',
				aircraft: '',
				description: '',
			},
			currentCircle: '',
		};
	}

	static propTypes = {};

	handleMouseOverCalendarCircle = (e, circle, index) => {
		const tooltip = { ...this.state.tooltip };
		tooltip.cx = e.clientX - e.target.offsetLeft;
		tooltip.cy = e.clientY - e.target.offsetTop;
		tooltip.date = circle.date;
		tooltip.country = circle.country;
		tooltip.aircraft = circle.aircraft;
		tooltip.description = circle.description;
		tooltip.open = true;
		if (circle.date.split('-')[0] >= 1985) {
			tooltip.color = '#283ade';
		} else if (
			circle.date.split('-')[0] < 1985 &&
			circle.date.split('-')[0] >= 1960
		) {
			tooltip.color = '#4e5cde';
		} else if (
			circle.date.split('-')[0] < 1960 &&
			circle.date.split('-')[0] >= 1935
		) {
			tooltip.color = '#7983e0';
		} else if (circle.date.split('-')[0] < 1935) {
			tooltip.color = '#9da4e3';
		}
		this.setState(() => {
			return {
				tooltip,
				currentCircle: circle.date.split('-')[0] + '-' + index,
			};
		});
	};

	handleMouseOutCalendarCircle = () => {
		const tooltip = { ...this.state.tooltip };
		tooltip.cx = '';
		tooltip.cy = '';
		tooltip.date = '';
		tooltip.country = '';
		tooltip.aircraft = '';
		tooltip.description = '';
		tooltip.open = false;
		this.setState(() => {
			return { tooltip, currentCircle: '' };
		});
	};

	render() {
		const {
			data,
			hopLegendColors,
			tooltipStyle,
			onClickCalendarCircle,
		} = this.props;
		const { tooltip, currentCircle } = this.state;
		return (
			<div className='calendar-container'>
				<React.Fragment>
					<div className='row calendar-container__content'>
						<div className='col px-0'>
							{data.map((el, index) => {
								return (
									<CalendarRow
										key={`calendar-row-${index}`}
										year={el.year}
										data={el.crashes}
										currentCircle={currentCircle}
										tooltipStyle={tooltipStyle}
										onClickCalendarCircle={onClickCalendarCircle}
										onMouseOverCalendarCircle={
											this.handleMouseOverCalendarCircle
										}
										onMouseOutCalendarCircle={this.handleMouseOutCalendarCircle}
									/>
								);
							})}
						</div>
						{tooltip.open && tooltip.cx !== '' && tooltip.cy !== '' && (
							<CustomToolTip
								type={'calendar'}
								left={tooltip.cx}
								top={tooltip.cy}
								color={tooltip.color}
							/>
						)}
					</div>
					<div className='row mx-0 calendar-container__bottom-row'>
						<div className='col px-0'>
							<div className='row mx-0 h-50'>
								<div className='col px-0 d-flex justify-content-center align-items-center'>
									<div className='calendar-container__bottom-row__geo-legend-top'></div>
								</div>
							</div>
							<div className='row mx-0 h-50'>
								<div className='col px-0 d-flex justify-content-center align-items-center'>
									{_.range(1, 5).map((el, index) => {
										return (
											<div
												key={index}
												className='calendar-container__bottom-row__geo-legend-bottom'
												style={{
													backgroundColor:
														hopLegendColors[index % hopLegendColors.length],
												}}
											>
												{index !== 3 ? index + 1 : index + '+'}
											</div>
										);
									})}
								</div>
							</div>
						</div>
						<div className='col px-0'>
							<div className='row mx-0 h-50'>
								<div className='col px-0 d-flex justify-content-center align-items-center'>
									<div className='calendar-container__bottom-row__keyword-legend-top'></div>
								</div>
							</div>
							<div className='row mx-0 h-50'>
								<div className='col px-0 d-flex justify-content-center align-items-center'>
									{_.range(1, 5).map((el, index) => {
										return (
											<div
												key={index}
												className='calendar-container__bottom-row__keyword-legend-bottom'
												style={{
													backgroundColor:
														hopLegendColors[index % hopLegendColors.length],
												}}
											>
												{index !== 3 ? index + 1 : index + '+'}
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</React.Fragment>
			</div>
		);
	}
}
