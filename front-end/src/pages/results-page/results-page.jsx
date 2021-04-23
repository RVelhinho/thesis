import React, { Component } from 'react';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import _ from 'lodash';
import { Spinner } from '../../components/spinner/spinner';
import { getInteractionLog } from '../../services/interactionService';
import participantService from '../../services/participantService';
import icoLeftArrow from '../../assets/images/left-arrow.svg';
import icoDownload from '../../assets/images/download.svg';
import './results-page.scss';
import { data } from 'jquery';

class ResultsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			interactionData: {
				data: [],
			},
		};
		this.headers = [
			{ label: 'Identifier', key: 'id' },
			{ label: 'Time Stamp', key: 'timeStamp' },
			{ label: 'Idiom', key: 'view' },
			{ label: 'Type of Interaction', key: 'type' },
			{ label: 'Description', key: 'description' },
		];
	}

	async componentDidMount() {
		this.cancelTokenSource && this.cancelTokenSource.cancel();
		const previousInteractionData = _.cloneDeep(this.state.interactionData);
		const interactionData = _.cloneDeep(this.state.interactionData);
		try {
			this.cancelTokenSource = axios.CancelToken.source();
			const { data: logData } = await getInteractionLog(
				this.cancelTokenSource.token
			);
			this.cancelTokenSource = null;
			interactionData.data = _.cloneDeep(logData);
			this.setState(() => {
				return { interactionData, loading: false };
			});
		} catch (error) {
			if (axios.isCancel(error)) {
				//ignore
			} else if (error.response && error.response.status === 404) {
				alert('Data not found');
				this.setState({
					previousInteractionData,
				});
			}
		}
	}

	componentWillUnmount() {
		this.cancelTokenSource && this.cancelTokenSource.cancel();
	}

	handleClickLeftArrow = () => {
		this.props.history.push('/');
	};

	render() {
		const { interactionData, loading } = this.state;
		const { participantId } = this.props;
		if (loading) {
			return (
				<div className='results-page-container'>
					<Spinner />
				</div>
			);
		} else {
			return (
				<div className='results-page-container'>
					<div className='row w-100 mx-0'>
						<div className='col-auto px-0 results-page-container__image-container'>
							<img
								src={icoLeftArrow}
								alt='return to home page'
								className='results-page-container__image-container__image'
								onClick={this.handleClickLeftArrow}
							/>
						</div>
					</div>
					<div className='row w-100 mx-0 mb-3 d-flex justify-content-center align-items-center'>
						<div className='col-6 px-0 d-flex justify-content-center align-items-center'>
							<span className='results-page-container__title'>Resultados</span>
							<CSVLink
								data={interactionData.data}
								headers={this.headers}
								filename={`${participantId}_interaction_log.csv`}
							>
								<img
									src={icoDownload}
									alt='download interaction log'
									className='results-page-container__download-icon'
								/>
							</CSVLink>
						</div>
					</div>
					<div className='row w-100 mx-0'>
						<div className='col px-0 d-flex justify-content-center align-items-center'>
							<div className='results-page-container__results-container'>
								<div className='results-page-container__results-container__header-container'>
									<div className='row w-100 h-100 mx-0'>
										<div className='col px-0 d-flex justify-content-center align-items-center results-page-container__results-container__header-container__attribute-container'>
											<span className='results-page-container__results-container__header-container__attribute-container__attribute'>
												Data/Hora
											</span>
										</div>
										<div className='col px-0 d-flex justify-content-center align-items-center results-page-container__results-container__header-container__attribute-container'>
											<span className='results-page-container__results-container__header-container__attribute-container__attribute'>
												Idioma
											</span>
										</div>
										<div className='col px-0 d-flex justify-content-center align-items-center results-page-container__results-container__header-container__attribute-container'>
											<span className='results-page-container__results-container__header-container__attribute-container__attribute'>
												Tipo de Interação
											</span>
										</div>
										<div className='col px-0 d-flex justify-content-center align-items-center results-page-container__results-container__header-container__attribute-container'>
											<span className='results-page-container__results-container__header-container__attribute-container__attribute'>
												Descrição
											</span>
										</div>
									</div>
									<hr className='my-0' style={{ borderColor: '#107996' }} />
								</div>
								<div className='results-page-container__results-container__logs-container'>
									{interactionData.data.map((el, index) => {
										return (
											<div key={index}>
												<div className='row w-100 mx-0'>
													<div className='col d-flex justify-content-center align-items-center results-page-container__results-container__logs-container__col'>
														<span className='results-page-container__results-container__logs-container__col__attribute'>
															{el.timeStamp}
														</span>
													</div>
													<div className='col d-flex justify-content-center align-items-center results-page-container__results-container__logs-container__col'>
														<span className='results-page-container__results-container__logs-container__col__attribute'>
															{el.view}
														</span>
													</div>
													<div className='col d-flex justify-content-center align-items-center results-page-container__results-container__logs-container__col'>
														<span className='results-page-container__results-container__logs-container__col__attribute'>
															{el.type}
														</span>
													</div>
													<div className='col d-flex justify-content-center align-items-center results-page-container__results-container__logs-container__col'>
														<span className='results-page-container__results-container__logs-container__col__attribute'>
															{el.description}
														</span>
													</div>
												</div>
												{index !== interactionData.data.length - 1 && (
													<hr
														className='my-0'
														style={{ borderColor: '#606060' }}
													/>
												)}
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default ResultsPage;
