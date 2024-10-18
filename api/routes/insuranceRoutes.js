const express = require('express');
const multer = require('multer');
const fs = require('fs');
const nodemailer = require('nodemailer');
const InsuranceClaim = require('../models/InsuranceClaim');
const Patient = require('../models/Patient');
const router = express.Router();


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

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
        user: "helasuwa@zohomail.com", 
        pass: process.env.EmailPass, 
    },
});

// Function to send email to the patient after claim submission
const sendClaimEmail = async (patientEmail) => {
    const mailOptions = {
        from: "helasuwa@zohomail.com", 
        to: patientEmail, 
        subject: "Insurance Claim Request Received", 
        text: "Hello, Your insurance claim request has been received and is being processed. The insurance company will review your claim and inform you of further details shortly.", // Plain text body
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Insurance claim email sent successfully");
    } catch (error) {
        console.error("Error sending insurance claim email: ", error);
    }
};

// New route to validate policy number before submission
router.post('/validatePolicy', async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, policyNo } = req.body;

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

    return res.status(200).json({ message: 'Policy number validated successfully' });
  } catch (error) {
    console.error('Error validating policy number:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to submit insurance claim and send email notification
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

    // Send confirmation email to the patient
    if (patient.email) {
      await sendClaimEmail(patient.email); // Send email to the patient's email address
    }

    res.status(201).json({
      message: 'Insurance claim submitted successfully',
      claimId: newClaim.claimId,
    });
  } catch (error) {
    console.error('Error submitting insurance claim:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

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
