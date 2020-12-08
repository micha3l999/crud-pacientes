const mongoose = require('mongoose');
const ModelConfig = require('./config');

const RecordSchema = new mongoose.Schema({
    symptoms: [{
        type: String,
        required: true,
        enum: [
            ModelConfig.get("/SYMPTOMS", { SYMPTOM: "FIEBRE" }),
            ModelConfig.get("/SYMPTOMS", { SYMPTOM: "PERDIDA_DEL_OLFATO" }),
            ModelConfig.get("/SYMPTOMS", { SYMPTOM: "PERDIDA_DEL_GUSTO" }),
            ModelConfig.get("/SYMPTOMS", { SYMPTOM: "CANSANCIO" }),
            ModelConfig.get("/SYMPTOMS", { SYMPTOM: "TOS_SECA" }),
            ModelConfig.get("/SYMPTOMS", { SYMPTOM: "DOLOR_DE_PECHO" }),
            ModelConfig.get("/SYMPTOMS", { SYMPTOM: "DOLOR_DE_GARGANTA" }),
            ModelConfig.get("/SYMPTOMS", { SYMPTOM: "INCAPACIDAD_PARA_HABLAR" }),
            ModelConfig.get("/SYMPTOMS", { SYMPTOM: "INCAPACIDAD_PARA_MOVERSE" })
        ]
    }],
    patient: { type: mongoose.Schema.ObjectId, ref: "Patient", required: true},
    covid_19ExamResult: {
        type: Boolean,
        required: true
    }
}, {timestamps: true});

const Record = mongoose.model('Record', RecordSchema);

module.exports = Record;