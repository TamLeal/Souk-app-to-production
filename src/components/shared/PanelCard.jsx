import React from 'react';
import { FaHamburger } from 'react-icons/fa';
import { GiHamburger } from 'react-icons/gi';
import { PiHamburgerFill } from 'react-icons/pi';
import { CiFries } from 'react-icons/ci';

const getItemIcon = (name) => {
  switch (name.toLowerCase()) {
    case 'kft':
      return <GiHamburger className="mr-1" />;
    case 'falafel':
      return <FaHamburger className="mr-1" />;
    case 'marys':
      return <PiHamburgerFill className="mr-1" />;
    case 'fritas':
      return <CiFries className="mr-1" />;
    default:
      return null;
  }
};

const PanelCard = ({ icon, label, value, items = [], color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 hover:bg-blue-200',
    red: 'bg-red-100 hover:bg-red-200',
    green: 'bg-green-100 hover:bg-green-200',
    yellow: 'bg-yellow-100 hover:bg-yellow-200',
    lightblue: 'bg-blue-50 hover:bg-blue-100', // Definindo a cor azul claro
    pink: 'bg-pink-100 hover:bg-pink-200' // Definindo a cor vermelho claro
  };

  const selectedColorClass = colorClasses[color] || colorClasses.blue;

  let content;

  if (label === "Total de Itens") {
    const produtos = ['KFT', 'Falafel', 'Marys', 'Fritas'];

    const itensFixos = produtos.map((produto) => {
      const item = items.find(item => item.name.toLowerCase() === produto.toLowerCase());
      return {
        name: produto,
        quantity: item ? item.quantity : 0,
      };
    });

    content = (
      <>
        <div className="text-3xl font-bold text-gray-800 mr-4">
          {value}
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-700">
          {itensFixos.map((item, index) => (
            <div key={index} className="flex items-center whitespace-nowrap">
              {getItemIcon(item.name)}
              <span>{item.name}: {item.quantity}</span>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    content = (
      <>
        <div className="text-3xl font-bold text-gray-800 mr-4">
          {value}
        </div>
      </>
    );
  }

  return (
    <div className={`p-4 rounded-lg shadow-md ${selectedColorClass} transition-all duration-300 flex flex-col justify-between h-full`}>
      <div className="flex items-center justify-center mb-2">
        {icon}
        <span className="ml-2 text-lg font-semibold text-gray-800">{label}</span>
      </div>
      <div className="flex items-center justify-center">
        {content}
      </div>
    </div>
  );
};

export default PanelCard;
