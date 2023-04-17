import React, { useContext } from 'react';
import { ProductsContext } from '../context/ProductsProvider';
import FreeSearchSm from '../assets/free-search-mobile.png';
import FreeSearchMd from '../assets/free-search.png';

export default function Header() {
  const { store, setStore, category, setCategory } = useContext(ProductsContext);

  const handleStore = ({ target: { value } }) => {
    setStore({
      ...store,
      todas: value === 'todas',
      'Mercado Livre': value === 'Mercado Livre',
      Buscapé: value === 'Buscapé',
    });
  };

  const handleCategory = ({ target: { value } }) => {
    setCategory({
      ...category,
      todas: value === 'todas',
      celular: value === 'celular',
      tv: value === 'tv',
      refrigerador: value === 'refrigerador',
    });
  };

  return (
    <header className="w-full py-2 bg-free-orange border-b flex justify-around items-center">
      <div className="border border-black w-16 h-16 rounded-full md:w-48 md:h-14 md:rounded-md">
        <img
          className="w-full h-full object-cover rounded-full md:hidden"
          src={FreeSearchSm}
          alt="free-search logo"
        />
        <img className="hidden w-full h-full rounded-md md:block " src={FreeSearchMd} alt="" />
      </div>
      <div className="flex gap-2">
        <label htmlFor="stores">
          <h5 className="font-medium mb-1">Lojas</h5>
          <select className="rounded" onClick={(ev) => handleStore(ev)} name="stores" id="stores">
            <option defaultValue value="todas">
              Todas
            </option>
            <option value="Mercado Livre">Mercado Livre</option>
            <option value="Buscapé">Buscapé</option>
          </select>
        </label>
        <label htmlFor="categories">
          <h5 className="font-medium mb-1">Categorias</h5>
          <select
            className="rounded"
            onClick={(ev) => handleCategory(ev)}
            name="categories"
            id="categories"
          >
            <option defaultValue value="celular">
              Todas
            </option>
            <option value="celular">Celular</option>
            <option value="refrigerador">Geladeira</option>
            <option value="tv">TV</option>
          </select>
        </label>
      </div>
    </header>
  );
}
