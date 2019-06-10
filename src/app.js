const path = require('path')

const express = require('express')
const hbs = require('hbs')


const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()
//SETING UP DIRECTORIES
const publicDirPath = path.resolve('public')
const viewsPath = path.resolve('templates/views')
const partialsPath = path.resolve('templates/partials') 


app.use(express.static(publicDirPath))

//SETTING UP HANDLEBARS
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('/',(req,res)=>{
  res.render('index.hbs',{
    title: 'Weather',
    name: 'Stojan'
  })
})

app.get('/help',(req,res)=>{
  res.render('help.hbs',{
    title: 'Welcome to help page',
    name: 'Stojan'
  })
})

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    title: 'Welcome to about page',
    name: 'Stojan'
  })
})

app.get('/weather',(req,res)=>{
  if(!req.query.address){
   return res.send('You must enter the address')
}
  
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
      if (error){
        return res.send({error})
      } 
      forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
          return res.send({error})
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address

        })
      })
    })
  
})

// 404 Errors
app.get('/help/*',(req,res)=>{
  res.render('404',{
    title: '404',
    name: 'Stojan',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req,res)=>{
  res.render('404',{
    title: 404,
    name: 'stojan',
    errorMessage: 'Page not found'
  })
})


app.listen(3000,() =>{
  console.log('Server is up and running on port 3000')
})