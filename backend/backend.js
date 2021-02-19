const csv = require('csvtojson')
const _ = require('lodash')
const config = require('config')
const helmet = require('helmet')
const morgan = require('morgan')
const express = require('express')
const { forEach } = require('lodash')
const app = express();

// Middleware

app.use(express.json())
app.use(express.urlencoded())
app.use(helmet())
if (app.get('env') === 'development'){
    console.log('Morgan enabled...')
    app.use(morgan('tiny'))
}

// Configuration

console.log(`App Name: ${app.get('name')}`)

const modelCrash = {
    Date: null,
    Location: null,
    Operator: null,
    Type: null,
    Aboard: null,
    Fatalities: null,
    Ground: null,
    Summary: null
}

const modelCrashOmit = {
    air_fatalities: null,
    ground_fatalities: null
}

const keyMap = {
    Date: 'date',
    Location: 'country',
    Operator: 'operator',
    Type: 'aircraft',
    Aboard: 'total_survivors',
    Fatalities: 'air_fatalities',
    Ground: 'ground_fatalities',
    Summary: 'description'
}

const accepted_countries = [
	"Afghanistan",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antarctica",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas (the)",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia (Plurinational State of)",
	"Bonaire, Sint Eustatius and Saba",
	"Bosnia and Herzegovina",
	"Botswana",
	"Bouvet Island",
	"Brazil",
	"British Indian Ocean Territory (the)",
	"Brunei Darussalam",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cabo Verde",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cayman Islands (the)",
	"Central African Republic (the)",
	"Chad",
	"Chile",
	"China",
	"Christmas Island",
	"Cocos (Keeling) Islands (the)",
	"Colombia",
	"Comoros (the)",
	"Congo (the Democratic Republic of the)",
	"Congo (the)",
	"Cook Islands (the)",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Curaçao",
	"Cyprus",
	"Czechia",
	"Côte d'Ivoire",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic (the)",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Eswatini",
	"Ethiopia",
	"Falkland Islands (the) [Malvinas]",
	"Faroe Islands (the)",
	"Fiji",
	"Finland",
	"France",
	"French Guiana",
	"French Polynesia",
	"French Southern Territories (the)",
	"Gabon",
	"Gambia (the)",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guam",
	"Guatemala",
	"Guernsey",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Heard Island and McDonald Islands",
	"Holy See (the)",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran (Islamic Republic of)",
	"Iraq",
	"Ireland",
	"Isle of Man",
	"Israel",
	"Italy",
	"Jamaica",
	"Japan",
	"Jersey",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Korea (the Democratic People's Republic of)",
	"Korea (the Republic of)",
	"Kuwait",
	"Kyrgyzstan",
	"Lao People's Democratic Republic (the)",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macao",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands (the)",
	"Martinique",
	"Mauritania",
	"Mauritius",
	"Mayotte",
	"Mexico",
	"Micronesia (Federated States of)",
	"Moldova (the Republic of)",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands (the)",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger (the)",
	"Nigeria",
	"Niue",
	"Norfolk Island",
	"Northern Mariana Islands (the)",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine, State of",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines (the)",
	"Pitcairn",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Republic of North Macedonia",
	"Romania",
	"Russia",
	"Rwanda",
	"Réunion",
	"Saint Barthélemy",
	"Saint Helena, Ascension and Tristan da Cunha",
	"Saint Kitts and Nevis",
	"Saint Lucia",
	"Saint Martin (French part)",
	"Saint Pierre and Miquelon",
	"Saint Vincent and the Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Sint Maarten (Dutch part)",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Georgia and the South Sandwich Islands",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan (the)",
	"Suriname",
	"Svalbard and Jan Mayen",
	"Sweden",
	"Switzerland",
	"Syrian Arab Republic",
	"Taiwan",
	"Tajikistan",
	"Tanzania, United Republic of",
	"Thailand",
	"Timor-Leste",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Turks and Caicos Islands (the)",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates (the)",
	"United Kingdom of Great Britain and Northern Ireland (the)",
	"United States Minor Outlying Islands (the)",
	"United States of America (the)",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Venezuela (Bolivarian Republic of)",
	"Viet Nam",
	"Virgin Islands (British)",
	"Virgin Islands (U.S.)",
	"Wallis and Futuna",
	"Western Sahara",
	"Yemen",
	"Zambia",
	"Zimbabwe",
	"Åland Islands"
];
let data = [];
let calendarData = [];
let mapData = [];
let survivalRateData = []
let keywordData = [];
let aircraftData = []


const converter = csv()
                .fromFile('../datasets/airplane_crashes.csv')
                .then(json => {
                    _.forEach(json, (row, index) => {

                        // Remove row with undefined key - value pairs
                        let isGood = true
                        row = _.pick(row, _.keys(modelCrash))
                        _.forEach(_.values(row), (value) => {
                            if (!value){
                                isGood = false;
                                return false
                            }
                        })
                        // Filter location col to only have country name
                        if (isGood){
                            if (row.Location.includes(',')){
                                row.Location = row.Location.split(',')[1].trim()
                            }
                            if (!accepted_countries.includes(row.Location)){
                                return
                            }
                    
                            // Map keys to set key values
                            row = _.mapKeys(row, (value, key) => keyMap[key])


                            // Change total_survivors to int value
                            if (!parseInt(row.total_survivors)){
                                row.total_survivors = 0;
                            }
                            else {
                                row.total_survivors = parseInt(row.total_survivors)
                            }
                            

                            // Create year key
                            row.year = row.date.split('/')[2]

                            // Create total_fatalities key
                            row.total_fatalities = parseInt(row.air_fatalities) + parseInt(row.ground_fatalities);
                            if (!parseInt(row.air_fatalities) && !parseInt(row.ground_fatalities)){
                                row.total_fatalities = 0;
                            }
                            else if (!parseInt(row.air_fatalities)){
                                row.total_fatalities = parseInt(row.ground_fatalities);
                            }
                            else if (!parseInt(row.ground_fatalities)){
                                row.total_fatalities = parseInt(row.air_fatalities);
                            }
                            else{
                                row.total_fatalities = 0;
                            }

                            // Create incremental unique id
                            row.id = index;

                            // Remove unnecessary rows
                            row = _.omit(row, _.keys(modelCrashOmit))

                            data.push(row)
                        }
                    })
                })
                // Get calendar data
                .then( () => {
                    calendarData = _.chain(data).sortBy('year').groupBy(data, row => row.year).value()                    
                })
                // Get map data
                .then(() => {
                    mapData = _.chain(data).sortBy('country').groupBy(row => row.country).value()
                })
                // Get map data
                .then(() => {
                    const totalInvolved = (_.sumBy(data, row => row.total_survivors) + _.sumBy(data, row => row.total_fatalities))
                    survivalRateData = { survivalRate: _.sumBy(data, row => row.total_survivors)/totalInvolved, fatalityRate: _.sumBy(data, row => row.total_fatalities)/totalInvolved}
                
                })
                // // Get keyword data
                // .then(() => {
                //     keywordData = _.chain(data).groupBy(row => row.keyword).mapValues(row => row.length).value()
                //     keywordData = _.fromPairs(_.sortBy(_.toPairs(keywordData), 1).reverse())
                // })
                // Get aircraft data
                .then(() => {
                    aircraftData = _.chain(data).groupBy(row => row.aircraft).mapValues(row => row.length).value()
                    aircraftData = _.fromPairs(_.sortBy(_.toPairs(aircraftData), 1).reverse())
                })


app.get('/api/data/:minDate/:maxDate', (req, res) => {
    if (req.params.minDate == null || req.params.maxDate == null){
        res.status(404).send('No crash data found!')
        return
    }
    data = _.filter( data, (row) => new Date(row.date) >= new Date(req.params.minDate) &&  new Date(row.date) <= new Date(req.params.maxDate)) 
    res.send('yo')
})

app.get('/api/data/:country', (req, res) => {
    if (req.params.country == null){
        res.status(404).send('No crash data found!')
        return
    }
    data = _.filter( data, (row) => row.country === req.params.country ) 
    res.send('yo')
})

app.get('/api/data/:keyword', (req, res) => {
    if (req.params.keyword == null){
        res.status(404).send('No crash data found!')
        return
    }
    data = _.filter( data, (row) => row.keyword === req.params.keyword ) 
    res.send('yo')
})

app.get('/api/data/:aircraft', (req, res) => {
    if (req.params.aircraft == null){
        res.status(404).send('No crash data found!')
        return
    }
    data = _.filter( data, (row) => row.aircraft === req.params.aircraft ) 
    res.send('yo')
})

app.get('/api/data/:id', (req, res) => {
    if (req.params.id == null){
        res.status(404).send('No crash data found!')
        return
    }
    data = _.filter( data, (row) => row.id === req.params.id ) 
    res.send('yo')
})


const port = process.env.PORT || 5000

app.listen(port, console.log(`running back-end on port ${port}`))
