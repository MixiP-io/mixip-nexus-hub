
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedLogo from '@/components/ui/AnimatedLogo';

const LoginInfoSection: React.FC = () => {
  return (
    <div className="hidden md:flex md:w-1/2 bg-[#1A1F2C] text-white flex-col p-12">
      <div className="flex items-center mb-16">
        <AnimatedLogo size="md" />
        <span className="font-bold text-2xl ml-3">Mix-IP</span>
      </div>
      
      <div className="flex-1 flex flex-col justify-center max-w-md">
        <h1 className="text-4xl font-bold mb-6">Welcome back! Let's get creating.</h1>
        <p className="text-lg text-gray-300 mb-12">
          Get the high availability digital asset management tools you need to succeed in creating and monetizing content.
        </p>
        
        <div>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full bg-transparent border-white text-white hover:bg-white/10"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Xvidia App
          </Button>
          <p className="text-sm text-gray-400 mt-3 text-center">
            Enhance your experience with our mobile companion
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginInfoSection;
