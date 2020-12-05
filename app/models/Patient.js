const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    medicines: [{
        type: String
    }],
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    c_password: {
        type: String,
    },
    address: {
        type: String,
    },
    mobile: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;