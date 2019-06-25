const request = require('request')


const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/f889d50afeb2d49c62fc420e20f9ae4a/' + lat + ',' + long +'?units=us&lang=en'
    
    request({ url: url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to access Weather services', undefined)
        } else if (body.error) {
            callback('Unable to fetch the data for location.', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProb: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast