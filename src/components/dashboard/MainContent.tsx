
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/dashboard/Header';
import CollapsibleTabs from '@/components/dashboard/CollapsibleTabs';
import ProjectGrid from '@/components/dashboard/ProjectGrid';
import DatasetsDashboard from '@/pages/datasets/DatasetsDashboard';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const MainContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useAuth();
  
  const isAiPlatform = profile?.account_type === 'ai_platform';
  const isDatasetRoute = location.pathname === '/ai-platform/datasets';
  const isModelRoute = location.pathname === '/ai-platform/models';
  
  // Handle back navigation for AI Platform specialized pages
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };
  
  // Render different content based on route and user type
  const renderContent = () => {
    // For AI Platform specific routes
    if (isAiPlatform) {
      if (isDatasetRoute) {
        return (
          <div className="flex flex-col h-full">
            <div className="p-4 bg-[#1A1F2C] border-b border-gray-800">
              <Button 
                variant="ghost" 
                className="flex items-center text-gray-300 hover:text-white" 
                onClick={handleBackToDashboard}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </div>
            <DatasetsDashboard />
          </div>
        );
      }
      
      if (isModelRoute) {
        return (
          <div className="flex flex-col h-full">
            <div className="p-4 bg-[#1A1F2C] border-b border-gray-800">
              <Button 
                variant="ghost" 
                className="flex items-center text-gray-300 hover:text-white" 
                onClick={handleBackToDashboard}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">AI Models</h2>
              <p>AI Models management interface coming soon.</p>
            </div>
          </div>
        );
      }
    }
    
    // Default dashboard content
    return (
      <>
        <Header />
        <CollapsibleTabs />
        <ProjectGrid />
      </>
    );
  };
  
  return (
    <div className="flex-1 overflow-auto">
      {renderContent()}
    </div>
  );
};

export default MainContent;
