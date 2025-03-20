
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export function useSignOut(
  setIsLoading: (isLoading: boolean) => void,
  setProfile: (profile: null) => void
) {
  const navigate = useNavigate();
  
  const signOut = async () => {
    try {
      console.log('Attempting sign out');
      setIsLoading(true);
      
      // Clear profile data first to prevent stale data issues
      setProfile(null);
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      console.log('Sign out successful');
      
      // Explicitly navigate to login page
      navigate('/login', { replace: true });
      
      toast({
        title: "Signed out successfully",
        description: "You have been signed out.",
      });
      
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { signOut };
}
