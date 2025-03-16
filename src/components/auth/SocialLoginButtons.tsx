
import React from 'react';
import { Button } from '@/components/ui/button';

interface SocialLoginButtonsProps {
  handleSocialSignIn: (provider: 'google' | 'twitter' | 'instagram') => void;
  isSubmitting: boolean;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ 
  handleSocialSignIn, 
  isSubmitting 
}) => {
  return (
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
  );
};

export default SocialLoginButtons;
