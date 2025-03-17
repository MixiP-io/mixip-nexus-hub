
import React, { useEffect } from 'react';
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
    // Initial session check - optimized for performance
    const initializeAuth = async () => {
      try {
        console.log('Starting auth initialization');
        setIsLoading(true);
        
        const { data } = await supabase.auth.getSession();
        console.log('Initial session check:', data.session ? 'User logged in' : 'No session found');
        
        // Set session and user state immediately
        setSession(data.session);
        setUser(data.session?.user ?? null);
        
        // If user is logged in, fetch their profile
        if (data.session?.user) {
          console.log('User has session, fetching profile');
          
          // Handle redirect for already logged in users
          if (location.pathname === '/login') {
            console.log('User already logged in and on login page, redirecting to dashboard');
            navigate('/dashboard');
            // Set loading to false before redirect to prevent delay
            setIsLoading(false);
            return;
          }
          
          // Fetch profile in the background, don't block the UI
          fetchProfile(data.session.user.id)
            .catch(error => {
              console.error('Error fetching profile during initialization:', error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error during auth initialization:', error);
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Auth state change listener - optimized for better performance
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        // Update session state immediately
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('SIGNED_IN event detected, fetching profile and redirecting');
          try {
            const profileData = await fetchProfile(session.user.id);
            
            // Show toast after profile is fetched
            toast({
              title: "Signed in successfully",
              description: "Welcome back!",
            });
            
            handleRedirectAfterSignIn(profileData);
          } catch (error) {
            console.error('Error checking profile for navigation:', error);
            // Fall back to dashboard in case of error
            navigate('/dashboard', { replace: true });
          }
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

  // Helper function to handle redirects after sign in
  const handleRedirectAfterSignIn = (profileData: UserProfile | null) => {
    console.log('Profile data for navigation decision:', profileData);
    
    // Handle AI Platform user navigation
    if (profileData && 
        profileData.account_type === 'ai_platform' && 
        profileData.is_new_user === true) {
      console.log('New AI Platform user detected, redirecting to specialized onboarding');
      navigate('/ai-platform/setup', { replace: true });
      return;
    }
    
    // Otherwise navigate to dashboard
    console.log('Navigating to dashboard after sign in');
    navigate('/dashboard', { replace: true });
  };

  // Early return if still loading initial auth state
  if (isLoading && !user && location.pathname !== '/login') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
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
