import React, { PureComponent } from 'react';
import _ from 'lodash';
import CalendarRow from '../../components/calendar-row/calendar-row';
import './calendar-container.scss';

export default class CalendarContainer extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			activeButtonIndex: 0,
			currentCircle: '',
			selectedContinent: '',
		};
	}

	static propTypes = {};

	handleMouseOverCalendarCircle = (e, circle, index, selected) => {
		this.props.onMouseOverCalendarCircle(e, circle);
		this.setState(() => {
			return {
				currentCircle: circle.year + '-' + index,
			};
		});
	};

	handleMouseClickDetailedView = () => {
		this.setState(() => {
			return { activeButtonIndex: 1 };
		});
	};

	handleMouseClickGeneralView = () => {
		this.setState(() => {
			return { activeButtonIndex: 0 };
		});
	};

	render() {
		const {
			data,
			tooltipStyle,
			onClickCalendarCircle,
			selectedCircles,
			onMouseOutCalendarCircle,
		} = this.props;
		const { currentCircle } = this.state;
		return (
			<div className='calendar-container d-flex flex-column'>
				<React.Fragment>
					<div className='row calendar-container__title w-100 mx-0 py-2 pb-4'>
						<div className='col px-0'>
							<span className='calendar-container__title__text d-flex justify-content-start align-items-end'>
								Calendário
							</span>
							<span className='d-inline-block calendar-container__title__text__desc'>
								Através do calendário poderá explorar os detalhes dos acidentes
								de avião de acordo com o ano em que ocorreram.
							</span>
						</div>
					</div>
					<div className='row calendar-container__content'>
						<div className='col px-2 calendar-container__content__circles'>
							{_.entries(data).map((el, index) => {
								return (
									<CalendarRow
										key={`calendar-row-${index}`}
										year={el[0]}
										data={el[1]}
										currentCircle={currentCircle}
										tooltipStyle={tooltipStyle}
										onClickCalendarCircle={onClickCalendarCircle}
										onMouseOverCalendarCircle={
											this.handleMouseOverCalendarCircle
										}
										onMouseOutCalendarCircle={() => onMouseOutCalendarCircle()}
										selectedCircles={selectedCircles}
									/>
								);
							})}
						</div>
						<div className='calendar-container__content__shadow'></div>
					</div>
				</React.Fragment>
			</div>
		);
	}
}
