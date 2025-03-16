
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Download, User, Building, Paintbrush, Bot, Lock } from 'lucide-react';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [accountType, setAccountType] = useState<string | null>(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { signIn, signUp, signInWithSocial, user, isLoading } = useAuth();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
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
        await signIn(email, password);
      } else {
        // Sign up with additional metadata
        const metadata = {
          full_name: name,
          phone: phone,
          account_type: accountType
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
      await signInWithSocial(provider);
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Info section */}
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
      
      {/* Right side - Login/Register form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
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
          
          <div className="bg-white p-8 shadow-sm rounded-xl border border-gray-100">
            {!isLogin && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Choose account type</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    type="button"
                    onClick={() => setAccountType('creator_basic')}
                    className={`p-4 border rounded-md hover:border-mixip-blue hover:bg-blue-50 flex flex-col items-center text-center transition-colors ${accountType === 'creator_basic' ? 'border-mixip-blue bg-blue-50' : ''}`}
                  >
                    <User className="h-6 w-6 mb-2 text-mixip-blue" />
                    <span className="font-medium">Creator Basic</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setAccountType('creator_pro')}
                    className={`p-4 border rounded-md hover:border-mixip-purple hover:bg-purple-50 flex flex-col items-center text-center transition-colors ${accountType === 'creator_pro' ? 'border-mixip-purple bg-purple-50' : ''}`}
                  >
                    <Paintbrush className="h-6 w-6 mb-2 text-mixip-purple" />
                    <span className="font-medium">Creator Pro</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setAccountType('business')}
                    className={`p-4 border rounded-md hover:border-mixip-orange hover:bg-orange-50 flex flex-col items-center text-center transition-colors ${accountType === 'business' ? 'border-mixip-orange bg-orange-50' : ''}`}
                  >
                    <Building className="h-6 w-6 mb-2 text-mixip-orange" />
                    <span className="font-medium">Business</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setAccountType('ai_platform')}
                    className={`p-4 border rounded-md hover:border-green-500 hover:bg-green-50 flex flex-col items-center text-center transition-colors ${accountType === 'ai_platform' ? 'border-green-500 bg-green-50' : ''}`}
                  >
                    <Bot className="h-6 w-6 mb-2 text-mixip-mint" />
                    <span className="font-medium">AI Platform</span>
                  </button>
                </div>
              </div>
            )}

            {/* Social Login Buttons */}
            <div className="mb-6 space-y-3">
              <Button 
                type="button"
                variant="outline" 
                size="lg" 
                className="w-full border-gray-300 flex items-center justify-center"
                onClick={() => handleSocialSignIn('google')}
                disabled={isSubmitting}
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5 mr-2" />
                Continue with Google
              </Button>
              
              <Button 
                type="button"
                variant="outline" 
                size="lg" 
                className="w-full border-gray-300 flex items-center justify-center"
                onClick={() => handleSocialSignIn('twitter')}
                disabled={isSubmitting}
              >
                <img src="https://www.svgrepo.com/show/511347/twitter-154.svg" alt="Twitter" className="h-5 w-5 mr-2" />
                Continue with Twitter
              </Button>
              
              {/* Instagram - Using Twitter OAuth for now */}
              <Button 
                type="button"
                variant="outline" 
                size="lg" 
                className="w-full border-gray-300 flex items-center justify-center"
                onClick={() => handleSocialSignIn('instagram')}
                disabled={isSubmitting}
              >
                <img src="https://www.svgrepo.com/show/452229/instagram-1.svg" alt="Instagram" className="h-5 w-5 mr-2" />
                Continue with Instagram
              </Button>
            </div>
            
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200"></span>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>
            
            <div className={isLogin ? "" : "mt-6"}>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-mixip-gray-dark">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        className="mt-1"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-mixip-gray-dark">
                        Phone Number (Optional)
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        className="mt-1"
                        placeholder="+1 (555) 123-4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-mixip-gray-dark">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="mt-1"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-mixip-gray-dark">
                      Password
                    </Label>
                    {isLogin && (
                      <a href="#forgot-password" className="text-sm text-mixip-blue hover:underline">
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="pr-10"
                      placeholder={isLogin ? "Enter your password" : "Create a password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      disabled={isSubmitting}
                    >
                      {showPassword ? 
                        <EyeOff className="h-5 w-5" /> : 
                        <Eye className="h-5 w-5" />
                      }
                    </button>
                  </div>
                </div>
                
                {!isLogin && (
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-mixip-blue focus:ring-mixip-blue"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-mixip-gray-medium">
                        I agree to the <a href="#terms" className="text-mixip-blue hover:underline">Terms of Service</a> and <a href="#privacy" className="text-mixip-blue hover:underline">Privacy Policy</a>
                      </label>
                    </div>
                  </div>
                )}
                
                <Button
                  type="submit"
                  className="w-full py-3 bg-mixip-blue hover:bg-mixip-blue-dark transition-colors"
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting ? 
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span> : 
                    isLogin ? 'Sign In' : 'Create Account'
                  }
                </Button>
              </form>
              
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
        </div>
      </div>
    </div>
  );
};

export default Login;
