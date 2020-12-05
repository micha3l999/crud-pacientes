const Patient = require('../models/Patient');
const colors = require('colors');
const bcrypt = require('bcrypt');

async function confirmPassword(req, res, next) {
    try  {
        if(req.body.password === req.body.c_password) {
            return next();
        } 
        return res.status(400).send({ message: `Error, Asegurese de estar ingresando correctamente las credenciales` });
    } catch(error) {
        console.error(error.red);
        return res.status(500).send({  error });
    }
}

async function registerPatient(req, res) {
    try {
        const salts = 10;
        const newPassword = await bcrypt.hash(req.body.password, salts);

        req.body.password  = newPassword;
        delete req.body.c_password;

        const patientCreated = await new Patient(req.body).save();
        return res.status(201).send({ patientCreated });
    } catch (error) {
        console.error(error.red);
        return res.status(500).send({ error });
    }
}

async function showAllPatients(req, res) {
    try {
        const patients = await Patient.find({})
        if ( patients.length ) return res.status(200).send({ patients });
        return res.status(204).send({ message : `NO CONTENT` });
    } catch (error) {
        console.log(error.red);
        return res.status(500).send({ error });
    }
}

async function showPatient(req, res) {
    try  {
        if(req.body.error) {
            const error = req.body.error;
            console.error(error);
            return res.status(500).send({ error });
        }
        if(!req.body.patient) return res.status(404).send({message: `Not found`});

        const patient = req.body.patient;

        return res.status(200).send({patient});

    } catch(error) {
        console.error(error.red);
        return res.status(500).send({error});
    }
}

async function updatePatient(req, res) {
    try {
        if(req.body.error) {
            const error = req.body.error;
            return res.status(500).send({ error });
        }
        if(!req.body.patient) return res.status(404).send({message: 'Not found'});

        let patient = req.body.patient;
        patient = Object.assign(patient, req.body);
        const patientUpdated = await patient.save();
        return res.status(200).send({message: 'Updated', patientUpdated});

    } catch(error) {
        console.error(error.red);
        return res.status(500).send({ error });
    }
}

async function removePatient(req, res) {
    try {
        if(req.body.error) {
            const error = req.body.error;
            return res.status(500).send({ error });
        }
        if(!req.body.patient) return res.status(404).send({message: 'Not found'});

        await req.body.patient.remove();
        return res.status(200).send({message: 'Patient Removed'});
    } catch(error) {
        console.error(error.red);
        return res.status(500).send({ error });
    }
}

async function find(req, res, next) {
    let query = {};
    try {
        query[req.params.key] = req.params.value;
        const patient = await Patient.findOne(query);

        if (!patient) return next();

        req.body.patient = patient;
        return next();

    } catch(error) {
        req.body.error = error;
        return next();     
    }
}


module.exports = {
    registerPatient,
    showAllPatients,
    find,
    showPatient,
    updatePatient,
    removePatient,
    confirmPassword
}