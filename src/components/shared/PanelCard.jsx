import React from 'react';
import { FaHamburger } from 'react-icons/fa';
import { PiHamburgerFill } from 'react-icons/pi';
import { CiFries } from 'react-icons/ci';

const getItemIcon = (name) => {
  switch (name.toLowerCase()) {
    case 'kft':
      return <FaHamburger className="mr-1" />;
    case 'falafel':
      return <PiHamburgerFill className="mr-1" />;
    case 'marys':
      return <FaHamburger className="mr-1" />;
    case 'fritas':
      return <CiFries className="mr-1" />;
    default:
      return null;
  }
};

const PanelCard = ({ icon, label, value, items = [], color }) => {
  return (
    <div className={`p-4 bg-${color}-100 rounded-lg shadow-md hover:bg-${color}-200 transition-all duration-300`}>
      <div className="flex items-center justify-center mb-2">
        {icon}
        <span className="ml-2 text-lg font-semibold text-gray-800">{label}</span>
      </div>
      <div className="text-3xl font-bold text-center text-gray-800">{value}</div>
      {items.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-700">
          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              {getItemIcon(item.name)}
              <span>{item.name}: {item.quantity}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PanelCard;
