// models/InsuranceClaim.js
const mongoose = require('mongoose');

const insuranceClaimSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  sex: { type: String, required: true },
  relationshipToInsured: { type: String, required: true },
  status: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  prescriptionFilePath: { type: String }, // Path to uploaded file
});

module.exports = mongoose.model('InsuranceClaim', insuranceClaimSchema);
