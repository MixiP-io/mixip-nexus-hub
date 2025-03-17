
import { useNavigate } from 'react-router-dom';
import { useAuthState } from './auth/useAuthState';
import { useProfileService } from './auth/useProfileService';
import { useSignIn } from './auth/useSignIn';
import { useSignUp } from './auth/useSignUp';
import { useSignOut } from './auth/useSignOut';

export function useAuthService() {
  const navigate = useNavigate();
  
  const {
    session,
    setSession,
    user,
    setUser,
    profile,
    setProfile,
    isLoading,
    setIsLoading,
  } = useAuthState();
  
  const { fetchProfile } = useProfileService(setProfile);
  const { signIn, signInWithSocial } = useSignIn(setIsLoading);
  const { signUp } = useSignUp(setIsLoading, setUser, setSession);
  const { signOut } = useSignOut(setIsLoading, setProfile);

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
