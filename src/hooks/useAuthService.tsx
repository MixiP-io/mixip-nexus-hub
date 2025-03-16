
import { useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

export function useAuthService() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user ID:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      console.log('Profile fetched successfully:', data);
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const signIn = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      console.log('Attempting sign in for email:', email, 'with remember me:', rememberMe);
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password,
        options: {
          // Maintain session across browser restarts if rememberMe is true
          persistSession: rememberMe
        }
      });
      
      if (error) throw error;
      
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

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      console.log('Attempting sign up for email:', email, 'with metadata:', metadata);
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) throw error;
      
      console.log('Sign up response:', data);
      
      if (data.user && data.session) {
        // If the user is immediately signed in after signup
        console.log('User immediately signed in after signup');
        setUser(data.user);
        setSession(data.session);
        toast({
          title: "Sign up successful",
          description: "Your account has been created successfully!",
        });
        navigate('/dashboard');
      } else {
        // If email confirmation is required
        console.log('Email confirmation required, user not immediately signed in');
        toast({
          title: "Sign up successful",
          description: "Please check your email for verification.",
        });
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Sign up failed",
        description: error.message || "An error occurred during sign up.",
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

  const signOut = async () => {
    try {
      console.log('Attempting sign out');
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('Sign out successful');
      // Navigation will be handled by the auth state change listener
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    session,
    setSession,
    user,
    setUser,
    profile,
    setProfile,
    isLoading,
    setIsLoading,
    fetchProfile,
    signIn,
    signUp,
    signInWithSocial,
    signOut,
  };
}
