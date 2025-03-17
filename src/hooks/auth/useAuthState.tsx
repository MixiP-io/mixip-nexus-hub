import { useState, useCallback, useRef, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { UserProfile } from '@/context/AuthContext/profileTypes';

export function useAuthState() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use refs to track initial loading state and session timeout
  const initialLoadComplete = useRef(false);
  const sessionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Clear any existing session timeout on unmount
  useEffect(() => {
    return () => {
      if (sessionTimeoutRef.current) {
        clearTimeout(sessionTimeoutRef.current);
      }
    };
  }, []);
  
  // Set a session keepalive function that runs periodically
  useEffect(() => {
    if (session) {
      const keepSessionAlive = () => {
        console.log('Session keepalive check - session active');
        // Reset the timeout
        if (sessionTimeoutRef.current) {
          clearTimeout(sessionTimeoutRef.current);
        }
        
        // Set a new timeout
        sessionTimeoutRef.current = setTimeout(keepSessionAlive, 10 * 60 * 1000); // 10 minutes
      };
      
      // Start the initial timeout
      keepSessionAlive();
      
      return () => {
        if (sessionTimeoutRef.current) {
          clearTimeout(sessionTimeoutRef.current);
        }
      };
    }
  }, [session]);

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
