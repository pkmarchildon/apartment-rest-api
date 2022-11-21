import { getAllApartments } from '../../../models/apartments/apartments.model.js';

export async function httpGetAllApartments(req, res) {
  return res.status(200).json(await getAllApartments());
}
