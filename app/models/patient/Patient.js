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
        type: Number
    },
    medicines: [{
        type: String
    }],
    email: {
        type: String,
        required: [true, "An email is required"],
        unique: true
    },
    covid_19: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    c_password: {
        type: String,
    },
    address: {
        type: String
    },
    mobile: {
        type: String,
        required: [true, "A number is required"],
        validate: {
            validator(v) {
                let reg = /^[0-9]{10}$/;
                return reg.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
}, {timestamps: true});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;