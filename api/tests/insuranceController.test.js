const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const InsuranceClaim = require('../models/InsuranceClaim');
const Patient = require('../models/Patient');
const fs = require('fs');
const path = require('path');

// Mock the Patient and InsuranceClaim models
jest.mock('../models/Patient');
jest.mock('../models/InsuranceClaim');

// Mock the sendClaimEmail function
jest.mock('../services/insuranceMailServices', () => ({
  sendClaimEmail: jest.fn(),
}));

describe('Insurance Controller Tests', () => {
  // Connect to the database before running the tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Close the database connection after the tests
  afterAll(async () => {
    await mongoose.disconnect();
  });

  // Test for validating policy number
  it('should validate policy number successfully', async () => {
    // Mock successful patient retrieval
    Patient.findOne.mockResolvedValue({
      firstName: 'John',
      lastName: 'Doe',
      phoneNo: '123456789',
      insuranceNo: 'POL12345',
    });

    const res = await request(app)
      .post('/insurance/validatePolicy')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        mobileNumber: '123456789',
        policyNo: 'POL12345',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Policy number validated successfully');
  });

  it('should fail validation when policy number does not match', async () => {
    // Mock mismatch insurance number
    Patient.findOne.mockResolvedValue({
      firstName: 'John',
      lastName: 'Doe',
      phoneNo: '123456789',
      insuranceNo: 'WRONG_POLICY',
    });

    const res = await request(app)
      .post('/insurance/validatePolicy')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        mobileNumber: '123456789',
        policyNo: 'POL12345',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('The provided policy number does not match the registered insurance number.');
  });

  // Commenting out the insurance claim submission test
  /*
  it('Insurance claim submitted successfully', async () => {
    // Mock patient retrieval and claim creation
    Patient.findOne.mockResolvedValue({
      firstName: 'John',
      lastName: 'Doe',
      phoneNo: '123456789',
      insuranceNo: 'POL12345',
      email: 'john.doe@example.com',
    });

    InsuranceClaim.prototype.save = jest.fn().mockResolvedValue({
      _id: 'claim123',
      claimId: 'CL12345',
    });

    const res = await request(app)
      .post('/insurance/submitClaim')
      .field('policyNo', 'POL12345')
      .field('firstName', 'John')
      .field('lastName', 'Doe')
      .field('mobileNumber', '123456789')
      .attach('file', path.resolve('/Users/dulanimalka/Desktop/Helasuwa.lk/api/uploads/1729258014170-Prescription_67122cf9a3ded4e969abecfa.pdf'));

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('Insurance claim submitted successfully');
    expect(res.body.claimId).toBe('CL12345');
  });
  */

  // Test for getting all insurance claims
  it('should fetch all insurance claims', async () => {
    // Mock claims retrieval
    InsuranceClaim.find.mockResolvedValue([
      { claimId: 'CL12345', claimType: 'Medical', reason: 'Accident' },
    ]);

    const res = await request(app).get('/insurance');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([
      { claimId: 'CL12345', claimType: 'Medical', reason: 'Accident' },
    ]);
  });

  // Test for deleting a claim by ID
  it('should delete a claim by ID', async () => {
    // Mock successful deletion
    InsuranceClaim.findByIdAndDelete.mockResolvedValue({
      _id: 'claim123',
      claimId: 'CL12345',
    });

    const res = await request(app).delete('/insurance/claim123');

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Insurance claim deleted successfully');
  });

  // Test for deleting all claims
  it('should delete all claims', async () => {
    // Mock deletion
    InsuranceClaim.deleteMany.mockResolvedValue({});

    const res = await request(app).delete('/insurance');

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('All insurance claims deleted successfully');
  });
});