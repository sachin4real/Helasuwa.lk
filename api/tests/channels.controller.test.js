const request = require("supertest");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Import the router you want to test
const channelRouter = require("../routes/route.channels"); 

// Middleware to handle JSON
app.use(express.json());

// Use the router
app.use("/channels", channelRouter);

// Mock database connection
beforeAll(async () => {
  const url = `mongodb://127.0.0.1/channel_test_db`;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /channels/get/:id", () => {
  it("should fetch a specific channel by ID", async () => {
    // Create a sample channel in the test database
    const newChannel = new Channel({
      doctor: "12345",
      drName: "Dr. Smith",
      specialization: "Cardiology",
      startDateTime: new Date(),
      maxPatients: 10,
    });
    await newChannel.save();

    // Perform the GET request using Supertest
    const response = await request(app).get(`/channels/get/${newChannel._id}`);

    // Check that the response has the correct status and contains the expected data
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("Channel fetched");
    expect(response.body.Channel._id).toBe(newChannel._id.toString());
    expect(response.body.Channel.drName).toBe("Dr. Smith");
    expect(response.body.Channel.specialization).toBe("Cardiology");
  });

  it("should return an error if the channel is not found", async () => {
    const fakeId = mongoose.Types.ObjectId();
    const response = await request(app).get(`/channels/get/${fakeId}`);

    expect(response.statusCode).toBe(500);
    expect(response.body.status).toBe("Error in getting channel details");
  });
});
