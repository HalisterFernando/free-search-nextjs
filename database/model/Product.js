import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
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

const Product = mongoose.model('Products', productSchema);
