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
const keyMap = {
    Date: 'date',
    Location: 'country',
    Operator: 'operator',
    type: 'aircraft',
    Aboard: 'total_aboard',
    Fatalities: 'total_fatalities',
    Ground: 'fatalities_ground',
    Summary: 'description'
}
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
                        _.forEach(_.keys(row), (key) => {
                            if (typeof (key) === 'undefined'){
                                isGood = false;
                                return false
                            }
                        })

                        // Filter location col to only have country name
                        if (isGood){
                            if (row.Location.includes(',')){
                                row.Location = row.Location.split(',')[1].trim()
                            }
                        }

                        // Map keys to set key values
                        row = _.mapKeys(row, (value, key) => keyMap[key])

                        // Add incremental unique id
                        row.id = index;
                        data.push(row)
                    })
                })
                .then( () => {
                    _.forEach(data, (row) => {
                        console.log(row)
                    })
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
