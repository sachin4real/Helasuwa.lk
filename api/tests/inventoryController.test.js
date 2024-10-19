const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Inventory = require('../models/Inventory');

describe('Inventory Controller Tests', () => {

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
    await Inventory.deleteMany({});
  });

  it('should add inventory successfully', async () => {
    const res = await request(app)
      .post('/inventory/add')
      .send({
        item_id: 'ITEM001',
        item_name: 'Item 1',
        category: 'Category A',
        quantity: 100,
        price: 10
      });

    expect(res.statusCode).toEqual(200);
    const item = await Inventory.findOne({ item_id: 'ITEM001' });
    expect(item).toBeTruthy();
    expect(item.item_name).toBe('Item 1');
    expect(res.body).toBe('Data is saved to the database');
  });

  it('should fetch all inventory items', async () => {
    const inventory = new Inventory({
      item_id: 'ITEM001',
      item_name: 'Item 1',
      category: 'Category A',
      quantity: 100,
      price: 10
    });
    await inventory.save();

    const res = await request(app).get('/inventory/');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].item_id).toBe('ITEM001');
  });

  it('should update an inventory item by ID', async () => {
    const inventory = new Inventory({
      item_id: 'ITEM001',
      item_name: 'Item 1',
      category: 'Category A',
      quantity: 100,
      price: 10
    });
    await inventory.save();

    const res = await request(app)
      .put(`/inventory/update/${inventory._id}`)
      .send({
        item_id: 'ITEM001',
        item_name: 'Updated Item 1',
        category: 'Category B',
        quantity: 50,
        price: 15
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('Inventory updated');
    const updatedItem = await Inventory.findById(inventory._id);
    expect(updatedItem.item_name).toBe('Updated Item 1');
  });

  it('should delete an inventory item by ID', async () => {
    const inventory = new Inventory({
      item_id: 'ITEM001',
      item_name: 'Item 1',
      category: 'Category A',
      quantity: 100,
      price: 10
    });
    await inventory.save();

    const res = await request(app).delete(`/inventory/delete/${inventory._id}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('Inventory deleted');
    const deletedItem = await Inventory.findById(inventory._id);
    expect(deletedItem).toBeNull();
  });
});
