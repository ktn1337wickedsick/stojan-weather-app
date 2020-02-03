const request = require('request')

const geocode = (adress,callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=pk.eyJ1Ijoia3RuMTMzN3dpY2tlZHNpY2siLCJhIjoiY2p3NmlnZWwwMWE0czRiczAyc3Zma2diMiJ9.gAD4Z1NuYeAISoG-CinSWQ&limit=1`
  
  request({url, json:true},(error,{body})=>{

   if (error){
    callback('Unable to connect to location service',undefined)
   } else if(!body.features) {
    callback('Unable to find location',undefined)
   } else{
    const data = {
      latitude: body.features[0].center[1],
      longitude: body.features[0].center[0],
      location: body.features[0].place_name
  }
    callback(undefined,data,body)
   }

  })
}
module.exports = geocode