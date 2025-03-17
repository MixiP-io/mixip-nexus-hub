
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/context/AuthContext/profileTypes';

export function useProfileService(setProfile: (profile: UserProfile | null) => void) {
  const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      console.log('Fetching profile for user ID:', userId);
      
      // Use maybeSingle instead of single for better error handling
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error in profile fetch query:', error);
        throw error;
      }
      
      if (!data) {
        console.log('No profile found for user:', userId);
        return null;
      }
      
      console.log('Profile fetched successfully:', data);
      setProfile(data);
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  return { fetchProfile };
}
