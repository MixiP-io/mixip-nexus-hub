
import React, { useState } from 'react';
import { X, Camera, Video, Edit2, Music, MessageCircle, UserPlus } from 'lucide-react';
import { Creator } from './types';
import ProfileHeader from './components/profile-modal/ProfileHeader';
import ProfileTabs from './components/profile-modal/ProfileTabs';
import TabContent from './components/profile-modal/TabContent';
import ProfileFooter from './components/profile-modal/ProfileFooter';

interface CreatorProfileModalProps {
  creator: Creator;
  onClose: () => void;
  onShortlist: () => void;
  onMessage: () => void;
}

const CreatorProfileModal: React.FC<CreatorProfileModalProps> = ({
  creator,
  onClose,
  onShortlist,
  onMessage
}) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'about' | 'availability'>('portfolio');
  
  // Sample expanded data that would come from API in real app
  const expandedCreatorData = {
    bio: "Professional photographer and videographer with 7+ years of experience specializing in fashion and product photography. Passionate about creating visually stunning content that tells a brand's story.",
    equipment: ["Sony A7III", "Canon 5D Mark IV", "DJI Ronin Gimbal", "Various Prime Lenses", "Professional Lighting Kit"],
    experience: [
      { company: "Fashion Brand X", role: "Lead Photographer", duration: "2020-2023" },
      { company: "Studio Y", role: "Content Creator", duration: "2018-2020" }
    ],
    specialties: ["Fashion Photography", "Product Photography", "Lifestyle", "Social Media Content"],
    rateRange: "$500-1500/day",
    availability: [
      { date: "2023-10-01", status: "available" },
      { date: "2023-10-02", status: "available" },
      { date: "2023-10-03", status: "booked" },
      { date: "2023-10-04", status: "available" },
      { date: "2023-10-05", status: "available" }
    ],
    reviews: [
      { clientName: "Brand A", rating: 5, comment: "Amazing work! Delivered exactly what we needed." },
      { clientName: "Agency B", rating: 4, comment: "Professional and creative. Would hire again." }
    ],
    portfolioExtended: [
      ...creator.portfolio,
      ...creator.portfolio,
      ...creator.portfolio,
      ...creator.portfolio
    ]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
      <div className="bg-gray-800 rounded-xl overflow-hidden relative w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Header */}
        <ProfileHeader 
          creator={creator} 
          onMessage={onMessage} 
          onShortlist={onShortlist} 
        />
        
        {/* Tabs */}
        <ProfileTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        
        {/* Content - scrollable area */}
        <TabContent 
          activeTab={activeTab} 
          expandedCreatorData={expandedCreatorData} 
          creator={creator} 
        />
        
        {/* Footer */}
        <ProfileFooter 
          onClose={onClose} 
          onMessage={onMessage} 
        />
      </div>
    </div>
  );
};

export default CreatorProfileModal;
