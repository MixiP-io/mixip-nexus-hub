
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AnimatedLogo from '@/components/ui/AnimatedLogo';

interface LoginHeaderProps {
  isLogin: boolean;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ isLogin }) => {
  return (
    <>
      <div className="p-4 md:hidden">
        <Link to="/" className="inline-flex items-center text-mixip-blue hover:text-mixip-blue-dark transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
      </div>
      
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4 md:hidden">
          <AnimatedLogo size="md" />
        </div>
        <h2 className="text-3xl font-bold text-mixip-gray-dark mb-2">
          {isLogin ? 'Sign in' : 'Create an account'}
        </h2>
        <p className="text-mixip-gray-medium">
          {isLogin ? 'Sign in to access your account' : 'Join MixiP to manage your digital content'}
        </p>
      </div>
    </>
  );
};

export default LoginHeader;
