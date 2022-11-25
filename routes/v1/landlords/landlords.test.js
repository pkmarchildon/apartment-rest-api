import supertest from 'supertest';

import { mongoConnect, mongoDisconnect } from '../../../services/mongo.js';
import app from '../../../app.js';

describe('Landlords API', () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('Test GET /v1/landlords', () => {
    test('Get all the landlords.', async () => {
      const response = await supertest(app).get('/v1/landlords');

      expect(response.status).toBe(200);
    });

    test('Get a landlord by its landlordId', async () => {
      const response = await supertest(app)
        .get('/v1/landlords')
        .send({ landlordId: '20ebe2e8-1cf8-4e40-8487-2fa3474660a3' });

      expect(response.status).toBe(200);
    });
  });

  describe('Test POST /v1/landlords', () => {
    test('Create a new landlord', async () => {
      const newLandlordData = {
        firstName: 'Pikou',
        lastName: 'Inc.',
        isCompany: true,
        businessYears: 21,
        sued: false,
        score: 5,
        responseTime: 60,
        followRules: true,
        increaseRent: true,
        comments: []
      };

      const response = await supertest(app)
        .post('/v1/landlords')
        .send(newLandlordData);

      expect(response.status).toBe(200);
    });

    test('Create a new landlord that is missing an attribute.', async () => {
      const newLandlordDataMissingAttribute = {
        lastName: 'Inc.',
        isCompany: true,
        businessYears: 21,
        sued: false,
        score: 5,
        responseTime: 60,
        followRules: true,
        increaseRent: true,
        comments: []
      };

      const response = await supertest(app)
        .post('/v1/landlords')
        .send(newLandlordDataMissingAttribute);

      expect(response.status).toBe(400);
    });

    test('Create a new landlord with an attribute missing data.', async () => {
      const newLandlordDataAttributeNull = {
        firstName: null,
        lastName: 'Inc.',
        isCompany: true,
        businessYears: 21,
        sued: false,
        score: 5,
        responseTime: 60,
        followRules: true,
        increaseRent: true,
        comments: []
      };

      const response = await supertest(app)
        .post('/v1/landlords')
        .send(newLandlordDataAttributeNull);

      expect(response.status).toBe(400);
    });
  });

  describe('Test PUT /v1/landlords', () => {
    test('Update landlord', async () => {
      const updateLandlordData = {
        landlordId: '20ebe2e8-1cf8-4e40-8487-2fa3474660a3',
        firstName: 'Jim',
        score: 3
      };

      const response = await supertest(app)
        .put('/v1/landlords')
        .send(updateLandlordData);

      expect(response.status).toBe(200);
    });

    test('Try updating landlord that is not registered.', async () => {
      const updateLandlordDataWrongId = {
        landlordId: '123',
        firstName: 'Jim',
        score: 3
      };

      const response = await supertest(app)
        .put('/v1/landlords')
        .send(updateLandlordDataWrongId);

      expect(response.body).toMatchObject({
        error: 'Could not find this landlord.'
      });
    });
  });

  /*
  describe('Test DELETE /v1/landlords', () => {
    const landlordId = '45810902-54e8-4340-89da-77a135bc53a4';

    test('Delete existing landlord.', async () => {
      const response = await supertest(app).delete(
        `/v1/landlords?landlordId=${landlordId}`
      );

      expect(response.status).toBe(204);
    });
  });
  */
});
