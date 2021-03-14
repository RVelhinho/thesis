import React from 'react';
import _ from 'lodash';
import dataIcon from '../../assets/images/data.svg';
import CalendarContainer from '../../components/calendar-container/calendar-container';
import MapContainer from '../../components/map-container/map-container';
import DensityPlotContainer from '../../components/density-plot-container/density-plot-container';
import WordCloudContainer from '../../components/word-cloud-container/word-cloud-container';
import BarChartContainer from '../../components/bar-chart-container/bar-chart-container';
import DonutChartContainer from '../../components/donut-chart-container/donut-chart-container';
import OverviewContainer from '../../components/overview-container/overview-container';
import Spinner from '../../components/spinner/spinner';
import './main-page.scss';

const MainPage = ({
	calendarData,
	densityPlotData,
	mapData,
	donutChartData,
	wordCloudData,
	barChartData,
	overviewData,
	randomPositions,
	onClickYear,
	onMouseOverYear,
	onMouseOverCalendarCircle,
	onMouseOverContinentCircle,
	onClickCalendarCircle,
	onMouseOverDensityPlot,
	onClickMapCircle,
	onClickMapRing,
	onClickTimeRing,
	onZoomOut,
	onClickWord,
	onClickBar,
	onCloseOverviewContainer,
	onClickContinentCircle,
	onClickRemoveCrash,
	selectedCircles,
}) => {
	const densityPlotValues = _.map(densityPlotData.data, (el) => el.count);
	const minValue = Math.min(...densityPlotValues);
	const maxValue = Math.max(...densityPlotValues);
	return (
		<div className='main-page-container'>
			<div className='row mx-0 w-100 h-100'>
				<div
					className={
						overviewData.open
							? 'col-3 px-0 main-page-container__left-section'
							: 'col-4 px-0 main-page-container__left-section'
					}
				>
					{calendarData.data.length === 0 && (
						<div className='main-page-container__no-data-container'>
							<img
								src={dataIcon}
								alt='no data found'
								className='main-page-container__no-data-container__image'
							/>
							<span className='main-page-container__no-data-container__text'>
								No Data Found
							</span>
						</div>
					)}
					<div className='row mx-0 main-page-container__left-section__top-row'>
						<div className='col px-0 h-100'>
							{calendarData.data.length !== 0 && (
								<CalendarContainer
									data={calendarData.data}
									hopLegendColors={calendarData.hopLegendColors}
									tooltipType={calendarData.tooltipType}
									onMouseOverYear={onMouseOverYear}
									onMouseOverCalendarCircle={onMouseOverCalendarCircle}
									onMouseOverContinentCircle={onMouseOverContinentCircle}
									onClickCalendarCircle={onClickCalendarCircle}
									onClickContinentCircle={onClickContinentCircle}
									onClickYear={onClickYear}
									selectedCircles={selectedCircles}
								/>
							)}
						</div>
					</div>
					<div className='row mx-0 main-page-container__left-section__bottom-row'>
						<div className='col px-0'>
							{densityPlotData.data.length !== 0 && (
								<DensityPlotContainer
									data={densityPlotData.data}
									dateGrouper={densityPlotData.dateGrouper}
									categoryAxis={densityPlotData.categoryAxis}
									timeAttr={densityPlotData.timeAttr}
									lineType={densityPlotData.lineType}
									dataKey={densityPlotData.dataKey}
									color={densityPlotData.color}
									tooltipType={densityPlotData.tooltipType}
									minValue={minValue}
									maxValue={maxValue}
									onMouseOverDensityPlot={onMouseOverDensityPlot}
								/>
							)}
						</div>
					</div>
				</div>
				<div className='col px-0'>
					<div className='row mx-0 main-page-container__right-section__top-row'>
						<div className='col px-0'>
							{mapData.data.length === 0 && (
								<div className='main-page-container__no-data-container'>
									<img
										src={dataIcon}
										alt='no data found'
										className='main-page-container__no-data-container__image'
									/>
									<span className='main-page-container__no-data-container__text'>
										No Data Found
									</span>
								</div>
							)}
							{mapData.data.length !== 0 && (
								<MapContainer
									data={mapData.data}
									tooltipType={mapData.tooltipType}
									randomPositions={randomPositions}
									onClickMapCircle={onClickMapCircle}
									onClickMapRing={onClickMapRing}
									onClickTimeRing={onClickTimeRing}
									onZoomOut={onZoomOut}
									selectedCircles={selectedCircles}
								/>
							)}
						</div>
					</div>
					<div className='row mx-0 main-page-container__right-section__bottom-row'>
						<div
							className={
								donutChartData.data.length === 0
									? 'col-4 h-100 px-0 main-page-container__right-section__bottom-row__chart'
									: 'col-4 h-100 p-4 main-page-container__right-section__bottom-row__chart'
							}
						>
							{donutChartData.data.length === 0 && (
								<div className='main-page-container__no-data-container'>
									<img
										src={dataIcon}
										alt='no data found'
										className='main-page-container__no-data-container__image'
									/>
									<span className='main-page-container__no-data-container__text'>
										No Data Found
									</span>
								</div>
							)}
							{donutChartData.data.length !== 0 && (
								<DonutChartContainer
									data={donutChartData.data}
									tooltipType={donutChartData.tooltipType}
								/>
							)}
						</div>
						<div className='col-4 h-100 px-0 main-page-container__right-section__bottom-row__chart'>
							{wordCloudData.data.length === 0 && (
								<div className='main-page-container__no-data-container'>
									<img
										src={dataIcon}
										alt='no data found'
										className='main-page-container__no-data-container__image'
									/>
									<span className='main-page-container__no-data-container__text'>
										No Data Found
									</span>
								</div>
							)}
							{wordCloudData.data.length !== 0 && (
								<WordCloudContainer
									data={wordCloudData.data}
									tooltipType={wordCloudData.tooltipType}
									color={wordCloudData.color}
									max={wordCloudData.max}
									id={'word-cloud-container'}
									onClickWord={onClickWord}
								/>
							)}
						</div>
						<div className='col-4 h-100 px-0 main-page-container__right-section__bottom-row__chart'>
							{barChartData.data.length === 0 && (
								<div className='main-page-container__no-data-container'>
									<img
										src={dataIcon}
										alt='no data found'
										className='main-page-container__no-data-container__image'
									/>
									<span className='main-page-container__no-data-container__text'>
										No Data Found
									</span>
								</div>
							)}
							{barChartData.data.length !== 0 && (
								<BarChartContainer
									data={barChartData.data}
									gradientColors={barChartData.gradientColors}
									tooltipType={barChartData.tooltipType}
									onClickBar={onClickBar}
								/>
							)}
						</div>
					</div>
				</div>
				{overviewData.open && (
					<OverviewContainer
						selectedCrashes={overviewData.data}
						open={overviewData.open}
						onCloseOverviewContainer={onCloseOverviewContainer}
						onClickRemoveCrash={onClickRemoveCrash}
					/>
				)}
			</div>
		</div>
	);
};

export default MainPage;
