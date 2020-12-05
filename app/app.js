const express = require('express');
const bodyParser =  require('body-parser');

const App = express();
const patient = require('./routes/patient');
const record = require('./routes/record');

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({extended : false}));


App.use('/patient', patient);
App.use('/record', record);


module.exports = App;