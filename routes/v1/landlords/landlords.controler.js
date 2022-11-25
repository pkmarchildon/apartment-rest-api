import { v4 as uuidv4 } from 'uuid';

import {
  getAllLandlords,
  getLandlord,
  createLandlord,
  updateLandlord,
  deleteLandlord
} from '../../../models/landlords/landlords.model.js';

export async function httpGetLandlords(req, res) {
  const { landlordId } = req.body;

  if (landlordId) {
    return res.status(200).json(await getLandlord(landlordId));
  } else {
    return res.status(200).json(await getAllLandlords());
  }
}

export async function httpCreateLandlords(req, res) {
  const newLandlordData = req.body;

  // Verify if missing an attribute.
  if (
    newLandlordData.firstName === undefined ||
    newLandlordData.lastName === undefined ||
    newLandlordData.isCompany === undefined ||
    newLandlordData.businessYears === undefined ||
    newLandlordData.sued === undefined ||
    newLandlordData.score === undefined ||
    newLandlordData.responseTime === undefined ||
    newLandlordData.followRules === undefined ||
    newLandlordData.increaseRent === undefined ||
    newLandlordData.comments === undefined
  ) {
    return res.status(400).json({ error: 'A property is missing.' });
  }
  // Verify if an attribute is missing a value.
  if (
    newLandlordData.firstName === null ||
    newLandlordData.lastName === null ||
    newLandlordData.isCompany === null ||
    newLandlordData.businessYears === null ||
    newLandlordData.sued === null ||
    newLandlordData.score === null ||
    newLandlordData.responseTime === null ||
    newLandlordData.followRules === null ||
    newLandlordData.increaseRent === null ||
    newLandlordData.comments === null
  ) {
    return res.status(400).json({ error: 'A property is missing a value.' });
  }

  newLandlordData.landlordId = uuidv4();

  await createLandlord(newLandlordData);

  return res.status(200).json(newLandlordData);
}

export async function httpUpdateLandlords(req, res) {
  const updatedLandlord = req.body;

  const returnedLandlord = await updateLandlord(updatedLandlord);

  if (!returnedLandlord) {
    return res.status(400).json({ error: 'Could not find this landlord.' });
  }

  return res.status(200).json(returnedLandlord);
}

export async function httpDeleteLandlords(req, res) {
  const { landlordId } = req.query;

  const response = await deleteLandlord(landlordId);

  return res.status(204).json(response.body);
}
