import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './overview-container.scss';
import Button from '../button/button';
import icoTab from '../../assets/images/tab.svg';
import _ from 'lodash';

export default class OverviewContainer extends Component {
	constructor(props) {
		super(props);
	}
	static propTypes = {};
	render() {
		const {
			selectedCrashes,
			open,
			onCloseOverviewContainer,
			onMouseEnterOverview,
			onMouseOverRemoveButton,
			onClickRemoveCrash,
			onClickMinimize,
			onClickMaximize,
		} = this.props;
		let sortedCrashes = _.cloneDeep(selectedCrashes);
		if (selectedCrashes && selectedCrashes.length > 0) {
			sortedCrashes = _.sortBy(selectedCrashes, 'year');
		}
		if (open) {
			return (
				<div
					className='overview-container'
					onMouseEnter={() => onMouseEnterOverview()}
				>
					<div className='row mx-0 mb-4'>
						<div className='col px-0 overview-container__count-container d-flex justify-content-between align-items-center'>
							<div className='d-flex justify-content-between align-items-center'>
								<span className='overview-container__count-container__count'>
									{sortedCrashes.length}
								</span>
								<span className='overview-container__count-container__count-aux'>
									{sortedCrashes.length === 1
										? 'Acidente seleccionado'
										: 'Acidentes seleccionados'}
								</span>
							</div>
							<img
								className='overview-container__icon overview-container__icon--minimize'
								src={icoTab}
								alt='minimize'
								onClick={() => onClickMinimize()}
							/>
						</div>
					</div>
					<div className='overview-container__crash-container'>
						<div className='overview-container__crash-container__crashes'>
							{sortedCrashes.map((el, index) => {
								return (
									<React.Fragment key={index}>
										<div className='row mx-0 mb-4'>
											<div className='col px-0'>
												<div className='row mx-0'>
													<div className='col px-0'>
														<span className='overview-container__crash-container__crashes__title'>
															Localização
														</span>
													</div>
												</div>
												<div className='row mx-0'>
													<div className='col px-0'>
														<span className='overview-container__crash-container__crashes__text'>
															{el.country_pt}, {el.continent}
														</span>
													</div>
												</div>
											</div>
											<div className='col px-0'>
												<div className='row mx-0'>
													<div className='col px-0'>
														<span className='overview-container__crash-container__crashes__title'>
															Data
														</span>
													</div>
												</div>
												<div className='row mx-0'>
													<div className='col px-0'>
														<span className='overview-container__crash-container__crashes__text'>
															{el.date}
														</span>
													</div>
												</div>
											</div>
										</div>
										{/* <div className='row mx-0 mb-4'>
											<div className='col px-0'>
												<div className='row mx-0'>
													<div className='col px-0'>
														<span className='overview-container__crash-container__crashes__sub-title'>
															Aeronave
														</span>
													</div>
												</div>
												<div className='row mx-0'>
													<div className='col px-0'>
														<span className='overview-container__crash-container__crashes__text'>
															{el.aircraft}
														</span>
													</div>
												</div>
											</div>
											<div className='col px-0'>
												<div className='row mx-0'>
													<div className='col px-0'>
														<span className='overview-container__crash-container__crashes__sub-title'>
															Operador
														</span>
													</div>
												</div>
												<div className='row mx-0'>
													<div className='col px-0'>
														<span className='overview-container__crash-container__crashes__text'>
															{el.operator}
														</span>
													</div>
												</div>
											</div>
										</div> */}
										<div className='row mx-0 mb-4'>
											<div className='col px-0'>
												<div className='row mx-0 mb-2'>
													<div className='col px-0'>
														<span className='overview-container__crash-container__crashes__sub-title'>
															Descrição
														</span>
													</div>
												</div>
												<div className='row mx-0'>
													<div className='col overview-container__crash-container__crashes__description-container d-flex justify-content-start align-items-start'>
														<span className='overview-container__crash-container__crashes__description-container__text'>
															{el.description}
														</span>
													</div>
												</div>
											</div>
										</div>
										<div className='row mx-0'>
											<div
												className='col px-0'
												onMouseEnter={() => onMouseOverRemoveButton()}
											>
												<Button
													text='Remover'
													color='red'
													onClick={() => onClickRemoveCrash(el)}
												/>
											</div>
										</div>
										{index !== sortedCrashes.length - 1 && (
											<hr className='overview-container__crash-container__separator' />
										)}
									</React.Fragment>
								);
							})}
						</div>
						<div className='overview-container__crash-container__shadow'></div>
					</div>
				</div>
			);
		} else if (!open) {
			return (
				<div
					className='overview-container overview-container--minimized'
					onMouseEnter={() => onMouseEnterOverview()}
				>
					<div className='row mx-0 mb-2'>
						<div className='col px-0 overview-container__count-container d-flex justify-content-between align-items-center'>
							<span className='overview-container__count-container__count mr-0'>
								{sortedCrashes.length}
							</span>
							<img
								className='overview-container__icon overview-container__icon--maximize'
								src={icoTab}
								alt='maximize'
								onClick={() => onClickMaximize()}
							/>
						</div>
					</div>
					<div className='row mx-0'>
						<div className='col px-0'>
							<span className='overview-container__count-container__count-aux'>
								{sortedCrashes.length === 1 ? 'Acidente' : 'Acidentes'}
							</span>
						</div>
					</div>
					<div className='row mx-0'>
						<div className='col px-0'>
							<span className='overview-container__count-container__count-aux'>
								{sortedCrashes.length === 1 ? 'seleccionado' : 'seleccionados'}
							</span>
						</div>
					</div>
				</div>
			);
		}
		return null;
	}
}
