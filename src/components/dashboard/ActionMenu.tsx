
import React, { useState } from 'react';
import { 
  Plus, 
  Upload, 
  UserPlus,
  ChevronDown,
  File,
  Megaphone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SyncPhone from './sync-phone/SyncPhone';

const ActionMenu: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isCreateMenuOpen) setIsCreateMenuOpen(false);
  };
  
  const toggleCreateMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCreateMenuOpen(!isCreateMenuOpen);
  };
  
  const handleItemClick = (action: string) => {
    console.log(`Action: ${action}`);
    
    // Handle different actions
    if (action === 'Create Campaign') {
      // Navigate to campaign creation
      navigate('/dashboard/workspace?tab=campaigns&action=new');
    } else if (action === 'Upload Media') {
      // Navigate to the batch uploader
      navigate('/dashboard/workspace?tab=uploader');
    } else if (action === 'Create Project') {
      // Navigate to project creation
      navigate('/dashboard/workspace?tab=projects&action=new');
    } else if (action === 'Invite Collaborators') {
      // Navigate to collaborators
      navigate('/dashboard/workspace?tab=collaborators');
    }
    
    setIsOpen(false);
    setIsCreateMenuOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={toggleMenu}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
      >
        <span className="mr-2">Quick Actions</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center justify-between"
              role="menuitem"
              onClick={toggleCreateMenu}
            >
              <div className="flex items-center">
                <Plus className="mr-3 h-5 w-5" />
                Create New
              </div>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {isCreateMenuOpen && (
              <div className="pl-4 bg-gray-700">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600 flex items-center"
                  onClick={() => handleItemClick('Create Project')}
                >
                  <File className="mr-3 h-5 w-5" />
                  Project
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600 flex items-center"
                  onClick={() => handleItemClick('Create Campaign')}
                >
                  <Megaphone className="mr-3 h-5 w-5" />
                  Campaign
                </button>
              </div>
            )}
            
            <button
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"
              role="menuitem"
              onClick={() => handleItemClick('Upload Media')}
            >
              <Upload className="mr-3 h-5 w-5" />
              Upload Media
            </button>
            
            <SyncPhone />
            
            <button
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"
              role="menuitem"
              onClick={() => handleItemClick('Invite Collaborators')}
            >
              <UserPlus className="mr-3 h-5 w-5" />
              Invite Collaborators
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
