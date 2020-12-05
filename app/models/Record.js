const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    symptoms: [{
        type: String,
        required: true
    }],
    patient: { type: mongoose.Schema.ObjectId, ref: "Patient", required: true},
    examResult: {
        type: String
    }
}, {timestamps: true});

const Record = mongoose.model('Record', RecordSchema);

module.exports = Record;