
import React from 'react';
import { Separator } from '@/components/ui/separator';
import LoginForm from './LoginForm';
import SocialLoginButtons from './SocialLoginButtons';
import AccountTypeSelector from './AccountTypeSelector';
import { AccountType } from '@/context/AuthContext/profileTypes';

interface LoginFormContainerProps {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  name: string;
  setName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  accountType: AccountType;
  setAccountType: (type: AccountType) => void;
  agreeToTerms: boolean;
  setAgreeToTerms: (agree: boolean) => void;
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleSocialSignIn: (provider: 'google' | 'twitter' | 'instagram') => void;
  isSubmitting: boolean;
  isLoading: boolean;
}

const LoginFormContainer: React.FC<LoginFormContainerProps> = ({
  isLogin,
  setIsLogin,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  phone,
  setPhone,
  accountType,
  setAccountType,
  agreeToTerms,
  setAgreeToTerms,
  rememberMe,
  setRememberMe,
  handleSubmit,
  handleSocialSignIn,
  isSubmitting,
  isLoading
}) => {
  return (
    <div className="bg-white p-8 shadow-sm rounded-xl border border-gray-100">
      {!isLogin && (
        <AccountTypeSelector 
          accountType={accountType}
          setAccountType={setAccountType}
          isSubmitting={isSubmitting}
        />
      )}

      <SocialLoginButtons 
        handleSocialSignIn={handleSocialSignIn}
        isSubmitting={isSubmitting}
      />
      
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200"></span>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with email</span>
        </div>
      </div>
      
      <div className={isLogin ? "" : "mt-6"}>
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          agreeToTerms={agreeToTerms}
          setAgreeToTerms={setAgreeToTerms}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isLoading={isLoading}
        />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-mixip-gray-medium">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              className="text-mixip-blue font-medium hover:underline"
              onClick={() => setIsLogin(!isLogin)}
              disabled={isSubmitting}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginFormContainer;
