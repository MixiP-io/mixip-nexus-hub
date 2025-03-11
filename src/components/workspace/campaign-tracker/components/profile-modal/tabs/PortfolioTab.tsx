
import React from 'react';

interface PortfolioTabProps {
  portfolioItems: string[];
}

const PortfolioTab: React.FC<PortfolioTabProps> = ({ portfolioItems }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Portfolio</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {portfolioItems.map((image, index) => (
          <div key={index} className="aspect-square bg-gray-700 rounded overflow-hidden">
            <img 
              src={image} 
              alt={`Portfolio item ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioTab;
