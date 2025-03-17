
import React from 'react';
import { Bot, Database, Shield, Code, Zap } from 'lucide-react';

const PlatformIntroduction: React.FC = () => {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold mb-2">Welcome to the AI Platform</h2>
        <p className="text-mixip-gray-medium">
          Complete this setup process to gain access to high-quality, rights-cleared visual datasets for AI training and development
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border rounded-xl p-6 bg-blue-50">
          <div className="flex items-start mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Discover Datasets</h3>
              <p className="text-mixip-gray-medium text-sm">
                Browse and access diverse, high-quality datasets organized by category, use case, and technical specifications
              </p>
            </div>
          </div>
        </div>
        
        <div className="border rounded-xl p-6 bg-purple-50">
          <div className="flex items-start mb-4">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <Code className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">API Integration</h3>
              <p className="text-mixip-gray-medium text-sm">
                Seamlessly integrate with our API to incorporate structured visual data directly into your ML pipeline
              </p>
            </div>
          </div>
        </div>
        
        <div className="border rounded-xl p-6 bg-green-50">
          <div className="flex items-start mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Bot className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Custom Requests</h3>
              <p className="text-mixip-gray-medium text-sm">
                Create specific data requests matched to your exact training and validation requirements
              </p>
            </div>
          </div>
        </div>
        
        <div className="border rounded-xl p-6 bg-orange-50">
          <div className="flex items-start mb-4">
            <div className="bg-orange-100 p-3 rounded-full mr-4">
              <Shield className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Rights Management</h3>
              <p className="text-mixip-gray-medium text-sm">
                All content comes with clear licensing terms and rights clearance for AI training purposes
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 border rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-3">What to Expect in This Setup Process</h3>
        <ol className="space-y-3">
          <li className="flex items-start">
            <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</span>
            <p><strong>Company Verification</strong> — Establish your organization's identity and build trust with content creators</p>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</span>
            <p><strong>Data Requirements</strong> — Specify the types of visual data your AI projects need</p>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</span>
            <p><strong>API Integration</strong> — Set up programmatic access to datasets</p>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">4</span>
            <p><strong>Compliance Agreement</strong> — Ensure ethical and legal use of licensed data</p>
          </li>
        </ol>
      </div>
      
      <div className="flex items-center bg-green-50 border border-green-100 rounded-lg p-4">
        <Zap className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
        <p className="text-sm">
          This process typically takes about 10-15 minutes to complete, and you'll have immediate access to sample datasets upon completion.
        </p>
      </div>
    </div>
  );
};

export default PlatformIntroduction;
