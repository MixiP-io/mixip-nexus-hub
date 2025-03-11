
import React, { useState } from 'react';
import { X, Star, MapPin, Instagram, Globe, Link2, MessageCircle, UserPlus, Camera, Video, Music, Edit2, Calendar, DollarSign, Package, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Creator {
  id: number;
  name: string;
  role: string;
  avatar: string;
  location: string;
  rating: number;
  status: string;
  portfolio: string[];
  instagram: string;
  website: string;
  previousCollabs: number;
  viewedAt: Date | null;
  respondedAt: Date | null;
}

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

  // Get role icon
  const getRoleIcon = () => {
    switch(creator.role) {
      case 'photographer': return <Camera className="w-5 h-5" />;
      case 'videographer': return <Video className="w-5 h-5" />;
      case 'photo-editor': return <Edit2 className="w-5 h-5" />;
      case 'audio-engineer': return <Music className="w-5 h-5" />;
      default: return <Camera className="w-5 h-5" />;
    }
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
        <div className="bg-gray-700 p-6">
          <div className="flex items-start">
            <img 
              src={creator.avatar} 
              alt={creator.name} 
              className="w-20 h-20 rounded-full object-cover mr-5 border-2 border-white"
            />
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold mb-1">{creator.name}</h2>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <div className="flex items-center bg-gray-600 px-3 py-1 rounded">
                  {getRoleIcon()}
                  <span className="ml-1.5">{creator.role.replace('-', ' ')}</span>
                </div>
                <div className="flex items-center text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1 font-medium">{creator.rating}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{creator.location}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href={`https://instagram.com/${creator.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded">
                  <Instagram className="w-4 h-4 mr-1.5" />
                  {creator.instagram}
                </a>
                <a href={`https://${creator.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded">
                  <Globe className="w-4 h-4 mr-1.5" />
                  {creator.website}
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button onClick={onMessage} className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button onClick={onShortlist} variant={creator.status === 'shortlisted' ? 'secondary' : 'outline'} className={creator.status === 'shortlisted' ? 'bg-blue-600' : ''}>
                <UserPlus className="w-4 h-4 mr-2" />
                {creator.status === 'shortlisted' ? 'Shortlisted' : 'Shortlist'}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-700">
          <div className="flex px-6">
            <button
              className={`px-4 py-3 font-medium ${activeTab === 'portfolio' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
              onClick={() => setActiveTab('portfolio')}
            >
              Portfolio
            </button>
            <button
              className={`px-4 py-3 font-medium ${activeTab === 'about' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
              onClick={() => setActiveTab('about')}
            >
              About & Experience
            </button>
            <button
              className={`px-4 py-3 font-medium ${activeTab === 'availability' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
              onClick={() => setActiveTab('availability')}
            >
              Availability & Rates
            </button>
          </div>
        </div>
        
        {/* Content - scrollable area */}
        <div className="flex-grow overflow-y-auto p-6">
          {activeTab === 'portfolio' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Portfolio</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {expandedCreatorData.portfolioExtended.map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-700 rounded overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Portfolio item ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">About</h3>
                <p className="text-gray-300">{expandedCreatorData.bio}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Experience</h3>
                <div className="space-y-3">
                  {expandedCreatorData.experience.map((exp, index) => (
                    <div key={index} className="bg-gray-700 p-3 rounded">
                      <div className="font-medium">{exp.company}</div>
                      <div className="text-sm text-gray-300">{exp.role}</div>
                      <div className="text-sm text-gray-400">{exp.duration}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {expandedCreatorData.specialties.map((specialty, index) => (
                    <span key={index} className="bg-gray-700 px-3 py-1 rounded text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Equipment</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {expandedCreatorData.equipment.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Reviews</h3>
                <div className="space-y-3">
                  {expandedCreatorData.reviews.map((review, index) => (
                    <div key={index} className="bg-gray-700 p-3 rounded">
                      <div className="flex items-center mb-1">
                        <span className="font-medium mr-2">{review.clientName}</span>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'availability' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Rate Information</h3>
                <div className="bg-gray-700 p-4 rounded flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                  <span className="font-medium">{expandedCreatorData.rateRange}</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Upcoming Availability</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {expandedCreatorData.availability.map((day, index) => (
                    <div 
                      key={index} 
                      className={`p-2 rounded text-center ${
                        day.status === 'available' ? 'bg-green-900/30 border border-green-700' : 'bg-gray-700 border border-gray-600'
                      }`}
                    >
                      <div className="text-sm font-medium">
                        {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className={`text-xs ${day.status === 'available' ? 'text-green-400' : 'text-gray-400'}`}>
                        {day.status.charAt(0).toUpperCase() + day.status.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  This is a simplified view. Contact creator for full availability.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Response Information</h3>
                <div className="bg-gray-700 p-4 rounded space-y-2">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-blue-400" />
                    <span className="text-gray-300">
                      Typical response time: <span className="font-medium">Within 24 hours</span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Package className="w-4 h-4 mr-2 text-green-400" />
                    <span className="text-gray-300">
                      Completion rate: <span className="font-medium">98%</span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                    <span className="text-gray-300">
                      Booking preference: <span className="font-medium">2+ weeks notice</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="border-t border-gray-700 p-4 flex justify-end">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Close
          </Button>
          <Button onClick={onMessage}>
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact Creator
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfileModal;
