
import React from 'react';
import { Search, Settings, LogOut, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ActionMenu from '@/components/dashboard/ActionMenu';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/dashboard/workspace?tab=uploader');
  };

  return (
    <header className="bg-[#1A1F2C] p-4 flex items-center justify-between border-b border-gray-800">
      <div className="relative w-80">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input 
          type="text" 
          className="bg-gray-800 text-white w-full pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-mixip-blue"
          placeholder="Search"
        />
      </div>
      
      <div className="flex items-center space-x-3">
        <Button 
          onClick={handleUploadClick}
          className="bg-mixip-blue hover:bg-mixip-blue-dark flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload Media
        </Button>
        <ActionMenu />
        <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
