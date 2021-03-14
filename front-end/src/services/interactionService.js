import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/logs';

function interactionLogUrl() {
	return apiEndpoint;
}

export function getInteractionLog(token) {
	return http.get(interactionLogUrl(), { cancelToken: token });
}
