import supertest from 'supertest';

import { mongoConnect, mongoDisconnect } from '../../../services/mongo.js';
import app from '../../../app.js';

describe('Apartments API', () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('Test GET /v1/apartments', () => {
    test('Get all apartments. Should return a list of 3.', async () => {
      const response = await supertest(app).get('/v1/apartments');

      expect(response.status).toBe(200);
    });

    test('Get the apartments matching 1 criteria. Should return a list of 1.', async () => {
      const response = await supertest(app).get('/v1/apartments?rooms=2');

      expect(response.body.length).toBe(1);
    });
  });

  describe('Test POST /v1/apartments', () => {
    const newApartmentAllProperties = {
      price: 500,
      rooms: 1,
      den: 0,
      bathrooms: 1,
      parking: 0,
      garage: 0,
      backyard: false,
      internet: false,
      electricity: false,
      heated: false,
      furnished: false,
      pet: false,
      pool: false,
      area: 623,
      available: '2022-07-01T00:00:00.000+00:00',
      storage: false,
      yearOfConstruction: '1980-07-01T00:00:00.000+00:00',
      landlordComments: [],
      tenantsComments: [],
      commentsAboutTenants: [],
      renovations: [],
      pictures: []
    };

    const newApartmentMissingProperty = {
      rooms: 1,
      den: 0,
      bathrooms: 1,
      parking: 0,
      garage: 0,
      backyard: false,
      internet: false,
      electricity: false,
      heated: false,
      furnished: false,
      pet: false,
      pool: false,
      area: 623,
      available: '2022-07-01T00:00:00.000+00:00',
      storage: false,
      yearOfConstruction: '1980-07-01T00:00:00.000+00:00',
      landlordComments: [],
      tenantsComments: [],
      commentsAboutTenants: [],
      renovations: [],
      pictures: []
    };

    const newApartmentMissingPropertyValue = {
      price: null,
      rooms: 1,
      den: 0,
      bathrooms: 1,
      parking: 0,
      garage: 0,
      backyard: false,
      internet: false,
      electricity: false,
      heated: false,
      furnished: false,
      pet: false,
      pool: false,
      area: 623,
      available: '2022-07-01T00:00:00.000+00:00',
      storage: false,
      yearOfConstruction: '1980-07-01T00:00:00.000+00:00',
      landlordComments: [],
      tenantsComments: [],
      commentsAboutTenants: [],
      renovations: [],
      pictures: []
    };

    test('Create a new apartment with all the properties.', async () => {
      const response = await supertest(app)
        .post('/v1/apartments')
        .send(newApartmentAllProperties);

      expect(response.status).toBe(200);
    });

    test('Try to create a new apartment, but missing the price property.', async () => {
      const response = await supertest(app)
        .post('/v1/apartments')
        .send(newApartmentMissingProperty);

      expect(response.body).toMatchObject({ error: 'A property is missing.' });
    });

    test('Try to create a new apartment, but missing the value for the price field.', async () => {
      const response = await supertest(app)
        .post('/v1/apartments')
        .send(newApartmentMissingPropertyValue);

      expect(response.body).toMatchObject({
        error: 'A property is missing a value'
      });
    });
  });

  describe('Test PUT /v1/apartments', () => {
    const updatedApartment = {
      'apartmentId': 'cb055c37-095d-4fce-8b92-deca594be355',
      'price': 1500
    };
    const wrongApartmentId = {
      'apartmentId': 'cb055c37-095d-4fce-8b92-deca294be355',
      'price': 1500
    };

    const returnedDocument = {
      apartmentId: 'cb055c37-095d-4fce-8b92-deca594be355',
      price: 150000,
      rooms: 3,
      den: 0,
      bathrooms: 1,
      parking: 1,
      garage: 0,
      backyard: true,
      internet: false,
      electricity: false,
      heated: false,
      furnished: false,
      pet: true,
      pool: false,
      area: 1000,
      available: '2022-07-01T00:00:00.000Z',
      storage: false,
      yearOfConstruction: '1982-01-01T00:00:00.000Z',
      landlordComments: [],
      tenantsComments: [],
      commentsAboutTenants: [],
      renovations: [],
      pictures: []
    };

    test('Update an existing apartment.', async () => {
      const response = await supertest(app)
        .put('/v1/apartments')
        .send(updatedApartment);

      expect(response.body).toMatchObject(returnedDocument);
    });

    test('Update a document that does not exists.', async () => {
      const response = await supertest(app)
        .put('/v1/apartments')
        .send(wrongApartmentId);

      expect(response.body).toMatchObject({
        error: 'Could not find the document.'
      });
    });
  });

  /*
  describe('Test DELETE /v1/apartments', () => {
    const apartmentId = '61fa867b-ce4b-4bac-adde-cf223194d59d';

    test('Delete existing document', async () => {
      const response = await supertest(app).delete(
        `/v1/apartments?apartmentId=${apartmentId}`
      );

      expect(response.status).toBe(204);
    });
  });
  */
});
