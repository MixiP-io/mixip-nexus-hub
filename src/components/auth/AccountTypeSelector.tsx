
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AccountType } from '@/context/AuthContext/profileTypes';

interface AccountTypeSelectorProps {
  accountType: AccountType;
  setAccountType: (type: AccountType) => void;
  isSubmitting: boolean;
}

const AccountTypeSelector: React.FC<AccountTypeSelectorProps> = ({
  accountType,
  setAccountType,
  isSubmitting
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-mixip-gray-dark mb-3">Select account type</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-4 border rounded-lg ${accountType === 'standard' ? 'border-mixip-blue bg-blue-50' : 'border-gray-200'} transition-colors`}>
          <div className="flex items-start mb-2">
            <RadioGroupItem
              id="standard"
              value="standard"
              checked={accountType === 'standard'}
              onCheckedChange={() => setAccountType('standard')}
              disabled={isSubmitting}
              className="mt-0.5"
            />
            <div className="ml-2">
              <Label htmlFor="standard" className="font-medium block">Standard User</Label>
              <span className="text-xs text-gray-500 block">For personal use or managing projects</span>
            </div>
          </div>
        </div>
        
        <div className={`p-4 border rounded-lg ${accountType === 'ai_platform' ? 'border-green-500 bg-green-50' : 'border-gray-200'} transition-colors`}>
          <div className="flex items-start mb-2">
            <RadioGroupItem
              id="ai_platform"
              value="ai_platform"
              checked={accountType === 'ai_platform'}
              onCheckedChange={() => setAccountType('ai_platform')}
              disabled={isSubmitting}
              className="mt-0.5"
            />
            <div className="ml-2">
              <Label htmlFor="ai_platform" className="font-medium block">AI Platform</Label>
              <span className="text-xs text-gray-500 block">For AI training and dataset management</span>
            </div>
          </div>
        </div>
        
        <div className={`p-4 border rounded-lg ${accountType === 'creator' ? 'border-mixip-blue bg-blue-50' : 'border-gray-200'} transition-colors`}>
          <div className="flex items-start mb-2">
            <RadioGroupItem
              id="creator"
              value="creator"
              checked={accountType === 'creator'}
              onCheckedChange={() => setAccountType('creator')}
              disabled={isSubmitting}
              className="mt-0.5"
            />
            <div className="ml-2">
              <Label htmlFor="creator" className="font-medium block">Creator</Label>
              <span className="text-xs text-gray-500 block">For photographers, videographers, and content creators</span>
            </div>
          </div>
        </div>
        
        <div className={`p-4 border rounded-lg ${accountType === 'agency' ? 'border-mixip-blue bg-blue-50' : 'border-gray-200'} transition-colors`}>
          <div className="flex items-start mb-2">
            <RadioGroupItem
              id="agency"
              value="agency"
              checked={accountType === 'agency'}
              onCheckedChange={() => setAccountType('agency')}
              disabled={isSubmitting}
              className="mt-0.5"
            />
            <div className="ml-2">
              <Label htmlFor="agency" className="font-medium block">Agency</Label>
              <span className="text-xs text-gray-500 block">For marketing agencies and creative teams</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTypeSelector;
