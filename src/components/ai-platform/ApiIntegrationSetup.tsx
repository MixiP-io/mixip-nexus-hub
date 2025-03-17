
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Code, 
  Copy, 
  Check, 
  AlertTriangle, 
  HelpCircle, 
  Terminal, 
  Server 
} from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger, 
} from '@/components/ui/tooltip';

const ApiIntegrationSetup: React.FC = () => {
  const [apiKeyRevealed, setApiKeyRevealed] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [webhooksEnabled, setWebhooksEnabled] = useState(false);
  
  const sampleApiKey = "mx_ai_zYhFt2bPqL8nXdCv5gJkR7sW9mA3aV6x";
  
  const handleCopyClick = () => {
    navigator.clipboard.writeText(sampleApiKey);
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };
  
  const toggleApiKeyVisibility = () => {
    setApiKeyRevealed(!apiKeyRevealed);
  };
  
  const sampleCode = `
// JavaScript/Node.js Example
const fetchDataset = async (datasetId) => {
  const response = await fetch(
    \`https://api.mix-ip.com/v1/datasets/\${datasetId}\`,
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
      }
    }
  );
  
  return response.json();
};
  `.trim();
  
  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold mb-2">API Integration Setup</h2>
        <p className="text-mixip-gray-medium">
          Configure your API access to programmatically integrate with Mix-IP datasets
        </p>
      </div>
      
      <div className="space-y-6 mb-6">
        <div className="bg-gray-50 border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Code className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="font-semibold text-lg">Your API Key</h3>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={toggleApiKeyVisibility}>
                    {apiKeyRevealed ? 'Hide' : 'Reveal'}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {apiKeyRevealed ? 'Hide API Key' : 'Show API Key'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex items-center mb-4">
            <div className="flex-grow relative">
              <Input 
                type={apiKeyRevealed ? "text" : "password"} 
                value={apiKeyRevealed ? sampleApiKey : "••••••••••••••••••••••••••••••••"}
                readOnly
                className="pr-12 font-mono"
              />
              <button 
                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                onClick={handleCopyClick}
              >
                {copiedToClipboard ? 
                  <Check className="h-5 w-5 text-green-500" /> : 
                  <Copy className="h-5 w-5" />
                }
              </button>
            </div>
          </div>
          
          <div className="flex items-start space-x-2 text-amber-700 bg-amber-50 p-3 rounded-md mb-4">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              Keep your API key secure and never share it publicly. This key provides programmatic access to datasets you license.
            </p>
          </div>
          
          <Button variant="outline" size="sm" className="text-blue-600">
            Regenerate API Key
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="sampleCode">Sample API Request</Label>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs"
              onClick={() => navigator.clipboard.writeText(sampleCode)}
            >
              <Copy className="h-3.5 w-3.5 mr-1" />
              Copy
            </Button>
          </div>
          <div className="relative bg-gray-900 text-gray-100 rounded-md p-4 font-mono text-sm">
            <pre>{sampleCode}</pre>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center">
              <Server className="h-4 w-4 mr-2 text-purple-500" />
              Webhook Configuration
            </Label>
            <div className="flex items-center space-x-2">
              <Label htmlFor="webhookToggle" className="text-sm text-gray-500">
                {webhooksEnabled ? "Enabled" : "Disabled"}
              </Label>
              <Checkbox 
                id="webhookToggle" 
                checked={webhooksEnabled}
                onCheckedChange={(checked) => setWebhooksEnabled(checked as boolean)}
              />
            </div>
          </div>
          
          {webhooksEnabled && (
            <div className="space-y-3 border-l-2 border-purple-200 pl-4 ml-1 mt-3">
              <div className="space-y-2">
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input 
                  id="webhookUrl" 
                  placeholder="https://your-app.com/api/mix-ip-webhook" 
                />
              </div>
              <div className="space-y-2">
                <Label>Events to Subscribe</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="datasetUpdated" />
                    <Label htmlFor="datasetUpdated" className="text-sm cursor-pointer">
                      Dataset Updated
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="requestFulfilled" />
                    <Label htmlFor="requestFulfilled" className="text-sm cursor-pointer">
                      Request Fulfilled
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="newContentAvailable" />
                    <Label htmlFor="newContentAvailable" className="text-sm cursor-pointer">
                      New Content Available
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start">
          <HelpCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">API Documentation</p>
            <p className="mb-2">
              Comprehensive API documentation will be available after completing your setup. 
              You'll find endpoints for dataset discovery, content retrieval, and custom request management.
            </p>
            <Button variant="outline" size="sm" className="bg-white text-blue-600 mt-1">
              <Terminal className="h-3.5 w-3.5 mr-1" />
              Preview API Docs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiIntegrationSetup;
