import { v4 as uuidv4 } from 'uuid';

import {
  getAllApartments,
  getFilteredApartments,
  createApartment,
  updateApartment,
  deleteApartment
} from '../../../models/apartments/apartments.model.js';

export async function httpGetApartments(req, res) {
  const params = req.query;

  if (Object.keys(params).length !== 0) {
    return res.status(200).json(await getFilteredApartments(params));
  } else {
    return res.status(200).json(await getAllApartments());
  }
}

export async function httpCreateApartments(req, res) {
  const apartmentData = req.body;

  // Verify if a property is missing a value.
  if (
    apartmentData.price === null ||
    apartmentData.rooms === null ||
    apartmentData.den === null ||
    apartmentData.bathrooms === null ||
    apartmentData.parking === null ||
    apartmentData.garage === null ||
    apartmentData.backyard === null ||
    apartmentData.internet === null ||
    apartmentData.electricity === null ||
    apartmentData.heated === null ||
    apartmentData.furnished === null ||
    apartmentData.pet === null ||
    apartmentData.pool === null ||
    apartmentData.area === null ||
    apartmentData.available === null ||
    apartmentData.storage === null ||
    apartmentData.yearOfConstruction === null
  ) {
    return res.status(400).json({ error: 'A property is missing a value' });
  }

  // Verify if a property is missing.
  if (
    apartmentData.price === undefined ||
    apartmentData.rooms === undefined ||
    apartmentData.den === undefined ||
    apartmentData.bathrooms === undefined ||
    apartmentData.parking === undefined ||
    apartmentData.garage === undefined ||
    apartmentData.backyard === undefined ||
    apartmentData.internet === undefined ||
    apartmentData.electricity === undefined ||
    apartmentData.heated === undefined ||
    apartmentData.furnished === undefined ||
    apartmentData.pet === undefined ||
    apartmentData.pool === undefined ||
    apartmentData.area === undefined ||
    apartmentData.available === undefined ||
    apartmentData.storage === undefined ||
    apartmentData.yearOfConstruction === undefined
  ) {
    return res.status(400).json({ error: 'A property is missing.' });
  }

  // Create new apartment and add the field apartmentId with a UUID.
  apartmentData.apartmentId = uuidv4();
  apartmentData.price = apartmentData.price * 100;

  await createApartment(apartmentData);

  return res.status(200).json(apartmentData);
}

export async function httpUpdateApartment(req, res) {
  const updatedApartment = req.body;

  // Transform price in cents.
  updatedApartment.price *= 100;

  const returnedApartment = await updateApartment(updatedApartment);

  if (!returnedApartment) {
    return res.status(400).json({ error: 'Could not find the document.' });
  }

  return res.status(200).json(returnedApartment);
}

export async function httpDeleteApartment(req, res) {
  const { apartmentId } = req.query;

  const response = await deleteApartment(apartmentId);

  return res.status(204).json(response.body);
}
