const express = require('express');
const PatientController = require('../controllers/PatientController');

const Router = express.Router();

Router.get('/', PatientController.showAllPatients);

Router.post('/', PatientController.confirmPassword,PatientController.registerPatient);

Router.get('/:key/:value', PatientController.find, PatientController.showPatient);

Router.put('/:key/:value', PatientController.find, PatientController.updatePatient);

Router.delete('/:key/:value', PatientController.find, PatientController.removePatient);


module.exports = Router;
