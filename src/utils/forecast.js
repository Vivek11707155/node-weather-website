const request = require('request');

const forecast = (latitude, longitude, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=3e5e1dbde429ca13b928916c3bd7e758&query='+latitude+','+longitude+',&units=m';

    request({ url , json : true } , (error , { body })=>{
        if(error) {
            callback('Unable to connect with weatherstack url', undefined);
        } else if(body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degrees out . It feels like "+body.current.feelslike+" degrres out."+" Current date and time is: "+body.location.localtime);
            
        }
    });
};

module.exports = forecast;  