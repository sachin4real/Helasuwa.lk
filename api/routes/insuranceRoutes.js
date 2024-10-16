const express = require('express');
const multer = require('multer');
const fs = require('fs');
const InsuranceClaim = require('../models/InsuranceClaim');
const router = express.Router();

// Ensure 'uploads/' directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files in 'uploads/'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

router.post('/', upload.single('prescription'), async (req, res) => {
  try {
    const newClaim = new InsuranceClaim({
      ...req.body,
      prescriptionFilePath: req.file ? req.file.path : null,
    });
    await newClaim.save();
    res.status(201).json({ message: 'Insurance claim submitted successfully' });
  } catch (error) {
    console.error('Error submitting insurance claim:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
