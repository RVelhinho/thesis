import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './overview-container.scss';
import Button from '../button/button';
import icoClose from '../../assets/images/cancel.svg';

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
			onClickRemoveCrash,
		} = this.props;
		if (open) {
			return (
				<div className='overview-container'>
					{selectedCrashes.map((el, index) => {
						return (
							<React.Fragment key={index}>
								<div className='row mx-0 mb-4'>
									<div className='col px-0'>
										<div className='row mx-0'>
											<div className='col px-0'>
												<span className='overview-container__title'>
													Location
												</span>
											</div>
										</div>
										<div className='row mx-0'>
											<div className='col px-0'>
												<span className='overview-container__text'>
													{el.country}, {el.continent}
												</span>
											</div>
										</div>
									</div>
									<div className='col px-0'>
										<div className='row mx-0'>
											<div className='col px-0'>
												<span className='overview-container__title'>Date</span>
											</div>
										</div>
										<div className='row mx-0'>
											<div className='col px-0'>
												<span className='overview-container__text'>
													{el.date}
												</span>
											</div>
										</div>
									</div>
								</div>
								<div className='row mx-0 mb-4'>
									<div className='col px-0'>
										<div className='row mx-0'>
											<div className='col px-0'>
												<span className='overview-container__sub-title'>
													Aircraft
												</span>
											</div>
										</div>
										<div className='row mx-0'>
											<div className='col px-0'>
												<span className='overview-container__text'>
													{el.aircraft}
												</span>
											</div>
										</div>
									</div>
									<div className='col px-0'>
										<div className='row mx-0'>
											<div className='col px-0'>
												<span className='overview-container__sub-title'>
													Operator
												</span>
											</div>
										</div>
										<div className='row mx-0'>
											<div className='col px-0'>
												<span className='overview-container__text'>
													{el.operator}
												</span>
											</div>
										</div>
									</div>
								</div>
								<div className='row mx-0 mb-4'>
									<div className='col px-0'>
										<div className='row mx-0 mb-2'>
											<div className='col px-0'>
												<span className='overview-container__sub-title'>
													Description
												</span>
											</div>
										</div>
										<div className='row mx-0'>
											<div className='col overview-container__description-container d-flex justify-content-start align-items-start'>
												<span className='overview-container__description-container__text'>
													{el.description}
												</span>
											</div>
										</div>
									</div>
								</div>
								<div className='row mx-0'>
									<div className='col px-0'>
										<Button
											text='Remove'
											color='red'
											onClick={() => onClickRemoveCrash(el)}
										/>
									</div>
								</div>
								{index !== selectedCrashes.length - 1 && (
									<hr className='overview-container__separator' />
								)}
							</React.Fragment>
						);
					})}
				</div>
			);
		}
		return null;
	}
}
