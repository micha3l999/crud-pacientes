const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  compannyName: {
    type: String,
    required: true
  },
  ruc: {
    type: String,
  },
  compannyAddress: {
    type: String,
  }
}, {timestamps: true});

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;