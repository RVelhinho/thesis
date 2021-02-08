import React from 'react';
import CalendarRow from '../../components/calendar-row/calendar-row';
import './calendar-container.scss';

const CalendarContainer = React.memo(({ data, onClickCalendarCircle }) => {
	return (
		<div className='calendar-container'>
			{data.map((el, index) => {
				return (
					<CalendarRow
						key={`calendar-row-${index}`}
						year={el.year}
						value={el.value}
						onClickCalendarCircle={onClickCalendarCircle}
					/>
				);
			})}
		</div>
	);
});

export default CalendarContainer;
