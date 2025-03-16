
import React from 'react';
import { FolderTree, Plus, FolderPlus } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';

interface FolderSelectorProps {
  folders: { id: string; name: string; parentId?: string }[];
  selectedFolder: string;
  setSelectedFolder: (folder: string) => void;
  onAddNewClick: () => void;
  onCreateSubfolderClick?: (parentId: string) => void;
}

const FolderSelector: React.FC<FolderSelectorProps> = ({
  folders,
  selectedFolder,
  setSelectedFolder,
  onAddNewClick,
  onCreateSubfolderClick
}) => {
  // Filter non-root folders for display in the hierarchy
  const childFolders = folders.filter(f => f.id !== 'root' && f.parentId);
  
  // Helper to get parent folder name
  const getParentName = (parentId: string): string => {
    const parent = folders.find(f => f.id === parentId);
    return parent ? parent.name : '';
  };

  // Debug folders
  React.useEffect(() => {
    console.log('FolderSelector - Folders:', folders);
    console.log('FolderSelector - Selected Folder:', selectedFolder);
    console.log('FolderSelector - Child Folders:', childFolders);
  }, [folders, selectedFolder]);

  return (
    <div>
      <label className="block text-gray-300 mb-2 text-sm">Target Folder</label>
      <div className="flex gap-2">
        <Select 
          value={selectedFolder} 
          onValueChange={(value) => {
            console.log('Folder selection changed to:', value);
            setSelectedFolder(value);
          }}
          defaultValue="root"
        >
          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
            <SelectValue placeholder="Select a folder" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 border-gray-600 max-h-60">
            <div className="max-h-60 overflow-auto">
              {/* Root folder - only show once */}
              <SelectItem key="root" value="root" className="text-white hover:bg-gray-600">
                <div className="flex items-center">
                  <FolderTree className="mr-2 h-4 w-4" />
                  Project Root
                </div>
              </SelectItem>
              
              {/* Child folders with indentation */}
              {childFolders.map((folder) => (
                <SelectItem key={folder.id} value={folder.id} className="text-white hover:bg-gray-600 pl-6">
                  <div className="flex items-center">
                    <FolderTree className="mr-2 h-4 w-4" />
                    {folder.name}
                    {folder.parentId && folder.parentId !== 'root' && (
                      <span className="ml-1 text-xs text-gray-300">
                        ({getParentName(folder.parentId)})
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={onAddNewClick}
          className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          title="Add new folder"
        >
          <Plus className="h-4 w-4" />
        </Button>
        
        {onCreateSubfolderClick && selectedFolder && selectedFolder !== 'root' && (
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => {
              console.log(`Create subfolder for ${selectedFolder}`);
              onCreateSubfolderClick(selectedFolder);
            }}
            className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
            title="Add subfolder to selected folder"
          >
            <FolderPlus className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FolderSelector;
