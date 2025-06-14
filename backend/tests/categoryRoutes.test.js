process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../server');
const Category = require('../models/categoryModel');

jest.mock('../models/categoryModel');

Category.find.mockResolvedValue([{ name: 'Frozen' }]);

describe('GET /api/categories', () => {
  it('returns categories', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.categories)).toBe(true);
  });
});
