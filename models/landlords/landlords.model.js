import landlordsDB from './landlords.schema.js';

export async function getLandlord(landlordId) {
  return await landlordsDB.findOne({ landlordId }, { '_id': 0, '__v': 0 });
}

export async function getAllLandlords() {
  return await landlordsDB.find({}, { '_id': 0, '__v': 0 });
}

export async function createLandlord(newLandlord) {
  return await landlordsDB.create(newLandlord);
}

export async function updateLandlord(updatedLandlord) {
  return await landlordsDB.findOneAndUpdate(
    { landlordId: updatedLandlord.landlordId },
    updatedLandlord,
    {
      upsert: false,
      new: true,
      projection: { '_id': 0 }
    }
  );
}

export async function deleteLandlord(landlordId) {
  return await landlordsDB.findOneAndDelete({ landlordId });
}
