
import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import CreativeContent from '@/components/workspace/CreativeContent';
import { SidebarProvider } from '@/components/ui/sidebar';

const CreativeWorkspace: React.FC = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen bg-mixip-gray-dark text-white flex w-full">
        <Sidebar />
        <CreativeContent />
      </div>
    </SidebarProvider>
  );
};

export default CreativeWorkspace;
