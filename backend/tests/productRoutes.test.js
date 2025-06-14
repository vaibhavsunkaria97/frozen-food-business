process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../server');
const Product = require('../models/productModel');

jest.mock('../models/productModel');

Product.find.mockResolvedValue([{ name: 'Sample', price: 1 }]);
Product.findById = jest.fn().mockResolvedValue({ name: 'Sample', price: 1 });

describe('GET /api/products', () => {
  it('returns product list', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.products)).toBe(true);
  });
});

describe('GET /api/products/:id', () => {
  it('returns single product', async () => {
    const res = await request(app).get('/api/products/123');
    expect(res.status).toBe(200);
    expect(res.body.product).toBeDefined();
  });
});
