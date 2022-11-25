import mongoose from 'mongoose';

const apartmentsSchema = new mongoose.Schema({
  apartmentId: { type: String, required: true },
  price: { type: Number, required: true },
  rooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  den: { type: Number, required: true },
  parking: { type: Number, required: true },
  garage: { type: Number, required: true },
  pet: { type: Boolean, required: true },
  furnished: { type: Boolean, required: true },
  heated: { type: Boolean, required: true },
  electricity: { type: Boolean, required: true },
  available: { type: Date, required: true },
  backyard: { type: Boolean, required: true },
  pool: { type: Boolean, required: true },
  internet: { type: Boolean, required: true },
  area: { type: Number, required: true },
  storage: { type: Boolean, required: true },
  yearOfConstruction: { type: Date, required: true },
  commentsAboutTenants: [
    {
      author: { type: String, required: true },
      date: { type: Date, required: true },
      comment: { type: String, required: true }
    }
  ],
  landlordComments: [
    {
      author: { type: String, required: true },
      date: { type: Date, required: true },
      comment: { type: String, required: true }
    }
  ],
  pictures: { type: Array, required: true },
  renovations: [
    {
      when: { type: Date, required: true },
      what: { type: String, required: true },
      why: { type: String, required: true },
      who: { type: String, required: true }
    }
  ],
  tenantsComments: [
    {
      author: { type: String, required: true },
      date: { type: Date, required: true },
      comment: { type: String, required: true }
    }
  ]
});

export default mongoose.model('Apartment', apartmentsSchema);
