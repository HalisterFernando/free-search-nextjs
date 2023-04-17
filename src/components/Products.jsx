import React, { useContext, useState, useEffect } from 'react';
import { ProductsContext } from '../context/ProductsProvider';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import Welcome from './Welcome';
import Loading from './Loading';

const TWO_SECONDS = 2000;

export default function Products() {
  const { products, store, category, search } = useContext(ProductsContext);
  const [productsToRender, setProductsToRender] = useState([...products]);
  const [welcome, setWelcome] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, TWO_SECONDS);
  }, [loading]);

  const applyFilters = () => {
    const [checkStore] = Object.entries(store).find(([key, value]) => value === true);
    const [checkCategory] = Object.entries(category).find(([key, value]) => value === true);

    let filteredProducts = [...products];

    if (checkStore !== 'todas') {
      filteredProducts = filteredProducts.filter((product) => product.from === checkStore);
    }

    if (checkCategory !== 'todas') {
      filteredProducts = filteredProducts.filter((product) => product.category === checkCategory);
    }

    if (search) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setProductsToRender(filteredProducts);
  };

  return (
    <>
      <SearchBar applyFilters={applyFilters} setWelcome={setWelcome} setLoading={setLoading} />
      {loading ? (
        <Loading />
      ) : (
        <div className="h-screen overflow-y-scroll ease-in-out px-1">
          {welcome ? (
            <Welcome />
          ) : (
            productsToRender.map((product, index) => (
              <ProductCard
                key={index}
                title={product.title}
                description={product.description}
                price={product.price}
                image={product.image}
                link={product.link}
                from={product.from}
              />
            ))
          )}
        </div>
      )}
    </>
  );
}
