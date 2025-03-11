
import React from 'react';

interface StatsCardsProps {
  stats: {
    totalReached: number;
    viewed: number;
    responded: number;
    interested: number;
    shortlisted: number;
    declined: number;
  };
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      <div className="bg-gray-800 p-3 rounded-lg">
        <p className="text-sm text-gray-400">Total Reached</p>
        <p className="text-2xl font-semibold">{stats.totalReached}</p>
      </div>
      <div className="bg-gray-800 p-3 rounded-lg">
        <p className="text-sm text-gray-400">Viewed</p>
        <p className="text-2xl font-semibold">{stats.viewed}</p>
      </div>
      <div className="bg-gray-800 p-3 rounded-lg">
        <p className="text-sm text-gray-400">Responded</p>
        <p className="text-2xl font-semibold">{stats.responded}</p>
      </div>
      <div className="bg-gray-800 p-3 rounded-lg">
        <p className="text-sm text-gray-400">Interested</p>
        <p className="text-2xl font-semibold text-green-500">{stats.interested}</p>
      </div>
      <div className="bg-gray-800 p-3 rounded-lg">
        <p className="text-sm text-gray-400">Shortlisted</p>
        <p className="text-2xl font-semibold text-blue-500">{stats.shortlisted}</p>
      </div>
      <div className="bg-gray-800 p-3 rounded-lg">
        <p className="text-sm text-gray-400">Declined</p>
        <p className="text-2xl font-semibold text-red-500">{stats.declined}</p>
      </div>
    </div>
  );
};

export default StatsCards;
