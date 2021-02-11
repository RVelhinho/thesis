import React from 'react';
import _ from 'lodash';
import './calendar-row.scss';
import PropTypes from 'prop-types';

const CalendarRow = React.memo(
	({
		year,
		data,
		onClickCalendarCircle,
		onMouseOverCalendarCircle,
		onMouseOutCalendarCircle,
	}) => {
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
									onClick={() => onClickCalendarCircle(el)}
									onMouseOver={(e) => onMouseOverCalendarCircle(e, el)}
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
