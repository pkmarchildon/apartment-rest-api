import supertest from 'supertest';

import { mongoConnect, mongoDisconnect } from '../../../services/mongo.js';
import app from '../../../app.js';

describe('Tenants API', () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('Test GET /v1/tenants', () => {
    test('Get all the tenants.', async () => {
      const response = await supertest(app).get('/v1/tenants');

      expect(response.status).toBe(200);
    });

    test('Get a tenant by its tenantId', async () => {
      const response = await supertest(app)
        .get('/v1/tenants')
        .send({ tenantId: '7b449b19-4c91-45ae-b728-a3d599e2fc74' });

      expect(response.status).toBe(200);
    });
  });

  describe('Test POST /v1/tenants', () => {
    test('Create a new tenant', async () => {
      const newTenantData = {
        firstName: 'Pikou',
        lastName: 'Doe',
        dob: '1992-07-01T00:00:00.000+00:00',
        missedPayment: false,
        rentYears: 5,
        score: 5,
        references: [],
        comments: []
      };

      const response = await supertest(app)
        .post('/v1/tenants')
        .send(newTenantData);

      expect(response.status).toBe(200);
    });

    test('Create a new tenant that is missing an attribute.', async () => {
      const newTenantDataMissingAttribute = {
        lastName: 'Doe',
        dob: '1992-07-01T00:00:00.000+00:00',
        missedPayment: false,
        rentYears: 5,
        score: 5,
        references: [],
        comments: []
      };

      const response = await supertest(app)
        .post('/v1/tenants')
        .send(newTenantDataMissingAttribute);

      expect(response.status).toBe(400);
    });

    test('Create a new tenant with an attribute missing data.', async () => {
      const newTenantDataAttributeNull = {
        firstName: null,
        lastName: 'Doe',
        dob: '1992-07-01T00:00:00.000+00:00',
        missedPayment: false,
        rentYears: 5,
        score: 5,
        references: [],
        comments: []
      };

      const response = await supertest(app)
        .post('/v1/tenants')
        .send(newTenantDataAttributeNull);

      expect(response.status).toBe(400);
    });
  });

  describe('Test PUT /v1/tenants', () => {
    test('Update tenant', async () => {
      const updateTenantData = {
        tenantId: '7b449b19-4c91-45ae-b728-a3d599e2fc74',
        firstName: 'Jim',
        score: 3
      };

      const response = await supertest(app)
        .put('/v1/tenants')
        .send(updateTenantData);

      expect(response.status).toBe(200);
    });

    test('Try updating tenant that is not registered.', async () => {
      const updateTenantDataWrongId = {
        tenantId: '123',
        firstName: 'Jim',
        score: 3
      };

      const response = await supertest(app)
        .put('/v1/tenants')
        .send(updateTenantDataWrongId);

      expect(response.body).toMatchObject({
        error: 'Could not find this tenant.'
      });
    });
  });

  /*
  describe('Test DELETE /v1/tenants', () => {
    const tenantId = '19272a39-3079-4c18-a6ad-d21faf677a11';

    test('Delete existing tenant.', async () => {
      const response = await supertest(app).delete(
        `/v1/tenants?tenantId=${tenantId}`
      );

      expect(response.status).toBe(204);
    });
  });
  */
});
