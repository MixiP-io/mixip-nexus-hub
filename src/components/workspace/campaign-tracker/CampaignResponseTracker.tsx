import React, { useState } from 'react';
import { Search, Filter, MapPin, Users, CheckCircle, Clock, X, ArrowDownAZ, ArrowUpAZ } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreatorCard from './CreatorCard';
import CreatorProfileModal from './CreatorProfileModal';

// Sample data for demonstration with realistic placeholder images
const sampleResponses = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'photographer',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop',
    location: 'New York, NY',
    rating: 4.8,
    status: 'interested',
    portfolio: [
      'https://images.unsplash.com/photo-1517329782449-810562a4ec2f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1595411425732-e69476bd690c?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop'
    ],
    instagram: '@alexjphoto',
    website: 'alexjohnson.com',
    previousCollabs: 2,
    viewedAt: new Date('2023-09-15T10:30:00'),
    respondedAt: new Date('2023-09-15T14:20:00')
  },
  {
    id: 2,
    name: 'Samantha Lee',
    role: 'videographer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    location: 'Los Angeles, CA',
    rating: 4.9,
    status: 'interested',
    portfolio: [
      'https://images.unsplash.com/photo-1604995236333-84f3249e572c?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1616261167032-b16d2df8333b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1682695797873-aa4cb6edd613?w=600&h=600&fit=crop'
    ],
    instagram: '@samleevideo',
    website: 'samanthaleecreative.com',
    previousCollabs: 0,
    viewedAt: new Date('2023-09-15T11:45:00'),
    respondedAt: new Date('2023-09-15T15:30:00')
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'photo-editor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    location: 'San Francisco, CA',
    rating: 4.7,
    status: 'pending',
    portfolio: [
      'https://images.unsplash.com/photo-1554941829-202a0b2403b8?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1604537466158-719b1972feb8?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1492695797873-aa4cb6edd613?w=600&h=600&fit=crop'
    ],
    instagram: '@mchenedits',
    website: 'michaelchen.design',
    previousCollabs: 1,
    viewedAt: new Date('2023-09-15T09:15:00'),
    respondedAt: null
  },
  {
    id: 4,
    name: 'Taylor Wilson',
    role: 'videographer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    location: 'Chicago, IL',
    rating: 4.5,
    status: 'declined',
    portfolio: [
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=600&fit=crop'
    ],
    instagram: '@taylor_films',
    website: 'taylorwilson.video',
    previousCollabs: 0,
    viewedAt: new Date('2023-09-15T08:30:00'),
    respondedAt: new Date('2023-09-15T10:15:00')
  },
  {
    id: 5,
    name: 'Jordan Rivera',
    role: 'audio-engineer',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
    location: 'Miami, FL',
    rating: 4.9,
    status: 'shortlisted',
    portfolio: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop'
    ],
    instagram: '@riverasound',
    website: 'jordanrivera.audio',
    previousCollabs: 3,
    viewedAt: new Date('2023-09-15T10:00:00'),
    respondedAt: new Date('2023-09-15T11:30:00')
  }
];

interface CampaignResponseTrackerProps {
  campaignId?: number;
  campaignTitle?: string;
}

const CampaignResponseTracker: React.FC<CampaignResponseTrackerProps> = ({ 
  campaignId = 1, 
  campaignTitle = "Summer Collection Launch" 
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'interested' | 'shortlisted' | 'declined'>('all');
  const [selectedCreator, setSelectedCreator] = useState<number | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Calculate statistics
  const stats = {
    totalReached: sampleResponses.length,
    viewed: sampleResponses.filter(r => r.viewedAt).length,
    responded: sampleResponses.filter(r => r.respondedAt).length,
    interested: sampleResponses.filter(r => r.status === 'interested' || r.status === 'shortlisted').length,
    shortlisted: sampleResponses.filter(r => r.status === 'shortlisted').length,
    declined: sampleResponses.filter(r => r.status === 'declined').length
  };

  // Filter responses based on active tab, search query, and role
  const filteredResponses = sampleResponses.filter(creator => {
    // Filter by tab
    if (activeTab !== 'all' && creator.status !== activeTab) {
      return false;
    }
    
    // Filter by search
    if (searchQuery && !creator.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by role
    if (activeRole && creator.role !== activeRole) {
      return false;
    }
    
    return true;
  });

  // Extract unique roles for filtering
  const roles = Array.from(new Set(sampleResponses.map(r => r.role)));

  const handleViewProfile = (creatorId: number) => {
    setSelectedCreator(creatorId);
    setShowProfileModal(true);
  };

  const handleCloseProfile = () => {
    setShowProfileModal(false);
  };

  const handleShortlist = (creatorId: number) => {
    console.log('Shortlisted creator:', creatorId);
  };

  const handleMessage = (creatorId: number) => {
    console.log('Messaging creator:', creatorId);
  };

  const handleSort = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    console.log(`Sorting creators by ${sortDirection}`);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{campaignTitle} - Responses</h2>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </Button>
        </div>
        
        {/* Response Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-gray-800 p-3 rounded-lg">
            <p className="text-sm text-gray-400">Total Reached</p>
            <p className="text-2xl font-semibold">{stats.totalReached}</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <p className="text-sm text-gray-400">Viewed</p>
            <p className="text-2xl font-semibold">{stats.viewed}</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <p className="text-sm text-gray-400">Responded</p>
            <p className="text-2xl font-semibold">{stats.responded}</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <p className="text-sm text-gray-400">Interested</p>
            <p className="text-2xl font-semibold text-green-500">{stats.interested}</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <p className="text-sm text-gray-400">Shortlisted</p>
            <p className="text-2xl font-semibold text-blue-500">{stats.shortlisted}</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <p className="text-sm text-gray-400">Declined</p>
            <p className="text-2xl font-semibold text-red-500">{stats.declined}</p>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search creators..."
              className="pl-10 pr-4 py-2 w-full rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Updated Sort Button with Apple-inspired styling */}
          <Button
            onClick={handleSort}
            variant="default"
            className="bg-gradient-to-b from-mixip-blue to-mixip-blue-dark text-white shadow-sm hover:from-mixip-blue-dark hover:to-mixip-blue-dark transition-all duration-200"
          >
            {sortDirection === 'asc' ? 
              <ArrowDownAZ className="w-4 h-4 mr-2" /> : 
              <ArrowUpAZ className="w-4 h-4 mr-2" />
            }
            Sort {sortDirection === 'asc' ? 'A-Z' : 'Z-A'}
          </Button>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={activeRole === null ? "default" : "outline"}
              size="sm"
              className={activeRole === null ? "bg-mixip-blue hover:bg-mixip-blue-dark text-white" : ""}
              onClick={() => setActiveRole(null)}
            >
              All Roles
            </Button>
            {roles.map(role => (
              <Button
                key={role}
                variant={activeRole === role ? "default" : "outline"}
                size="sm"
                className={activeRole === role ? "bg-mixip-blue hover:bg-mixip-blue-dark text-white" : ""}
                onClick={() => setActiveRole(role)}
              >
                {role.charAt(0).toUpperCase() + role.slice(1).replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'all' ? 'text-white border-b-2 border-green-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('all')}
          >
            All Responses
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'pending' ? 'text-white border-b-2 border-yellow-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('pending')}
          >
            <Clock className="w-4 h-4 inline mr-1" />
            Pending
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'interested' ? 'text-white border-b-2 border-green-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('interested')}
          >
            <CheckCircle className="w-4 h-4 inline mr-1" />
            Interested
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'shortlisted' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('shortlisted')}
          >
            <Users className="w-4 h-4 inline mr-1" />
            Shortlisted
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'declined' ? 'text-white border-b-2 border-red-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('declined')}
          >
            <X className="w-4 h-4 inline mr-1" />
            Declined
          </button>
        </div>
      </div>
      
      {/* Creator Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredResponses.length > 0 ? (
          filteredResponses.map(creator => (
            <CreatorCard
              key={creator.id}
              creator={creator}
              onViewProfile={() => handleViewProfile(creator.id)}
              onShortlist={() => handleShortlist(creator.id)}
              onMessage={() => handleMessage(creator.id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-400">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-1">No creators found</h3>
            <p>Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
      
      {/* Creator Profile Modal */}
      {showProfileModal && selectedCreator && (
        <CreatorProfileModal
          creator={sampleResponses.find(c => c.id === selectedCreator)!}
          onClose={handleCloseProfile}
          onShortlist={() => handleShortlist(selectedCreator)}
          onMessage={() => handleMessage(selectedCreator)}
        />
      )}
    </div>
  );
};

export default CampaignResponseTracker;
