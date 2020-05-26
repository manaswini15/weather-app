const request = require('request')



const forecast = (latitude, longitude, callback) => {
    const url='http://api.weatherstack.com/current?access_key=906a9eec96aed69ebba8b3aeecdb0610&query=' + latitude + ',' + longitude +'&units=f'
    request({url, json:true},(error, {body}) => { //request({url, json:true},(error, response) => {
    // const data=JSON.parse(response.body)
    // console.log(response.body.current)
    if(error){
        callback('Unable to connect to weather services!',  undefined)
    } 
    else if(body.error){ //else if(response.body.error){
        callback('Unable to find location!', undefined)
    }
    else {
        callback(undefined, body.current.weather_descriptions[0]+". It is currenly "+ body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" degrees out. The humidity is " + body.current.humidity + "%.")
    // callback(undefined, response.body.current.weather_descriptions[0]+". It is currenly "+ response.body.current.temperature+" degrees out. It feels like "+response.body.current.feelslike+" degrees out.")
    }
})
}

module.exports = forecast