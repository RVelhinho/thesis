import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { getInteractionLog } from '../../services/interactionService';
import './results-page.scss';

class ResultsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
			interactionData = logData;
			this.setState(() => {
				return { interactionData };
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

	render() {
		const { interactionData } = this.state;
		return <div className='results-page-container'></div>;
	}
}

export default ResultsPage;
