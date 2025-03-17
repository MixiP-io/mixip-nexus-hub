
import React, { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  description: string;
  children?: ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  description,
  children 
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-semibold mb-2 text-white">{title}</h1>
      <p className="text-gray-400 mb-6">{description}</p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
};

export default SectionHeader;
