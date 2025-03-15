
import React from 'react';

interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-semibold mb-2 text-white">{title}</h1>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default SectionHeader;
