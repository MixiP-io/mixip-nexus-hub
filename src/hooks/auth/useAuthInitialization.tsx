
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/context/AuthContext/profileTypes';
import { toast } from '@/components/ui/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';

export function useAuthInitialization(
  setSession: (session: any) => void,
  setUser: (user: any) => void,
  setProfile: (profile: UserProfile | null) => void,
  fetchProfile: (userId: string) => Promise<UserProfile | null>,
  setIsLoading: (isLoading: boolean) => void
) {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    let isMounted = true;
    
    const authTimeout = setTimeout(() => {
      if (isMounted && setIsLoading) {
        console.log('Auth initialization timed out, forcing completion');
        setIsLoading(false);
      }
    }, 5000); // 5 second timeout as failsafe
    
    const initializeAuth = async () => {
      try {
        console.log('Starting auth initialization');
        if (isMounted) setIsLoading(true);
        
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          if (isMounted) setIsLoading(false);
          return;
        }
        
        console.log('Initial session check:', data.session ? 'User logged in' : 'No session found');
        
        if (isMounted) {
          setSession(data.session);
          setUser(data.session?.user ?? null);
        }
        
        if (data.session?.user) {
          console.log('User has session, fetching profile');
          
          if (location.pathname === '/login') {
            console.log('User already logged in and on login page, redirecting to dashboard');
            navigate('/dashboard');
            if (isMounted) setIsLoading(false);
            return;
          }
          
          try {
            await fetchProfile(data.session.user.id);
          } catch (error) {
            console.error('Error fetching profile during initialization:', error);
          } finally {
            if (isMounted) setIsLoading(false);
          }
        } else {
          if (isMounted) setIsLoading(false);
        }
      } catch (error) {
        console.error('Error during auth initialization:', error);
        if (isMounted) setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
      clearTimeout(authTimeout);
    };
  }, [navigate, location.pathname, setSession, setUser, setIsLoading, fetchProfile, setProfile]);
}
