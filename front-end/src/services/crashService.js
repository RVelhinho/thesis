import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/data';

function calendarDataUrl() {
	return `${apiEndpoint}/calendar`;
}

function calendarAuxDataUrl() {
	return `${apiEndpoint}/calendar/aux`;
}

function mapDataUrl() {
	return `${apiEndpoint}/map`;
}

function keywordDataUrl() {
	return `${apiEndpoint}/keyword`;
}

function survivalRateDataUrl() {
	return `${apiEndpoint}/survival-rate`;
}

function aircraftDataUrl() {
	return `${apiEndpoint}/aircraft`;
}

export function getData(
	token,
	minDate,
	maxDate,
	country,
	continent,
	keyword,
	aircraft
) {
	return http.get(apiEndpoint, {
		cancelToken: token,
		params: {
			minDate: minDate,
			maxDate: maxDate,
			country: country,
			continent: continent,
			keyword: keyword,
			aircraft: aircraft,
		},
	});
}

export function getCalendarData(
	token,
	minDate,
	maxDate,
	country,
	continent,
	keyword,
	aircraft
) {
	return http.get(calendarDataUrl(), {
		cancelToken: token,
		params: {
			minDate: minDate,
			maxDate: maxDate,
			country: country,
			continent: continent,
			keyword: keyword,
			aircraft: aircraft,
		},
	});
}

export function getCalendarAuxData(
	token,
	minDate,
	maxDate,
	country,
	continent,
	keyword,
	aircraft
) {
	return http.get(calendarAuxDataUrl(), {
		cancelToken: token,
		params: {
			minDate: minDate,
			maxDate: maxDate,
			country: country,
			continent: continent,
			keyword: keyword,
			aircraft: aircraft,
		},
	});
}

export function getMapData(
	token,
	minDate,
	maxDate,
	country,
	continent,
	keyword,
	aircraft
) {
	return http.get(mapDataUrl(), {
		cancelToken: token,
		params: {
			minDate: minDate,
			maxDate: maxDate,
			country: country,
			continent: continent,
			keyword: keyword,
			aircraft: aircraft,
		},
	});
}

export function getKeywordData(
	token,
	minDate,
	maxDate,
	country,
	continent,
	keyword,
	aircraft
) {
	return http.get(keywordDataUrl(), {
		cancelToken: token,
		params: {
			minDate: minDate,
			maxDate: maxDate,
			country: country,
			continent: continent,
			keyword: keyword,
			aircraft: aircraft,
		},
	});
}

export function getSurvivalRateData(
	token,
	minDate,
	maxDate,
	country,
	continent,
	keyword,
	aircraft
) {
	return http.get(survivalRateDataUrl(), {
		cancelToken: token,
		params: {
			minDate: minDate,
			maxDate: maxDate,
			country: country,
			continent: continent,
			keyword: keyword,
			aircraft: aircraft,
		},
	});
}

export function getAircraftData(
	token,
	minDate,
	maxDate,
	country,
	continent,
	keyword,
	aircraft
) {
	return http.get(aircraftDataUrl(), {
		cancelToken: token,
		params: {
			minDate: minDate,
			maxDate: maxDate,
			country: country,
			continent: continent,
			keyword: keyword,
			aircraft: aircraft,
		},
	});
}

const crashService = {
	getData,
	getCalendarData,
	getCalendarAuxData,
	getMapData,
	getKeywordData,
	getSurvivalRateData,
	getAircraftData,
};

export default crashService;
