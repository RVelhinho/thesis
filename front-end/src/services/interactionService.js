import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/logs';

function interactionLogUrl() {
	return apiEndpoint;
}

export function getInteractionLog(token) {
	return http.get(interactionLogUrl(), { cancelToken: token });
}

export function addInteractionLog(timeStamp, view, type, description, token) {
	return http.post(
		interactionLogUrl(),
		{},
		{
			cancelToken: token,
			params: {
				time_stamp: timeStamp,
				view: view,
				type: type,
				description: description,
			},
		}
	);
}

const interactionService = {
	getInteractionLog,
	addInteractionLog,
};

export default interactionService;
