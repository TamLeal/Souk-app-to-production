import React from 'react';

const PanelCard = ({ icon, label, value, items, color }) => {
  return (
    <div className={`p-4 bg-${color}-100 rounded-lg shadow-md`}>
      <div className="flex items-center">
        {icon}
        <div className="ml-4">
          <h4 className="text-lg font-semibold">{label}</h4>
          <p className="text-2xl">{value}</p>
        </div>
      </div>
      {items && (
        <ul className="mt-2">
          {items.map((item, index) => (
            <li key={index} className="text-sm">
              {item.icon} {item.name}: {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PanelCard; // Certifique-se de que está sendo exportado como default
