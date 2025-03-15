
import React from 'react';
import { Folder, CloudUpload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type UploadSource = 'local' | 'dropbox' | 'google-drive' | 'box' | 'icloud';

interface SourceSelectionProps {
  activeSource: UploadSource;
  setActiveSource: (source: UploadSource) => void;
}

const SourceSelection: React.FC<SourceSelectionProps> = ({ 
  activeSource, 
  setActiveSource 
}) => {
  const sources = [
    { id: 'local', name: 'My Device', icon: <Folder className="h-5 w-5" /> },
    { id: 'dropbox', name: 'Dropbox', icon: <CloudUpload className="h-5 w-5" /> },
    { id: 'google-drive', name: 'Google Drive', icon: <CloudUpload className="h-5 w-5" /> },
    { id: 'box', name: 'Box', icon: <CloudUpload className="h-5 w-5" /> },
    { id: 'icloud', name: 'iCloud', icon: <CloudUpload className="h-5 w-5" /> },
  ];
  
  const handleSourceChange = (source: UploadSource) => {
    setActiveSource(source);
    
    if (source !== 'local') {
      toast.info(`${source} integration coming soon`);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-medium mb-3">Upload Source</h3>
      <div className="flex flex-wrap gap-2">
        {sources.map(source => (
          <Button
            key={source.id}
            variant={activeSource === source.id ? "default" : "outline"}
            className={`flex items-center gap-2 ${
              activeSource === source.id 
                ? "bg-mixip-blue hover:bg-mixip-blue-dark text-white" 
                : "bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600"
            }`}
            onClick={() => handleSourceChange(source.id as UploadSource)}
          >
            {source.icon}
            {source.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SourceSelection;
