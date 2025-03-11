
import React from 'react';
import Header from '@/components/dashboard/Header';
import CollapsibleTabs from '@/components/dashboard/CollapsibleTabs';
import ProjectGrid from '@/components/dashboard/ProjectGrid';

const CreativeContent: React.FC = () => {
  return (
    <div className="flex-1 overflow-auto">
      <Header />
      <CollapsibleTabs />
      <ProjectGrid />
    </div>
  );
};

export default CreativeContent;
