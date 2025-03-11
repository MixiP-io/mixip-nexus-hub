
import React from 'react';
import { Users } from 'lucide-react';
import CreatorCard from '../CreatorCard';

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

interface CreatorsListProps {
  filteredResponses: Creator[];
  onViewProfile: (creatorId: number) => void;
  onShortlist: (creatorId: number) => void;
  onMessage: (creatorId: number) => void;
}

const CreatorsList: React.FC<CreatorsListProps> = ({
  filteredResponses,
  onViewProfile,
  onShortlist,
  onMessage
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredResponses.length > 0 ? (
        filteredResponses.map(creator => (
          <CreatorCard
            key={creator.id}
            creator={creator}
            onViewProfile={() => onViewProfile(creator.id)}
            onShortlist={() => onShortlist(creator.id)}
            onMessage={() => onMessage(creator.id)}
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
  );
};

export default CreatorsList;
