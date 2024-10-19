const request = require('supertest');
const app = require('../app'); // Adjust the path according to your project structure
const Prescription = require('../models/Prescription');
const Patient = require('../models/Patient');
const { sendEmailToPatient } = require('../services/prescriptionMailServices');

// Mock the models and services
jest.mock('../models/Prescription');
jest.mock('../models/Patient');
jest.mock('../services/prescriptionMailServices');

describe('Prescription Controller Tests', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add a new prescription successfully and send an email', async () => {
    // Mock Prescription and Patient model methods
    Prescription.prototype.save = jest.fn().mockResolvedValue();
    Patient.findById = jest.fn().mockResolvedValue({ email: 'patient@example.com' });
    sendEmailToPatient.mockResolvedValue(); // Mock successful email sending

    const prescriptionData = {
      text: 'Take 1 tablet daily',
      apt: 'AppointmentID123',
      pid: 'PatientID123',
    };

    const res = await request(app)
      .post('/prescription/add')
      .send(prescriptionData);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBe('Prescription Added');
    expect(Prescription.prototype.save).toHaveBeenCalled();
    expect(Patient.findById).toHaveBeenCalledWith('PatientID123');
    expect(sendEmailToPatient).toHaveBeenCalledWith('patient@example.com');
  });

  it('should add a new prescription but not send an email if the patient email is not found', async () => {
    // Mock Prescription save and Patient findById to return no email
    Prescription.prototype.save = jest.fn().mockResolvedValue();
    Patient.findById = jest.fn().mockResolvedValue({ email: null }); // No email found
    sendEmailToPatient.mockResolvedValue(); // This should not be called

    const prescriptionData = {
      text: 'Take 1 tablet daily',
      apt: 'AppointmentID123',
      pid: 'PatientID123',
    };

    const res = await request(app)
      .post('/prescription/add')
      .send(prescriptionData);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBe('Prescription Added');
    expect(Prescription.prototype.save).toHaveBeenCalled();
    expect(Patient.findById).toHaveBeenCalledWith('PatientID123');
    expect(sendEmailToPatient).not.toHaveBeenCalled(); // Email should not be sent
  });

  it('should return an error if there is an issue saving the prescription', async () => {
    // Mock save method to throw an error
    Prescription.prototype.save = jest.fn().mockImplementation(() => {
      throw new Error('Save Error');
    });

    const prescriptionData = {
      text: 'Take 1 tablet daily',
      apt: 'AppointmentID123',
      pid: 'PatientID123',
    };

    const res = await request(app)
      .post('/prescription/add')
      .send(prescriptionData);

    expect(res.statusCode).toEqual(500);
    expect(res.body.status).toBe('Error in adding prescription');
    expect(res.body).toHaveProperty('error');
    expect(Prescription.prototype.save).toHaveBeenCalled();
    expect(Patient.findById).not.toHaveBeenCalled(); // Email should not be attempted
    expect(sendEmailToPatient).not.toHaveBeenCalled();
  });

  it('should handle an error when the patient lookup fails', async () => {
    // Mock Prescription save and Patient findById to throw an error
    Prescription.prototype.save = jest.fn().mockResolvedValue();
    Patient.findById = jest.fn().mockImplementation(() => {
      throw new Error('Patient Lookup Error');
    });

    const prescriptionData = {
      text: 'Take 1 tablet daily',
      apt: 'AppointmentID123',
      pid: 'PatientID123',
    };

    const res = await request(app)
      .post('/prescription/add')
      .send(prescriptionData);

    expect(res.statusCode).toEqual(500);
    expect(res.body.status).toBe('Error in adding prescription');
    expect(res.body).toHaveProperty('error');
    expect(Prescription.prototype.save).toHaveBeenCalled();
    expect(Patient.findById).toHaveBeenCalledWith('PatientID123');
    expect(sendEmailToPatient).not.toHaveBeenCalled(); // Email should not be sent
  });
});
