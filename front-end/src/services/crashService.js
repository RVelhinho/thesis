import http from './httpService'
import {apiUrl} from '../config.json'

const apiEndpoint = apiUrl + '/data'

function calendarDataUrl(){
    return `${apiEndpoint}/calendar`
}

function calendarAuxDataUrl(){
    return `${apiEndpoint}/calendar/aux`
}

function mapDataUrl(){
    return `${apiEndpoint}/map`
}

function keywordDataUrl(){
    return `${apiEndpoint}/keyword`
}

function survivalRateDataUrl(){
    return `${apiEndpoint}/survival-rate`
}

function aircraftDataUrl(){
    return `${apiEndpoint}/aircraft`
}

export function getData(minDate, maxDate, country, keyword, aircraft){
    return http.get(apiEndpoint, {params: {minDate: minDate, maxDate: maxDate, country:country, keyword: keyword, aircraft: aircraft}})
}

export function getCalendarData(minDate, maxDate, country, keyword, aircraft){
    return http.get(calendarDataUrl(), {params: {minDate: minDate, maxDate: maxDate, country:country, keyword: keyword, aircraft: aircraft}})
}

export function getCalendarAuxData(minDate, maxDate, country, keyword, aircraft){
    return http.get(calendarAuxDataUrl(), {params: {minDate: minDate, maxDate: maxDate, country:country, keyword: keyword, aircraft: aircraft}})
}

export function getMapData(minDate, maxDate, country, keyword, aircraft){
    return http.get(mapDataUrl(), {params: {minDate: minDate, maxDate: maxDate, country:country, keyword: keyword, aircraft: aircraft}})
}

export function getKeywordData(minDate, maxDate, country, keyword, aircraft){
    return http.get(keywordDataUrl(), {params: {minDate: minDate, maxDate: maxDate, country:country, keyword: keyword, aircraft: aircraft}})
}

export function getSurvivalRateData(minDate, maxDate, country, keyword, aircraft){
    return http.get(survivalRateDataUrl(), {params: {minDate: minDate, maxDate: maxDate, country:country, keyword: keyword, aircraft: aircraft}})
}

export function getAircraftData(minDate, maxDate, country, keyword, aircraft){
    return http.get(aircraftDataUrl(), {params: {minDate: minDate, maxDate: maxDate, country:country, keyword: keyword, aircraft: aircraft}})
}

const crashService = {
    getData,
    getCalendarData,
    getCalendarAuxData,
    getMapData,
    getKeywordData,
    getSurvivalRateData,
    getAircraftData
}

export default crashService