
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export function useSignIn(setIsLoading: (isLoading: boolean) => void) {
  const signIn = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      console.log('Attempting sign in for email:', email, 'with remember me:', rememberMe);
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password,
      });
      
      if (error) {
        console.error('Sign in error details:', error);
        throw error;
      }
      
      console.log('Sign in successful, response:', data);
      // Navigation will be handled by the auth state change listener
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        title: "Sign in failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithSocial = async (provider: 'google' | 'twitter' | 'instagram') => {
    try {
      console.log('Attempting social sign in with provider:', provider);
      setIsLoading(true);
      let providerKey: 'google' | 'twitter' = provider === 'instagram' ? 'twitter' : provider;
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: providerKey,
        options: {
          redirectTo: window.location.origin + '/auth/callback',
        },
      });
      
      console.log('Social sign in response:', data);
      
      if (error) throw error;
      // Redirection will be handled by the OAuth provider
    } catch (error: any) {
      console.error('Social sign in error:', error);
      toast({
        title: "Social sign in failed",
        description: error.message || "An error occurred during sign in.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return {
    signIn,
    signInWithSocial,
  };
}
