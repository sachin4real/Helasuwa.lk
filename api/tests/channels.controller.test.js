
const request = require("supertest");
const app = require("../app"); // assuming your Express app is exported in app.js or server.js
const mongoose = require("mongoose");

describe("GET /doctorchannels/:id", () => {
  // Replace the doctorId with a valid ID from your database or mock data
  const doctorId = "609c73f2a4e9f94044c10bc2"; 

  // Close the database connection after all tests are done
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should fetch all channels for a specific doctor", async () => {
    const res = await request(app).get(`/channel/doctorchannels/${doctorId}`);

    expect(res.statusCode).toBe(200); // Assert that the response has a status code of 200
    expect(res.body).toBeInstanceOf(Array); // Assert that the response body is an array

    // Optionally, you can check the contents of the array
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty("doctor", doctorId); // Ensures the correct doctor ID is returned
      expect(res.body[0]).toHaveProperty("startDateTime");
      expect(res.body[0]).toHaveProperty("maxPatients");
      expect(res.body[0]).toHaveProperty("drName");
      expect(res.body[0]).toHaveProperty("specialization");
    }
  });
});
