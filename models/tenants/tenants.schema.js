import mongoose from 'mongoose';

const tenantsSchema = new mongoose.Schema({
  tenantId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  missedPayment: { type: Boolean, required: true },
  rentYears: { type: Number, required: true },
  score: { type: Number, required: true },
  references: { type: Array, required: true },
  comments: [
    {
      author: { type: String, required: true },
      date: { type: Date, required: true },
      comment: { type: String, required: true }
    }
  ]
});

export default mongoose.model('Tenant', tenantsSchema);
