
import { useState, useCallback, useRef } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { UserProfile } from '@/context/AuthContext/profileTypes';

export function useAuthState() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use a ref to track initial loading state
  const initialLoadComplete = useRef(false);

  // Optimize state updates with useCallback
  const updateSession = useCallback((newSession: Session | null) => {
    setSession(newSession);
  }, []);

  const updateUser = useCallback((newUser: User | null) => {
    setUser(newUser);
  }, []);

  const updateProfile = useCallback((newProfile: UserProfile | null) => {
    setProfile(newProfile);
  }, []);

  const updateIsLoading = useCallback((loading: boolean) => {
    // Only update loading state if we're not in a flickering situation
    if (loading === true && initialLoadComplete.current) {
      // Avoid setting loading back to true after initial load
      return;
    }
    
    setIsLoading(loading);
    
    // Mark initial load as complete when we first set loading to false
    if (!loading) {
      initialLoadComplete.current = true;
    }
  }, []);

  return {
    session,
    setSession: updateSession,
    user,
    setUser: updateUser,
    profile,
    setProfile: updateProfile,
    isLoading,
    setIsLoading: updateIsLoading,
  };
}
