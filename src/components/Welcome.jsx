import React from 'react';
import FreeSearchSm from '../assets/free-search-mobile.png';

export default function Welcome() {
  return (
    <div className="flex flex-col justify-center items-center gap-10 h-full">
      <h2 className="text-center text-4xl font-semibold">Bem-vindo!</h2>
      <div>
        <img className="rounded-full border border-free-black" src={FreeSearchSm} alt="" />
      </div>
      <h1 className="font-bold text-4xl">FREE SEARCH</h1>
      <p className="text-3xl text-center">Selecione uma loja, categoria ou busque um produto!</p>
    </div>
  );
}
