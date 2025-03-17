
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useAuthService } from '@/hooks/useAuthService';
import AuthContext from './context';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    session,
    setSession,
    user,
    setUser,
    profile,
    isLoading,
    setIsLoading,
    fetchProfile,
    signIn,
    signUp,
    signInWithSocial,
    signOut,
  } = useAuthService();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session ? 'User logged in' : 'No session found');
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      if (session?.user) {
        console.log('User has session, fetching profile');
        fetchProfile(session.user.id);
        
        // If user is on login page but already has a session, redirect to dashboard
        if (location.pathname === '/login') {
          console.log('User already logged in and on login page, redirecting to dashboard');
          navigate('/dashboard');
        }
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);

        if (event === 'SIGNED_IN' && session?.user) {
          console.log('SIGNED_IN event detected, fetching profile and redirecting');
          fetchProfile(session.user.id);
          toast({
            title: "Signed in successfully",
            description: "Welcome back!",
          });
          
          // Force navigation to dashboard on sign in
          console.log('Navigating to dashboard after sign in');
          navigate('/dashboard', { replace: true });
        }
        
        if (event === 'SIGNED_OUT') {
          console.log('SIGNED_OUT event detected, redirecting to login page');
          toast({
            title: "Signed out",
            description: "You have been signed out.",
          });
          navigate('/login', { replace: true });
        }

        if (event === 'USER_UPDATED') {
          console.log('USER_UPDATED event detected, updating profile');
          if (session?.user) {
            fetchProfile(session.user.id);
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname, setSession, setUser, setIsLoading, fetchProfile]);

  // Check if user is a new AI Platform user and redirect to specialized onboarding
  useEffect(() => {
    if (profile && profile.account_type === 'ai_platform' && profile.is_new_user) {
      console.log('New AI Platform user detected, redirecting to specialized onboarding');
      navigate('/ai-platform/setup');
    }
  }, [profile, navigate]);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        isLoading,
        signIn,
        signUp,
        signInWithSocial,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
