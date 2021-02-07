import React from 'react';
import CalendarRow from '../../components/calendar-row/calendar-row';
import './calendar-container.scss';

const CalendarContainer = React.memo(({ data }) => {
	return (
		<div className='calendar-container'>
			{data.map((el, index) => {
				return (
					<CalendarRow
						key={`calendar-row-${index}`}
						year={el.year}
						value={el.value}
					/>
				);
			})}
		</div>
	);
});

export default CalendarContainer;
