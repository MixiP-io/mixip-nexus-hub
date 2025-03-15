
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
  // Add social media links to the profile data
  website: string;
  instagram: string;
  twitter: string;
  linkedin: string;
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
  skills: [],
  profileCompletion: 72,
  // Add default values for social media links
  website: "",
  instagram: "",
  twitter: "",
  linkedin: ""
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
