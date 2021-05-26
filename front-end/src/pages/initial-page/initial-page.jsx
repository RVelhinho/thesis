import React, { Component } from 'react';
import _ from 'lodash';
import LineTo from 'react-lineto';
import { NavLink } from 'react-router-dom';
import YoutubeVideo from '../../components/youtube-video/youtube-video';
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
		const { pageState, onPageChange, onStartInteraction } = this.props;
		if (pageState === 'initial') {
			return (
				<div className='initial-page-container'>
					<div className='row w-100 h-50 mx-0 d-flex flex-column justify-content-center align-items-center'>
						<div className='col px-0 d-flex flex-column justify-content-center align-items-center'>
							<h1 className='initial-page-container__sub-title'></h1>
							<h1 className='initial-page-container__title-1'>Identificador</h1>
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
								onClick={() => onPageChange('video', inputValue)}
							>
								<h1 className='initial-page-container__button__content initial-page-container__button__content--small'>
									Submeter
								</h1>
							</div>
						</div>
					</div>
				</div>
			);
		} else if (pageState === 'video') {
			return (
				<div className='initial-page-container d-flex flex-column justify-content-center align-items-center'>
					<div className='row w-100 h-50 mx-0 d-flex justify-content-between align-items-center'>
						<div className='col-5 px-0 d-flex justify-content-end align-items-center'>
							<div
								className='initial-page-container__button'
								onClick={() => onPageChange('map', undefined)}
							>
								<h1 className='initial-page-container__button__content'>
									Vídeo 1
								</h1>
							</div>
						</div>
						<div className='col-5 px-0 d-flex justify-content-start align-items-center'>
							<div
								className='initial-page-container__button'
								onClick={() => onPageChange('calendar', undefined)}
							>
								<h1 className='initial-page-container__button__content'>
									Vídeo 2
								</h1>
							</div>
						</div>
					</div>
				</div>
			);
		} else if (pageState === 'map') {
			return (
				<div className='initial-page-container d-flex flex-column  justify-content-center align-items-center'>
					<div className='row w-75 h-75 mx-0 d-flex justify-content-center align-items-center'>
						<div className='col h-100 px-0 py-4 d-flex justify-content-center align-items-center'>
							<YoutubeVideo embedId={'_XMbapECUZ0'} />
						</div>
					</div>
					<div className='row mx-0 w-75 h-25 d-flex justify-content-center align-items-center'>
						<div className='col h-100 px-0 d-flex justify-content-center align-items-center '>
							<div
								className='initial-page-container__button'
								onClick={() => onPageChange('video', undefined)}
							>
								<h1 className='initial-page-container__button__content'>
									Anterior
								</h1>
							</div>
						</div>
						<div className='col h-100 px-0 d-flex justify-content-center align-items-center'>
							<div
								className='initial-page-container__button'
								onClick={() => onPageChange('final', undefined)}
							>
								<h1 className='initial-page-container__button__content'>
									Seguinte
								</h1>
							</div>
						</div>
					</div>
				</div>
			);
		} else if (pageState === 'calendar') {
			return (
				<div className='initial-page-container d-flex flex-column  justify-content-center align-items-center'>
					<div className='row w-75 h-75 mx-0 d-flex justify-content-center align-items-center'>
						<div className='col h-100 px-0 py-4 d-flex justify-content-center align-items-center'>
							<YoutubeVideo embedId={'HuzDdYIgcYM'} />
						</div>
					</div>
					<div className='row mx-0 w-75 h-25 d-flex justify-content-center align-items-center'>
						<div className='col h-100 px-0 d-flex justify-content-center align-items-center'>
							<div
								className='initial-page-container__button'
								onClick={() => onPageChange('video', undefined)}
							>
								<h1 className='initial-page-container__button__content'>
									Anterior
								</h1>
							</div>
						</div>
						<div className='col h-100 px-0 d-flex justify-content-center align-items-center'>
							<div
								className='initial-page-container__button'
								onClick={() => onPageChange('final', undefined)}
							>
								<h1 className='initial-page-container__button__content'>
									Seguinte
								</h1>
							</div>
						</div>
					</div>
				</div>
			);
		} else if (pageState === 'final') {
			return (
				<div className='initial-page-container d-flex justify-content-center align-items-center'>
					<div className='row w-75 h-50 mx-0 d-flex justify-content-center align-items-center'>
						<div className='col px-0 d-flex flex-column justify-content-center align-items-center'>
							<h1 className='initial-page-container__title-2'>Bem-vindo</h1>
						</div>
					</div>
					<div className='initial-page-container__vertical-separator'></div>
					<div className='row w-25 h-50 mx-0 d-flex flex-column justify-content-center align-items-center'>
						<div className='col px-0 d-flex justify-content-center align-items-center'>
							<NavLink
								to='/visualization'
								className='initial-page-container__button'
								onClick={() => onStartInteraction()}
							>
								<h1 className='initial-page-container__button__content'>
									Começar
								</h1>
							</NavLink>
						</div>
						<div className='col px-0 d-flex justify-content-center align-items-center'>
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
