import React from 'react';
import _ from 'lodash';
import './calendar-row.scss';

const CalendarRow = React.memo(({ year, value, onClickCalendarCircle }) => {
	const circles = _.range(value);
	return (
		<div className='calendar-row-container'>
			<div className='row mx-0'>
				<div className='col px-0'>
					<span className='calendar-row-container__year'>{year}</span>
				</div>
			</div>
			<div className='row mx-0 d-flex flex-wrap calendar-row-container__circle-container justify-content-start align-items-center'>
				{circles.map((el, index) => {
					return (
						<div key={`calendar-row-circle-${index}`} className='col-auto p-1'>
							<div
								className='calendar-row-container__circle-container__circle'
								onClick={() => onClickCalendarCircle('', '', '', '', '')}
							></div>
						</div>
					);
				})}
			</div>
		</div>
	);
});

export default CalendarRow;
