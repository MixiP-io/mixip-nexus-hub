
import React from 'react';
import { Trash2, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectOwner } from '../../batch-uploader/utils/types/projectTypes';

interface OwnerCardProps {
  owner: ProjectOwner;
  isPrimary?: boolean;
  onRemove?: () => void;
  onPercentageChange?: (percentage: number) => void;
  compact?: boolean;
}

const OwnerCard: React.FC<OwnerCardProps> = ({
  owner,
  isPrimary = false,
  onRemove,
  onPercentageChange,
  compact = false
}) => {
  return (
    <div className={`flex items-center justify-between bg-gray-700 p-${compact ? '2' : '3'} rounded-lg`}>
      <div className="flex items-center">
        <div className={`${compact ? 'w-6 h-6' : 'w-8 h-8'} ${isPrimary ? 'bg-green-600' : 'bg-gray-600'} rounded-full flex items-center justify-center text-white font-medium mr-2`}>
          {owner.name.charAt(0)}
        </div>
        <div>
          <p className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-white`}>{owner.name}</p>
          {!compact && <p className="text-xs text-gray-400">{owner.email}</p>}
        </div>
      </div>
      <div className="flex items-center">
        {isPrimary ? (
          <>
            <DollarSign className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-white font-medium">{owner.royaltyPercentage}%</span>
            <span className={`ml-2 text-xs bg-blue-600 px-2 py-0.5 rounded text-white ${compact ? 'text-[10px]' : ''}`}>Creator</span>
          </>
        ) : (
          <div className="flex items-center">
            <div className="mr-2">
              <input 
                type="number" 
                min="1" 
                max="99" 
                value={owner.royaltyPercentage} 
                onChange={(e) => onPercentageChange && onPercentageChange(parseInt(e.target.value))}
                className={`${compact ? 'w-12 text-xs' : 'w-16'} bg-gray-600 border border-gray-500 rounded px-2 py-1 text-white text-center`} 
              />
              <span className="text-white ml-1">%</span>
            </div>
            {onRemove && (
              <Button 
                variant="ghost" 
                size={compact ? "sm" : "icon"}
                onClick={onRemove}
                className="text-gray-400 hover:text-white hover:bg-gray-600"
              >
                <Trash2 className={`${compact ? 'h-3 w-3' : 'h-4 w-4'}`} />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerCard;
