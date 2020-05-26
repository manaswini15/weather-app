const path = require('path')                // core module 
const express = require('express')          // npm module
const hbs = require('hbs')

const geocode = require(path.join(__dirname,'../utils/geocode.js'))
const forecast = require(path.join(__dirname,'../utils/forecast.js'))

const app = express()
const port = process.env.PORT || 3000
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '..', 'public')  // console.log(__dirname)     console.log(__filename)
const viewPath = path.join(__dirname,'../templates/templateViews')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {                       // No use - because index.html loads at default
    // res.send('<h1> Hello express! </h1>')       // Using it again for dynamic content through hbs
    res.render('index', {
        title : 'Weather Application',
        name : 'Manas'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About me!',
        name : 'Manas'
    })
})

app.get('/help', (req, res) => {                     //help and help.html are different 
    res.render('help',{                                     // Still removing
        message : 'Help me with the navigation!',
        title : 'Help',
        name: 'Manas'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address not found!'
        })
    }

    geocode(req.query.address,(error, {latitude,longitude,location} = {})=> {    
        if(error) {
            return res.send({
                error : error
            })
        }
        
        forecast(latitude, longitude, (error, forecastData) => { // forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast : forecastData,
                location, 
                address : req.query.address
            })
          })
        
    }) 

    
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title : '404',
        error: 'Help article',
        name: 'Manas'
    })
})


app.get('*', (req,res) => {
    res.render('404',{
        title : '404',
        error: 'Page',
        name: 'Manas'   
    })
})

app.listen(port, () => {
    console.log('Server is up at port ' + port + '!')
})




// app.get('/help', (req,res) => {                     //help and help.html are different 
//     res.send([{                                     // Still removing
//         name : 'Manas',
//         age : 21
//     },'I am cool!'])
// })

// app.get('/about', (req,res) => {
//     res.send('<h2 style=color:red;> About page </h2>')
// })
