import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productSchema = new Schema({
  link: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
});

const Product = model('Products', productSchema);

export default Product;
