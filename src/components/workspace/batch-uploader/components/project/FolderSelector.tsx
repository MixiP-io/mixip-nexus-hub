
import React from 'react';
import { FolderTree, Plus } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';

interface FolderSelectorProps {
  folders: { id: string; name: string }[];
  selectedFolder: string;
  setSelectedFolder: (folder: string) => void;
  onAddNewClick: () => void;
}

const FolderSelector: React.FC<FolderSelectorProps> = ({
  folders,
  selectedFolder,
  setSelectedFolder,
  onAddNewClick
}) => {
  return (
    <div>
      <label className="block text-gray-400 mb-2 text-sm">Target Folder</label>
      <div className="flex gap-2">
        <Select 
          value={selectedFolder} 
          onValueChange={setSelectedFolder}
          defaultValue="root"
        >
          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
            <SelectValue placeholder="Select a folder" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 border-gray-600">
            {folders.map((folder) => (
              <SelectItem key={folder.id} value={folder.id} className="text-white hover:bg-gray-600">
                <div className="flex items-center">
                  <FolderTree className="mr-2 h-4 w-4" />
                  {folder.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          variant="outline" 
          size="icon"
          onClick={onAddNewClick}
          className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FolderSelector;
