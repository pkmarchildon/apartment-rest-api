import mongoose from 'mongoose';

const landlordsSchema = new mongoose.Schema({
  landlordId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  isCompany: { type: Boolean, required: true },
  businessYears: { type: Number, required: true },
  sued: { type: Boolean, required: true },
  score: { type: Number, required: true },
  responseTime: { type: Number, required: true },
  followRules: { type: Boolean, required: true },
  increaseRent: { type: Boolean, required: true },
  comments: [
    {
      author: { type: String, required: true },
      date: { type: Date, required: true },
      comment: { type: String, required: true }
    }
  ]
});

export default mongoose.model('Landlord', landlordsSchema);
