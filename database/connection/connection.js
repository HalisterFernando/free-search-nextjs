import mongoose from 'mongoose';

const { connect } = mongoose;

const options = {
  dbName: 'free_search',
};

const connectToDatabase = async () => {
  try {
    await connect(
      'mongodb+srv://admin:yPHtcxCqUfUnsclu@freesearchcluster.mz7gh3y.mongodb.net/?retryWrites=true&w=majority',
      options
    );
    console.log('Conectado ao banco de dados');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
export default connectToDatabase;
