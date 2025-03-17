
import React from 'react';
import { User, Building, Paintbrush, Bot, Database, Code } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AccountTypeSelectorProps {
  accountType: string | null;
  setAccountType: (type: string) => void;
  isSubmitting: boolean;
}

const AccountTypeSelector: React.FC<AccountTypeSelectorProps> = ({
  accountType,
  setAccountType,
  isSubmitting
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Choose account type</h3>
      <div className="grid grid-cols-2 gap-3">
        <button 
          type="button"
          onClick={() => setAccountType('creator_basic')}
          disabled={isSubmitting}
          className={`p-4 border rounded-md hover:border-mixip-blue hover:bg-blue-50 flex flex-col items-center text-center transition-colors ${accountType === 'creator_basic' ? 'border-mixip-blue bg-blue-50' : ''}`}
        >
          <User className="h-6 w-6 mb-2 text-mixip-blue" />
          <span className="font-medium">Creator Basic</span>
        </button>
        <button 
          type="button"
          onClick={() => setAccountType('creator_pro')}
          disabled={isSubmitting}
          className={`p-4 border rounded-md hover:border-mixip-purple hover:bg-purple-50 flex flex-col items-center text-center transition-colors ${accountType === 'creator_pro' ? 'border-mixip-purple bg-purple-50' : ''}`}
        >
          <Paintbrush className="h-6 w-6 mb-2 text-mixip-purple" />
          <span className="font-medium">Creator Pro</span>
        </button>
        <button 
          type="button"
          onClick={() => setAccountType('business')}
          disabled={isSubmitting}
          className={`p-4 border rounded-md hover:border-mixip-orange hover:bg-orange-50 flex flex-col items-center text-center transition-colors ${accountType === 'business' ? 'border-mixip-orange bg-orange-50' : ''}`}
        >
          <Building className="h-6 w-6 mb-2 text-mixip-orange" />
          <span className="font-medium">Business</span>
        </button>
        <button 
          type="button"
          onClick={() => setAccountType('ai_platform')}
          disabled={isSubmitting}
          className={`p-4 border rounded-md hover:border-green-500 hover:bg-green-50 flex flex-col items-center text-center transition-colors ${accountType === 'ai_platform' ? 'border-green-500 bg-green-50' : ''}`}
        >
          <Bot className="h-6 w-6 mb-2 text-mixip-mint" />
          <div className="flex flex-col items-center">
            <span className="font-medium">AI Platform</span>
            <Badge className="bg-green-100 text-green-800 mt-1">Enhanced Data Access</Badge>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AccountTypeSelector;
