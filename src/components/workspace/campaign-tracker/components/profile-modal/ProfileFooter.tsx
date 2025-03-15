
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileFooterProps {
  onClose: () => void;
  onMessage: () => void;
}

const ProfileFooter: React.FC<ProfileFooterProps> = ({ onClose, onMessage }) => {
  return (
    <div className="border-t border-gray-700 p-4 flex justify-end">
      <Button 
        variant="outline" 
        onClick={onClose} 
        className="mr-2 text-white hover:text-white bg-gray-700/50 hover:bg-gray-700 font-medium"
      >
        Close
      </Button>
      <Button onClick={onMessage} className="text-white">
        <MessageCircle className="w-4 h-4 mr-2" />
        Contact Creator
      </Button>
    </div>
  );
};

export default ProfileFooter;
