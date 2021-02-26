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
		onMouseOverCalendarCircle,
		onMouseOutCalendarCircle,
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
		return (
			<div className='calendar-row-container'>
				<div className='row mx-0'>
					<div className='col px-0'>
						<span className='calendar-row-container__year'>{year}</span>
					</div>
				</div>
				<div
					className='row mx-0 d-flex flex-wrap calendar-row-container__circle-container justify-content-start align-items-center'
					onMouseLeave={() => onMouseOutCalendarCircle()}
				>
					{data.map((el, index) => {
						return (
							<div
								key={`calendar-row-circle-${index}`}
								className='col-auto p-1'
							>
								<div
									className='calendar-row-container__circle-container__circle'
									style={
										currentCircle === year + '-' + index
											? { borderColor: getTimeColor(1935) }
											: {}
									}
									style={{ backgroundColor: getContinentColor(el.continent) }}
									onClick={() => onClickCalendarCircle(el)}
									onMouseOver={(e) => onMouseOverCalendarCircle(e, el, index)}
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
