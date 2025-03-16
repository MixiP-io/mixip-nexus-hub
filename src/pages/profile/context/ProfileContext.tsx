
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Role {
  id: string;
  title: string;
  experience: string;
  specialties: string[];
}

interface ProfessionalInfo {
  roles: Role[];
  equipment: string;
}

export interface ProfileData {
  fullName: string;
  displayName: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  avatar: string;
  languages: string[];
  skills: string[];
  profileCompletion: number;
  // Social media links
  website: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  // Professional information
  professionalInfo?: ProfessionalInfo;
}

interface ProfileContextType {
  profileData: ProfileData;
  updateProfileData: (newData: Partial<ProfileData>) => void;
}

const defaultProfileData: ProfileData = {
  fullName: "John Doe",
  displayName: "johndoe",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  bio: "Professional videographer and photographer specializing in commercial and documentary work.",
  location: "New York, USA",
  avatar: "https://images.unsplash.com/photo-1581992652564-44c42f5ad3ad?q=80&w=250&auto=format&fit=crop",
  languages: ["English", "Spanish"],
  skills: ["Photography", "Videography", "Editing"],
  profileCompletion: 72,
  // Default values for social media links
  website: "",
  instagram: "",
  twitter: "",
  linkedin: "",
  // Default professional info
  professionalInfo: {
    roles: [
      {
        id: '1', 
        title: 'Videographer',
        experience: '10+ years',
        specialties: ['Commercial', 'Documentary']
      },
      {
        id: '2',
        title: 'Photographer',
        experience: '5 years',
        specialties: ['Portrait', 'Event']
      }
    ],
    equipment: "Sony A7III, DJI Ronin, Canon 5D Mark IV, Various lenses, Professional lighting kit"
  }
};

// Key for storing profile data in localStorage
const PROFILE_STORAGE_KEY = 'user_profile_data';

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, profile } = useAuth();
  
  // Initialize state from Supabase, localStorage, or use default
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    // First try to get from localStorage
    const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    const localProfile = savedProfile ? JSON.parse(savedProfile) : null;
    
    // If we have a user and profile from auth, use that data
    if (user && profile) {
      return {
        ...defaultProfileData,
        ...(localProfile || {}),
        fullName: profile.full_name || user.user_metadata?.full_name || localProfile?.fullName || defaultProfileData.fullName,
        displayName: profile.display_name || user.user_metadata?.display_name || localProfile?.displayName || defaultProfileData.displayName,
        email: user.email || localProfile?.email || defaultProfileData.email,
        avatar: profile.avatar || user.user_metadata?.avatar_url || localProfile?.avatar || defaultProfileData.avatar,
        bio: profile.bio || localProfile?.bio || defaultProfileData.bio,
        location: profile.location || localProfile?.location || defaultProfileData.location,
      };
    }
    
    // Fall back to localStorage or default
    return localProfile || defaultProfileData;
  });

  // Update profile in Supabase when profileData changes
  useEffect(() => {
    const updateSupabaseProfile = async () => {
      if (user) {
        try {
          const { error } = await supabase
            .from('profiles')
            .update({
              full_name: profileData.fullName,
              display_name: profileData.displayName,
              avatar: profileData.avatar,
              bio: profileData.bio,
              location: profileData.location,
              updated_at: new Date().toISOString()
            })
            .eq('id', user.id);
          
          if (error) {
            console.error('Error updating profile in Supabase:', error);
          }
        } catch (error) {
          console.error('Failed to update profile in Supabase:', error);
        }
      }
    };
    
    // Save to localStorage
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData));
    
    // If user is authenticated, also update in Supabase
    if (user) {
      updateSupabaseProfile();
    }
  }, [profileData, user]);

  const updateProfileData = (newData: Partial<ProfileData>) => {
    setProfileData(prev => {
      const updated = { ...prev, ...newData };
      return updated;
    });
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
