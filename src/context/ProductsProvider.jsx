import React, { createContext, useState, useEffect } from 'react';
export { getProducts } from '../pages/api/products';
import axios from 'axios';

export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [store, setStore] = useState({ todas: true, 'Mercado Livre': false, Buscapé: false });
  const [category, setCategory] = useState({
    todas: true,
    celular: false,
    tv: false,
    refrigerador: false,
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fectchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fectchProducts();
  }, []);

  const provider = {
    products,
    store,
    setStore,
    category,
    setCategory,
    search,
    setSearch,
  };

  return <ProductsContext.Provider value={provider}>{children}</ProductsContext.Provider>;
};

export default ProductsProvider;
