const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sudha Subramanian'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sudha Subramanian'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpinfo: 'This is a weather app.  I can provide weather information, given a location.',
        title: 'Help Info',
        name: 'Sudha Subramanian'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a valid address location.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location}) => {
        if (error) {
            return res.send(error)
        }
    //    console.log('Data', data)
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }
    
            res.send({
                location: location,
                summary: forecastData.summary + "  It is currently " + forecastData.temperature + " degrees out.  There is " + forecastData.precipProb + "% chance of rain.",
                lowhightemp: "High for the day is " + forecastData.tempHigh + " and Low for the day is " + forecastData.tempLow + "."
            })
        })
    })   
})  

    // res.send({
    //     location: 'Philadelphia',
    //     forecast: 'Currently cloudy. 10% chance of rain.',
    //     address: req.query.address
    // })


app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found!'
    })
})

// start the server
app.listen(port, () => {
    console.log('Server is up on port '+port)
})
