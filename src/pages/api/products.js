import connectToDatabase from '../../../database/connection/connection';
import Product from '../../../database/model/Product';

connectToDatabase();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const products = await Product.find();

      return res.status(200).json(products);
    } catch (err) {
      console.error(err.message);
    }
  }

  return res.status(500).end();
}
