
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Bot, Building, Database, Code, CheckCircle, Server, ShieldCheck, FileText } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import CompanyVerificationForm from '@/components/ai-platform/CompanyVerificationForm';
import DataRequirementsForm from '@/components/ai-platform/DataRequirementsForm';
import ApiIntegrationSetup from '@/components/ai-platform/ApiIntegrationSetup';
import ComplianceAgreement from '@/components/ai-platform/ComplianceAgreement';
import PlatformIntroduction from '@/components/ai-platform/PlatformIntroduction';

const AIPlatformSetup: React.FC = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  // Calculate total steps for the progress bar
  const totalSteps = 5;
  
  useEffect(() => {
    // Check if user is logged in and has AI Platform account type
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Check if profile is loaded and if account type is ai_platform
    if (profile && profile.account_type !== 'ai_platform') {
      toast.error("This setup is only for AI Platform accounts");
      navigate('/dashboard');
    }
    
    // Set initial progress
    setProgress((step / totalSteps) * 100);
  }, [user, profile, navigate, step]);

  const nextStep = () => {
    if (step < totalSteps) {
      const newStep = step + 1;
      setStep(newStep);
      setProgress((newStep / totalSteps) * 100);
      window.scrollTo(0, 0);
    } else {
      finishSetup();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      const newStep = step - 1;
      setStep(newStep);
      setProgress((newStep / totalSteps) * 100);
      window.scrollTo(0, 0);
    }
  };

  const finishSetup = async () => {
    setIsLoading(true);
    
    try {
      // TODO: Save all profile data to Supabase
      
      toast.success("AI Platform setup complete!");
      
      // Navigate to the AI Dashboard after setup is complete
      navigate('/dashboard/workspace?tab=datasets');
    } catch (error) {
      console.error("Failed to complete setup:", error);
      toast.error("Failed to complete setup. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Render step content based on current step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <PlatformIntroduction />;
      case 2:
        return <CompanyVerificationForm />;
      case 3:
        return <DataRequirementsForm />;
      case 4:
        return <ApiIntegrationSetup />;
      case 5:
        return <ComplianceAgreement />;
      default:
        return <PlatformIntroduction />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-mixip-gray-dark">AI Platform Setup</h1>
              <p className="text-mixip-gray-medium">Complete your AI Platform account setup to start accessing structured visual datasets</p>
            </div>
            
            <div className="mb-6">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-sm text-mixip-gray-medium mt-2">
                <span>Introduction</span>
                <span>Company Verification</span>
                <span>Data Requirements</span>
                <span>API Setup</span>
                <span>Compliance</span>
              </div>
            </div>
            
            <Card className="p-6">
              {renderStepContent()}
              
              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={prevStep} 
                  disabled={step === 1 || isLoading}
                >
                  Back
                </Button>
                <Button 
                  onClick={nextStep} 
                  disabled={isLoading}
                >
                  {isLoading ? 
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span> : 
                    step === totalSteps ? 'Complete Setup' : 'Continue'
                  }
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIPlatformSetup;
