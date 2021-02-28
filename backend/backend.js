const csv = require('csvtojson');
const _ = require('lodash');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const app = express();

// Middleware

app.use(express.json());
app.use(express.urlencoded());
app.use(helmet());
if (app.get('env') === 'development') {
	console.log('Morgan enabled...');
	app.use(morgan('tiny'));
}

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
	'military',
	'transport',
	'missing',
	'knife',
	'smoke',
	'water',
	'mist',
	'engines',
	'crash',
	'rain',
	'rainstorm',
	'thunder',
	'thunderstorm',
	'thunderstorms',
	'storm',
	'fire',
	'war',
	'mountaineous',
	'flames',
	'weather',
	'landing',
	'mountain',
	'winds',
	'wind',
	'windy',
	'air',
	'fog',
	'malfunction',
	'ravine',
	'volcano',
	'engine',
	'military',
	'exploded',
	'explosion',
	'midair',
	'airport',
	'obstacle',
	'mount',
	'road',
	'runway',
	'forest',
	'steep',
	'jungle',
	'slope',
	'field',
	'veered',
	'dive',
	'hijack',
	'hijacked',
	'exploding',
	'witness',
	'witnesses',
	'witnessed',
	'turn',
	'mountainside',
	'typhoon',
	'trees',
	'helicopter',
	'cloud',
	'fuel',
];

const accepted_countries = [
	'Afghanistan',
	'Albania',
	'Algeria',
	'American Samoa',
	'Andorra',
	'Angola',
	'Anguilla',
	'Antarctica',
	'Antigua and Barbuda',
	'Argentina',
	'Armenia',
	'Aruba',
	'Australia',
	'Austria',
	'Azerbaijan',
	'Bahamas (the)',
	'Bahrain',
	'Bangladesh',
	'Barbados',
	'Belarus',
	'Belgium',
	'Belize',
	'Benin',
	'Bermuda',
	'Bhutan',
	'Bolivia (Plurinational State of)',
	'Bonaire, Sint Eustatius and Saba',
	'Bosnia and Herzegovina',
	'Botswana',
	'Bouvet Island',
	'Brazil',
	'British Indian Ocean Territory (the)',
	'Brunei Darussalam',
	'Bulgaria',
	'Burkina Faso',
	'Burundi',
	'Cabo Verde',
	'Cambodia',
	'Cameroon',
	'Canada',
	'Cayman Islands (the)',
	'Central African Republic (the)',
	'Chad',
	'Chile',
	'China',
	'Christmas Island',
	'Cocos (Keeling) Islands (the)',
	'Colombia',
	'Comoros (the)',
	'Congo (the Democratic Republic of the)',
	'Congo (the)',
	'Cook Islands (the)',
	'Costa Rica',
	'Croatia',
	'Cuba',
	'Curaçao',
	'Cyprus',
	'Czechia',
	"Côte d'Ivoire",
	'Denmark',
	'Djibouti',
	'Dominica',
	'Dominican Republic (the)',
	'Ecuador',
	'Egypt',
	'El Salvador',
	'Equatorial Guinea',
	'Eritrea',
	'Estonia',
	'Eswatini',
	'Ethiopia',
	'Falkland Islands (the) [Malvinas]',
	'Faroe Islands (the)',
	'Fiji',
	'Finland',
	'France',
	'French Guiana',
	'French Polynesia',
	'French Southern Territories (the)',
	'Gabon',
	'Gambia (the)',
	'Georgia',
	'Germany',
	'Ghana',
	'Gibraltar',
	'Greece',
	'Greenland',
	'Grenada',
	'Guadeloupe',
	'Guam',
	'Guatemala',
	'Guernsey',
	'Guinea',
	'Guinea-Bissau',
	'Guyana',
	'Haiti',
	'Heard Island and McDonald Islands',
	'Holy See (the)',
	'Honduras',
	'Hong Kong',
	'Hungary',
	'Iceland',
	'India',
	'Indonesia',
	'Iran (Islamic Republic of)',
	'Iraq',
	'Ireland',
	'Isle of Man',
	'Israel',
	'Italy',
	'Jamaica',
	'Japan',
	'Jersey',
	'Jordan',
	'Kazakhstan',
	'Kenya',
	'Kiribati',
	"Korea (the Democratic People's Republic of)",
	'Korea (the Republic of)',
	'Kuwait',
	'Kyrgyzstan',
	"Lao People's Democratic Republic (the)",
	'Latvia',
	'Lebanon',
	'Lesotho',
	'Liberia',
	'Libya',
	'Liechtenstein',
	'Lithuania',
	'Luxembourg',
	'Macao',
	'Madagascar',
	'Malawi',
	'Malaysia',
	'Maldives',
	'Mali',
	'Malta',
	'Marshall Islands (the)',
	'Martinique',
	'Mauritania',
	'Mauritius',
	'Mayotte',
	'Mexico',
	'Micronesia (Federated States of)',
	'Moldova (the Republic of)',
	'Monaco',
	'Mongolia',
	'Montenegro',
	'Montserrat',
	'Morocco',
	'Mozambique',
	'Myanmar',
	'Namibia',
	'Nauru',
	'Nepal',
	'Netherlands (the)',
	'New Caledonia',
	'New Zealand',
	'Nicaragua',
	'Niger (the)',
	'Nigeria',
	'Niue',
	'Norfolk Island',
	'Northern Mariana Islands (the)',
	'Norway',
	'Oman',
	'Pakistan',
	'Palau',
	'Palestine, State of',
	'Panama',
	'Papua New Guinea',
	'Paraguay',
	'Peru',
	'Philippines (the)',
	'Pitcairn',
	'Poland',
	'Portugal',
	'Puerto Rico',
	'Qatar',
	'Republic of North Macedonia',
	'Romania',
	'Russia',
	'Rwanda',
	'Réunion',
	'Saint Barthélemy',
	'Saint Helena, Ascension and Tristan da Cunha',
	'Saint Kitts and Nevis',
	'Saint Lucia',
	'Saint Martin (French part)',
	'Saint Pierre and Miquelon',
	'Saint Vincent and the Grenadines',
	'Samoa',
	'San Marino',
	'Sao Tome and Principe',
	'Saudi Arabia',
	'Senegal',
	'Serbia',
	'Seychelles',
	'Sierra Leone',
	'Singapore',
	'Sint Maarten (Dutch part)',
	'Slovakia',
	'Slovenia',
	'Solomon Islands',
	'Somalia',
	'South Africa',
	'South Georgia and the South Sandwich Islands',
	'South Sudan',
	'Spain',
	'Sri Lanka',
	'Sudan (the)',
	'Suriname',
	'Svalbard and Jan Mayen',
	'Sweden',
	'Switzerland',
	'Syrian Arab Republic',
	'Taiwan',
	'Tajikistan',
	'Tanzania, United Republic of',
	'Thailand',
	'Timor-Leste',
	'Togo',
	'Tokelau',
	'Tonga',
	'Trinidad and Tobago',
	'Tunisia',
	'Turkey',
	'Turkmenistan',
	'Turks and Caicos Islands (the)',
	'Tuvalu',
	'Uganda',
	'Ukraine',
	'United Arab Emirates (the)',
	'United Kingdom of Great Britain and Northern Ireland (the)',
	'United States Minor Outlying Islands (the)',
	'United States of America (the)',
	'Uruguay',
	'Uzbekistan',
	'Vanuatu',
	'Venezuela (Bolivarian Republic of)',
	'Viet Nam',
	'Virgin Islands (British)',
	'Virgin Islands (U.S.)',
	'Wallis and Futuna',
	'Western Sahara',
	'Yemen',
	'Zambia',
	'Zimbabwe',
	'Åland Islands',
];

let availableCountries = [];

let countryToContinent = {
	Afghanistan: { continent: 'Asia', lat: 34.543896, lon: 69.160652 },
	Albania: { continent: 'Europe', lat: 41.327953, lon: 19.819025 },
	Algeria: { continent: 'Africa', lat: 36.737232, lon: 3.086472 },
	'American Samoa': { continent: 'Oceania', lat: -14.275632, lon: -170.702042 },
	Angola: { continent: 'Africa', lat: -8.838333, lon: 13.234444 },
	Argentina: { continent: 'South America', lat: -34.603722, lon: -58.381592 },
	Armenia: { continent: 'Asia', lat: 40.1772, lon: 44.50349 },
	Australia: { continent: 'Oceania', lat: -33.865143, lon: 151.2099 },
	Austria: { continent: 'Europe', lat: 48.210033, lon: 16.363449 },
	Azerbaijan: { continent: 'Europe', lat: 40.409264, lon: 49.867092 },
	Bahrain: { continent: 'Asia', lat: 26.156258, lon: 50.400505 },
	Bangladesh: { continent: 'Asia', lat: 23.777176, lon: 90.399452 },
	Barbados: { continent: 'North America', lat: 13.193887, lon: -59.543198 },
	Belarus: { continent: 'Europe', lat: 53.893009, lon: 27.567444 },
	Belgium: { continent: 'Europe', lat: 51.260197, lon: 4.402771 },
	Belize: { continent: 'North America', lat: 16.513889, lon: -88.366669 },
	Benin: { continent: 'Africa', lat: 6.379448, lon: 2.451324 },
	Bermuda: { continent: 'North America', lat: 32.299507, lon: -64.790337 },
	Bhutan: { continent: 'Asia', lat: 26.870556, lon: 90.485558 },
	Botswana: { continent: 'Africa', lat: -24.653257, lon: 25.906792 },
	Brazil: { continent: 'South America', lat: -23.533773, lon: -46.62529 },
	Bulgaria: { continent: 'Europe', lat: 42.698334, lon: 23.319941 },
	Cambodia: { continent: 'Asia', lat: 11.562108, lon: 104.888535 },
	Cameroon: { continent: 'Africa', lat: 4.061536, lon: 9.786072 },
	Canada: { continent: 'North America', lat: 43.65107, lon: -79.347015 },
	Chad: { continent: 'Africa', lat: 12.137752, lon: 15.054325 },
	Chile: { continent: 'South America', lat: -33.447487, lon: -70.673676 },
	China: { continent: 'Asia', lat: 39.916668, lon: 116.383331 },
	Colombia: { continent: 'South America', lat: 4.624335, lon: -74.063644 },
	'Costa Rica': { continent: 'North America', lat: 9.934739, lon: -84.087502 },
	Croatia: { continent: 'Europe', lat: 45.815399, lon: 15.966568 },
	Cuba: { continent: 'North America', lat: 23.113592, lon: -82.366592 },
	Cyprus: { continent: 'Europe', lat: 35.095192, lon: 33.20343 },
	Denmark: { continent: 'Europe', lat: 55.676098, lon: 12.568337 },
	Djibouti: { continent: 'Africa', lat: 11.572076, lon: 43.145645 },
	Dominica: { continent: 'North America', lat: 15.240796, lon: -61.314869 },
	Ecuador: { continent: 'South America', lat: -2.203816, lon: -79.897453 },
	Egypt: { continent: 'Africa', lat: 30.033333, lon: 31.233334 },
	'El Salvador': { continent: 'North America', lat: 13.90519, lon: -89.500206 },
	'Equatorial Guinea': { continent: 'Africa', lat: 1.85, lon: 9.75 },
	Eritrea: { continent: 'Africa', lat: 15.60977, lon: 39.449974 },
	Estonia: { continent: 'Europe', lat: 59.436962, lon: 24.753574 },
	Ethiopia: { continent: 'Africa', lat: 9.005401, lon: 38.763611 },
	Fiji: { continent: 'Oceania', lat: -17.713371, lon: 178.065033 },
	Finland: { continent: 'Europe', lat: 60.192059, lon: 24.945831 },
	France: { continent: 'Europe', lat: 48.864716, lon: 2.349014 },
	'French Polynesia': {
		continent: 'Oceania',
		lat: -16.761301,
		lon: -151.443588,
	},
	Gabon: { continent: 'Africa', lat: 0.3901, lon: 9.4544 },
	Georgia: { continent: 'Europe', lat: 33.247875, lon: -83.441162 },
	Germany: { continent: 'Europe', lat: 52.520008, lon: 13.404954 },
	Ghana: { continent: 'Africa', lat: 5.55, lon: -0.02 },
	Greece: { continent: 'Europe', lat: 37.98381, lon: 23.727539 },
	Greenland: { continent: 'North America', lat: 67.010323, lon: -50.712353 },
	Guadeloupe: { continent: 'North America', lat: 16.27, lon: -61.580002 },
	Guam: { continent: 'Oceania', lat: 13.444304, lon: 144.793732 },
	Guatemala: { continent: 'North America', lat: 14.628434, lon: -90.522713 },
	Guernsey: { continent: 'Europe', lat: 49.448196, lon: -2.58949 },
	Guinea: { continent: 'Africa', lat: 9.509167, lon: -13.712222 },
	Guyana: { continent: 'South America', lat: 6.559456, lon: -58.333191 },
	Haiti: { continent: 'North America', lat: 18.533333, lon: -72.333336 },
	Honduras: { continent: 'North America', lat: 14.081999, lon: -87.202438 },
	'Hong Kong': { continent: 'Asia', lat: 22.302711, lon: 114.177216 },
	Hungary: { continent: 'Europe', lat: 47.497913, lon: 19.040236 },
	Iceland: { continent: 'Europe', lat: 64.128288, lon: -21.827774 },
	India: { continent: 'Asia', lat: 28.6448, lon: 77.216721 },
	Indonesia: { continent: 'Asia', lat: -8.409518, lon: 115.188919 },
	Iraq: { continent: 'Asia', lat: 33.312805, lon: 44.361488 },
	Ireland: { continent: 'Europe', lat: 53.35014, lon: -6.266155 },
	Italy: { continent: 'Europe', lat: 41.902782, lon: 12.496366 },
	Jamaica: { continent: 'North America', lat: 18.476223, lon: -77.89389 },
	Japan: { continent: 'Asia', lat: 35.652832, lon: 139.839478 },
	Jersey: { continent: 'Europe', lat: 49.214439, lon: -2.13125 },
	Jordan: { continent: 'Asia', lat: 31.963158, lon: 35.930359 },
	Kazakhstan: { continent: 'Europe', lat: 43.238949, lon: 76.889709 },
	Kenya: { continent: 'Africa', lat: -1.286389, lon: 36.817223 },
	Kuwait: { continent: 'Asia', lat: 29.378586, lon: 47.990341 },
	Kyrgyzstan: { continent: 'Asia', lat: 42.882004, lon: 74.582748 },
	Latvia: { continent: 'Europe', lat: 56.946285, lon: 24.105078 },
	Lebanon: { continent: 'Asia', lat: 33.88863, lon: 35.49548 },
	Lesotho: { continent: 'Africa', lat: -29.62319, lon: 28.2334698 },
	Liberia: { continent: 'Africa', lat: 6.300774, lon: -10.79716 },
	Libya: { continent: 'Africa', lat: 32.885353, lon: 13.180161 },
	Lithuania: { continent: 'Europe', lat: 54.687157, lon: 25.279652 },
	Luxembourg: { continent: 'Europe', lat: 49.611622, lon: 6.131935 },
	Madagascar: { continent: 'Africa', lat: -19.002846, lon: 46.460938 },
	Malawi: { continent: 'Africa', lat: -15.786111, lon: 35.005833 },
	Malaysia: { continent: 'Asia', lat: 3.140853, lon: 101.693207 },
	Mali: { continent: 'Africa', lat: 16.956232, lon: -0.344245 },
	Malta: { continent: 'Europe', lat: 35.917973, lon: 14.409943 },
	Martinique: { continent: 'North America', lat: 14.4694, lon: -60.865799 },
	Mauritania: { continent: 'Africa', lat: 18.079021, lon: -15.965662 },
	Mexico: { continent: 'North America', lat: 19.432608, lon: -99.133209 },
	Mongolia: { continent: 'Asia', lat: 47.92123, lon: 106.918556 },
	Morocco: { continent: 'Africa', lat: 33.589886, lon: -7.603869 },
	Mozambique: { continent: 'Africa', lat: -25.953724, lon: 32.588711 },
	Myanmar: { continent: 'Asia', lat: 16.871311, lon: 96.199379 },
	Namibia: { continent: 'Africa', lat: -22.449259, lon: 18.969973 },
	Nepal: { continent: 'Asia', lat: 27.700769, lon: 85.30014 },
	'New Zealand': { continent: 'Oceania', lat: -36.848461, lon: 174.763336 },
	Nicaragua: { continent: 'North America', lat: 12.136389, lon: -86.251389 },
	Nigeria: { continent: 'Africa', lat: 6.465422, lon: 3.406448 },
	Norway: { continent: 'Europe', lat: 59.911491, lon: 10.757933 },
	Oman: { continent: 'Oman', lat: 23.614328, lon: 58.545284 },
	Pakistan: { continent: 'Asia', lat: 33.738045, lon: 73.084488 },
	Panama: { continent: 'North America', lat: 8.983333, lon: -79.51667 },
	'Papua New Guinea': { continent: 'Oceania', lat: -4.343673, lon: 152.268784 },
	Paraguay: { continent: 'South America', lat: -25.302309, lon: -57.411827 },
	Peru: { continent: 'South America', lat: -12.046374, lon: -77.042793 },
	Poland: { continent: 'Europe', lat: 52.237049, lon: 21.017532 },
	Portugal: { continent: 'Europe', lat: 38.736946, lon: -9.142685 },
	'Puerto Rico': {
		continent: 'North America',
		lat: 18.200178,
		lon: -66.664513,
	},
	Qatar: { continent: 'Asia', lat: 25.286106, lon: 51.534817 },
	Romania: { continent: 'Europe', lat: 44.439663, lon: 26.096306 },
	Russia: { continent: 'Asia', lat: 55.751244, lon: 37.618423 },
	Rwanda: { continent: 'Africa', lat: -2.429626, lon: 29.882967 },
	'Saint Lucia': {
		continent: 'North America',
		lat: 13.909444,
		lon: -60.978893,
	},
	Samoa: { continent: 'Oceania', lat: -13.7583109, lon: -172.1047677 },
	'Saudi Arabia': { continent: 'Asia', lat: 24.774265, lon: 46.738586 },
	Senegal: { continent: 'Africa', lat: 14.716677, lon: -17.467686 },
	'Sierra Leone': { continent: 'Africa', lat: 8.484444, lon: -13.234444 },
	Singapore: { continent: 'Asia', lat: 1.29027, lon: 103.851959 },
	Slovakia: { continent: 'Europe', lat: 48.148598, lon: 17.107748 },
	Slovenia: { continent: 'Europe', lat: 46.056946, lon: 14.505751 },
	'Solomon Islands': {
		continent: 'Oceania',
		lat: -9.2263493,
		lon: 159.1873907,
	},
	Somalia: { continent: 'Africa', lat: 2.046934, lon: 45.318161 },
	'South Africa': { continent: 'Africa', lat: -33.918861, lon: 18.4233 },
	Spain: { continent: 'Europe', lat: 40.416775, lon: -3.70379 },
	'Sri Lanka': { continent: 'Asia', lat: 6.927079, lon: 79.861244 },
	Suriname: { continent: 'South America', lat: 5.839398, lon: -55.199089 },
	Sweden: { continent: 'Europe', lat: 58.298584, lon: 12.961619 },
	Switzerland: { continent: 'Europe', lat: 46.204391, lon: 6.143158 },
	Taiwan: { continent: 'Asia', lat: 25.105497, lon: 121.597366 },
	Tajikistan: { continent: 'Asia', lat: 39.059715, lon: 39.059715 },
	Thailand: { continent: 'Asia', lat: 13.736717, lon: 100.523186 },
	Tunisia: { continent: 'Africa', lat: 36.806389, lon: 10.181667 },
	Turkey: { continent: 'Europe', lat: 38.9573415, lon: 35.240741 },
	Turkmenistan: { continent: 'Asia', lat: 37.862499, lon: 58.238056 },
	Uganda: { continent: 'Africa', lat: 1.3707295, lon: 32.3032414 },
	Ukraine: { continent: 'Europe', lat: 49.988358, lon: 36.232845 },
	Uruguay: { continent: 'South America', lat: -34.901112, lon: -56.164532 },
	Uzbekistan: { continent: 'Asia', lat: 41.311081, lon: 69.240562 },
	Vanuatu: { continent: 'Oceania', lat: -17.734818, lon: 168.322021 },
	Yemen: { continent: 'Asia', lat: 15.369445, lon: 44.191006 },
	Zambia: { continent: 'Africa', lat: -15.416667, lon: 28.283333 },
	Zimbabwe: { continent: 'Africa', lat: -17.824858, lon: 31.053028 },
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

const dataGenerator = () => {
	const converter = csv()
		.fromFile('../datasets/airplane_crashes.csv')
		.then((json) => {
			_.forEach(json, (row, index) => {
				// Remove row with undefined key - value pairs
				let isGood = true;
				row = _.pick(row, _.keys(modelCrash));
				_.forEach(_.values(row), (value) => {
					if (!value) {
						isGood = false;
						return false;
					}
				});
				// Filter location col to only have country name
				if (isGood) {
					if (row.Location.includes(',')) {
						row.Location = row.Location.split(',')[1].trim();
					}
					if (!accepted_countries.includes(row.Location)) {
						return;
					}

					// Map keys to set key values
					row = _.mapKeys(row, (value, key) => keyMap[key]);

					// Change total_survivors to int value
					if (!parseInt(row.total_survivors)) {
						row.total_survivors = 0;
					} else {
						row.total_survivors = parseInt(row.total_survivors);
					}

					// Split description into array of words
					let words = row.description.split('.')[0].split(' ');
					// Clean whitespaces / remove special characters / remove useless words
					let wordsMapped = words.map((el, index) => {
						let newEl = el.replace(/[^A-Za-z0-9]/g, '');
						newEl.trim();
						newEl.toLowerCase();
						return newEl;
					});

					// Filter undefineds or empty words / Remove unnecessary words
					let wordsFiltered = wordsMapped.filter((el, index) => {
						if (el) {
							if (keywords.includes(el)) {
								return true;
							}
							return false;
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
						row.keywords.push({ word: el[0], counter: el[1] });
					});

					// Create year key
					row.year = row.date.split('/')[2];

					// Create total_fatalities key
					row.total_fatalities =
						parseInt(row.air_fatalities) + parseInt(row.ground_fatalities);
					if (
						!parseInt(row.air_fatalities) &&
						!parseInt(row.ground_fatalities)
					) {
						row.total_fatalities = 0;
					} else if (!parseInt(row.air_fatalities)) {
						row.total_fatalities = parseInt(row.ground_fatalities);
					} else if (!parseInt(row.ground_fatalities)) {
						row.total_fatalities = parseInt(row.air_fatalities);
					} else {
						row.total_fatalities = 0;
					}

					// Create incremental unique id
					row.id = index;

					// Remove unnecessary rows
					row = _.omit(row, _.keys(modelCrashOmit));

					data.push(row);
				}
			});
		})
		// Get calendar data
		.then(() => {
			calendarData = _.chain(data)
				.sortBy('year')
				.groupBy((row) => row.year)
				.forEach((row) => {
					_.forEach(row, (el) => {
						el.continent = countryToContinent[el.country].continent;
					});
				})
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
					total: el[1].slice(0, 30),
					minDate: minDate,
					maxDate: maxDate,
					lat: countryToContinent[el[0]].lat,
					lon: countryToContinent[el[0]].lon,
				});
			});
		})
		// Get survival rate data
		.then(() => {
			const totalInvolved =
				_.sumBy(data, (row) => row.total_survivors) +
				_.sumBy(data, (row) => row.total_fatalities);
			survivalRateData = [
				{
					label: 'Survival Rate',
					total: Math.round(
						(_.sumBy(data, (row) => row.total_survivors) / totalInvolved) * 100
					),
				},
				{
					label: 'Fatality Rate',
					total: Math.round(
						(_.sumBy(data, (row) => row.total_fatalities) / totalInvolved) * 100
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
		});
};

dataGenerator();

const filterDataByDate = (minDate, maxDate) => {};
const filterDataByCountry = (country) => {};
const filterDataByKeyword = (keyword) => {};
const filterDataByAircraft = (aircraft) => {};

const checkParamsFilter = (req) => {
	if (req.params.minDate || req.params.maxDate) {
		filterDataByDate(req.params.minDate, req.params.maxDate);
	}
	if (req.params.country) {
		filterDataByCountry(req.params.country);
	}
	if (req.params.keyword) {
		filterDataByKeyword(req.params.keyword);
	}
	if (req.params.aircraft) {
		filterDataByAircraft(req.params.aircraft);
	}
};

app.get('/api/data/calendar', (req, res) => {
	checkParamsFilter(req);
	res.send(calendarData);
});

app.get('/api/data/calendar/aux', (req, res) => {
	checkParamsFilter(req);
	res.send(yearData);
});

app.get('/api/data/map', (req, res) => {
	checkParamsFilter(req);
	res.send(mapData);
});

app.get('/api/data/keyword', (req, res) => {
	checkParamsFilter(req);
	res.send(keywordData.slice(0, 10));
});

app.get('/api/data/survival-rate', (req, res) => {
	checkParamsFilter(req);
	res.send(survivalRateData);
});

app.get('/api/data/aircraft', (req, res) => {
	checkParamsFilter(req);
	res.send(aircraftData.slice(0, 10));
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`running back-end on port ${port}`));
