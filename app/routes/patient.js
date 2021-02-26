const express = require('express');
const { validate, ValidationError, Joi } = require('express-validation');

const PatientController = require('../controllers/users/PatientController');
const RecordConfig = require('../models/record/config');

const Router = express.Router();

Router.get('/', PatientController.showAllPatients);

Router.post('/', validate({
    body: Joi.object({
        name: Joi.string().required(),
        lastName: Joi.string().required(),
        age: Joi.number().optional(),
        medicines: Joi.array().optional(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        c_password: Joi.ref('password'),
        address: Joi.string().optional(),
        mobile: Joi.string().required(),
        symptoms: Joi.array().items(Joi.string().valid(
            RecordConfig.get("/SYMPTOMS", { SYMPTOM: "FIEBRE" }),
            RecordConfig.get("/SYMPTOMS", { SYMPTOM: "PERDIDA_DEL_OLFATO" }),
            RecordConfig.get("/SYMPTOMS", { SYMPTOM: "PERDIDA_DEL_GUSTO" }),
            RecordConfig.get("/SYMPTOMS", { SYMPTOM: "CANSANCIO" }),
            RecordConfig.get("/SYMPTOMS", { SYMPTOM: "TOS_SECA" }),
            RecordConfig.get("/SYMPTOMS", { SYMPTOM: "DOLOR_DE_PECHO" }),
            RecordConfig.get("/SYMPTOMS", { SYMPTOM: "DOLOR_DE_GARGANTA" }),
            RecordConfig.get("/SYMPTOMS", { SYMPTOM: "INCAPACIDAD_PARA_HABLAR" }),
            RecordConfig.get("/SYMPTOMS", { SYMPTOM: "INCAPACIDAD_PARA_MOVERSE" })
        )).optional(),
    })
}), PatientController.confirmPassword, PatientController.registerPatient);

Router.get('/:key/:value', PatientController.find, PatientController.showPatient);

Router.put('/:key/:value', PatientController.updatePatient);

Router.delete('/:key/:value', PatientController.find, PatientController.removePatient);


module.exports = Router;
