import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import participantService from '../../services/participantService';
import './initial-page.scss';

class InitialPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: '',
		};
	}

	componentWillUnmount() {
		this.cancelTokenSource && this.cancelTokenSource.cancel();
	}

	handleChange = ({ currentTarget: input }) => {
		let inputValue = _.cloneDeep(this.state.inputValue);
		inputValue = input.value;
		this.setState(() => {
			return { inputValue };
		});
	};

	render() {
		const { inputValue } = this.state;
		const { participantId, onSubmitIdentifier } = this.props;
		if (participantId === 0) {
			return (
				<div className='initial-page-container'>
					<div className='row w-100 h-50 mx-0 d-flex flex-column justify-content-center align-items-center'>
						<div className='col px-0 d-flex flex-column justify-content-center align-items-center'>
							<h1 className='initial-page-container__sub-title'></h1>
							<h1 className='initial-page-container__title'>Identificador</h1>
						</div>
					</div>
					<div className='row mx-0 w-100 mb-4'>
						<div className='col px-0 pr-4 d-flex justify-content-center align-items-center'>
							<input
								type='text'
								className='initial-page-container__input mr-3'
								value={inputValue}
								onChange={(e) => this.handleChange(e)}
							/>
							<div
								className='initial-page-container__button initial-page-container__button--small'
								onClick={() => onSubmitIdentifier(this.state.inputValue)}
							>
								<h1 className='initial-page-container__button__content initial-page-container__button__content--small'>
									Submeter
								</h1>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className='initial-page-container'>
					<div className='row w-100 h-50 mx-0 d-flex flex-column justify-content-center align-items-center'>
						<div className='col px-0 d-flex flex-column justify-content-center align-items-center'>
							<h1 className='initial-page-container__sub-title'></h1>
							<h1 className='initial-page-container__title'>Bem-vindo</h1>
						</div>
					</div>
					<div className='row mx-0 w-100 h-50'>
						<div className='col px-0 pr-4 d-flex justify-content-end align-items-top'>
							<NavLink
								to='/visualization'
								className='initial-page-container__button'
							>
								<h1 className='initial-page-container__button__content'>
									Começar
								</h1>
							</NavLink>
						</div>
						<div className='col px-0 pl-4 d-flex justify-content-start align-items-top'>
							<NavLink to='/results' className='initial-page-container__button'>
								<div className='initial-page-container__button__content'>
									Resultados
								</div>
							</NavLink>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default InitialPage;
