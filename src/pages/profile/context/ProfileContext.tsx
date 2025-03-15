
import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  profileCompletion: 72
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfileData);

  const updateProfileData = (newData: Partial<ProfileData>) => {
    setProfileData(prev => ({ ...prev, ...newData }));
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
