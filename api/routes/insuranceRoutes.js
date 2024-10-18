const express = require('express');
const multer = require('multer');
const fs = require('fs');
const InsuranceClaim = require('../models/InsuranceClaim');
const Patient = require('../models/Patient');
const router = express.Router();

// Ensure 'uploads/' directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// New route to validate policy number before submission
router.post('/validatePolicy', async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, policyNo } = req.body;

    // Fetch patient details based on the provided firstName, lastName, and mobileNumber
    const patient = await Patient.findOne({
      firstName,
      lastName,
      phoneNo: mobileNumber,
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Compare the policyNo with the patient's insuranceNo
    if (patient.insuranceNo !== policyNo) {
      return res.status(400).json({
        message: 'The provided policy number does not match the registered insurance number.',
      });
    }

    // If the policy number matches, send success response
    return res.status(200).json({ message: 'Policy number validated successfully' });
  } catch (error) {
    console.error('Error validating policy number:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Existing route to submit insurance claim
router.post('/', upload.single('prescription'), async (req, res) => {
  try {
    const { policyNo, firstName, lastName, mobileNumber } = req.body;

    const patient = await Patient.findOne({
      firstName,
      lastName,
      phoneNo: mobileNumber,
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    if (patient.insuranceNo !== policyNo) {
      return res.status(400).json({
        message: 'The provided policy number does not match the registered insurance number.',
      });
    }

    const newClaim = new InsuranceClaim({
      ...req.body,
      prescriptionFilePath: req.file ? req.file.path : null,
    });
    await newClaim.save();
    res.status(201).json({
      message: 'Insurance claim submitted successfully',
      claimId: newClaim.claimId,
    });
  } catch (error) {
    console.error('Error submitting insurance claim:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET: Fetch all insurance claims
router.get('/', async (req, res) => {
  try {
    const claims = await InsuranceClaim.find();
    res.json(claims);
  } catch (error) {
    console.error('Error fetching claims:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
