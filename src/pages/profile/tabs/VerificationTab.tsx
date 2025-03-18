import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertTriangle, Building, FileCheck, Shield, Bolt } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const VerificationTab: React.FC = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  
  // Determine verification status from profile
  // For now, we'll assume new users need verification
  const verificationStatus: 'pending' | 'verified' | 'not_verified' = 
    profile?.is_new_user ? 'pending' : 'verified';
  
  const getStatusBadge = () => {
    switch (verificationStatus) {
      case "verified":
        return (
          <Badge className="bg-green-600 text-white font-medium flex items-center gap-1 px-3 py-1">
            <CheckCircle className="h-4 w-4" />
            Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500 text-white font-medium flex items-center gap-1 px-3 py-1">
            <Clock className="h-4 w-4" />
            Verification Pending
          </Badge>
        );
      case "not_verified":
        return (
          <Badge className="bg-red-500 text-white font-medium flex items-center gap-1 px-3 py-1">
            <AlertTriangle className="h-4 w-4" />
            Verification Failed
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-500 text-white font-medium flex items-center gap-1 px-3 py-1">
            <AlertTriangle className="h-4 w-4" />
            Not Verified
          </Badge>
        );
    }
  };

  const handleCompleteSetup = () => {
    navigate('/ai-platform/setup');
  };
  
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gray-800 border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">AI Platform Account Verification</h3>
          {getStatusBadge()}
        </div>
        
        <p className="text-gray-300 mb-6">
          AI Platform accounts require verification to ensure compliance with our data usage policies and to provide you with the best experience.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-700">
            <div className={`p-2 rounded-full ${verificationStatus === 'verified' ? 'bg-green-900/60 text-green-400' : 'bg-gray-600 text-gray-400'}`}>
              <Building className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-white">Company Verification</h4>
              <p className="text-sm text-gray-400">Verify your organization's identity and business details</p>
            </div>
            <div>
              {verificationStatus === 'verified' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Clock className="h-5 w-5 text-amber-500" />
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-700">
            <div className={`p-2 rounded-full ${verificationStatus === 'verified' ? 'bg-green-900/60 text-green-400' : 'bg-gray-600 text-gray-400'}`}>
              <FileCheck className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-white">Data Requirements</h4>
              <p className="text-sm text-gray-400">Specify your data structure and classification needs</p>
            </div>
            <div>
              {verificationStatus === 'verified' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Clock className="h-5 w-5 text-amber-500" />
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-700">
            <div className={`p-2 rounded-full ${verificationStatus === 'verified' ? 'bg-green-900/60 text-green-400' : 'bg-gray-600 text-gray-400'}`}>
              <Shield className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-white">Compliance Agreement</h4>
              <p className="text-sm text-gray-400">Accept the terms for data usage and compliance regulations</p>
            </div>
            <div>
              {verificationStatus === 'verified' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Clock className="h-5 w-5 text-amber-500" />
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-700">
            <div className={`p-2 rounded-full ${verificationStatus === 'verified' ? 'bg-green-900/60 text-green-400' : 'bg-gray-600 text-gray-400'}`}>
              <Bolt className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-white">API Integration</h4>
              <p className="text-sm text-gray-400">Configure API access and integration points</p>
            </div>
            <div>
              {verificationStatus === 'verified' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Clock className="h-5 w-5 text-amber-500" />
              )}
            </div>
          </div>
        </div>
        
        {profile?.is_new_user && (
          <div className="mt-6">
            <Button 
              onClick={handleCompleteSetup}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Complete Verification Process
            </Button>
            <p className="text-xs text-gray-400 mt-2 text-center">
              You need to complete the verification process to access all AI Platform features
            </p>
          </div>
        )}
        
        {!profile?.is_new_user && (
          <div className="p-4 bg-green-900/30 border border-green-700 rounded-lg mt-6">
            <div className="flex items-center text-green-400 gap-2 mb-2">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Verification Complete</span>
            </div>
            <p className="text-sm text-green-300">
              Your AI Platform account has been fully verified. You have full access to all features.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default VerificationTab;
