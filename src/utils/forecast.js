const request = require('postman-request')
/* const url ='http://api.weatherstack.com/current?access_key=b8fc7e43090a212a6a8cdb817f54308c&query='+ lat'&units=m'
request({url: url, json: true }, (error, response ) => {
    if (error) {
        console.log ('Unable to connect to weather service!')
    }  else if (response.body.error){
        console.log('Unable get location')

    } else {
        console.log( response.body.current.weather_descriptions[0] +'. It is ' + response.body.current.temperature + ' degree. It feel like ' + response.body.current.feelslike) 
    }
    
    
}) */

const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=b8fc7e43090a212a6a8cdb817f54308c&query=' + latitude + ',' + longitude + '&units=m'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback ('Unable to connect to mock serv!', undefined)
        } else if (body.error) {
            callback ('Unable to find . Try another search', undefined)

        } else {
            callback (undefined, body.current.weather_descriptions[0] +'. It is ' + body.current.temperature + ' degree. It feels like ' + body.current.feelslike + ' Time of observation ' + body.current.observation_time)
        

            
        }

    })

}


module.exports = forecast