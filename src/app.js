const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for express config
const public_path = path.join(__dirname, '../public');
const viewsPath  = path.join(__dirname , '../templates/views');
const partialsPath =path.join(__dirname, '../templates/partials'); 

//hanldebars is a template engine to create dynamic pages
//set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// partials allows to render same thing on different pages 
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(public_path));

app.get('',( req,res ) => {
    res.render('index',{
        title: 'Weather',
        name: 'Vivek'
    });
});

app.get('/about',( req,res ) => {
    res.render('about',{
        title: 'About Me',
        name: 'Vivek'
    });
});

app.get('/help',( req,res ) => {
    res.render('help',{
        title: 'Help',
        name: 'Vivek',
        description :'How can I help you ?'
    });
});

app.get('/weather',( req,res )=>{// get method is used to set the route for urls in browser and to operate 
    if(!req.query.address){
        return res.send({
            error:'Please provide an address'
        })
    } else {
        geocode(req.query.address,(error,{ latitude, longitude ,location } = {}) => {
            if(error){
                return res.send({
                    error :'Unable to find location, try another'
                });
            }
            forecast(longitude,latitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error:'Unable to find weather forecast'
                    });
                }else {
                    res.send({
                        address:req.query.address,
                        location:location,
                        forecast:forecastData
                });
                }
             
            })
        });
    }
    
});

app.get('/products',( req,res ) =>{
    if(!req.query.search){
        return res.send({// can't send res more than 1 time
            error: 'Please provide a search value '
        })
    }
    console.log(req.query.search);

    res.send({
        products:[]
    })
})

app.get('/weather/*',( req,res )=>{
    res.render('404',{
        title: '404 Page',
        name: 'Vivek',
        errorMessage: 'Weather Page not found'
    })
});

app.get('/about/*',( req,res )=>{
    res.render('404',{
        title: '404 Page',
        name: 'Vivek',
        errorMessage: 'About Page not found'
    })
});

app.get('/help/*',( req,res )=>{
    res.render('404',{
        title: '404 Page',
        name: 'Vivek',
        errorMessage: 'Help Page not found'
    })
});

app.get('*',( req,res )=>{
    res.render('404',{
        title: '404 Page',
        name: 'Vivek',
        errorMessage: 'Page not found'
    })
});

app.listen(3000, ()=>{// works on this port
    console.log('Server is up on port 3000');
});



