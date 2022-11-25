import apartmentsDB from './apartments.schema.js';

export async function getAllApartments() {
  return await apartmentsDB.find({}, { '_id': 0, '__v': 0 });
}

export async function getFilteredApartments(params) {
  return await apartmentsDB.find(params, { '_id': 0, '__v': 0 });
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
