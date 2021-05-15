import React from 'react';
import _ from 'lodash';
import { getTimeColor } from '../../utils/time';
import './calendar-row.scss';

const CalendarRow = React.memo(
	({
		year,
		data,
		currentCircle,
		onClickCalendarCircle,
		onMouseEnterCalendarCircle,
		onMouseLeaveCalendarCircle,
		selectedCircles,
	}) => {
		const getContinentColor = (continent) => {
			if (continent === 'América') {
				return '#db3535';
			} else if (continent === 'Europa') {
				return '#347aeb';
			} else if (continent === 'África') {
				return '#c48b45';
			} else if (continent === 'Ásia') {
				return '#d9eb34';
			} else if (continent === 'Oceânia') {
				return '#35db45';
			}
		};

		const handleClickCalendarCircle = (e, el) => {
			e.stopPropagation();
			onClickCalendarCircle(el);
		};
		return (
			<div className='calendar-row-container'>
				<div className='row mx-0'>
					<div className='col px-0 d-flex justify-content-between'>
						<span className='calendar-row-container__year'>{year}</span>
					</div>
				</div>
				<div className='row mx-0 d-flex flex-wrap calendar-row-container__circle-container justify-content-start align-items-center'>
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
											? { backgroundColor: '#d1784b' }
											: { backgroundColor: '#3b8194' }
									}
									onClick={(e) => handleClickCalendarCircle(e, el)}
									onMouseEnter={(e) =>
										onMouseEnterCalendarCircle(e, el, index, selected)
									}
									onMouseLeave={() => onMouseLeaveCalendarCircle()}
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
