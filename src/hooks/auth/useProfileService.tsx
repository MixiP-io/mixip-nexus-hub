
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/context/AuthContext/profileTypes';

export function useProfileService(setProfile: (profile: UserProfile | null) => void) {
  const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      console.log('Fetching profile for user ID:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
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
