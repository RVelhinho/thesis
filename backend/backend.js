const projectId = 'thesis-308817';
const { Translate } = require('@google-cloud/translate').v2;
const { writeFile } = require('fs');
require('dotenv').config();
const http = require('http');
const https = require('https');
const axios = require('axios');
const csv = require('csvtojson');
const { parse } = require('json2csv');
const _ = require('lodash');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const { request, json } = require('express');
const { result } = require('lodash');
const app = express();

// Middleware

app.use(express.json());
app.use(express.urlencoded());
app.use(helmet());
if (app.get('env') === 'development') {
	console.log('Morgan enabled...');
	app.use(morgan('tiny'));
}

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const translate = new Translate({
	credentials: CREDENTIALS,
	projectId: CREDENTIALS.project_id,
});

// Configuration

console.log(`App Name: ${app.get('name')}`);

const modelCrash = {
	Date: null,
	Location: null,
	Operator: null,
	Type: null,
	Aboard: null,
	Fatalities: null,
	Ground: null,
	Summary: null,
};

const modelCrashOmit = {
	air_fatalities: null,
	ground_fatalities: null,
};

const keyMap = {
	Date: 'date',
	Location: 'country',
	Operator: 'operator',
	Type: 'aircraft',
	Aboard: 'total_survivors',
	Fatalities: 'air_fatalities',
	Ground: 'ground_fatalities',
	Summary: 'description',
};

const keywords = [
	'aero',
	'militar',
	'transp',
	'desapare',
	'faca',
	'fumo',
	'agua',
	'nevoeiro',
	'motor',
	'abat',
	'chuva',
	'tempestade',
	'trov',
	'fogo',
	'guerra',
	'montanh',
	'chama',
	'tempo',
	'pous',
	'vent',
	'ar',
	'névoa',
	'defeituos',
	'ravina',
	'volcão',
	'explo',
	'obstáculo',
	'estrada',
	'floresta',
	'íngreme',
	'selva',
	'encosta',
	'campo',
	'desvi',
	'mergulh',
	'sequestr',
	'testemunh',
	'curva',
	'tufão',
	'árvor',
	'helicóptero',
	'nuve',
	'combustível',
];

let countryToContinent = {
	Afghanistan: {
		continent: 'Ásia',
		lat: 34.543896,
		lon: 69.160652,
		country_pt: 'Afeganistão',
	},
	Albania: {
		continent: 'Europa',
		lat: 41.327953,
		lon: 19.819025,
		country_pt: 'Albânia',
	},
	Algeria: {
		continent: 'África',
		lat: 36.737232,
		lon: 3.086472,
		country_pt: 'Argélia',
	},
	'American Samoa': {
		continent: 'Oceânia',
		lat: -14.275632,
		lon: -170.702042,
		country_pt: 'Samoa Americana',
	},
	Angola: {
		continent: 'África',
		lat: -8.838333,
		lon: 13.234444,
		country_pt: 'Angola',
	},
	Argentina: {
		continent: 'América',
		lat: -34.603722,
		lon: -58.381592,
		country_pt: 'Argentina',
	},
	Armenia: {
		continent: 'Ásia',
		lat: 40.1772,
		lon: 44.50349,
		country_pt: 'Armênia',
	},
	Australia: {
		continent: 'Oceânia',
		lat: -33.865143,
		lon: 151.2099,
		country_pt: 'Austrália',
	},
	Austria: {
		continent: 'Europa',
		lat: 48.210033,
		lon: 16.363449,
		country_pt: 'Áustria',
	},
	Azerbaijan: {
		continent: 'Europa',
		lat: 40.409264,
		lon: 49.867092,
		country_pt: 'Azerbaijão',
	},
	Bahrain: {
		continent: 'Ásia',
		lat: 26.156258,
		lon: 50.400505,
		country_pt: 'Bahrain',
	},
	Bangladesh: {
		continent: 'Ásia',
		lat: 23.777176,
		lon: 90.399452,
		country_pt: 'Bangladesh',
	},
	Barbados: {
		continent: 'América',
		lat: 13.193887,
		lon: -59.543198,
		country_pt: 'barbados',
	},
	Belarus: {
		continent: 'Europa',
		lat: 53.893009,
		lon: 27.567444,
		country_pt: 'Bielo-Rússia',
	},
	Belgium: {
		continent: 'Europa',
		lat: 51.260197,
		lon: 4.402771,
		country_pt: 'Bélgica',
	},
	Belize: {
		continent: 'América',
		lat: 16.513889,
		lon: -88.366669,
		country_pt: 'Belize',
	},
	Benin: {
		continent: 'África',
		lat: 6.379448,
		lon: 2.451324,
		country_pt: 'Benin',
	},
	Bermuda: {
		continent: 'América',
		lat: 32.299507,
		lon: -64.790337,
		country_pt: 'Bermudas',
	},
	Bhutan: {
		continent: 'Ásia',
		lat: 26.870556,
		lon: 90.485558,
		country_pt: 'Butão',
	},
	Botswana: {
		continent: 'África',
		lat: -24.653257,
		lon: 25.906792,
		country_pt: 'Botswana',
	},
	Brazil: {
		continent: 'América',
		lat: -23.533773,
		lon: -46.62529,
		country_pt: 'Brasil',
	},
	Bulgaria: {
		continent: 'Europa',
		lat: 42.698334,
		lon: 23.319941,
		country_pt: 'Bulgária',
	},
	Cambodia: {
		continent: 'Ásia',
		lat: 11.562108,
		lon: 104.888535,
		country_pt: 'Camboja',
	},
	Cameroon: {
		continent: 'África',
		lat: 4.061536,
		lon: 9.786072,
		country_pt: 'Camarões',
	},
	Canada: {
		continent: 'América',
		lat: 43.65107,
		lon: -79.347015,
		country_pt: 'Canadá',
	},
	Chad: {
		continent: 'África',
		lat: 12.137752,
		lon: 15.054325,
		country_pt: 'Chade',
	},
	Chile: {
		continent: 'América',
		lat: -33.447487,
		lon: -70.673676,
		country_pt: 'Chile',
	},
	China: {
		continent: 'Ásia',
		lat: 39.916668,
		lon: 116.383331,
		country_pt: 'China',
	},
	Colombia: {
		continent: 'América',
		lat: 4.624335,
		lon: -74.063644,
		country_pt: 'Colômbia',
	},
	'Costa Rica': {
		continent: 'América',
		lat: 9.934739,
		lon: -84.087502,
		country_pt: 'Costa Rica',
	},
	Croatia: {
		continent: 'Europa',
		lat: 45.815399,
		lon: 15.966568,
		country_pt: 'Croácia',
	},
	Cuba: {
		continent: 'América',
		lat: 23.113592,
		lon: -82.366592,
		country_pt: 'Cuba',
	},
	Cyprus: {
		continent: 'Europa',
		lat: 35.095192,
		lon: 33.20343,
		country_pt: 'Chipre',
	},
	Denmark: {
		continent: 'Europa',
		lat: 55.676098,
		lon: 12.568337,
		country_pt: 'Dinamarca',
	},
	Djibouti: {
		continent: 'África',
		lat: 11.572076,
		lon: 43.145645,
		country_pt: 'Djibouti',
	},
	Dominica: {
		continent: 'América',
		lat: 15.240796,
		lon: -61.314869,
		country_pt: 'Dominica',
	},
	Ecuador: {
		continent: 'América',
		lat: -2.203816,
		lon: -79.897453,
		country_pt: 'Equador',
	},
	Egypt: {
		continent: 'África',
		lat: 30.033333,
		lon: 31.233334,
		country_pt: 'Egito',
	},
	'El Salvador': {
		continent: 'América',
		lat: 13.90519,
		lon: -89.500206,
		country_pt: 'El Salvador',
	},
	'Equatorial Guinea': {
		continent: 'África',
		lat: 1.85,
		lon: 9.75,
		country_pt: 'Guiné Equatorial',
	},
	Estonia: {
		continent: 'Europa',
		lat: 59.436962,
		lon: 24.753574,
		country_pt: 'Estônia',
	},
	Ethiopia: {
		continent: 'África',
		lat: 9.005401,
		lon: 38.763611,
		country_pt: 'Etiópia',
	},
	Fiji: {
		continent: 'Oceânia',
		lat: -17.713371,
		lon: 178.065033,
		country_pt: 'Fiji',
	},
	Finland: {
		continent: 'Europa',
		lat: 60.192059,
		lon: 24.945831,
		country_pt: 'Finlândia',
	},
	France: {
		continent: 'Europa',
		lat: 48.864716,
		lon: 2.349014,
		country_pt: 'França',
	},
	'French Polynesia': {
		continent: 'Oceânia',
		lat: -16.761301,
		lon: -151.443588,
		country_pt: 'Polinésia Francesa',
	},
	Gabon: {
		continent: 'África',
		lat: 0.3901,
		lon: 9.4544,
		country_pt: 'Gabão',
	},
	Germany: {
		continent: 'Europa',
		lat: 52.520008,
		lon: 13.404954,
		country_pt: 'Alemanha',
	},
	Ghana: { continent: 'África', lat: 5.55, lon: -0.02, country_pt: 'Gana' },
	Greece: {
		continent: 'Europa',
		lat: 37.98381,
		lon: 23.727539,
		country_pt: 'Grécia',
	},
	Greenland: {
		continent: 'América',
		lat: 67.010323,
		lon: -50.712353,
		country_pt: 'Groenlândia',
	},
	Guadeloupe: {
		continent: 'América',
		lat: 16.27,
		lon: -61.580002,
		country_pt: 'Guadalupe',
	},
	Guam: {
		continent: 'Oceânia',
		lat: 13.444304,
		lon: 144.793732,
		country_pt: 'Guam',
	},
	Guatemala: {
		continent: 'América',
		lat: 14.628434,
		lon: -90.522713,
		country_pt: 'Guatemala',
	},
	Guinea: {
		continent: 'África',
		lat: 9.509167,
		lon: -13.712222,
		country_pt: 'Guiné',
	},
	Guyana: {
		continent: 'América',
		lat: 6.559456,
		lon: -58.333191,
		country_pt: 'Guiana',
	},
	Haiti: {
		continent: 'América',
		lat: 18.533333,
		lon: -72.333336,
		country_pt: 'Haiti',
	},
	Honduras: {
		continent: 'América',
		lat: 14.081999,
		lon: -87.202438,
		country_pt: 'Honduras',
	},
	'Hong Kong': {
		continent: 'Ásia',
		lat: 22.302711,
		lon: 114.177216,
		country_pt: 'Hong Kong',
	},
	Hungary: {
		continent: 'Europa',
		lat: 47.497913,
		lon: 19.040236,
		country_pt: 'Hungria',
	},
	Iceland: {
		continent: 'Europa',
		lat: 64.128288,
		lon: -21.827774,
		country_pt: 'Islândia',
	},
	India: {
		continent: 'Ásia',
		lat: 28.6448,
		lon: 77.216721,
		country_pt: 'Índia',
	},
	Indonesia: {
		continent: 'Ásia',
		lat: -8.409518,
		lon: 115.188919,
		country_pt: 'Indonésia',
	},
	Iraq: {
		continent: 'Ásia',
		lat: 33.312805,
		lon: 44.361488,
		country_pt: 'Iraque',
	},
	Ireland: {
		continent: 'Europa',
		lat: 53.35014,
		lon: -6.266155,
		country_pt: 'Irlanda',
	},
	Italy: {
		continent: 'Europa',
		lat: 41.902782,
		lon: 12.496366,
		country_pt: 'Itália',
	},
	Jamaica: {
		continent: 'América',
		lat: 18.476223,
		lon: -77.89389,
		country_pt: 'Jamaica',
	},
	Japan: {
		continent: 'Ásia',
		lat: 35.652832,
		lon: 139.839478,
		country_pt: 'Japão',
	},
	Jersey: {
		continent: 'Europa',
		lat: 49.214439,
		lon: -2.13125,
		country_pt: 'Jersey',
	},
	Jordan: {
		continent: 'Ásia',
		lat: 31.963158,
		lon: 35.930359,
		country_pt: 'Jordânia',
	},
	Kazakhstan: {
		continent: 'Europa',
		lat: 43.238949,
		lon: 76.889709,
		country_pt: 'Cazaquistão',
	},
	Kenya: {
		continent: 'África',
		lat: -1.286389,
		lon: 36.817223,
		country_pt: 'Quênia',
	},
	Kuwait: {
		continent: 'Ásia',
		lat: 29.378586,
		lon: 47.990341,
		country_pt: 'Kuwait',
	},
	Kyrgyzstan: {
		continent: 'Ásia',
		lat: 42.882004,
		lon: 74.582748,
		country_pt: 'Quirguistão',
	},
	Latvia: {
		continent: 'Europa',
		lat: 56.946285,
		lon: 24.105078,
		country_pt: 'Letônia',
	},
	Lebanon: {
		continent: 'Ásia',
		lat: 33.88863,
		lon: 35.49548,
		country_pt: 'Líbano',
	},
	Lesotho: {
		continent: 'África',
		lat: -29.62319,
		lon: 28.2334698,
		country_pt: 'Lesoto',
	},
	Liberia: {
		continent: 'África',
		lat: 6.300774,
		lon: -10.79716,
		country_pt: 'Libéria',
	},
	Libya: {
		continent: 'África',
		lat: 32.885353,
		lon: 13.180161,
		country_pt: 'Líbia',
	},
	Lithuania: {
		continent: 'Europa',
		lat: 54.687157,
		lon: 25.279652,
		country_pt: 'Lituânia',
	},
	Luxembourg: {
		continent: 'Europa',
		lat: 49.611622,
		lon: 6.131935,
		country_pt: 'Luxemburgo',
	},
	Madagascar: {
		continent: 'África',
		lat: -19.002846,
		lon: 46.460938,
		country_pt: 'Madagáscar',
	},
	Malawi: {
		continent: 'África',
		lat: -15.786111,
		lon: 35.005833,
		country_pt: 'Malawi',
	},
	Malaysia: {
		continent: 'Ásia',
		lat: 3.140853,
		lon: 101.693207,
		country_pt: 'Malásia',
	},
	Mali: {
		continent: 'África',
		lat: 16.956232,
		lon: -0.344245,
		country_pt: 'Mali',
	},
	Malta: {
		continent: 'Europa',
		lat: 35.917973,
		lon: 14.409943,
		country_pt: 'Malta',
	},
	Martinique: {
		continent: 'América',
		lat: 14.4694,
		lon: -60.865799,
		country_pt: 'Matinica',
	},
	Mauritania: {
		continent: 'África',
		lat: 18.079021,
		lon: -15.965662,
		country_pt: 'Mauritânia',
	},
	Mexico: {
		continent: 'América',
		lat: 19.432608,
		lon: -99.133209,
		country_pt: 'México',
	},
	Mongolia: {
		continent: 'Ásia',
		lat: 47.92123,
		lon: 106.918556,
		country_pt: 'Mongólia',
	},
	Morocco: {
		continent: 'África',
		lat: 33.589886,
		lon: -7.603869,
		country_pt: 'Marrocos',
	},
	Mozambique: {
		continent: 'África',
		lat: -25.953724,
		lon: 32.588711,
		country_pt: 'Moçambique',
	},
	Myanmar: {
		continent: 'Ásia',
		lat: 16.871311,
		lon: 96.199379,
		country_pt: 'Myanmar',
	},
	Namibia: {
		continent: 'África',
		lat: -22.449259,
		lon: 18.969973,
		country_pt: 'Namibia',
	},
	Nepal: {
		continent: 'Ásia',
		lat: 27.700769,
		lon: 85.30014,
		country_pt: 'Nepal',
	},
	'New Zealand': {
		continent: 'Oceânia',
		lat: -36.848461,
		lon: 174.763336,
		country_pt: 'Nova Zelândia',
	},
	Nicaragua: {
		continent: 'América',
		lat: 12.136389,
		lon: -86.251389,
		country_pt: 'Nicarágua',
	},
	Nigeria: {
		continent: 'África',
		lat: 6.465422,
		lon: 3.406448,
		country_pt: 'Nigéria',
	},
	Norway: {
		continent: 'Europa',
		lat: 59.911491,
		lon: 10.757933,
		country_pt: 'Noruega',
	},
	Pakistan: {
		continent: 'Ásia',
		lat: 33.738045,
		lon: 73.084488,
		country_pt: 'Paquistão',
	},
	Panama: {
		continent: 'América',
		lat: 8.983333,
		lon: -79.51667,
		country_pt: 'Panamá',
	},
	'Papua New Guinea': {
		continent: 'Oceânia',
		lat: -4.343673,
		lon: 152.268784,
		country_pt: 'Papua Nova Guiné',
	},
	Paraguay: {
		continent: 'América',
		lat: -25.302309,
		lon: -57.411827,
		country_pt: 'Paraguai',
	},
	Peru: {
		continent: 'América',
		lat: -12.046374,
		lon: -77.042793,
		country_pt: 'Peru',
	},
	Poland: {
		continent: 'Europa',
		lat: 52.237049,
		lon: 21.017532,
		country_pt: 'Polônia',
	},
	Portugal: {
		continent: 'Europa',
		lat: 38.736946,
		lon: -9.142685,
		country_pt: 'Portugal',
	},
	'Puerto Rico': {
		continent: 'América',
		lat: 18.200178,
		lon: -66.664513,
		country_pt: 'Porto Rico',
	},
	Qatar: {
		continent: 'Ásia',
		lat: 25.286106,
		lon: 51.534817,
		country_pt: 'Catar',
	},
	Romania: {
		continent: 'Europa',
		lat: 44.439663,
		lon: 26.096306,
		country_pt: 'Romênia',
	},
	Russia: {
		continent: 'Ásia',
		lat: 55.751244,
		lon: 37.618423,
		country_pt: 'Rússia',
	},
	Rwanda: {
		continent: 'África',
		lat: -2.429626,
		lon: 29.882967,
		country_pt: 'Ruanda',
	},
	'Saint Lucia': {
		continent: 'América',
		lat: 13.909444,
		lon: -60.978893,
		country_pt: 'Saint Lucia',
	},
	Samoa: {
		continent: 'Oceânia',
		lat: -13.7583109,
		lon: -172.1047677,
		country_pt: 'Samoa',
	},
	'Saudi Arabia': {
		continent: 'Ásia',
		lat: 24.774265,
		lon: 46.738586,
		country_pt: 'Arábia Saudita',
	},
	Senegal: {
		continent: 'África',
		lat: 14.716677,
		lon: -17.467686,
		country_pt: 'Senegal',
	},
	'Sierra Leone': {
		continent: 'África',
		lat: 8.484444,
		lon: -13.234444,
		country_pt: 'Serra Leoa',
	},
	Singapore: {
		continent: 'Ásia',
		lat: 1.29027,
		lon: 103.851959,
		country_pt: 'Cingapura',
	},
	Slovakia: {
		continent: 'Europa',
		lat: 48.148598,
		lon: 17.107748,
		country_pt: 'Eslováquia',
	},
	Slovenia: {
		continent: 'Europa',
		lat: 46.056946,
		lon: 14.505751,
		country_pt: 'Eslovénia',
	},
	Somalia: {
		continent: 'África',
		lat: 2.046934,
		lon: 45.318161,
		country_pt: 'Somália',
	},
	'South Africa': {
		continent: 'África',
		lat: -33.918861,
		lon: 18.4233,
		country_pt: 'África do Sul',
	},
	Spain: {
		continent: 'Europa',
		lat: 40.416775,
		lon: -3.70379,
		country_pt: 'Espanha',
	},
	'Sri Lanka': {
		continent: 'Ásia',
		lat: 6.927079,
		lon: 79.861244,
		country_pt: 'Sri Lanka',
	},
	Suriname: {
		continent: 'América',
		lat: 5.839398,
		lon: -55.199089,
		country_pt: 'Suriname',
	},
	Sweden: {
		continent: 'Europa',
		lat: 58.298584,
		lon: 12.961619,
		country_pt: 'Suécia',
	},
	Switzerland: {
		continent: 'Europa',
		lat: 46.204391,
		lon: 6.143158,
		country_pt: 'Suíça',
	},
	Taiwan: {
		continent: 'Ásia',
		lat: 25.105497,
		lon: 121.597366,
		country_pt: 'Taiwan',
	},
	Tajikistan: {
		continent: 'Ásia',
		lat: 39.059715,
		lon: 39.059715,
		country_pt: 'Tajiquistão',
	},
	Thailand: {
		continent: 'Ásia',
		lat: 13.736717,
		lon: 100.523186,
		country_pt: 'Tailândia',
	},
	Tunisia: {
		continent: 'África',
		lat: 36.806389,
		lon: 10.181667,
		country_pt: 'Tunísia',
	},
	Turkey: {
		continent: 'Europa',
		lat: 38.9573415,
		lon: 35.240741,
		country_pt: 'Turquia',
	},
	Turkmenistan: {
		continent: 'Ásia',
		lat: 37.862499,
		lon: 58.238056,
		country_pt: 'Turcomenistão',
	},
	Uganda: {
		continent: 'África',
		lat: 1.3707295,
		lon: 32.3032414,
		country_pt: 'Uganda',
	},
	Ukraine: {
		continent: 'Europa',
		lat: 49.988358,
		lon: 36.232845,
		country_pt: 'Ucrânia',
	},
	Uruguay: {
		continent: 'América',
		lat: -34.901112,
		lon: -56.164532,
		country_pt: 'Uruguai',
	},
	Uzbekistan: {
		continent: 'Ásia',
		lat: 41.311081,
		lon: 69.240562,
		country_pt: 'Uzbequistão',
	},
	Vanuatu: {
		continent: 'Oceânia',
		lat: -17.734818,
		lon: 168.322021,
		country_pt: 'Vanuatu',
	},
	Yemen: {
		continent: 'Ásia',
		lat: 15.369445,
		lon: 44.191006,
		country_pt: 'Iémen',
	},
	Zambia: {
		continent: 'África',
		lat: -15.416667,
		lon: 28.283333,
		country_pt: 'Zâmbia',
	},
	Zimbabwe: {
		continent: 'África',
		lat: -17.824858,
		lon: 31.053028,
		country_pt: 'Zimbábue',
	},
};
let data = [];
let calendarData = [];
let yearAuxData = {};
let yearData = [];
let mapAuxData = {};
let mapData = [];
let survivalRateData = [];
let keywordDataAux = {};
let keywordData = [];
let aircraftDataAux = {};
let aircraftData = [];

let globalDataView = [];
let globalCalendarDataView = [];
let globalYearDataView = [];
let globalMapDataView = [];
let globalSurvivalRateDataView = [];
let globalKeywordDataView = [];
let globalAircraftDataView = [];

let interactionData = [];
let countryArray = [];

const dataGenerator = () => {
	const converter = csv()
		.fromFile('../datasets/final_pt_no_keywords.csv')
		.then((json) => {
			_.forEach(json, (row, index) => {
				if (row.country === 'India') row.country_pt = 'Índia';
				else if (row.country === 'Indonesia') row.country_pt = 'Indonésia';
				else if (row.country === 'Turkey') row.country_pt = 'Turquia';
				let words = row.description.split('.')[0].split(' ');
				// Clean whitespaces / remove special characters / remove useless words
				let wordsMapped = words.map((el, index3) => {
					let newEl = el.replace(/[^A-Za-z0-9]/g, '');
					newEl.trim();
					newEl.toLowerCase();
					return newEl;
				});

				// Filter undefineds or empty words / Remove unnecessary words
				let wordsFiltered = wordsMapped.filter((el, index3) => {
					if (el) {
						let found = false;
						for (let item of keywords) {
							const regex = new RegExp(`^${item}`, 'i');
							if (el.match(regex)) {
								found = true;
							}
						}
						return found;
					} else {
						return false;
					}
				});

				// Count occurrences of each word
				let wordsCounted = _.countBy(wordsFiltered, (el) => {
					return el;
				});

				// Remove rows with no keywords
				if (_.isEmpty(wordsCounted)) {
					return;
				}

				// Create array with custom object for each word to associate with count
				row.keywords = [];
				_.forEach(_.entries(wordsCounted), (el) => {
					row.keywords.push({
						word: el[0],
						counter: el[1],
					});
				});
				data.push(row);
			});
		})
		// .then(() => {
		// 	const rangeArray = _.range(1, Math.floor(data.length / 100) + 1);
		// 	const completedCheck = [
		// 		0,
		// 		0,
		// 		0,
		// 		0,
		// 		0,
		// 		0,
		// 		0,
		// 		0,
		// 		0,
		// 		0,
		// 		0,
		// 		0,
		// 		0,
		// 		0,
		// 		0,
		// 		0,
		// 		0,
		// 		0,
		// 		0,
		// 		0,
		// 		0,
		// 		0,
		// 		0,
		// 	];
		// 	let rangeArray2 =
		// 		Math.floor(data.length / 100) !== data.length / 100
		// 			? _.range(Math.floor(data.length / 100) * 100 + 1, data.length + 1)
		// 			: null;
		// 	rangeArray.map(async (el, index) => {
		// 		try {
		// 			const resultDescription = await translate.translate(
		// 				descriptionArray.slice((el - 1) * 100, el * 100),
		// 				{
		// 					from: 'en',
		// 					to: 'pt',
		// 				}
		// 			);
		// 			const resultOperator = await translate.translate(
		// 				operatorArray.slice((el - 1) * 100, el * 100),
		// 				{
		// 					from: 'en',
		// 					to: 'pt',
		// 				}
		// 			);
		// 			const resultAircraft = await translate.translate(
		// 				aircraftArray.slice((el - 1) * 100, el * 100),
		// 				{
		// 					from: 'en',
		// 					to: 'pt',
		// 				}
		// 			);
		// 			const resultCountry = await translate.translate(
		// 				countryArray.slice((el - 1) * 100, el * 100),
		// 				{
		// 					from: 'en',
		// 					to: 'pt',
		// 				}
		// 			);
		// 			const resultContinent = await translate.translate(
		// 				continentArray.slice((el - 1) * 100, el * 100),
		// 				{
		// 					from: 'en',
		// 					to: 'pt',
		// 				}
		// 			);
		// 			resultDescription[0].map((el2, index2) => {
		// 				data[index2 + (el - 1) * 100].description = el2;

		// 				// // Split description into array of words
		// 				// let words = data[index2 + (el - 1) * 100].description
		// 				// 	.split('.')[0]
		// 				// 	.split(' ');
		// 				// // Clean whitespaces / remove special characters / remove useless words
		// 				// let wordsMapped = words.map((el3, index3) => {
		// 				// 	let newEl = el3.replace(/[^A-Za-z0-9]/g, '');
		// 				// 	newEl.trim();
		// 				// 	newEl.toLowerCase();
		// 				// 	return newEl;
		// 				// });

		// 				// // Filter undefineds or empty words / Remove unnecessary words
		// 				// let wordsFiltered = wordsMapped.filter((el3, index3) => {
		// 				// 	if (el3) {
		// 				// 		let found = false;
		// 				// 		for (let item of keywords) {
		// 				// 			const regex = new RegExp(`^${item}`, 'i');
		// 				// 			if (el3.match(regex)) {
		// 				// 				found = true;
		// 				// 			}
		// 				// 		}
		// 				// 		return found;
		// 				// 	} else {
		// 				// 		return false;
		// 				// 	}
		// 				// });

		// 				// // Count occurrences of each word
		// 				// let wordsCounted = _.countBy(wordsFiltered, (el3) => {
		// 				// 	return el3;
		// 				// });

		// 				// // // Remove rows with no keywords
		// 				// // if (_.isEmpty(wordsCounted)) {
		// 				// // 	return;
		// 				// // }

		// 				// // Create array with custom object for each word to associate with count
		// 				// data[index2 + (el - 1) * 100].keywords = [];
		// 				// _.forEach(_.entries(wordsCounted), (el3) => {
		// 				// 	data[index2 + (el - 1) * 100].keywords.push({
		// 				// 		word: el3[0],
		// 				// 		counter: el3[1],
		// 				// 	});
		// 				// });
		// 			});
		// 			resultOperator[0].map((el2, index2) => {
		// 				data[index2 + (el - 1) * 100].operator = el2;
		// 			});
		// 			resultAircraft[0].map((el2, index2) => {
		// 				data[index2 + (el - 1) * 100].aircraft = el2;
		// 			});
		// 			resultCountry[0].map((el2, index2) => {
		// 				data[index2 + (el - 1) * 100].country = el2;
		// 			});
		// 			resultContinent[0].map((el2, index2) => {
		// 				data[index2 + (el - 1) * 100].continent = el2;
		// 			});
		// 			completedCheck[el - 1] = 1;
		// 			let checkComplete = true;
		// 			_.forEach(completedCheck, (el) => {
		// 				if (!el) checkComplete = false;
		// 			});
		// 			if (checkComplete) {
		// 				const fields = [
		// 					'date',
		// 					'country',
		// 					'operator',
		// 					'aircraft',
		// 					'total_survivors',
		// 					'description',
		// 					'year',
		// 					'total_fatalities',
		// 					'id',
		// 					'continent',
		// 				];
		// 				const opts = { fields };
		// 				try {
		// 					const csv = parse(data, opts);
		// 					writeFile('final_pt_no_keywords.csv', csv, function (errorWrite) {
		// 						console.log(errorWrite);
		// 					});
		// 				} catch (err) {
		// 					console.error(err);
		// 				}
		// 			}
		// 		} catch (error) {
		// 			console.log(error);
		// 		}
		// 	});
		// if (rangeArray2) {
		// 	rangeArray2.map(async (el, index) => {
		// 		try {
		// 			const result = await translate.translate(
		// 				descriptionArray.slice((el - 1) * 100, el * 100),
		// 				{
		// 					from: 'en',
		// 					to: 'pt',
		// 				}
		// 			);
		// 			result[0].map((el2, index2) => {
		// 				data[el] = el2;

		// 				// Split description into array of words
		// 				let words = data[el].description.split('.')[0].split(' ');
		// 				// Clean whitespaces / remove special characters / remove useless words
		// 				let wordsMapped = words.map((el3, index3) => {
		// 					let newEl = el3.replace(/[^A-Za-z0-9]/g, '');
		// 					newEl.trim();
		// 					newEl.toLowerCase();
		// 					return newEl;
		// 				});

		// 				// Filter undefineds or empty words / Remove unnecessary words
		// 				let wordsFiltered = wordsMapped.filter((el3, index3) => {
		// 					if (el3) {
		// 						let found = false;
		// 						for (let item of keywords) {
		// 							const regex = new RegExp(`^${item}`, 'i');
		// 							if (el3.match(regex)) {
		// 								found = true;
		// 							}
		// 						}
		// 						return found;
		// 					} else {
		// 						return false;
		// 					}
		// 				});

		// 				// Count occurrences of each word
		// 				let wordsCounted = _.countBy(wordsFiltered, (el3) => {
		// 					return el3;
		// 				});

		// 				// Remove rows with no keywords
		// 				if (_.isEmpty(wordsCounted)) {
		// 					return;
		// 				}

		// 				// Create array with custom object for each word to associate with count
		// 				data[el].keywords = [];
		// 				_.forEach(_.entries(wordsCounted), (el3) => {
		// 					data[el].keywords.push({
		// 						word: el3[0],
		// 						counter: el3[1],
		// 					});
		// 				});
		// 				console.log(data[el]);
		// 			});
		// 		} catch (error) {
		// 			console.log(error);
		// 		}
		// 	});
		// }
		//})
		// Get calendar data
		.then(() => {
			calendarData = _.chain(data)
				.sortBy('year')
				.groupBy((row) => row.year)
				.value();
		})
		// Get calendar counter data
		.then(() => {
			yearAuxData = _.chain(data)
				.sortBy('year')
				.groupBy((row) => row.year)
				.mapValues((row) => row.length)
				.value();
			_.forEach(_.entries(yearAuxData), (el) => {
				yearData.push({
					year: el[0],
					count: el[1],
				});
			});
		})
		// Get map data
		.then(() => {
			mapAuxData = _.chain(data)
				.sortBy('country')
				.groupBy((row) => row.country)
				.value();
			_.forEach(_.entries(mapAuxData), (el) => {
				let minDate = 100000;
				let maxDate = -1;
				_.forEach(el[1], (nestedEl) => {
					if (parseInt(nestedEl.year) > maxDate) {
						maxDate = nestedEl.year;
					}
					if (parseInt(nestedEl.year) < minDate) {
						minDate = nestedEl.year;
					}
				});
				mapData.push({
					country: el[0],
					country_pt: countryToContinent[el[0]].country_pt,
					total: el[1].slice(0, 30),
					minDate: minDate,
					maxDate: maxDate,
					lat: countryToContinent[el[0]].lat,
					lon: countryToContinent[el[0]].lon,
					continent: countryToContinent[el[0]].continent,
				});
			});
		})
		// Get survival rate data
		.then(() => {
			const totalInvolved =
				_.sumBy(data, (row) => parseInt(row.total_survivors)) +
				_.sumBy(data, (row) => parseInt(row.total_fatalities));
			survivalRateData = [
				{
					label: 'Taxa de Sobrevivência',
					total: Math.round(
						(_.sumBy(data, (row) => parseInt(row.total_survivors)) /
							totalInvolved) *
							100
					),
				},
				{
					label: 'Taxa de Mortalidade',
					total: Math.round(
						(_.sumBy(data, (row) => parseInt(row.total_fatalities)) /
							totalInvolved) *
							100
					),
				},
			];
		})
		// Get keyword data
		.then(() => {
			_.forEach(data, (el) => {
				_.forEach(el.keywords, (keyword) => {
					if (keywordDataAux[keyword.word]) {
						keywordDataAux[keyword.word] += keyword.counter;
					} else {
						keywordDataAux[keyword.word] = keyword.counter;
					}
				});
			});
			_.forEach(_.entries(keywordDataAux), (el) => {
				keywordData.push({ text: el[0], value: el[1] });
			});
		})
		// Get aircraft data
		.then(() => {
			aircraftDataAux = _.chain(data)
				.groupBy((row) => row.aircraft)
				.mapValues((row) => row.length)
				.value();
			aircraftDataAux = _.fromPairs(
				_.sortBy(_.toPairs(aircraftDataAux), 1).reverse()
			);
			_.forEach(_.entries(aircraftDataAux), (el) => {
				aircraftData.push({ plane: el[0], total: el[1] });
			});
		})
		.then(() => {
			globalDataView = _.cloneDeep(data);
			globalCalendarDataView = _.cloneDeep(calendarData);
			globalYearDataView = _.cloneDeep(yearData);
			globalMapDataView = _.cloneDeep(mapData);
			globalSurvivalRateDataView = _.cloneDeep(survivalRateData);
			globalKeywordDataView = _.cloneDeep(keywordData);
			globalAircraftDataView = _.cloneDeep(aircraftData);
		});
};

const computeData = (data) => {
	yearData = [];
	mapData = [];
	keywordDataAux = {};
	keywordData = [];
	aircraftData = [];
	calendarData = _.chain(data)
		.sortBy('year')
		.groupBy((row) => row.year)
		.value();
	yearAuxData = _.chain(data)
		.sortBy('year')
		.groupBy((row) => row.year)
		.mapValues((row) => row.length)
		.value();
	_.forEach(_.entries(yearAuxData), (el) => {
		yearData.push({
			year: el[0],
			count: el[1],
		});
	});
	mapAuxData = _.chain(data)
		.sortBy('country')
		.groupBy((row) => row.country)
		.value();
	_.forEach(_.entries(mapAuxData), (el) => {
		let minDate = 100000;
		let maxDate = -1;
		_.forEach(el[1], (nestedEl) => {
			if (parseInt(nestedEl.year) > maxDate) {
				maxDate = nestedEl.year;
			}
			if (parseInt(nestedEl.year) < minDate) {
				minDate = nestedEl.year;
			}
		});
		mapData.push({
			country: el[0],
			country_pt: countryToContinent[el[0]].country_pt,
			total: el[1].slice(0, 30),
			minDate: minDate,
			maxDate: maxDate,
			lat: countryToContinent[el[0]].lat,
			lon: countryToContinent[el[0]].lon,
			continent: countryToContinent[el[0]].continent,
		});
	});
	const totalInvolved =
		_.sumBy(data, (row) => parseInt(row.total_survivors)) +
		_.sumBy(data, (row) => parseInt(row.total_fatalities));
	survivalRateData = [
		{
			label: 'Taxa de Sobrevivência',
			total: Math.round(
				(_.sumBy(data, (row) => parseInt(row.total_survivors)) /
					totalInvolved) *
					100
			),
		},
		{
			label: 'Taxa de Mortalidade',
			total: Math.round(
				(_.sumBy(data, (row) => parseInt(row.total_fatalities)) /
					totalInvolved) *
					100
			),
		},
	];
	_.forEach(data, (el) => {
		_.forEach(el.keywords, (keyword) => {
			if (keywordDataAux[keyword.word]) {
				keywordDataAux[keyword.word] += keyword.counter;
			} else {
				keywordDataAux[keyword.word] = keyword.counter;
			}
		});
	});
	_.forEach(_.entries(keywordDataAux), (el) => {
		keywordData.push({ text: el[0], value: el[1] });
	});
	aircraftDataAux = _.chain(data)
		.groupBy((row) => row.aircraft)
		.mapValues((row) => row.length)
		.value();
	aircraftDataAux = _.fromPairs(
		_.sortBy(_.toPairs(aircraftDataAux), 1).reverse()
	);
	_.forEach(_.entries(aircraftDataAux), (el) => {
		aircraftData.push({ plane: el[0], total: el[1] });
	});
};

dataGenerator();

const checkQueryFilter = (req) => {
	let replicateData = _.cloneDeep(data);
	if (!req.query.minDate || !req.query.maxDate) {
		replicateData = _.filter(replicateData, (el) =>
			req.query.minDate ? parseInt(el.year) > parseInt(req.query.minDate) : el
		);
		replicateData = _.filter(replicateData, (el) =>
			req.query.maxDate ? parseInt(el.year) < parseInt(req.query.maxDate) : el
		);
	} else {
		replicateData = _.filter(replicateData, (el) =>
			req.query.minDate ? parseInt(el.year) >= parseInt(req.query.minDate) : el
		);
		replicateData = _.filter(replicateData, (el) =>
			req.query.maxDate ? parseInt(el.year) <= parseInt(req.query.maxDate) : el
		);
	}
	replicateData = _.filter(replicateData, (el) =>
		req.query.country ? el.country === req.query.country : el
	);
	replicateData = _.filter(replicateData, (el) =>
		req.query.continent ? el.continent === req.query.continent : el
	);
	replicateData = _.filter(replicateData, (el) => {
		if (req.query.keyword) {
			let found = false;
			_.forEach(el.keywords, (word) => {
				if (word.word === req.query.keyword) {
					found = true;
					return false;
				}
			});
			if (found) {
				return el;
			}
		} else {
			return el;
		}
	});
	replicateData = _.filter(replicateData, (el) =>
		req.query.aircraft ? el.aircraft === req.query.aircraft : el
	);
	computeData(replicateData);
};

app.get('/api/data/calendar', (req, res) => {
	if (
		!req.query.minDate &&
		!req.query.maxDate &&
		!req.query.country &&
		!req.query.continent &&
		!req.query.keyword &&
		!req.query.aircraft
	) {
		res.send(globalCalendarDataView);
	} else {
		checkQueryFilter(req);
		res.send(calendarData);
	}
});

app.get('/api/data/calendar/aux', (req, res) => {
	if (
		!req.query.minDate &&
		!req.query.maxDate &&
		!req.query.country &&
		!req.query.continent &&
		!req.query.keyword &&
		!req.query.aircraft
	) {
		res.send(globalYearDataView);
	} else {
		res.send(yearData);
	}
});

app.get('/api/data/map', (req, res) => {
	if (
		!req.query.minDate &&
		!req.query.maxDate &&
		!req.query.country &&
		!req.query.continent &&
		!req.query.keyword &&
		!req.query.aircraft
	) {
		res.send(globalMapDataView);
	} else {
		res.send(mapData);
	}
});

app.get('/api/data/keyword', (req, res) => {
	if (
		!req.query.minDate &&
		!req.query.maxDate &&
		!req.query.country &&
		!req.query.continent &&
		!req.query.keyword &&
		!req.query.aircraft
	) {
		res.send(globalKeywordDataView.slice(0, 10));
	} else {
		res.send(keywordData.slice(0, 10));
	}
});

app.get('/api/data/survival-rate', (req, res) => {
	if (
		!req.query.minDate &&
		!req.query.maxDate &&
		!req.query.country &&
		!req.query.continent &&
		!req.query.keyword &&
		!req.query.aircraft
	) {
		res.send(globalSurvivalRateDataView);
	} else {
		res.send(survivalRateData);
	}
});

app.get('/api/data/aircraft', (req, res) => {
	if (
		!req.query.minDate &&
		!req.query.maxDate &&
		!req.query.country &&
		!req.query.continent &&
		!req.query.keyword &&
		!req.query.aircraft
	) {
		res.send(globalAircraftDataView.slice(0, 10));
	} else {
		res.send(aircraftData.slice(0, 10));
	}
});

app.get('/api/logs', (req, res) => {
	res.send(interactionData);
});

app.post('/api/logs', (req, res) => {
	interactionData.push({
		timeStamp: req.query.time_stamp,
		view: req.query.view,
		type: req.query.type,
		description: req.query.description,
	});
	res.sendStatus(200);
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`running back-end on port ${port}`));
