
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import LoginHeader from '@/components/auth/LoginHeader';
import LoginFormContainer from '@/components/auth/LoginFormContainer';
import LoginInfoSection from '@/components/auth/LoginInfoSection';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [accountType, setAccountType] = useState<string | null>(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { signIn, signUp, signInWithSocial, user, isLoading } = useAuth();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      console.log('User is logged in, redirecting to dashboard');
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);
  
  const validateForm = () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!password) {
      toast({
        title: "Password required",
        description: "Please enter your password.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!isLogin) {
      if (!name) {
        toast({
          title: "Name required",
          description: "Please enter your full name.",
          variant: "destructive",
        });
        return false;
      }
      
      if (!accountType) {
        toast({
          title: "Account type required",
          description: "Please select an account type.",
          variant: "destructive",
        });
        return false;
      }
      
      if (!agreeToTerms) {
        toast({
          title: "Terms agreement required",
          description: "Please agree to the terms of service and privacy policy.",
          variant: "destructive",
        });
        return false;
      }
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      if (isLogin) {
        console.log('Signing in with:', email, 'Remember me:', rememberMe);
        await signIn(email, password, rememberMe);
        // Navigation is now handled in the auth state change listener
      } else {
        // Sign up with additional metadata
        console.log('Signing up with:', email, name, accountType);
        
        // Ensure account type is not null when logging
        console.log('Selected account type for signup:', accountType || 'none selected');
        
        const metadata = {
          full_name: name,
          phone: phone,
          account_type: accountType || 'creator_basic' // Default to creator_basic if somehow nothing is selected
        };
        
        await signUp(email, password, metadata);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'twitter' | 'instagram') => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      console.log(`Signing in with ${provider}`);
      await signInWithSocial(provider);
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex bg-gray-50">
      <LoginInfoSection />
      
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <LoginHeader isLogin={isLogin} />
          
          <LoginFormContainer
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            accountType={accountType}
            setAccountType={setAccountType}
            agreeToTerms={agreeToTerms}
            setAgreeToTerms={setAgreeToTerms}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
            handleSubmit={handleSubmit}
            handleSocialSignIn={handleSocialSignIn}
            isSubmitting={isSubmitting}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
