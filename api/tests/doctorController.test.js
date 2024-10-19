const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Doctor = require('../models/Doctor');

describe('Doctor Controller Tests', () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await Doctor.deleteMany({});
  });

  it('should add a doctor successfully', async () => {
    const res = await request(app)
      .post('/doctor/add')
      .send({
        email: 'doctor@example.com',
        name: 'Dr. John',
        password: 'doctor123',
        specialization: 'Cardiology',
        qualifications: 'MBBS'
      });

    expect(res.statusCode).toEqual(200);
    const doctor = await Doctor.findOne({ email: 'doctor@example.com' });
    expect(doctor).toBeTruthy();
    expect(doctor.name).toBe('Dr. John');
    expect(res.body).toBe('Doctor Added');
  });

  it('should login a doctor successfully', async () => {
    const doctor = new Doctor({
      email: 'doctor@example.com',
      name: 'Dr. John',
      password: 'doctor123',
      specialization: 'Cardiology',
      qualifications: 'MBBS'
    });
    await doctor.save();

    const res = await request(app)
      .post('/doctor/login')
      .send({
        email: 'doctor@example.com',
        password: 'doctor123'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.rst).toBe('success');
  });

  it('should fail to login with wrong password', async () => {
    const doctor = new Doctor({
      email: 'doctor@example.com',
      name: 'Dr. John',
      password: 'doctor123',
      specialization: 'Cardiology',
      qualifications: 'MBBS'
    });
    await doctor.save();

    const res = await request(app)
      .post('/doctor/login')
      .send({
        email: 'doctor@example.com',
        password: 'wrongpassword'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.rst).toBe('incorrect password');
  });

  it('should fetch a doctor by ID', async () => {
    const doctor = new Doctor({
      email: 'doctor@example.com',
      name: 'Dr. John',
      password: 'doctor123',
      specialization: 'Cardiology',
      qualifications: 'MBBS'
    });
    await doctor.save();

    const res = await request(app).get(`/doctor/get/${doctor._id}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('Doctor fetched');
    expect(res.body.doctor.name).toBe('Dr. John');
  });
});
