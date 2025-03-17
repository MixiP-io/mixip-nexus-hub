
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/context/AuthContext/profileTypes';

export function useProfileService(setProfile: (profile: UserProfile | null) => void) {
  // Cache for recently fetched profiles to prevent redundant queries
  const profileCache = new Map<string, { data: UserProfile | null, timestamp: number }>();
  const CACHE_TTL = 5000; // 5 seconds cache time-to-live
  
  const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      // Check cache first
      const cachedProfile = profileCache.get(userId);
      if (cachedProfile && (Date.now() - cachedProfile.timestamp < CACHE_TTL)) {
        console.log('Using cached profile for user:', userId);
        setProfile(cachedProfile.data);
        return cachedProfile.data;
      }
      
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
        // Cache the null result to prevent repeated queries
        profileCache.set(userId, { data: null, timestamp: Date.now() });
        setProfile(null);
        return null;
      }
      
      console.log('Profile fetched successfully:', data);
      // Update cache
      profileCache.set(userId, { data, timestamp: Date.now() });
      setProfile(data);
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  return { fetchProfile };
}
