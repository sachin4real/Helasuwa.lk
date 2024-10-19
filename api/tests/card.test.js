const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server-core');

const express = require('express');
const Card = require('../models/Card'); 
const cardRoutes = require('../routes/CardRoutes'); 

let mongoServer;
const app = express();
app.use(express.json()); 
app.use('/cards', cardRoutes); 

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create(); // Start the in-memory MongoDB server
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /cards', () => {
  it('should create a new card', async () => {
    const cardData = {
      cardNumber: '1234567890123456',
      cardName: 'John Doe',
      expYear: '2025',
      expMonth: '12',
      ccv: '123',
    };

    const response = await request(app).post('/cards').send(cardData);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Card details saved successfully');

    // Verify the card was saved in the database
    const cardInDb = await Card.findOne({ cardNumber: '1234567890123456' });
    expect(cardInDb).toBeTruthy();
    expect(cardInDb.cardName).toBe('John Doe');
  });

  it('should return 500 for missing fields', async () => {
    const cardData = {
      cardNumber: '1234567890123456',
      // cardName is missing
      expYear: '2025',
      expMonth: '12',
      ccv: '123',
    };

    const response = await request(app).post('/cards').send(cardData);

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});
