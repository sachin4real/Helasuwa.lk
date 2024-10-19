const request = require("supertest");
const app = require("../app"); // assuming your Express app is exported in app.js or server.js
const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const Channel = require("../models/Channel");
const Patient = require("../models/Patient");

describe("POST /appointments", () => {
  let channelId;
  let patientId;

  // Mock the required data before running tests
  beforeAll(async () => {
    const channel = new Channel({
      doctor: "Dr. John Doe",
      drName: "John Doe",
      startDateTime: new Date(),
      maxPatients: 5,
      patients: 1,
      completed: false,
    });
    await channel.save();
    channelId = channel._id;

    const patient = new Patient({
      name: "Jane Smith",
      email: "jane@example.com",
    });
    await patient.save();
    patientId = patient._id;
  });

  // Close the database connection after all tests are done
  afterAll(async () => {
    await Channel.deleteMany({});
    await Patient.deleteMany({});
    await Appointment.deleteMany({});
    await mongoose.connection.close();
  });

  it("should create a new appointment successfully", async () => {
    const newAppointment = {
      patient: patientId,
      notes: "This is a test note",
      channel: {
        _id: channelId,
        doctor: "Dr. John Doe",
        startDateTime: new Date(),
        maxPatients: 5,
        patients: 1,
        drName: "John Doe",
        completed: false,
      },
      name: "Jane Smith",
      age: 30,
      gender: "Female",
      contact: "1234567890",
    };

    const res = await request(app)
      .post("/appointments")
      .send(newAppointment);

    expect(res.statusCode).toBe(200); // Ensure the request is successful
    expect(res.body).toBe("New appointment Added"); // Ensure correct response

    // Check if the appointment was created
    const appointment = await Appointment.findOne({ patient: patientId });
    expect(appointment).not.toBeNull();
    expect(appointment).toHaveProperty("name", "Jane Smith");
    expect(appointment).toHaveProperty("age", 30);
    expect(appointment).toHaveProperty("gender", "Female");
    expect(appointment).toHaveProperty("contact", "1234567890");
  });

  it("should fail if required fields are missing", async () => {
    const incompleteAppointment = {
      notes: "Incomplete appointment",
      // Missing patient and other fields
    };

    const res = await request(app)
      .post("/appointments")
      .send(incompleteAppointment);

    expect(res.statusCode).toBe(500); // Ensure error status is returned
    expect(res.body.status).toBe("Error in creating appointment");
    expect(res.body.error).toBeDefined(); // Ensure there's an error message
  });
});
