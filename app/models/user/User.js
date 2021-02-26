const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
  email: {
      type: String,
      required: [true, "An email is required"],
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
  },
  role: {
      type: String,
      default: "PATIENT"
  },
  patientID: { type: mongoose.Schema.ObjectId, ref: "Patient" },
  doctorID: { type: mongoose.Schema.ObjectId, ref: "Doctor"},
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;