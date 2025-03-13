import React from 'react';

const StatCard = ({ title, value, description, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-primary-100 text-primary-800 border-primary-300',
    green: 'bg-green-100 text-green-800 border-green-300',
    purple: 'bg-purple-100 text-purple-800 border-purple-300',
    red: 'bg-red-100 text-red-800 border-red-300',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    indigo: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  };

  const colorClass = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`rounded-lg border p-4 ${colorClass} shadow-sm`}>
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="mt-2 text-3xl font-bold">{value}</div>
      {description && (
        <p className="mt-2 text-sm opacity-80">{description}</p>
      )}
    </div>
  );
};

export default StatCard;
