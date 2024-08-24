import React from 'react';

const PanelCard = ({ icon, label, value, items, color }) => {
  // Mapeamento das cores para classes Tailwind
  const colorClasses = {
    red: 'bg-red-100',
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    yellow: 'bg-yellow-100',
    // Adicione mais cores conforme necessário
  };

  return (
    <div className={`p-4 ${colorClasses[color] || 'bg-gray-100'} rounded-lg shadow-md`}>
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

export default PanelCard;
