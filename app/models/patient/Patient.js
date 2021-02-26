const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    medicines: [{
        type: String
    }],
    covid_19: {
        type: Boolean,
        default: false
    },
    favoriteDoctor: { type: mongoose.Schema.ObjectId, ref: "User"}
}, {timestamps: true});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;