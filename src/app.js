const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define path for Express config
const publikDirPath = path.join(__dirname, '../publik')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handelbars engine and views  location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// setup static dir to serve
app.use (express.static(publikDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Igor'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Igor the Great'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        info: 'wow wow',
        title: 'Help me',
        name: 'Igor 1'
    })
})
app.get('/weather_rep', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }
   geocode(req.query.address, (error, { latitude, longitude, location}= {}) => {
       if (error) {
           return res.send ({error})
       }
       forecast(latitude, longitude, (error, forecastData)=> {
           if (error) {
               return res.send ({error})
           }
           res.send({
               forecast: forecastData,
               location,
               address: req.query.address
           })


       })

   })
    // res.send({ 
    //     place: 'Houston',
    //     time: 'sommer',
    //     addressFor: req.query.address
    // })
        

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    
        res.render('404', {
            error: 'Help article not found',
            title: '404',
            name: 'Igor 2'
        })
   

})

app.get('*', (req, res) => {
    
    res.render('404', {
        error: '404 errror page',
        title: 'misst',
        name: 'Igor 2'
    })


})

//app.comm
app.listen(port, () => {
    console.log('Server is up on port' + port)
})