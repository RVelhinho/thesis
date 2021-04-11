import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/participant';

function participandIdUrl() {
	return apiEndpoint;
}

export function getParticipantId(token) {
	return http.get(participandIdUrl(), { cancelToken: token });
}

export function submitParticipantId(token, id) {
	return http.post(
		participandIdUrl(),
		{},
		{
			cancelToken: token,
			params: {
				id: id,
			},
		}
	);
}

const participantService = {
	getParticipantId,
	submitParticipantId,
};

export default participantService;
