const Record = require('../models/Record');

async function createRecord(req, res) {
    try {
        const recordCreated = await new Record(req.body).save();
        return res.status(201).send({ recordCreated });
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