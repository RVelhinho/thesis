import React from 'react';
import _ from 'lodash';
import CalendarContainer from '../../components/calendar-container/calendar-container';
import MapContainerNew from '../../components/map-container-new/map-container-new';
import OverviewContainer from '../../components/overview-container/overview-container';
import CustomToolTip from '../../components/custom-tooltip/custom-tooltip';
import './main-page.scss';
import { select } from 'd3-selection';
const MainPage = ({
	calendarData,
	mapData,
	overviewData,
	onMouseEnterCalendar,
	onMouseEnterMap,
	onMouseEnterOverview,
	onMouseEnterCalendarCircle,
	onMouseLeaveCalendarCircle,
	onClickCalendarCircle,
	onMouseOverContinentCircle,
	onCloseOverviewContainer,
	onClickRemoveCrash,
	onClickRemoveAllCrashes,
	selectedCircles,
	hoveredCircles,
	calendarTooltip,
	onMouseOverMap,
	onMouseClickMap,
	onClickSortDropdown,
	onClickSortDropdownOption,
}) => {
	return (
		<div className='main-page-container'>
			{calendarTooltip.open &&
				calendarTooltip.cx !== '' &&
				calendarTooltip.cy !== '' && (
					<CustomToolTip
						type={'calendar'}
						date={calendarTooltip.date}
						country={calendarTooltip.country}
						continent={calendarTooltip.continent}
						keywords={calendarTooltip.keywords}
						aircraft={calendarTooltip.aircraft}
						left={calendarTooltip.cx}
						top={calendarTooltip.cy}
						color={
							_.find(selectedCircles, (el) => el.id === calendarTooltip.id)
								? '#d1784b'
								: _.find(hoveredCircles, (el) => el.id === calendarTooltip.id)
								? '#dba78a'
								: '#3b8194'
						}
					/>
				)}
			<div className='row mx-0 w-100 main-page-container__top-section'>
				<div
					className={'col-2 px-0 main-page-container__left-section'}
					onMouseEnter={() => onMouseEnterCalendar()}
				>
					{calendarData.data.length !== 0 && (
						<CalendarContainer
							data={calendarData.data}
							hopLegendColors={calendarData.hopLegendColors}
							tooltipType={calendarData.tooltipType}
							onMouseEnterCalendarCircle={onMouseEnterCalendarCircle}
							onMouseLeaveCalendarCircle={onMouseLeaveCalendarCircle}
							onClickCalendarCircle={onClickCalendarCircle}
							selectedCircles={selectedCircles}
							hoveredCircles={hoveredCircles}
							calendarTooltip={calendarTooltip}
						/>
					)}
				</div>
				<div className={'col px-0 h-100'}>
					<div className='row mx-0 main-page-container__right-section__top-row'>
						<div className='col px-0' onMouseEnter={() => onMouseEnterMap()}>
							<MapContainerNew
								data={mapData.data}
								dataProxy={mapData.dataProxy}
								dataSelected={mapData.dataSelected}
								dataHovered={mapData.dataHovered}
								startingPosition={mapData.startingPosition}
								tooltipType={mapData.tooltipType}
								interactionDisabled={mapData.interactionDisabled}
								onMouseOverMap={onMouseOverMap}
								onMouseClickMap={onMouseClickMap}
								selectedEl={mapData.selectedEl}
								showPopup={mapData.showPopup}
								scale={mapData.scale}
								minScale={mapData.minScale}
								minZoom={mapData.minZoom}
								selectedCircles={selectedCircles}
								hoveredCircles={hoveredCircles}
							/>
						</div>
					</div>
				</div>
				<div
					className={'col-3 px-0 h-100'}
					onMouseEnter={() => onMouseEnterOverview()}
				>
					<OverviewContainer
						selectedCrashes={overviewData.data}
						open={overviewData.open}
						onCloseOverviewContainer={onCloseOverviewContainer}
						onClickRemoveCrash={onClickRemoveCrash}
						onClickRemoveAllCrashes={onClickRemoveAllCrashes}
						onClickSortDropdown={onClickSortDropdown}
						onClickSortDropdownOption={onClickSortDropdownOption}
					/>
				</div>
			</div>
		</div>
	);
};

export default MainPage;
