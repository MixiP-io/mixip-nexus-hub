
import React from 'react';
import { Folder, CloudUpload, Smartphone, Computer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UploadSource } from '../types';

interface SourceSelectionProps {
  activeSource: UploadSource;
  setActiveSource: (source: UploadSource) => void;
}

const SourceSelection: React.FC<SourceSelectionProps> = ({ 
  activeSource, 
  setActiveSource 
}) => {
  const sources = [
    { 
      id: 'device', 
      name: 'My Device', 
      icon: <Folder className="h-5 w-5" />,
      options: [
        { id: 'computer', name: 'My Computer', icon: <Computer className="h-5 w-5" /> },
        { id: 'phone', name: 'My Phone', icon: <Smartphone className="h-5 w-5" /> }
      ]
    },
    { id: 'moby', name: 'Moby', icon: <CloudUpload className="h-5 w-5" /> },
    { id: 'dropbox', name: 'Dropbox', icon: <CloudUpload className="h-5 w-5" /> },
    { id: 'google-drive', name: 'Google Drive', icon: <CloudUpload className="h-5 w-5" /> },
    { id: 'box', name: 'Box', icon: <CloudUpload className="h-5 w-5" /> },
    { id: 'icloud', name: 'iCloud', icon: <CloudUpload className="h-5 w-5" /> },
  ];
  
  const handleSourceChange = (source: UploadSource) => {
    setActiveSource(source);
    
    if (source !== 'computer' && source !== 'phone') {
      toast.info(`${source} integration coming soon`);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={`flex items-center gap-2 ${
                (activeSource === 'computer' || activeSource === 'phone') 
                  ? "bg-mixip-blue hover:bg-mixip-blue-dark text-white" 
                  : "bg-gray-700 text-white hover:bg-gray-600 border-gray-600 font-medium"
              }`}
            >
              <Folder className="h-5 w-5" />
              My Device
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-700 border-gray-600">
            {sources[0].options.map(option => (
              <DropdownMenuItem 
                key={option.id}
                className="text-white hover:bg-gray-600"
                onClick={() => handleSourceChange(option.id as UploadSource)}
              >
                <div className="flex items-center gap-2">
                  {option.icon}
                  {option.name}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {sources.slice(1).map(source => (
          <Button
            key={source.id}
            variant={activeSource === source.id ? "default" : "outline"}
            className={`flex items-center gap-2 ${
              activeSource === source.id 
                ? "bg-mixip-blue hover:bg-mixip-blue-dark text-white" 
                : "bg-gray-700 text-white hover:bg-gray-600 border-gray-600 font-medium"
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
