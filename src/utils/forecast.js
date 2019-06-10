const request = require('request')

const forecast = (latitude,longitude,callback) => {
  const url = `https://api.darksky.net/forecast/4fd6d8ee142f189c35dae70989744ac3/${latitude},${longitude}?units=si`
  request({url,json:true},(error,{body})=>{
    if(error){
      callback('Cant connect to weather service', undefined)
    } else if(body.error){
      callback('Unable to find location',undefined)
    } else {
      callback(undefined,
        `Temperature: ${Math.round(body.currently.temperature)}°C Summary: ${body.hourly.summary}`)
    }
  })
}
module.exports = forecast