
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { UserProfile } from '../profileTypes';

export const useAuthInitialization = (
  setSession: (session: any) => void,
  setUser: (user: any) => void,
  setProfile: (profile: any) => void,
  setIsLoading: (loading: boolean) => void,
  fetchProfile: (userId: string) => Promise<UserProfile | null>
) => {
  const navigate = useNavigate();
  const location = useLocation();
  
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
  }, [navigate, location.pathname, setSession, setUser, setProfile, setIsLoading, fetchProfile]);

  return null;
};
