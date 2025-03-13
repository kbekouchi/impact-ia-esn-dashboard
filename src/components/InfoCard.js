import React from 'react';

const InfoCard = ({ title, children, bgColor = 'white' }) => {
  const bgClasses = {
    white: 'bg-white',
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    purple: 'bg-purple-50',
    yellow: 'bg-yellow-50',
    red: 'bg-red-50',
    gray: 'bg-gray-50',
  };

  const bgClass = bgClasses[bgColor] || bgClasses.white;

  return (
    <div className={`${bgClass} rounded-lg p-6 shadow-md`}>
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      <div>{children}</div>
    </div>
  );
};

export default InfoCard;
