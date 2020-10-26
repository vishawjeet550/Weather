const express = require('express');
const hbs = require("hbs");
const path = require("path");
const app = express();
const newsData=require('../utils/newsData')
const weatherData = require('../utils/weatherData');

const port = process.env.PORT || 3000

const publicStaticDirPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather'
    })
})
// app.get('/news',(req,res)=>{
//     res.render('news')
// })
app.get('/news',(req,res)=>{
        newsData((error,data)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.render('news',{
                article:data.articles
            })
        })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: "Invalid Location"
        })
    }

    weatherData(address, (error, {temperature, description, cityName} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        res.send({
            temperature,
            description,
            cityName
        })
    })
});

app.get("*", (req, res) => {
    res.render('404', {
        title: "page not found"
    })
})


app.listen(port)