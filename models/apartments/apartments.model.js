import apartments from './apartments.mongo.js';

export async function getAllApartments() {
  return await apartments.find({}, { '_id': 0, '__v': 0 });
}
