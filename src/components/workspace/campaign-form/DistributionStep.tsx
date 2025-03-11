
import React from 'react';
import { Share2, Globe, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DistributionStepProps {
  distributionMethod: 'platform' | 'specific' | 'external';
  setDistributionMethod: (method: 'platform' | 'specific' | 'external') => void;
  selectedUsers: string[];
  setSelectedUsers: (users: string[]) => void;
  externalEmails: string[];
  setExternalEmails: (emails: string[]) => void;
  distributionMessage: string;
  setDistributionMessage: (message: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const DistributionStep: React.FC<DistributionStepProps> = ({
  distributionMethod,
  setDistributionMethod,
  selectedUsers,
  setSelectedUsers,
  externalEmails,
  setExternalEmails,
  distributionMessage,
  setDistributionMessage,
  onBack,
  onNext
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="font-medium mb-4 flex items-center">
          <Share2 className="w-5 h-5 mr-2" />
          Distribution Method
        </h3>
        
        <div className="flex space-x-3 mb-4">
          <button
            className={`flex items-center justify-center flex-col p-3 rounded-lg border ${
              distributionMethod === 'platform' ? 'border-green-500 bg-gray-700' : 'border-gray-600 bg-gray-800'
            }`}
            onClick={() => setDistributionMethod('platform')}
          >
            <Globe className="w-5 h-5 mb-1" />
            <span>Platform-wide</span>
          </button>
          <button
            className={`flex items-center justify-center flex-col p-3 rounded-lg border ${
              distributionMethod === 'specific' ? 'border-green-500 bg-gray-700' : 'border-gray-600 bg-gray-800'
            }`}
            onClick={() => setDistributionMethod('specific')}
          >
            <Users className="w-5 h-5 mb-1" />
            <span>Specific Users</span>
          </button>
          <button
            className={`flex items-center justify-center flex-col p-3 rounded-lg border ${
              distributionMethod === 'external' ? 'border-green-500 bg-gray-700' : 'border-gray-600 bg-gray-800'
            }`}
            onClick={() => setDistributionMethod('external')}
          >
            <MapPin className="w-5 h-5 mb-1" />
            <span>External Invite</span>
          </button>
        </div>

        {distributionMethod === 'specific' && (
          <div className="mb-4">
            <p className="text-gray-400 mb-2">Select specific users (Not implemented in demo)</p>
            <div className="bg-gray-800 p-3 rounded">
              <input 
                type="text"
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                placeholder="Search for users..."
                disabled
              />
            </div>
          </div>
        )}

        {distributionMethod === 'external' && (
          <div className="mb-4">
            <p className="text-gray-400 mb-2">Invite external collaborators (Not implemented in demo)</p>
            <div className="bg-gray-800 p-3 rounded">
              <input 
                type="email"
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                placeholder="Add email addresses..."
                disabled
              />
            </div>
          </div>
        )}
        
        <div className="mt-4">
          <label className="block text-gray-400 mb-2">Distribution Message</label>
          <textarea 
            className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white h-24"
            placeholder="Add a message to be sent with your campaign..."
            value={distributionMessage}
            onChange={(e) => setDistributionMessage(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          onClick={onBack}
          variant="outline"
        >
          Back
        </Button>
        <Button 
          onClick={onNext}
          variant="default"
          className="bg-green-600 hover:bg-green-700"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default DistributionStep;
