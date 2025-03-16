
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLogin: boolean;
  name: string;
  setName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  agreeToTerms: boolean;
  setAgreeToTerms: (agree: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  isLogin,
  name,
  setName,
  phone,
  setPhone,
  agreeToTerms,
  setAgreeToTerms,
  handleSubmit,
  isSubmitting,
  isLoading
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
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
  );
};

export default LoginForm;
