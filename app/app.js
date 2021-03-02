const express = require('express');
const bodyParser =  require('body-parser');
const { validate, ValidationError, Joi } = require('express-validation');

const App = express();
const patient = require('./routes/patient');
const record = require('./routes/record');

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({extended : false}));

App.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


App.use('/patient', patient);
App.use('/record', record);

App.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
    }
   
    return res.status(500).json(err);
});


module.exports = App;