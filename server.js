const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = 'ace8a0e6d00975c137f56a9d38e9ca07';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    res.render('index', { weather: null, error: null });
})

app.post('/', function(req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    request(url, function(err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Erè, silvouplè eseye ankò' });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Erè, silvouplè eseye ankò' });
            } else {
                let weatherText = `Li fè ${weather.main.temp} degre nan ${weather.name}!`;
                res.render('index', { weather: weatherText, error: null });
            }
        }
    });
})

app.listen(3000, function() {
    console.log('App lan ouvè sou 3000!')
})