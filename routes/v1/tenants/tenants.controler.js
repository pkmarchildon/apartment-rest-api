import { v4 as uuidv4 } from 'uuid';

import {
  getAllTenants,
  getTenant,
  createTenant,
  updateTenant,
  deleteTenant
} from '../../../models/tenants/tenants.model.js';

export async function httpGetTenants(req, res) {
  const { tenantId } = req.body;

  if (tenantId) {
    return res.status(200).json(await getTenant(tenantId));
  } else {
    return res.status(200).json(await getAllTenants());
  }
}

export async function httpCreateTenants(req, res) {
  const newTenantData = req.body;

  // Verify if missing an attribute.
  if (
    newTenantData.firstName === undefined ||
    newTenantData.lastName === undefined ||
    newTenantData.dob === undefined ||
    newTenantData.missedPayment === undefined ||
    newTenantData.rentYears === undefined ||
    newTenantData.score === undefined ||
    newTenantData.references === undefined ||
    newTenantData.comments === undefined
  ) {
    return res.status(400).json({ error: 'A property is missing.' });
  }
  // Verify if an attribute is missing a value.
  if (
    newTenantData.firstName === null ||
    newTenantData.lastName === null ||
    newTenantData.dob === null ||
    newTenantData.missedPayment === null ||
    newTenantData.rentYears === null ||
    newTenantData.score === null ||
    newTenantData.references === null ||
    newTenantData.comments === null
  ) {
    return res.status(400).json({ error: 'A property is missing a value.' });
  }

  newTenantData.tenantId = uuidv4();

  await createTenant(newTenantData);

  return res.status(200).json(newTenantData);
}

export async function httpUpdateTenants(req, res) {
  const updatedTenant = req.body;

  const returnedTenant = await updateTenant(updatedTenant);

  if (!returnedTenant) {
    return res.status(400).json({ error: 'Could not find this tenant.' });
  }

  return res.status(200).json(returnedTenant);
}

export async function httpDeleteTenants(req, res) {
  const { tenantId } = req.query;

  const response = await deleteTenant(tenantId);

  return res.status(204).json(response.body);
}
