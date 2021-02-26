const express = require('express');
const RecordController = require('../controllers/records/RecordController');

const Router = express.Router();

Router.get('/:patientID', RecordController.showPatientRecord);

Router.post('/', RecordController.createRecord);

Router.delete('/:_id', RecordController.deleteRecord);

module.exports = Router;