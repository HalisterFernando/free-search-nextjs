import connectToDatabase from '../../../database/connection/connection';
import mongoose from 'mongoose';
import productSchema from '../../../database/model/Product';

const Products = mongoose.model('Products', productSchema);

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
