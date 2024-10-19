const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

describe('Admin Controller Tests', () => {

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
    await Admin.deleteMany({});
  });

  it('should add an admin successfully', async () => {
    const res = await request(app)
      .post('/admin/add')
      .send({
        email: 'admin@example.com',
        name: 'Admin',
        phone: '123456789',
        roleName: 'Manager',
        allocatedWork: 'Managing System',
        password: 'admin123'
      });

    expect(res.statusCode).toEqual(200);
    const admin = await Admin.findOne({ email: 'admin@example.com' });
    expect(admin).toBeTruthy();
    expect(admin.name).toBe('Admin');
    expect(res.body).toBe('Admin Added');
  });

  it('should delete an admin successfully', async () => {
    const admin = new Admin({
      email: 'admin@example.com',
      name: 'Admin',
      phone: '123456789',
      roleName: 'Manager',
      allocatedWork: 'Managing System',
      password: 'admin123'
    });
    await admin.save();

    const res = await request(app).delete(`/admin/delete/${admin._id}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('Staff deleted');
    const deletedAdmin = await Admin.findById(admin._id);
    expect(deletedAdmin).toBeNull();
  });

  it('should login an admin successfully', async () => {
    const admin = new Admin({
      email: 'admin@example.com',
      name: 'Admin',
      phone: '123456789',
      roleName: 'Manager',
      allocatedWork: 'Managing System',
      password: 'admin123'
    });
    await admin.save();

    const res = await request(app)
      .post('/admin/login')
      .send({
        email: 'admin@example.com',
        password: 'admin123'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.rst).toBe('success');
  });

  it('should fail to login with incorrect email', async () => {
    const admin = new Admin({
      email: 'admin@example.com',
      name: 'Admin',
      phone: '123456789',
      roleName: 'Manager',
      allocatedWork: 'Managing System',
      password: 'admin123'
    });
    await admin.save();

    const res = await request(app)
      .post('/admin/login')
      .send({
        email: 'wrongemail@example.com',
        password: 'admin123'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.rst).toBe('invalid admin');
  });
});
