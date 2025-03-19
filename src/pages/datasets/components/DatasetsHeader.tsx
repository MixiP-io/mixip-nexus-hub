
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import SectionHeader from '@/components/workspace/SectionHeader';

interface DatasetsHeaderProps {
  onBackToDashboard: () => void;
}

const DatasetsHeader: React.FC<DatasetsHeaderProps> = ({ onBackToDashboard }) => {
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-[#1A1F2C] border-b border-gray-800">
        <Button 
          variant="ghost" 
          className="flex items-center text-gray-300 hover:text-white" 
          onClick={onBackToDashboard}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
      
      <SectionHeader 
        title="AI Training Datasets" 
        description="Browse and license high-quality datasets for training your AI models"
      />
    </>
  );
};

export default DatasetsHeader;
