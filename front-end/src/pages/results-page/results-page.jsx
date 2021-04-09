import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Spinner } from '../../components/spinner/spinner';
import { getInteractionLog } from '../../services/interactionService';
import icoLeftArrow from '../../assets/images/left-arrow.svg';
import './results-page.scss';
import { data } from 'jquery';

class ResultsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loadgin: true,
			interactionData: {
				data: [],
			},
		};
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
					<div className='row w-100 mx-0 mb-3'>
						<div className='col px-0 d-flex justify-content-center align-items-center'>
							<span className='results-page-container__title'>Results</span>
						</div>
					</div>
					<div className='row w-100 mx-0'>
						<div className='col px-0 d-flex justify-content-center align-items-center'>
							<div className='results-page-container__results-container'>
								<div className='results-page-container__results-container__header-container'>
									<div className='row w-100 h-100 mx-0'>
										<div className='col px-0 d-flex justify-content-center align-items-center results-page-container__results-container__header-container__attribute-container'>
											<span className='results-page-container__results-container__header-container__attribute-container__attribute'>
												Time Stamp
											</span>
										</div>
										<div className='col px-0 d-flex justify-content-center align-items-center results-page-container__results-container__header-container__attribute-container'>
											<span className='results-page-container__results-container__header-container__attribute-container__attribute'>
												View
											</span>
										</div>
										<div className='col px-0 d-flex justify-content-center align-items-center results-page-container__results-container__header-container__attribute-container'>
											<span className='results-page-container__results-container__header-container__attribute-container__attribute'>
												Type of Interaction
											</span>
										</div>
										<div className='col px-0 d-flex justify-content-center align-items-center results-page-container__results-container__header-container__attribute-container'>
											<span className='results-page-container__results-container__header-container__attribute-container__attribute'>
												Description
											</span>
										</div>
									</div>
									<hr className='my-0' style={{ borderColor: '#de2874' }} />
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
