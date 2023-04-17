import mongoose from 'mongoose';

const options = {
  dbName: 'free_search',
};

const mongoUri = process.env.MONGODB_URI;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUri, options);
    console.log('Conectado ao banco de dados');
  } catch (err) {
    console.error(err.message);
  }
};
export default connectToDatabase;
