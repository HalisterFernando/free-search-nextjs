import React, { useState } from 'react';
import Meli from '../assets/meli-logo.jpg';
import Buscape from '../assets/buscape-logo.png';

const ProductCard = ({ title, description, price, image, link, from }) => {
  const [active, setActive] = useState(false);
  const toggleDescription = () => {
    setActive(!active ? true : false);
  };
  return (
    <div className="bg-white w-full md:w-10/12 md:mx-auto  border border-free-black p-2 my-2 rounded  flex flex-col justify-center">
      <div className="flex justify-between gap-2 items-center">
        <div className="w-1/2 md:w-1/3">
          <img src={image} alt={title} />
        </div>
        <div className="w-1/2 md:w-1/3">
          <h3 className="md:text-2xl">{title}</h3>
          <p className="font-semibold md:text-2xl">
            {from === 'Mercado Livre' ? `R$ ${price},00` : price}
          </p>
          <div className="flex flex-col gap-2 mt-2 relative">
            <a
              className="bg-free-orange border border-free-black shadow-sm p-2 rounded w-32 text-center"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ir para o site
            </a>
            <img
              className={from === 'Mercado Livre' ? 'w-32 h-32' : 'w-20 h-20 my-2'}
              src={from === 'Mercado Livre' ? Meli : Buscape}
              alt="logo"
            />
          </div>
        </div>
        <div className="h-96 w-1/3 overflow-y-scroll hidden md:block">
          <h4 className="font-semibold">Descrição</h4>
          <p>{description}</p>
        </div>
      </div>
      <button
        className="bg-free-orange border border-black rounded p-1 md:hidden"
        onClick={() => toggleDescription()}
      >
        Ver descrição
      </button>
      <div
        className={`${
          active ? 'h-64 overflow-y-scroll' : 'h-0 overflow-hidden'
        } bg-white mt-1 transition-all duration-4000 md:hidden`}
      >
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
