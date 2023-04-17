import mongoose from 'mongoose';

const { connect } = mongoose;
import 'dotenv/config';

const options = {
  dbName: 'free_search',
};

const mongoUri = process.env.MONGODB_URI;

const connectToDatabase = async () => {
  try {
    await connect(mongoUri, options);
    console.log('Conectado ao banco de dados');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
export default connectToDatabase;
