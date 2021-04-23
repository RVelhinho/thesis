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
import CustomToolTip from '../../components/custom-tooltip/custom-tooltip';
import './main-page.scss';
import Button from '../../components/button/button';
const MainPage = ({
	calendarData,
	densityPlotData,
	mapData,
	donutChartData,
	wordCloudData,
	barChartData,
	overviewData,
	randomPositions,
	onMouseEnterCalendar,
	onMouseEnterMap,
	onMouseEnterDonutChart,
	onMouseEnterWordCloud,
	onMouseEnterBarChart,
	onMouseEnterOverview,
	onMouseOverCalendarCircle,
	onClickCalendarCircle,
	onMouseOverYear,
	onClickYear,
	onMouseOverContinentCircle,
	onClickContinentCircle,
	onMouseOverDensityPlot,
	onMouseOverMapRing,
	onClickMapRing,
	onMouseOverTimeRing,
	onClickTimeRing,
	onMouseOverResetButton,
	onClickResetButton,
	onMouseOverMapCircle,
	onClickMapCircle,
	onMouseOverZoom,
	onClickZoom,
	onZoomOut,
	onMouseOverDonutChart,
	onMouseOverWordCloud,
	onClickWordCloud,
	onMouseOverBarChart,
	onClickBarChart,
	onMouseOverRemoveButton,
	onCloseOverviewContainer,
	onClickRemoveCrash,
	selectedCircles,
	onClickMinimize,
	onClickMaximize,
	selected,
	inputMinDate,
	inputMaxDate,
	onMinDateInputChange,
	onMaxDateInputChange,
	onEnterFilterButton,
	onClickFilterButton,
	onMouseOutCalendarCircle,
	calendarTooltip,
}) => {
	const densityPlotValues = _.map(densityPlotData.data, (el) => el.count);
	const minValue = Math.min(...densityPlotValues);
	const maxValue = Math.max(...densityPlotValues);
	return (
		<div className='main-page-container'>
			{calendarTooltip.open &&
				calendarTooltip.cx !== '' &&
				calendarTooltip.cy !== '' && (
					<CustomToolTip
						type={'calendar'}
						date={calendarTooltip.date}
						country={calendarTooltip.country}
						keywords={calendarTooltip.keywords}
						aircraft={calendarTooltip.aircraft}
						left={calendarTooltip.cx}
						top={calendarTooltip.cy}
						color={calendarTooltip.color}
					/>
				)}
			<div className='row mx-0 w-100 h-100'>
				<div className={'col-3 px-0 main-page-container__left-section'}>
					{/* {calendarData.data.length === 0 && (
						<div className='main-page-container__no-data-container'>
							<img
								src={dataIcon}
								alt='no data found'
								className='main-page-container__no-data-container__image'
							/>
							<span className='main-page-container__no-data-container__text'>
								Dados não encontrados
							</span>
						</div>
					)}
					<div
						className='row mx-0 main-page-container__left-section__top-row'
						onMouseEnter={() => onMouseEnterCalendar()}
					>
						<div className='col px-0 h-100 main-page-container__left-section__top-row__chart d-flex flex-column justify-content-between align-items-center'>
							{/* {calendarData.data.length !== 0 && (
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
							)} */}
					{/*<div className='main-page-container title-container position-relative'>
								<span className='main-page-container title-container__text'>
									Filtros
								</span>
							</div>
							<div className='main-page-container content-container d-flex flex-column align-items-start'>
								<span className='main-page-container content-container__text mb-3'>
									Temporal
								</span>
								<div className='row w-100 mx-0 d-flex flex-column justify-content-between align-items-start'>
									<div className='col px-0 d-flex justify-content-between align-items-center mb-2'>
										<span className='input-title'>Ano Mínimo</span>
										<input
											type='text'
											className='input'
											value={inputMinDate.value}
											onChange={onMinDateInputChange}
										></input>
										{inputMinDate.error && (
											<span className='input-error'>{inputMinDate.error}</span>
										)}
									</div>
									<div className='col px-0 d-flex justify-content-between align-items-center'>
										<span className='input-title'>Ano Máximo</span>
										<input
											type='text'
											className='input'
											value={inputMaxDate.value}
											onChange={onMaxDateInputChange}
										></input>
										{inputMaxDate.error && (
											<span className='input-error'>{inputMaxDate.error}</span>
										)}
									</div>
								</div>
							</div>
							<div className='main-page-container content-container d-flex flex-column align-items-start mb-3'>
								<span className='main-page-container content-container__text'>
									Geoespacial
								</span>
								<div className='row mx-0 main-page-container content-container__geo__bottom-row'>
									<div className='col px-0 h-100 d-flex flex-column justify-content-center'>
										<div className='row mx-0 w-100 d-flex flex-wrap justify-content-start align-items-center mb-4'>
											<div className='main-page-container content-container__geo__bottom-row__circle-container'>
												<div
													className='main-page-container content-container__geo__bottom-row__circle-container__circle'
													style={
														selected.continent !== 'Europa' &&
														selected.continent !== undefined
															? { backgroundColor: '#347aeb', opacity: 0.3 }
															: { backgroundColor: '#347aeb' }
													}
													onMouseOver={() => onMouseOverContinentCircle()}
													onClick={() => onClickContinentCircle('Europa')}
												></div>
											</div>
											<div className='main-page-container content-container__geo__bottom-row__text-container'>
												<span className='main-page-container content-container__geo__bottom-row__text-container__text'>
													Europa
												</span>
											</div>
										</div>
										<div className='row mx-0 w-100 d-flex flex-wrap justify-content-start align-items-center '>
											<div className='main-page-container content-container__geo__bottom-row__circle-container'>
												<div
													className='main-page-container content-container__geo__bottom-row__circle-container__circle'
													style={
														selected.continent !== 'África' &&
														selected.continent !== undefined
															? { backgroundColor: '#c48b45', opacity: 0.3 }
															: { backgroundColor: '#c48b45' }
													}
													onMouseOver={() => onMouseOverContinentCircle()}
													onClick={() => onClickContinentCircle('África')}
												></div>
											</div>
											<div className='main-page-container content-container__geo__bottom-row__text-container'>
												<span className='main-page-container content-container__geo__bottom-row__text-container__text'>
													África
												</span>
											</div>
										</div>
									</div>
									<div className='col px-0 h-100 d-flex flex-column justify-content-center'>
										<div className='row mx-0 w-100 d-flex flex-wrap justify-content-start align-items-center mb-4'>
											<div className='main-page-container content-container__geo__bottom-row__circle-container'>
												<div
													className='main-page-container content-container__geo__bottom-row__circle-container__circle'
													style={
														selected.continent !== 'Ásia' &&
														selected.continent !== undefined
															? { backgroundColor: '#aabf0a', opacity: 0.3 }
															: { backgroundColor: '#aabf0a' }
													}
													onMouseOver={() => onMouseOverContinentCircle()}
													onClick={() => onClickContinentCircle('Ásia')}
												></div>
											</div>
											<div className='main-page-container content-container__geo__bottom-row__text-container'>
												<span className='main-page-container content-container__geo__bottom-row__text-container__text'>
													Ásia
												</span>
											</div>
										</div>
										<div className='row mx-0 w-100 d-flex flex-wrap justify-content-start align-items-center'>
											<div className='main-page-container content-container__geo__bottom-row__circle-container'>
												<div
													className='main-page-container content-container__geo__bottom-row__circle-container__circle'
													style={
														selected.continent !== 'Oceânia' &&
														selected.continent !== undefined
															? { backgroundColor: '#35db45', opacity: 0.3 }
															: { backgroundColor: '#35db45' }
													}
													onMouseOver={() => onMouseOverContinentCircle()}
													onClick={() => onClickContinentCircle('Oceânia')}
												></div>
											</div>
											<div className='main-page-container content-container__geo__bottom-row__text-container'>
												<span className='main-page-container content-container__geo__bottom-row__text-container__text'>
													Oceânia
												</span>
											</div>
										</div>
									</div>
									<div className='col px-0 h-100 d-flex flex-column justify-content-center'>
										<div className='row mx-0 w-100 d-flex flex-wrap justify-content-start align-items-center mb-4'>
											<div className='main-page-container content-container__geo__bottom-row__circle-container'>
												<div
													className='main-page-container content-container__geo__bottom-row__circle-container__circle'
													style={
														selected.continent !== 'América' &&
														selected.continent !== undefined
															? { backgroundColor: '#db3535', opacity: 0.3 }
															: { backgroundColor: '#db3535' }
													}
													onMouseOver={() => onMouseOverContinentCircle()}
													onClick={() => onClickContinentCircle('América')}
												></div>
											</div>
											<div className='main-page-container content-container__geo__bottom-row__text-container'>
												<span className='main-page-container content-container__geo__bottom-row__text-container__text'>
													América
												</span>
											</div>
										</div>
										<div className='row mx-0 w-100 d-flex flex-wrap justify-content-start align-items-center mb-4'>
											<div className='main-page-container content-container__geo__bottom-row__circle-container'></div>
											<div className='main-page-container content-container__geo__bottom-row__text-container'></div>
										</div>
									</div>
								</div>
							</div>
							<div className='main-page-container content-container d-flex flex-column align-items-start'>
								<Button
									color={'default'}
									text={'Aplicar Filtro'}
									onMouseEnter={onEnterFilterButton}
									onClick={onClickFilterButton}
								/>
							</div>
						</div>
					</div>

					<div className='row mx-0 main-page-container__left-section__bottom-row'>
						<div className='col px-0'>
							{/* {densityPlotData.data.length !== 0 && (
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
							)} */}
					{/*{wordCloudData.data.length === 0 && (
								<div className='main-page-container__no-data-container'>
									<img
										src={dataIcon}
										alt='no data found'
										className='main-page-container__no-data-container__image'
									/>
									<span className='main-page-container__no-data-container__text'>
										Dados não encontrados
									</span>
								</div>
							)}
							{wordCloudData.data.length !== 0 && (
								<React.Fragment>
									<div className='main-page-container title-container'>
										<span className='main-page-container title-container__text'>
											Nuvem de Palavras
										</span>
									</div>
									<WordCloudContainer
										data={wordCloudData.data}
										tooltipType={wordCloudData.tooltipType}
										color={wordCloudData.color}
										max={wordCloudData.max}
										id={'word-cloud-container'}
										onMouseOverWordCloud={onMouseOverWordCloud}
										onClickWordCloud={onClickWordCloud}
									/>
								</React.Fragment>
							)}
						</div>
					</div> */}
					<OverviewContainer
						onMouseEnterOverview={onMouseEnterOverview}
						onMouseOverRemoveButton={onMouseOverRemoveButton}
						selectedCrashes={overviewData.data}
						open={overviewData.open}
						onCloseOverviewContainer={onCloseOverviewContainer}
						onClickRemoveCrash={onClickRemoveCrash}
						onClickMinimize={onClickMinimize}
						onClickMaximize={onClickMaximize}
					/>
				</div>
				<div className='col-9 px-0'>
					<div className='row mx-0 main-page-container__right-section__top-row'>
						<div className='main-page-container__right-section__top-row__title'>
							<span className='main-page-container__right-section__top-row__title__text'>
								Mapa
							</span>
						</div>
						<div className='col px-0' onMouseEnter={() => onMouseEnterMap()}>
							<MapContainer
								disabled={mapData.disabled}
								data={mapData.data}
								tooltipType={mapData.tooltipType}
								randomPositions={randomPositions}
								onMouseOverMapRing={onMouseOverMapRing}
								onClickMapRing={onClickMapRing}
								onMouseOverTimeRing={onMouseOverTimeRing}
								onClickTimeRing={onClickTimeRing}
								onMouseOverMapCircle={onMouseOverMapCircle}
								onClickMapCircle={onClickMapCircle}
								onMouseOverResetButton={onMouseOverResetButton}
								onClickResetButton={onClickResetButton}
								onMouseOverZoom={onMouseOverZoom}
								onClickZoom={onClickZoom}
								onZoomOut={onZoomOut}
								selectedCircles={selectedCircles}
							/>
						</div>
					</div>
					<div className='row mx-0 main-page-container__right-section__bottom-row'>
						{/* <div
							className={
								donutChartData.data.length === 0 ||
								(donutChartData.data.length !== 0 &&
									donutChartData.data[0].total == null &&
									donutChartData.data[1].total == null)
									? 'col-4 h-100 px-0 main-page-container__right-section__bottom-row__chart'
									: 'col-4 h-100 px-0 main-page-container__right-section__bottom-row__chart'
							}
							onMouseEnter={() => onMouseEnterDonutChart()}
						>
							{donutChartData.data.length === 0 && (
								<div className='main-page-container__no-data-container'>
									<img
										src={dataIcon}
										alt='no data found'
										className='main-page-container__no-data-container__image'
									/>
									<span className='main-page-container__no-data-container__text'>
										Dados não encontrados
									</span>
								</div>
							)}
							{donutChartData.data.length !== 0 &&
								donutChartData.data[0].total == null &&
								donutChartData.data[1].total == null && (
									<div className='main-page-container__no-data-container'>
										<img
											src={dataIcon}
											alt='no data found'
											className='main-page-container__no-data-container__image'
										/>
										<span className='main-page-container__no-data-container__text'>
											Dados não encontrados
										</span>
									</div>
								)}
							{donutChartData.data.length !== 0 &&
								donutChartData.data[0].total != null &&
								donutChartData.data[1].total != null && (
									<DonutChartContainer
										data={donutChartData.data}
										tooltipType={donutChartData.tooltipType}
										onMouseOverDonutChart={onMouseOverDonutChart}
									/>
								)}
						</div> */}
						<div
							className='col-4 px-0 h-100 px-0 main-page-container__right-section__bottom-row__chart'
							onMouseEnter={() => onMouseEnterWordCloud()}
						>
							{/* {wordCloudData.data.length === 0 && (
								<div className='main-page-container__no-data-container'>
									<img
										src={dataIcon}
										alt='no data found'
										className='main-page-container__no-data-container__image'
									/>
									<span className='main-page-container__no-data-container__text'>
										Dados não encontrados
									</span>
								</div>
							)}
							{wordCloudData.data.length !== 0 && (
								<React.Fragment>
									<div className='main-page-container title-container'>
										<span className='main-page-container title-container__text'>
											Nuvem de Palavras
										</span>
									</div>
									<WordCloudContainer
										data={wordCloudData.data}
										tooltipType={wordCloudData.tooltipType}
										color={wordCloudData.color}
										max={wordCloudData.max}
										id={'word-cloud-container'}
										onMouseOverWordCloud={onMouseOverWordCloud}
										onClickWordCloud={onClickWordCloud}
									/>
								</React.Fragment>
							)} */}
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
									calendarTooltip={calendarTooltip}
									onMouseOutCalendarCircle={onMouseOutCalendarCircle}
								/>
							)}
						</div>
						<div className='col-8 px-0 h-100 main-page-container__right-section__bottom-row__chart d-flex justify-content-center align-items-center'>
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
							{/* <div className='main-page-container title-container position-relative'>
								<span className='main-page-container title-container__text'>
									Filtros
								</span>
							</div>
							<div className='main-page-container content-container d-flex flex-column align-items-start'>
								<span className='main-page-container content-container__text mb-3'>
									Temporal
								</span>
								<div className='row w-100 mx-0 d-flex flex-column justify-content-between align-items-start'>
									<div className='col px-0 d-flex justify-content-start align-items-center mb-2'>
										<span className='input-title'>Ano Mínimo</span>
										<input
											type='text'
											className='input'
											value={inputMinDate.value}
											onChange={onMinDateInputChange}
										></input>
										{inputMinDate.error && (
											<span className='input-error'>{inputMinDate.error}</span>
										)}
									</div>
									<div className='col px-0 d-flex justify-content-start align-items-center'>
										<span className='input-title'>Ano Máximo</span>
										<input
											type='text'
											className='input'
											value={inputMaxDate.value}
											onChange={onMaxDateInputChange}
										></input>
										{inputMaxDate.error && (
											<span className='input-error'>{inputMaxDate.error}</span>
										)}
									</div>
								</div>
							</div>
							<div className='main-page-container content-container d-flex flex-column align-items-start'>
								<span className='main-page-container content-container__text mb-3'>
									Geoespacial
								</span>
								<div className='row mx-0 main-page-container content-container__geo__bottom-row'>
									<div className='col-2 px-0 h-100 d-flex flex-column justify-content-center'>
										<div className='row mx-0 w-100 d-flex flex-wrap justify-content-start align-items-center mb-4'>
											<div className='main-page-container content-container__geo__bottom-row__circle-container'>
												<div
													className='main-page-container content-container__geo__bottom-row__circle-container__circle'
													style={
														selected.continent !== 'Europa' &&
														selected.continent !== undefined
															? { backgroundColor: '#347aeb', opacity: 0.3 }
															: { backgroundColor: '#347aeb' }
													}
													onMouseOver={() => onMouseOverContinentCircle()}
													onClick={() => onClickContinentCircle('Europa')}
												></div>
											</div>
											<div className='main-page-container content-container__geo__bottom-row__text-container'>
												<span className='main-page-container content-container__geo__bottom-row__text-container__text'>
													Europa
												</span>
											</div>
										</div>
										<div className='row mx-0 w-100 d-flex flex-wrap justify-content-start align-items-center '>
											<div className='main-page-container content-container__geo__bottom-row__circle-container'>
												<div
													className='main-page-container content-container__geo__bottom-row__circle-container__circle'
													style={
														selected.continent !== 'África' &&
														selected.continent !== undefined
															? { backgroundColor: '#c48b45', opacity: 0.3 }
															: { backgroundColor: '#c48b45' }
													}
													onMouseOver={() => onMouseOverContinentCircle()}
													onClick={() => onClickContinentCircle('África')}
												></div>
											</div>
											<div className='main-page-container content-container__geo__bottom-row__text-container'>
												<span className='main-page-container content-container__geo__bottom-row__text-container__text'>
													África
												</span>
											</div>
										</div>
									</div>
									<div className='col-2 px-0 h-100 d-flex flex-column justify-content-center'>
										<div className='row mx-0 w-100 d-flex flex-wrap justify-content-start align-items-center mb-4'>
											<div className='main-page-container content-container__geo__bottom-row__circle-container'>
												<div
													className='main-page-container content-container__geo__bottom-row__circle-container__circle'
													style={
														selected.continent !== 'Ásia' &&
														selected.continent !== undefined
															? { backgroundColor: '#aabf0a', opacity: 0.3 }
															: { backgroundColor: '#aabf0a' }
													}
													onMouseOver={() => onMouseOverContinentCircle()}
													onClick={() => onClickContinentCircle('Ásia')}
												></div>
											</div>
											<div className='main-page-container content-container__geo__bottom-row__text-container'>
												<span className='main-page-container content-container__geo__bottom-row__text-container__text'>
													Ásia
												</span>
											</div>
										</div>
										<div className='row mx-0 w-100 d-flex flex-wrap justify-content-start align-items-center'>
											<div className='main-page-container content-container__geo__bottom-row__circle-container'>
												<div
													className='main-page-container content-container__geo__bottom-row__circle-container__circle'
													style={
														selected.continent !== 'Oceânia' &&
														selected.continent !== undefined
															? { backgroundColor: '#35db45', opacity: 0.3 }
															: { backgroundColor: '#35db45' }
													}
													onMouseOver={() => onMouseOverContinentCircle()}
													onClick={() => onClickContinentCircle('Oceânia')}
												></div>
											</div>
											<div className='main-page-container content-container__geo__bottom-row__text-container'>
												<span className='main-page-container content-container__geo__bottom-row__text-container__text'>
													Oceânia
												</span>
											</div>
										</div>
									</div>
									<div className='col-2 px-0 h-100 d-flex flex-column justify-content-center'>
										<div className='row mx-0 w-100 d-flex flex-wrap justify-content-start align-items-center mb-4'>
											<div className='main-page-container content-container__geo__bottom-row__circle-container'>
												<div
													className='main-page-container content-container__geo__bottom-row__circle-container__circle'
													style={
														selected.continent !== 'América' &&
														selected.continent !== undefined
															? { backgroundColor: '#db3535', opacity: 0.3 }
															: { backgroundColor: '#db3535' }
													}
													onMouseOver={() => onMouseOverContinentCircle()}
													onClick={() => onClickContinentCircle('América')}
												></div>
											</div>
											<div className='main-page-container content-container__geo__bottom-row__text-container'>
												<span className='main-page-container content-container__geo__bottom-row__text-container__text'>
													América
												</span>
											</div>
										</div>
										<div className='row mx-0 w-100 d-flex flex-wrap justify-content-start align-items-center mb-4'>
											<div className='main-page-container content-container__geo__bottom-row__circle-container'></div>
											<div className='main-page-container content-container__geo__bottom-row__text-container'></div>
										</div>
									</div>
								</div>
							</div>
							<div className='main-page-container content-container d-flex flex-column align-items-start'>
								<Button
									color={'default'}
									text={'Aplicar Filtro'}
									onMouseEnter={onEnterFilterButton}
									onClick={onClickFilterButton}
								/>
							</div> */}
							{/* {barChartData.data.length === 0 && (
								<div className='main-page-container__no-data-container'>
									<img
										src={dataIcon}
										alt='no data found'
										className='main-page-container__no-data-container__image'
									/>
									<span className='main-page-container__no-data-container__text'>
										Dados não encontrados
									</span>
								</div>
							)}
							{barChartData.data.length !== 0 && (
								<BarChartContainer
									data={barChartData.data}
									gradientColors={barChartData.gradientColors}
									categoryAxis={barChartData.categoryAxis}
									tooltipType={barChartData.tooltipType}
									onMouseOverBarChart={onMouseOverBarChart}
									onClickBarChart={onClickBarChart}
								/>
							)} */}
						</div>
					</div>
				</div>
				{/* {overviewData.data.length !== 0 && (
					<div className='col-2 px-0'>
						<OverviewContainer
							onMouseEnterOverview={onMouseEnterOverview}
							onMouseOverRemoveButton={onMouseOverRemoveButton}
							selectedCrashes={overviewData.data}
							open={overviewData.open}
							onCloseOverviewContainer={onCloseOverviewContainer}
							onClickRemoveCrash={onClickRemoveCrash}
							onClickMinimize={onClickMinimize}
							onClickMaximize={onClickMaximize}
						/>
					</div>
				)} */}
			</div>
		</div>
	);
};

export default MainPage;
