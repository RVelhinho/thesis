import React, { Component } from 'react';
import './overview-container.scss';
import Button from '../button/button';
import Dropdown from '../dropdown/dropdown';
import _ from 'lodash';

export default class OverviewContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sortBy: {
				key: 'recently added',
				value: 'Adicionado Recentemente',
			},
			sortDropdownOpen: false,
			sortByValues: [
				{
					key: 'recently added',
					value: 'Adicionado Recentemente',
				},
				{
					key: 'date',
					value: 'Data',
				},
				{
					key: 'country a-z',
					value: 'País A-Z',
				},
				{
					key: 'continent a-z',
					value: 'Continente A-Z',
				},
			],
		};
		this.dropdownRef = React.createRef();
	}

	handleSortBy = (sortObject) => {
		const sortBy = _.cloneDeep(this.state.sortBy);
		sortBy.key = sortObject.key;
		sortBy.value = sortObject.value;
		this.setState(() => {
			return { sortBy };
		});
		this.handeToggleDropdown();
	};
	handeToggleDropdown = () => {
		this.setState(() => {
			return { sortDropdownOpen: !this.state.sortDropdownOpen };
		});
	};
	handleCloseDropdown = () => {
		this.setState(() => {
			return { sortDropdownOpen: false };
		});
	};
	static propTypes = {};
	render() {
		const {
			selectedCrashes,
			open,
			onClickRemoveCrash,
			onClickRemoveAllCrashes,
		} = this.props;
		const { sortBy, sortDropdownOpen, sortByValues } = this.state;
		let sortedCrashes = _.cloneDeep(selectedCrashes);
		if (selectedCrashes && selectedCrashes.length > 0) {
			if (sortBy.key === 'date') {
				sortedCrashes = _.sortBy(selectedCrashes, 'year');
			} else if (sortBy.key === 'country a-z') {
				sortedCrashes = _.sortBy(selectedCrashes, 'country_pt');
			} else if (sortBy.key === 'continent a-z') {
				sortedCrashes = _.sortBy(selectedCrashes, 'continent');
			}
		}
		return (
			<div className='overview-container'>
				<div className='row mx-0 h-10'>
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
					</div>
				</div>
				<div className='row mx-0 h-5'>
					<div
						className='col px-0 overview-container__sort-container d-flex justify-content-between align-items-center'
						onClick={() => this.handeToggleDropdown()}
					>
						<div className='d-flex justify-content-between align-items-center'>
							<span className='overview-container__sort-container__title'>
								Ordenar:
							</span>
							&nbsp;
							<span className='overview-container__sort-container__value'>
								{sortBy.value}
							</span>
						</div>
						{sortDropdownOpen && (
							<Dropdown
								onSortBy={this.handleSortBy}
								onCloseDropdown={this.handleCloseDropdown}
								reference={this.dropdownRef}
								values={sortByValues}
							/>
						)}
					</div>
				</div>
				<div className='overview-container__crash-container'>
					<div className='overview-container__crash-container__crashes'>
						{sortedCrashes.map((el, index) => {
							return (
								<React.Fragment key={index}>
									<div className='overview-container__crash-container__crashes__info-container'>
										<div className='overview-container__crash-container__crashes__info-container__text-container'>
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
										</div>
										<Button
											text='Remover'
											roundedCornersDisabled={true}
											color='red-soft'
											onClick={() => onClickRemoveCrash(el)}
										/>
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
				<div className='overview-container__remove-all-container row mx-0 w-100 h-7'>
					<div className='col px-0 d-flex justify-content-center align-items-center'>
						<div
							className={
								sortedCrashes.length === 0
									? `overview-container__custom-button overview-container__custom-button--red disabled`
									: `overview-container__custom-button overview-container__custom-button--red`
							}
							style={{ borderRadius: 0 }}
							onClick={() => onClickRemoveAllCrashes()}
						>
							<span
								className={`overview-container__custom-button__text overview-container__custom-button__text--red`}
							>
								Remover Todos
							</span>
						</div>
					</div>
				</div>
			</div>
		);

		return null;
	}
}
