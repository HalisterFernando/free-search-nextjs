import React, { useContext } from 'react';
import { ProductsContext } from '../context/ProductsProvider';

export default function SearchBar({ applyFilters, setWelcome, setLoading }) {
  const { search, setSearch } = useContext(ProductsContext);

  const handleSearch = ({ target: { value } }) => {
    setSearch(value);
  };

  return (
    <div className="flex bg-free-black justify-center gap-2 py-3 w-full">
      <input
        className="border border-black rounded px-2"
        onChange={(ev) => handleSearch(ev)}
        value={search}
        type="text"
        name="search"
        id="search"
      />
      <button
        className="border border-white bg-free-orange rounded p-1"
        onClick={() => {
          applyFilters();
          setWelcome(false);
          setLoading(true);
        }}
        type="button"
      >
        Buscar
      </button>
    </div>
  );
}
