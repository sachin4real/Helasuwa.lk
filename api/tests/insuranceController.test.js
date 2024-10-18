const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Patient = require('../models/Patient');

// Mock the Patient model
jest.mock('../models/Patient');

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

  it('should validate policy number successfully', async () => {
    // Mock successful patient retrieval
    Patient.findOne.mockResolvedValue({
      firstName: 'John',
      lastName: 'Doe',
      phoneNo: '123456789',
      insuranceNo: 'POL12345'
    });

    const res = await request(app)
      .post('/insurance/validatePolicy')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        mobileNumber: '123456789',
        policyNo: 'POL12345'
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
      insuranceNo: 'WRONG_POLICY'
    });

    const res = await request(app)
      .post('/insurance/validatePolicy')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        mobileNumber: '123456789',
        policyNo: 'POL12345'
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('The provided policy number does not match the registered insurance number.');
  });
});
