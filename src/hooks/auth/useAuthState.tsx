
import { useState, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { UserProfile } from '@/context/AuthContext/profileTypes';

export function useAuthState() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(loading);
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
