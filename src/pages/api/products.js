import connectToDatabase from '../../../database/connection/connection';

const mongoose = require('mongoose');
const ProductModel = mongoose.model('Products');

connectToDatabase();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const products = await ProductModel.find();

      return res.status(200).json(products);
    } catch (err) {
      console.error(err.message);
    }
  }

  return res.status(500).end();
}
