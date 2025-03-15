
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
  // Initialize state from localStorage or use default
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    return savedProfile ? JSON.parse(savedProfile) : defaultProfileData;
  });

  // Save to localStorage whenever profileData changes
  useEffect(() => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData));
  }, [profileData]);

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
