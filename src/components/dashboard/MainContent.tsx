
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/dashboard/Header';
import CollapsibleTabs from '@/components/dashboard/CollapsibleTabs';
import ProjectGrid from '@/components/dashboard/ProjectGrid';

const MainContent: React.FC = () => {
  return (
    <div className="flex-1 overflow-auto bg-frameio-bg-dark">
      <div className="mx-auto max-w-[1920px] min-h-screen flex flex-col">
        <Header />
        <div className="px-5 py-4 flex-1 flex flex-col">
          <div className="mb-4">
            <CollapsibleTabs />
          </div>
          <div className="mt-2 flex-1">
            <ProjectGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
