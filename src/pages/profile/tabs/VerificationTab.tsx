
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Shield } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { VerificationStatus } from '@/context/AuthContext/profileTypes';

const VerificationTab = () => {
  const { profile } = useAuth();
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>(
    profile?.verification_status || 'not_verified'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requestVerification = async () => {
    setIsSubmitting(true);
    
    // Simulate verification request
    setTimeout(() => {
      setVerificationStatus('pending');
      setIsSubmitting(false);
      toast({
        title: "Verification Requested",
        description: "Your account verification request has been submitted and is under review.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Account Verification</h2>
        <p className="text-muted-foreground">Verify your account to unlock premium features and increase your credibility.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verification Status</CardTitle>
          <CardDescription>Your current verification status and options to upgrade</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            {verificationStatus === 'verified' ? (
              <>
                <CheckCircle className="h-10 w-10 text-green-500" />
                <div>
                  <h3 className="text-lg font-medium">Verified Account</h3>
                  <p className="text-sm text-gray-500">Your account has been successfully verified.</p>
                </div>
              </>
            ) : verificationStatus === 'pending' ? (
              <>
                <Clock className="h-10 w-10 text-amber-500" />
                <div>
                  <h3 className="text-lg font-medium">Verification In Progress</h3>
                  <p className="text-sm text-gray-500">Your verification request is being reviewed. This typically takes 1-3 business days.</p>
                </div>
              </>
            ) : (
              <>
                <Shield className="h-10 w-10 text-gray-400" />
                <div>
                  <h3 className="text-lg font-medium">Not Verified</h3>
                  <p className="text-sm text-gray-500">Request verification to unlock premium features and increase your credibility.</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter>
          {verificationStatus === 'not_verified' ? (
            <Button 
              onClick={requestVerification} 
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? 'Submitting Request...' : 'Request Verification'}
            </Button>
          ) : verificationStatus === 'pending' ? (
            <Button variant="outline" disabled className="w-full sm:w-auto">
              Verification In Progress
            </Button>
          ) : (
            <Button variant="outline" disabled className="w-full sm:w-auto">
              Account Verified
            </Button>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Verification Benefits</CardTitle>
          <CardDescription>Why you should verify your account</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Increased visibility in search results and recommendations</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Access to premium features and higher upload limits</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Enhanced credibility with clients and collaborators</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Early access to new tools and features</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationTab;
