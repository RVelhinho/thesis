import React from 'react';
import _ from 'lodash';
import { getTimeColor } from '../../utils/time';
import './calendar-row.scss';
import PropTypes from 'prop-types';

const CalendarRow = React.memo(
	({
		year,
		data,
		currentCircle,
		onClickCalendarCircle,
		onMouseOverYear,
		onMouseOverCalendarCircle,
		onMouseOutCalendarCircle,
		onClickYear,
		selectedYear,
		selectedCircles,
	}) => {
		const getContinentColor = (continent) => {
			if (continent === 'North America') {
				return '#456dc4';
			} else if (continent === 'South America') {
				return '#45c449';
			} else if (continent === 'Europe') {
				return '#c2c445';
			} else if (continent === 'Africa') {
				return '#c48b45';
			} else if (continent === 'Asia') {
				return '#c445ad';
			} else if (continent === 'Oceania') {
				return '#a645c4';
			}
		};

		const handleClickCalendarCircle = (e, el) => {
			e.stopPropagation();
			onClickCalendarCircle(el);
		};
		return (
			<div
				className='calendar-row-container'
				style={
					selectedYear != year && selectedYear != -1
						? { opacity: 0.3 }
						: { opacity: 1 }
				}
				onMouseOver={() => onMouseOverYear()}
				onClick={() => onClickYear(year)}
			>
				<div className='row mx-0'>
					<div className='col px-0 d-flex justify-content-between'>
						<span className='calendar-row-container__year'>{year}</span>
						<span> </span>
						<span className='calendar-row-container__count'>
							( {data.length} )
						</span>
					</div>
				</div>
				<div
					className='row mx-0 d-flex flex-wrap calendar-row-container__circle-container justify-content-start align-items-center'
					onMouseLeave={() => onMouseOutCalendarCircle()}
				>
					{data.map((el, index) => {
						let selected = false;
						_.forEach(selectedCircles, (circle, index) => {
							if (circle.id === el.id) {
								selected = true;
								return false;
							}
						});
						return (
							<div
								key={`calendar-row-circle-${index}`}
								className='col-auto px-0 m-1'
							>
								<div
									className='calendar-row-container__circle-container__circle'
									style={
										currentCircle === year + '-' + index
											? { borderColor: getTimeColor(1935) }
											: {}
									}
									style={
										selected
											? { backgroundColor: '#de2874' }
											: { backgroundColor: getContinentColor(el.continent) }
									}
									onClick={(e) => handleClickCalendarCircle(e, el)}
									onMouseOver={(e) =>
										onMouseOverCalendarCircle(e, el, index, selected)
									}
								></div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
);

export default CalendarRow;
