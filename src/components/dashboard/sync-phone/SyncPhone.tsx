
import React, { useState } from 'react';
import { SmartphoneNfc } from 'lucide-react';
import SyncPhoneModal from './SyncPhoneModal';

const SyncPhone: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSyncClick = () => {
    console.log('Sync Phone action initiated');
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center font-medium"
        onClick={handleSyncClick}
      >
        <SmartphoneNfc className="mr-3 h-5 w-5" />
        Sync Phone
      </button>
      
      <SyncPhoneModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default SyncPhone;
