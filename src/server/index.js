var path = require('path')
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config({path: '../../.env'});

let projectData = {};

const app = express()

app.use(express.static('dist'))
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

console.log(__dirname)


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(4000, function () {
    console.log('Example app listening on port 4000!')
})

app.post('/add', function (req, res) {
    console.log(req.body)
    projectData['polarity'] = res.polarity;
    projectData['subjectivity'] = res.subjectivity;
    projectData['polarity_confidence'] = res.polarity_confidence;
    projectData['subjectivity_confidence'] = res.subjectivity_confidence;
    console.log(projectData)
    res.send(projectData);
});

app.get('/trip/:location', (req, res) => {
    const location = req.params.location
    console.log(location)

    // Pixabay API
    const pixaURL = 'https://pixabay.com/api/?key='
    const pixaKEY = '15187864-82c579e615a12c254f00ff13d'
    const pixaLeft = '&image_type=photo&category=travel'

    axios.get(pixaURL+pixaKEY+'&q='+location+pixaLeft)
    .then(response => {
        const photo = response.data.hits[0].webformatURL;
        console.log(photo);
        return photo;
    })
    .catch(error => {
        console.log(error);
    });


    // Geonames API
    const geoURL = 'http://api.geonames.org/postalCodeSearchJSON?placename='
    const geoMore = '&username='
    const geoUser = 'ThisIsItz'
    const darkURL = 'https://api.darksky.net/forecast/'
    const darkKEY = '7f25efefe036bbe11611fa167edf98ea'

    axios.get(geoURL+location+geoMore+geoUser)
    .then(response => {
        const {lat, lng} = response.data.postalCodes[0];
        const coordenate = {lat, lng}; 
        console.log(coordenate);
        return axios.get(darkURL+darkKEY+'/'+coordenate.lat+','+coordenate.lng)
        .then(response => {
            const {temperature} = response.data.currently
            console.log(temperature);
            return temperature;
        })
        .catch(error => {
            console.log(error);
        });
    })
    .catch(error => {
        console.log(error);
    });

     // DarkSky API





    res.send({
        coordenate: 350124,
        temperature: '29',
        locationphoto: 'esto es una url'
    })
});


