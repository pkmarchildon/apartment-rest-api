import tenantsDB from './tenants.schema.js';

export async function getTenant(tenantId) {
  return await tenantsDB.findOne({ tenantId }, { '_id': 0, '__v': 0 });
}

export async function getAllTenants() {
  return await tenantsDB.find({}, { '_id': 0, '__v': 0 });
}

export async function createTenant(newTenant) {
  return await tenantsDB.create(newTenant);
}

export async function updateTenant(updatedTenant) {
  return await tenantsDB.findOneAndUpdate(
    { tenantId: updatedTenant.tenantId },
    updatedTenant,
    {
      upsert: false,
      new: true,
      projection: { '_id': 0 }
    }
  );
}
export async function deleteTenant(tenantId) {
  return await tenantsDB.findOneAndDelete({ tenantId });
}
