import connectToDatabase from '../../../database/connection/connection';
import mongoose from 'mongoose';

const Products = mongoose.model('Products');

connectToDatabase();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const products = await Products.find();

      return res.status(200).json(products);
    } catch (err) {
      console.error(err.message);
    }
  }

  return res.status(500).end();
}
