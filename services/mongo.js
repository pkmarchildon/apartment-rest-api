import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready.');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

export async function mongoConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'test'
    });
  } catch (err) {
    console.error(`Error while connecting to DB - ${err}`);
  }
}

export async function mongoDisconnect() {
  await mongoose.disconnect();
}
