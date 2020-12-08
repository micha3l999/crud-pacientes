const Record = require('../models/record/Record');
const Patient = require('../models/patient/Patient');

async function createRecord(req, res) {
    try {
        const criteria = {
            _id: req.body.patient
        };
        const patient = await Patient.findOne(criteria, {covid_19: 1});

        if (patient.covid_19) {
            const recordCreated = await new Record(req.body).save();
            return res.status(201).send({ recordCreated });
        } else {
            return res.status(200).send({ message: 'No se puede crear un historial del paciente porque no posee síntomas de covid-19'});
        }

    } catch(error) {
        console.log(`Error: ${ error }`, 500);
        return res.status(500).send({ error });
    }
}

async function showPatientRecord(req, res) {
    const criteria = {
        patient: req.params.patientID
    }
    Record.find(criteria, {})
        .then(records => {
            if(!records.length) {
                return res.status(204).send({ message: 'No content'});
            }
            return res.status(200).send({ records });
        })
        .catch(error  => {
            console.error(error.red);
            return res.status(500).send({ error });
        })
}

async function deleteRecord(req, res) {
    try {
        const criteria  = {
            _id: req.params._id
        }
        const recordRemoved = await Record.findByIdAndRemove(criteria);
        if(recordRemoved) {
            return res.status(200).send({message: `Record removed`});
        } else {
            return res.status(204).send({message: `Not found record to delete`});
        }

    } catch(error) {
        console.error(error.red);
        return res.status(500)
    }
}

module.exports = {
    createRecord,
    showPatientRecord,
    deleteRecord
}