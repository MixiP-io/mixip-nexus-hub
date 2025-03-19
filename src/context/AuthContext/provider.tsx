
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useAuthService } from '@/hooks/useAuthService';
import AuthContext from './context';
import { UserProfile } from './profileTypes';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuthService();
  const [stableLoading, setStableLoading] = useState(true);
  
  const {
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
  } = auth;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (isLoading) {
      setStableLoading(true);
    } else {
      timer = setTimeout(() => {
        setStableLoading(false);
      }, 300);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('Starting auth initialization');
        setIsLoading(true);
        
        const { data } = await supabase.auth.getSession();
        console.log('Initial session check:', data.session ? 'User logged in' : 'No session found');
        
        setSession(data.session);
        setUser(data.session?.user ?? null);
        
        if (data.session?.user) {
          console.log('User has session, fetching profile');
          
          if (location.pathname === '/login') {
            console.log('User already logged in and on login page, redirecting to dashboard');
            navigate('/dashboard');
            setIsLoading(false);
            return;
          }
          
          try {
            const profileData = await fetchProfile(data.session.user.id);
            
            // Check if it's a new AI Platform user that should be directed to the setup flow
            if (profileData && 
                profileData.account_type === 'ai_platform' && 
                profileData.is_new_user === true &&
                location.pathname !== '/ai-platform/setup') {
              console.log('New AI Platform user detected, redirecting to specialized onboarding');
              navigate('/ai-platform/setup', { replace: true });
            }
          } catch (error) {
            console.error('Error fetching profile during initialization:', error);
          } finally {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error during auth initialization:', error);
        setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (event === 'SIGNED_OUT') {
          console.log('SIGNED_OUT event detected, redirecting to login page');
          setSession(null);
          setUser(null);
          setProfile(null);
          
          toast({
            title: "Signed out",
            description: "You have been signed out.",
          });
          
          navigate('/login', { replace: true });
          return;
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('SIGNED_IN event detected, fetching profile and redirecting');
          try {
            const profileData = await fetchProfile(session.user.id);
            
            toast({
              title: "Signed in successfully",
              description: "Welcome back!",
            });
            
            handleRedirectAfterSignIn(profileData);
          } catch (error) {
            console.error('Error checking profile for navigation:', error);
            navigate('/dashboard', { replace: true });
          }
        }

        if (event === 'USER_UPDATED') {
          console.log('USER_UPDATED event detected, updating profile');
          if (session?.user) {
            const profileData = await fetchProfile(session.user.id);
            
            // If we're on the setup page and the user is no longer a new user,
            // redirect them to the dashboard
            if (location.pathname === '/ai-platform/setup' && 
                profileData && 
                profileData.is_new_user === false) {
              console.log('AI Platform setup complete, redirecting to dashboard');
              navigate('/dashboard', { replace: true });
            }
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname, setSession, setUser, setIsLoading, fetchProfile, setProfile]);

  const handleRedirectAfterSignIn = (profileData: UserProfile | null) => {
    console.log('Profile data for navigation decision:', profileData);
    console.log('Account type from profile:', profileData?.account_type);
    
    if (profileData && 
        profileData.account_type === 'ai_platform' && 
        profileData.is_new_user === true) {
      console.log('New AI Platform user detected, redirecting to specialized onboarding');
      navigate('/ai-platform/setup', { replace: true });
      return;
    }
    
    console.log('Navigating to dashboard after sign in');
    navigate('/dashboard', { replace: true });
  };

  if (stableLoading && !user && location.pathname !== '/login') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
          <h2 className="text-lg font-semibold">Loading your session...</h2>
          <p className="mt-2 text-gray-500">Please wait while we authenticate you.</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        isLoading: stableLoading,
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
