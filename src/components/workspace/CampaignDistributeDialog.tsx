
import React, { useState } from 'react';
import { X, Send, Search, UserPlus, Globe, Users } from 'lucide-react';

interface CampaignDistributeDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CampaignDistributeDialog: React.FC<CampaignDistributeDialogProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [distributeOption, setDistributeOption] = useState<'platform' | 'specific' | 'external'>('platform');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [emailAddresses, setEmailAddresses] = useState('');

  // Sample users data
  const platformUsers = [
    { id: '1', name: 'Alex Wong', role: 'Photographer', avatar: '/placeholder.svg' },
    { id: '2', name: 'Jamie Smith', role: 'Videographer', avatar: '/placeholder.svg' },
    { id: '3', name: 'Taylor Reed', role: 'Audio Engineer', avatar: '/placeholder.svg' },
    { id: '4', name: 'Jordan Park', role: 'Editor', avatar: '/placeholder.svg' },
  ];

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId) 
        : [...prev, userId]
    );
  };

  const handleDistribute = () => {
    // Here we would integrate with a notification system to distribute the campaign
    console.log('Distributing campaign to:', distributeOption);
    if (distributeOption === 'specific') {
      console.log('Selected users:', selectedUsers);
    } else if (distributeOption === 'external') {
      console.log('External emails:', emailAddresses);
    }
    
    // Close dialog
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Distribute Campaign</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <div className="text-sm text-gray-400 mb-3">Select distribution method</div>
          <div className="grid grid-cols-3 gap-4">
            <button 
              className={`p-4 rounded-lg border flex flex-col items-center ${
                distributeOption === 'platform' ? 'border-green-500 bg-gray-700' : 'border-gray-600 hover:border-gray-500'
              }`}
              onClick={() => setDistributeOption('platform')}
            >
              <Globe className="w-6 h-6 mb-2" />
              <div className="text-sm font-medium">Platform-wide</div>
              <div className="text-xs text-gray-400 mt-1">All qualified creators</div>
            </button>
            
            <button 
              className={`p-4 rounded-lg border flex flex-col items-center ${
                distributeOption === 'specific' ? 'border-green-500 bg-gray-700' : 'border-gray-600 hover:border-gray-500'
              }`}
              onClick={() => setDistributeOption('specific')}
            >
              <Users className="w-6 h-6 mb-2" />
              <div className="text-sm font-medium">Select Users</div>
              <div className="text-xs text-gray-400 mt-1">Choose specific creators</div>
            </button>
            
            <button 
              className={`p-4 rounded-lg border flex flex-col items-center ${
                distributeOption === 'external' ? 'border-green-500 bg-gray-700' : 'border-gray-600 hover:border-gray-500'
              }`}
              onClick={() => setDistributeOption('external')}
            >
              <UserPlus className="w-6 h-6 mb-2" />
              <div className="text-sm font-medium">External Invite</div>
              <div className="text-xs text-gray-400 mt-1">Invite by email</div>
            </button>
          </div>
        </div>

        {distributeOption === 'platform' && (
          <div className="bg-gray-700 p-4 rounded-lg mb-6">
            <p className="text-gray-300">
              Your campaign will be distributed to all qualified creators on the platform who match your requirements.
            </p>
          </div>
        )}

        {distributeOption === 'specific' && (
          <div className="mb-6">
            <div className="flex items-center bg-gray-700 border border-gray-600 rounded p-2 mb-4">
              <Search className="w-5 h-5 mx-2 text-gray-400" />
              <input 
                type="text"
                className="bg-transparent text-white w-full outline-none"
                placeholder="Search for users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="max-h-60 overflow-y-auto space-y-2">
              {platformUsers.map((user) => (
                <div 
                  key={user.id}
                  className={`flex items-center p-3 rounded-lg cursor-pointer ${
                    selectedUsers.includes(user.id) ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`}
                  onClick={() => toggleUserSelection(user.id)}
                >
                  <div className="h-10 w-10 rounded-full bg-gray-600 overflow-hidden mr-3">
                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-400">{user.role}</div>
                  </div>
                  <div className={`h-5 w-5 rounded-full border ${
                    selectedUsers.includes(user.id) 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-gray-500'
                  }`}>
                    {selectedUsers.includes(user.id) && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {distributeOption === 'external' && (
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Email Addresses</label>
            <textarea 
              className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white h-32"
              placeholder="Enter email addresses (one per line)..."
              value={emailAddresses}
              onChange={(e) => setEmailAddresses(e.target.value)}
            />
            <p className="text-sm text-gray-400 mt-2">
              Users will receive an email invitation to join your campaign
            </p>
          </div>
        )}

        <div className="flex justify-between">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-gray-600 rounded hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleDistribute}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors flex items-center"
          >
            <Send className="w-4 h-4 mr-2" />
            Distribute Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDistributeDialog;
