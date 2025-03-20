import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { UserProfile } from '@/context/AuthContext/profileTypes';

export function useAuthStateListeners(
  setSession: (session: any) => void,
  setUser: (user: any) => void,
  setProfile: (profile: UserProfile | null) => void,
  fetchProfile: (userId: string) => Promise<UserProfile | null>
) {
  const navigate = useNavigate();

  useEffect(() => {
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
          
          // Ensure navigation happens with a short delay to avoid race conditions
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 100);
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
            await fetchProfile(session.user.id);
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setSession, setUser, setProfile, fetchProfile, navigate]);

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

  return { handleRedirectAfterSignIn };
}
