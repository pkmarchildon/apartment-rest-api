import apartmentsDB from './apartments.schema.js';

export async function getAllApartments(limit, skip) {
  return await apartmentsDB
    .find({}, { '_id': 0, '__v': 0 })
    .skip(skip)
    .limit(limit);
}

export async function getFilteredApartments(params, limit, skip) {
  return await apartmentsDB
    .find(params, { '_id': 0, '__v': 0 })
    .skip(skip)
    .limit(limit);
}

export async function createApartment(apartment) {
  return await apartmentsDB.create(apartment);
}

export async function updateApartment(apartment) {
  return await apartmentsDB.findOneAndUpdate(
    { apartmentId: apartment.apartmentId },
    apartment,
    {
      upsert: false,
      new: true,
      projection: { '_id': 0 }
    }
  );
}

export async function deleteApartment(apartmentId) {
  return await apartmentsDB.findOneAndDelete({ apartmentId });
}
