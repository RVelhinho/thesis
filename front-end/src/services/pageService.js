import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/page';

function pageUrl() {
	return apiEndpoint;
}

export function getCurrentPage(token) {
	return http.get(pageUrl(), { cancelToken: token });
}

export function submitCurrentPage(token, currentPage) {
	return http.post(
		pageUrl(),
		{},
		{
			cancelToken: token,
			params: {
				currentPage: currentPage,
			},
		}
	);
}

const pageService = {
	getCurrentPage,
	submitCurrentPage,
};

export default pageService;
